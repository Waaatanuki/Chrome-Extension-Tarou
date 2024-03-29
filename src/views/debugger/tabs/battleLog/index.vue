<script setup lang="ts">
import type { Action, BattleRecord, Player } from 'myStorage'
import type { Ability, AttackResultJson, BattleStartJson, BossConditionJson, Condition, DamageScenario, GuardSettingJson, LoopDamageScenario, ResultJsonPayload, SpecialScenario, SpecialSkillSetting, SummonScenario, SuperScenario, WsPayloadData } from 'requestData'
import type { BossInfo, BuffInfo, MemberInfo, SummonInfo } from 'battleLog'
import BossDashboard from './components/BossDashboard.vue'
import BuffBar from './components/BuffBar.vue'
import MemberList from './components/MemberList.vue'
import Summon from './components/Summon.vue'
import DamageRecord from './components/DamageRecord.vue'
import ActionList from './components/ActionList.vue'
import { battleRecord, uid } from '~/logic'

const props = defineProps<{
  battleStartJson: BattleStartJson
  resultJson: { type: string, result: AttackResultJson }
  resultJsonPayload: ResultJsonPayload
  bossConditionJson: BossConditionJson
  inLobby: boolean
  lobbyMemberList: MemberInfo[]
  guardSettingJson: GuardSettingJson
  specialSkillSetting: SpecialSkillSetting
  battleRecordLimit: number
  wsPayloadData: WsPayloadData
}>()

const bossInfo = ref<BossInfo>()
const summonInfo = ref<SummonInfo>()
const buffInfo = ref<BuffInfo>({ bossBuffs: [], playerBuffs: [] })
const memberInfo = ref<MemberInfo[]>()
const raidId = ref<number>()
const leaderAttr = ref('')
const mvpInfo = ref<{ userId: string, rank: number, point: number }[]>()

watch(() => props.battleStartJson, (data) => {
  if (!data || !data.raid_id)
    return

  raidId.value = data.raid_id
  const boss = data.boss.param[0]
  const player = data.player.param[0]
  leaderAttr.value = player.attr

  const addition = {
    unique_gauge_time_limit: data.unique_gauge_time_limit || undefined,
  }

  bossInfo.value = {
    questId: data.quest_id,
    battleId: data.twitter?.battle_id,
    imgId: boss.cjs.split('_').at(-1)!,
    name: boss.monster,
    hp: Number(boss.hp),
    hpmax: Number(boss.hpmax),
    hpPercent: Number.parseFloat((Number(boss.hp) / Number(boss.hpmax) * 100).toFixed(2)),
    timer: data.timer,
    turn: data.turn,
    addition,
  }

  if (data.special_skill_indicate && data.special_skill_indicate.length > 0)
    bossInfo.value.interrupt_display_text = data.special_skill_indicate[0].interrupt_display_text
  if (data.status?.special_skill_indicate && data.status.special_skill_indicate.length > 0)
    bossInfo.value.interrupt_display_text = data.status.special_skill_indicate[0].interrupt_display_text

  summonInfo.value = {
    summon: [...data.summon],
    supporter: data.supporter,
  }

  memberInfo.value = data.multi_raid_member_info?.map(cur => ({
    nickname: cur.nickname,
    userId: cur.user_id,
    userRank: cur.level,
    jobIcon: `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/${cur.job_id}.png`,
    attributeClass: `ico-attribute ico-attribute-${cur.pc_attribute}`,
    is_dead: cur.is_dead,
    is_host: cur.is_host,
  }))

  handleConditionInfo(boss.condition, player.condition)
  recordRaidInfo(data)
  // 处理开幕特动情况
  if (data.scenario)
    handleStartAttackRusult(data)
})

watch(() => props.resultJson, (data) => {
  handleAttackRusult(data.type, data.result)
})

watch(() => props.guardSettingJson, (data) => {
  const raid_id = data.raid_id
  const currentRaid = battleRecord.value.find(battle => battle.raid_id === raid_id)

  Object.values(data.guard_status).forEach((item) => {
    const hit = currentRaid?.actionQueue.at(-1)?.guard_status.find(i => i.num === item.target_num)
    if (hit)
      hit.is_guard_status = item.is_guard_status
  })
})

watch(() => props.specialSkillSetting, (data) => {
  const raid_id = data.raid_id
  const currentRaid = battleRecord.value.find(battle => battle.raid_id === raid_id)

  if (currentRaid) {
    currentRaid.special_skill_flag = data.value
    currentRaid.actionQueue.at(-1)!.special_skill_flag = data.value
  }
})

watch(() => props.bossConditionJson, (data) => {
  const totalBossBuffs = (data.buff || []).concat(data.debuff || []).filter((item, index, self) => {
    return index === self.findIndex(t => t.status === item.status)
  }) || []
  buffInfo.value.bossBuffs = totalBossBuffs.map(buff => ({ status: buff.status }))
})

watch(() => props.wsPayloadData, (data) => {
  if (data.bossUpdate && bossInfo.value) {
    bossInfo.value.hp = Number(data.bossUpdate.param.boss1_hp)
    bossInfo.value.hpPercent = Number.parseFloat((Number(bossInfo.value.hp) / Number(bossInfo.value.hpmax) * 100).toFixed(2))
    handleConditionInfo(data.bossUpdate.param.boss1_condition)
  }

  if (data.battleFinish && bossInfo.value) {
    bossInfo.value.hp = 0
    bossInfo.value.hpPercent = 0
  }

  if (data.memberJoin) {
    const member = data.memberJoin.member
    if (memberInfo.value?.some(m => m.userId === member.user_id))
      return
    memberInfo.value?.push({
      nickname: member.nickname,
      userId: member.user_id,
      userRank: String(member.level),
      jobIcon: `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/${member.job_id}.png`,
      attributeClass: `ico-attribute ico-attribute-${member.pc_attribute}`,
      is_dead: false,
    })
    mvpInfo.value = data.memberJoin.mvpList.map(mvp => ({ userId: mvp.user_id, rank: mvp.rank, point: Number(mvp.point) }))
  }

  if (data.mvpUpdate)
    mvpInfo.value = data.mvpUpdate.mvpList.map(mvp => ({ userId: mvp.user_id, rank: mvp.rank, point: Number(mvp.point) }))
})

function handleConditionInfo(bossCondition?: Condition, playerCondition?: Condition) {
  if (bossCondition) {
    const bossBuffs = bossCondition.buff?.filter(item => !item.personal_buff_user_id || item.personal_buff_user_id === uid.value) || []
    const bossDebuffs = bossCondition.debuff?.filter(item => !item.personal_debuff_user_id || item.personal_debuff_user_id === uid.value) || []
    const totalBossBuffs = bossBuffs.concat(bossDebuffs).filter((item, index, self) => index === self.findIndex(t => t.status === item.status))
    buffInfo.value.bossBuffs = totalBossBuffs
  }

  if (playerCondition) {
    const playerBuffs = playerCondition.buff || []
    const playerDebuffs = playerCondition.debuff || []
    const totalPlayerBuffs = playerBuffs.concat(playerDebuffs).filter((item, index, self) => index === self.findIndex(t => t.status === item.status))
    buffInfo.value.playerBuffs = totalPlayerBuffs
  }
}

function recordRaidInfo(data: BattleStartJson) {
  const hit = battleRecord.value.find(record => record.raid_id === raidId.value)
  if (!hit) {
    const boss = data.boss.param[0]

    const player = data.player.param.reduce<Player[]>((pre, cur) => {
      pre.push({
        pid: cur.pid.split('_')[0],
        is_dead: !cur.alive,
        is_npc: cur.cjs.startsWith('npc'),
        image_id: `${cur.pid.split('_')[0]}_01`,
        use_ability_count: 0,
        use_special_skill_count: 0,
        damage: {
          total: { comment: '总计', value: 0 },
          attack: { comment: '通常攻击&反击', value: 0 },
          ability: { comment: '技能伤害', value: 0 },
          special: { comment: '奥义伤害', value: 0 },
          other: { comment: '其他', value: 0 },
        },
        damageTaken: {
          total: { comment: '总计', value: 0 },
          attack: { comment: '通常攻击&反击', value: 0 },
          super: { comment: '特动', value: 0 },
          other: { comment: '其他', value: 0 },
        },
      })
      return pre
    }, [])

    const formation = Object.values(data.ability).map(a => a.pos)
    const guard_status = Object.values(data.ability).map(a => ({ num: a.pos, is_guard_status: 0 }))

    const actionQueue = [{
      turn: data.turn,
      bossHpPercent: bossInfo.value!.hpPercent,
      special_skill_flag: Number(data.special_skill_flag),
      acitonList: [],
      guard_status,
    }]

    const abilityList = getAbilityList(data.ability)

    battleRecord.value.unshift({
      quest_id: data.quest_id,
      raid_id: raidId.value!,
      raid_name: boss.monster,
      imgId: boss.cjs.split('_').at(-1)!,
      turn: data.turn,
      startTimestamp: Date.now(),
      startTimer: data.timer || 0,
      endTimer: data.timer || 0,
      player,
      formation,
      special_skill_flag: Number(data.special_skill_flag),
      actionQueue,
      reserve: false,
      abilityList,
    })

    if (battleRecord.value.length > props.battleRecordLimit) {
      const lastIndex = battleRecord.value.findLastIndex(record => !record.reserve)
      battleRecord.value.splice(lastIndex, 1)
    }
  }
}

function handleDamageStatistic(resultType: string, data: AttackResultJson | BattleStartJson) {
  const currentRaid = battleRecord.value.find(record => record.raid_id === raidId.value)
  if (!currentRaid)
    return

  currentRaid.endTimer = data.status?.timer ?? currentRaid.endTimer

  const beforeAbilityDamageCmdList = ['special', 'special_npc', 'ability']

  data.scenario!.forEach((action, idx, array) => {
    if (action.cmd === 'special' || action.cmd === 'special_npc') {
      const hitPlayer = currentRaid.player[action.num]
      if (hitPlayer) {
        hitPlayer.use_special_skill_count++
        processSpecialScenario(action as SpecialScenario, hitPlayer)
      }
    }
    if (action.cmd === 'attack' && action.from === 'player') {
      const hitPlayer = currentRaid.player[action.num]
      if (hitPlayer) {
        hitPlayer.damage.attack.value += action.damage!.reduce((pre, cur) => {
          pre += cur.reduce((p, c) => {
            p += c.value
            return p
          }, 0)
          return pre
        }, 0)

        // 记录连击数据
        if (!action.effect) {
          // 致死普攻如果不是ta就不记录
          if (!(action.damage.length < 3 && action.damage.some(attack => attack.some(hit => hit.hp === 0)))) {
            hitPlayer.attackInfo = hitPlayer.attackInfo || { total: 0, sa: 0, da: 0, ta: 0 }
            hitPlayer.attackInfo.total++
            if (action.damage.length === 1)
              hitPlayer.attackInfo.sa++
            else if (action.damage.length === 2)
              hitPlayer.attackInfo.da++
            else
              hitPlayer.attackInfo.ta++
          }
        }
      }
    }
    if (action.cmd === 'damage' && action.to === 'boss') {
      if (resultType === 'summon')
        processDamageScenario(action as DamageScenario, currentRaid, 0)

      for (let i = 1; i <= 4; i++) {
        if (array[idx - i]?.cmd === 'wait')
          break
        if (array[idx - i] && beforeAbilityDamageCmdList.includes(array[idx - i].cmd) && (array[idx - i].to !== 'boss')) {
          processDamageScenario(action as DamageScenario, currentRaid, array[idx - i].num)
          break
        }

        if (array[idx - i] && array[idx - i].cmd === 'chain_cutin') {
          const pos0NpcNum = currentRaid.formation[0]
          processDamageScenario(action as DamageScenario, currentRaid, pos0NpcNum, 'other')
          break
        }
      }
    }
    if (action.cmd === 'loop_damage' && action.to === 'boss') {
      for (let i = 1; i <= 4; i++) {
        if (array[idx - i]?.cmd === 'wait')
          break
        if (array[idx - i] && beforeAbilityDamageCmdList.includes(array[idx - i].cmd) && (array[idx - i].to !== 'boss')) {
          processLoopDamageScenario(action as LoopDamageScenario, currentRaid, array[idx - i].num)
          break
        }
      }
    }
    if (action.cmd === 'summon' && action.list.length > 0)
      processSummonScenario(action as SummonScenario, currentRaid)
    if ((action.cmd === 'die' || action.cmd === 'die_back') && action.to === 'player') {
      const hitPlayer = currentRaid.player[Number(action.index)]
      hitPlayer && (hitPlayer.is_dead = true)
    }
    if (action.cmd === 'resurrection') {
      const hitPlayer = currentRaid.player[Number(action.index)]
      hitPlayer && (hitPlayer.is_dead = false)
    }
    if (action.cmd === 'rematch')
      currentRaid.player.forEach(p => p.is_dead = false)

    // 统计承伤
    if (action.cmd === 'super' && action.target === 'player')
      processSuperScenario(action as SuperScenario, currentRaid)
    if (action.cmd === 'attack' && action.from === 'boss') {
      Object.values(action.damage).forEach((item) => {
        item.forEach((hit) => {
          const playerNum = currentRaid.formation[hit.pos]
          currentRaid.player[playerNum].damageTaken.attack.value += hit.value
        })
      },
      )
    }
    if (action.cmd === 'damage' && action.to === 'player') {
      action.list.forEach((_hit) => {
        const hit: { pos: number, value: number } = _hit as any
        const playerNum = currentRaid.formation[hit.pos]
        currentRaid.player[playerNum].damageTaken.other.value += hit.value
      })
    }
  })
  let point = 0
  currentRaid.player.forEach((player) => {
    player.damage.total.value = player.damage.ability.value + player.damage.attack.value + player.damage.other.value + player.damage.special.value
    player.damageTaken.total.value = player.damageTaken.super.value + player.damageTaken.attack.value + player.damageTaken.other.value
    point += player.damage.total.value
  })
  currentRaid.point = point.toLocaleString()

  // 更新前排角色位置信息
  if (data.status?.formation)
    currentRaid.formation = data.status.formation.map(num => Number(num))
}

function processSpecialScenario(action: SpecialScenario, player: Player) {
  player.damage.special.value += action.list?.reduce((pre, cur) => {
    pre += cur.damage?.reduce((p, c) => {
      p += c.value
      return p
    }, 0) ?? 0
    return pre
  }, 0) ?? 0
}

function processSummonScenario(action: SummonScenario, raid: BattleRecord) {
  raid.player[0].damage.other.value += action.list.reduce((pre, cur) => {
    pre += cur.damage?.reduce((p, c) => {
      p += c.value
      return p
    }, 0) ?? 0
    return pre
  }, 0)
}

function processDamageScenario(action: DamageScenario, raid: BattleRecord, num: number, type: 'ability' | 'other' = 'ability') {
  const hitPlayer = raid.player[num]
  if (hitPlayer) {
    if (props.resultJson?.type === 'fc')
      type = 'other'
    hitPlayer.damage[type].value += action.list.reduce((pre, cur) => {
      pre += cur.value!
      return pre
    }, 0)
  }
}

function processLoopDamageScenario(action: LoopDamageScenario, raid: BattleRecord, num: number, type: 'ability' | 'other' = 'ability') {
  const hitPlayer = raid.player[num]
  if (hitPlayer) {
    hitPlayer.damage[type].value += action.list.reduce((pre, cur) => {
      pre += cur.reduce((p, c) => {
        p += c.value!
        return p
      }, 0)
      return pre
    }, 0)
  }
}

function processSuperScenario(action: SuperScenario, raid: BattleRecord) {
  action.list?.forEach((item) => {
    item.damage.forEach((hit) => {
      const playerNum = raid.formation[hit.pos]
      raid.player[playerNum].damageTaken.super.value += hit.value
    })
  })
}

function handleActionQueue(type: string, data: AttackResultJson) {
  const currentRaid = battleRecord.value.find(record => record.raid_id === raidId.value)
  if (!currentRaid)
    return

  const dieIndex = data.scenario.findIndex(action => action.cmd === 'die' && action.to === 'boss')

  if (dieIndex !== -1) {
    currentRaid.endTimestamp = Date.now()
    if (dieIndex === 0)
      return
  }

  if (!data.status)
    return

  const currentTurn = data.status.turn
  currentRaid.turn = currentTurn

  if (currentTurn !== currentRaid.actionQueue.at(-1)?.turn) {
    const guard_status = Object.values(data.status.ability)
      .reduce< { is_guard_status: number, num: number }[]>((pre, cur) => {
        pre.push({
          num: cur.pos,
          is_guard_status: 0,
        })
        return pre
      }, [])

    currentRaid.actionQueue.push({
      turn: currentTurn,
      bossHpPercent: bossInfo.value!.hpPercent,
      special_skill_flag: currentRaid.special_skill_flag!,
      acitonList: [],
      guard_status,
    })
  }

  if (type === 'ability') {
    const hit = currentRaid.abilityList?.find(ability => ability.id === props.resultJsonPayload.ability_id)
    if (!hit)
      return

    currentRaid.player[Number(props.resultJsonPayload.ability_character_num)].use_ability_count++

    currentRaid.actionQueue.at(-1)?.acitonList.push({
      ...hit,
      icon: hit.subAbility ? hit.subAbility.find(a => a.index === String(props.resultJsonPayload.ability_sub_param[0]))?.icon : hit.icon,
      id: hit.subAbility ? hit.subAbility.find(a => a.index === String(props.resultJsonPayload.ability_sub_param[0]))?.id : hit.id,
      isSub: !!hit.subAbility,
      aim_num: props.resultJsonPayload.ability_aim_num
        ? currentRaid.player[Number(props.resultJsonPayload.ability_aim_num)].pid
        : '',
      aim_is_npc: props.resultJsonPayload.ability_aim_num
        ? currentRaid.player[Number(props.resultJsonPayload.ability_aim_num)].is_npc
        : false,
    })
  }

  if (type === 'fc') {
    currentRaid.actionQueue.at(-1)?.acitonList.push({
      type: 'fc',
      id: leaderAttr.value,
      icon: leaderAttr.value,
    })
  }

  if (type === 'summon') {
    const summon_id = props.resultJsonPayload.summon_id

    if (summon_id === 'supporter') {
      currentRaid.actionQueue.at(-1)?.acitonList.push({
        type: 'summon',
        id: summonInfo.value?.supporter.id,
        icon: summonInfo.value?.supporter.image_id,
      })
    }
    else {
      currentRaid.actionQueue.at(-1)?.acitonList.push({
        type: 'summon',
        id: summonInfo.value?.summon[Number(summon_id) - 1].id,
        icon: summonInfo.value?.summon[Number(summon_id) - 1].image_id,
      })
    }
  }

  if (type === 'temporary') {
    currentRaid.actionQueue.at(-1)?.acitonList.push({
      type: 'temporary',
      icon: props.resultJsonPayload.character_num ? '1' : '2',
      id: props.resultJsonPayload.character_num ? '1' : '2',
      aim_num: props.resultJsonPayload.character_num
        ? currentRaid.player[Number(props.resultJsonPayload.character_num)].pid
        : '',
      aim_is_npc: props.resultJsonPayload.character_num
        ? currentRaid.player[Number(props.resultJsonPayload.character_num)].is_npc
        : false,
    })
  }

  if (type === 'recovery')
    currentRaid.actionQueue.at(-1)?.acitonList.push({ type: 'recovery', icon: 'recovery', id: 'recovery' })

  if (type === 'normal') {
    const index = dieIndex !== -1 ? -1 : -2
    currentRaid.actionQueue.at(index)?.acitonList.push({ icon: 'attack', id: 'attack', type: 'attack' })
  }

  // 更新技能列表
  const currentAbilityList = getAbilityList(data.status.ability)
  currentAbilityList.forEach((abi) => {
    const hit = currentRaid.abilityList.find(a => a.id === abi.id)
    if (hit)
      hit.icon = abi.icon
    else
      currentRaid.abilityList.push({ ...abi })
  })
}

function handleStartAttackRusult(data: BattleStartJson) {
  const scenario = data.scenario!
  const status = data.status!

  const isBossDie = scenario.find((item: any) => item.cmd === 'die' && item.to === 'boss')

  if (isBossDie && bossInfo.value) {
    bossInfo.value.hp = 0
    bossInfo.value.hpPercent = 0
  }

  if (summonInfo.value) {
    status.summon.forEach((summon, idx) => {
      summonInfo.value!.summon[idx].recast = summon.recast
    })
    summonInfo.value.supporter.recast = status.supporter.recast
  }

  if (status.unique_gauge_time_limit && bossInfo.value)
    bossInfo.value.addition = { unique_gauge_time_limit: status.unique_gauge_time_limit }

  const bossBuffs = scenario.filter(item => item.cmd === 'condition' && item.to === 'boss' && item.pos === 0).at(-1)
  const playerBuffs = scenario.filter(item => item.cmd === 'condition' && item.to === 'player' && item.pos === 0).at(-1)
  handleConditionInfo(bossBuffs?.condition, playerBuffs?.condition)
  handleDamageStatistic('start', data)
}

function handleAttackRusult(type: string, data: AttackResultJson) {
  if (!type || !data?.scenario)
    return
  const bossGauge = data.scenario.findLast(item => item.cmd === 'boss_gauge' && item.pos === 0)
  const status = data.status

  if (status.unique_gauge_time_limit && bossInfo.value)
    bossInfo.value.addition = { unique_gauge_time_limit: status.unique_gauge_time_limit }

  if (bossInfo.value && status?.special_skill_indicate)
    bossInfo.value.interrupt_display_text = status.special_skill_indicate.length > 0 ? status.special_skill_indicate[0].interrupt_display_text : ''

  if (bossGauge && bossInfo.value) {
    bossInfo.value.name = bossGauge.name!.ja
    bossInfo.value.hp = bossGauge.hp!
    bossInfo.value.hpPercent = Number.parseFloat((Number(bossGauge.hp) / Number(bossInfo.value.hpmax) * 100).toFixed(2))
    bossInfo.value.timer = status?.timer ?? bossInfo.value.timer
    bossInfo.value.turn = status?.turn ?? bossInfo.value.turn
  }
  const isBossDie = data.scenario.find(item => item.cmd === 'die' && item.to === 'boss')

  if (isBossDie && bossInfo.value) {
    bossInfo.value.hp = 0
    bossInfo.value.hpPercent = 0
  }

  if (summonInfo.value) {
    status?.summon.forEach((summon, idx) => {
      summonInfo.value!.summon[idx].recast = summon.recast
    })
    summonInfo.value.supporter.recast = status?.supporter?.recast ?? summonInfo.value.supporter.recast
  }

  const bossBuffs = data.scenario.filter(item => item.cmd === 'condition' && item.to === 'boss' && item.pos === 0).at(-1)
  const playerBuffs = data.scenario.filter(item => item.cmd === 'condition' && item.to === 'player' && item.pos === 0).at(-1)
  handleConditionInfo(bossBuffs?.condition, playerBuffs?.condition)
  handleDamageStatistic(type, data)
  handleActionQueue(type, data)
}

function getAbilityList(rawAbility: Ability) {
  const prefix = 'ico-ability'
  return Object.values(rawAbility).reduce<Action[]>(
    (pre, cur) => pre.concat(Object.values(cur.list).reduce<Action[]>(
      (p, c) => p.concat([{
        type: 'ability',
        icon: c[0].class.split(' ')[0].substring(prefix.length),
        id: c[0]['ability-id'],
      }]),
      [],
    )),
    [],
  )
}

const normalAttackInfo = computed(() => {
  if (!props.resultJson?.result || props.resultJson?.type !== 'normal')
    return { hit: 0, damage: 0 }

  const attackList = props.resultJson.result.scenario?.filter((item: any) => item.cmd === 'attack' && item.from === 'player') || []
  if (attackList.length === 0)
    return { hit: 0, damage: 0 }
  let damageList: any[] = []
  attackList.forEach((item: any) => {
    damageList = damageList.concat(item.damage)
  })

  const data: any[] = []
  damageList.forEach((damage: any) => {
    for (const key in damage)
      data.push(damage[key])
  })

  const damage = data.reduce<number>((pre, cur) => pre + Number(cur.value), 0)
  return { hit: data.length, damage }
})
</script>

<template>
  <div v-if="inLobby" mb-10px>
    <MemberList :member-info="lobbyMemberList" />
  </div>
  <div v-if="bossInfo && summonInfo" w-full fc flex-col gap-10px>
    <div w-full fc gap-2 p-2>
      <BossDashboard :boss-info="bossInfo" :raid-id="raidId" />
      <div w-full flex flex-col items-center justify-start>
        <BuffBar :buff-info="buffInfo" :boss-condition-json="bossConditionJson" :turn="bossInfo.turn" />
        <Summon :summon-info="summonInfo" />
      </div>
    </div>
    <div w-full flex items-start justify-start gap-2 p-2>
      <DamageRecord :battle-record="battleRecord.find(record => record.raid_id === raidId)!" />
      <ActionList :battle-record="battleRecord.find(record => record.raid_id === raidId)!" />
    </div>
    <ElDescriptions v-if="battleStartJson && bossInfo " border :column="1">
      <ElDescriptionsItem label="平A结果">
        {{ `hit: ${normalAttackInfo.hit} 总伤害：${normalAttackInfo.damage}` }}
      </ElDescriptionsItem>
    </ElDescriptions>

    <MemberList :member-info="memberInfo" :mvp-info="mvpInfo" />
  </div>
  <div v-else fc>
    <ElTag type="info" effect="dark" size="large" round>
      进入战斗时将会读取相关信息
    </ElTag>
  </div>
</template>
