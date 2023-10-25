<script setup lang="ts">
import type { Action, BattleRecord, Player } from 'myStorage'
import type { Ability, AttackResultJson, BattleStartJson, BossConditionJson, Condition, DamageScenario, GuardSettingJson, LoopDamageScenario, ResultJsonPayload, SpecialSkillSetting, SummonScenario, SuperScenario } from 'requestData'
import type { BossInfo, BuffInfo, Member, SummonInfo } from 'battleLog'
import BossDashboard from './components/BossDashboard.vue'
import BuffBar from './components/BuffBar.vue'
import MemberList from './components/MemberList.vue'
import Summon from './components/Summon.vue'
import DamageRecord from './components/DamageRecord.vue'
import ActionList from './components/ActionList.vue'
import DBM from './dbm/index.vue'
import { battleRecord } from '~/logic'

const props = defineProps<{
  userId: string
  battleStartJson: BattleStartJson
  resultJson: { type: string; result: AttackResultJson }
  resultJsonPayload: ResultJsonPayload
  bossConditionJson: BossConditionJson
  lobbyMemberList: Member[]
  guardSettingJson: GuardSettingJson
  specialSkillSetting: SpecialSkillSetting
  battleRecordLimit: number
}>()

const bossInfo = ref<BossInfo>()
const summonInfo = ref<SummonInfo>()
const buffInfo = ref<BuffInfo>()
const raidId = ref<number>()

watch(() => props.battleStartJson, (data) => {
  if (!data || !data.raid_id)
    return

  raidId.value = data.raid_id
  const boss = data.boss.param[0]
  const player = data.player.param[0]

  bossInfo.value = {
    battleId: data.twitter?.battle_id,
    imgId: boss.cjs.split('_').at(-1)!,
    name: boss.monster,
    hp: Number(boss.hp),
    hpmax: Number(boss.hpmax),
    hpPercent: Number.parseFloat((Number(boss.hp) / Number(boss.hpmax) * 100).toFixed(2)),
    timer: data.timer,
    turn: data.turn,
    remainderSecond: data.timer,
  }

  if (data.special_skill_indicate?.length > 0)
    bossInfo.value.interrupt_display_text = data.special_skill_indicate[0].interrupt_display_text
  if (data.status?.special_skill_indicate?.length && data.status?.special_skill_indicate?.length > 0)
    bossInfo.value.interrupt_display_text = data.status.special_skill_indicate[0].interrupt_display_text

  summonInfo.value = {
    summon: [...data.summon],
    supporter: data.supporter,
  }

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

function handleConditionInfo(bossCondition?: Condition, playerCondition?: Condition) {
  if (!bossCondition || !playerCondition)
    return

  const bossBuffs = bossCondition.buff?.filter((item) => {
    return !item.personal_buff_user_id || item.personal_buff_user_id === props.userId
  }) || []

  const bossDebuffs = bossCondition.debuff?.filter((item) => {
    return !item.personal_debuff_user_id || item.personal_debuff_user_id === props.userId
  }) || []

  const totalBossBuffs = bossBuffs.concat(bossDebuffs).filter((item, index, self) => {
    return index === self.findIndex(t => t.status === item.status)
  })

  const playerBuffs = playerCondition.buff || []
  const playerDebuffs = playerCondition.debuff || []
  const totalPlayerBuffs = playerBuffs.concat(playerDebuffs).filter((item, index, self) => {
    return index === self.findIndex(t => t.status === item.status)
  })

  buffInfo.value = {
    bossBuffs: totalBossBuffs,
    playerBuffs: totalPlayerBuffs,
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

    const guard_status = Object.values(data.ability)
      .reduce< { is_guard_status: number; num: number }[]>((pre, cur) => {
        pre.push({
          num: cur.pos,
          is_guard_status: 0,
        })
        return pre
      }, [])

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

  currentRaid.endTimer = data.status!.timer

  const beforeAbilityDamageCmdList = ['special', 'special_npc', 'ability']

  data.scenario!.forEach((action, idx, array) => {
    if (action.cmd === 'special' || action.cmd === 'special_npc') {
      const hitPlayer = currentRaid.player[action.num]
      if (hitPlayer) {
        hitPlayer.use_special_skill_count++
        if (action.total) {
          hitPlayer.damage.special.value += action.total.reduce((pre, cur) => {
            pre += Number(cur.split.join(''))
            return pre
          }, 0)
        }
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

      for (let i = 1; i <= 3; i++) {
        if (array[idx - i]?.cmd === 'wait')
          break
        if (array[idx - i] && beforeAbilityDamageCmdList.includes(array[idx - i].cmd) && (array[idx - i].comment || array[idx - i].name))
          processDamageScenario(action as DamageScenario, currentRaid, array[idx - i].num)

        if (array[idx - i] && array[idx - i].cmd === 'chain_cutin') {
          const pos0NpcNum = currentRaid.formation[0]
          processDamageScenario(action as DamageScenario, currentRaid, pos0NpcNum, 'other')
        }
      }
    }
    if (action.cmd === 'loop_damage' && action.to === 'boss') {
      for (let i = 1; i <= 3; i++) {
        if (array[idx - i]?.cmd === 'wait')
          break
        if (array[idx - i] && beforeAbilityDamageCmdList.includes(array[idx - i].cmd) && (array[idx - i].comment || array[idx - i].name))
          processLoopDamageScenario(action as LoopDamageScenario, currentRaid, array[idx - i].num)
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
        const hit: { pos: number; value: number } = _hit as any
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

function processSummonScenario(action: SummonScenario, raid: BattleRecord) {
  raid.player[0].damage.other.value += action.list.reduce((pre, cur) => {
    pre += cur.damage!.reduce((p, c) => {
      p += c.value
      return p
    }, 0)
    return pre
  }, 0)
}

function processDamageScenario(action: DamageScenario, raid: BattleRecord, num: number, type: 'ability' | 'other' = 'ability') {
  const hitPlayer = raid.player[num]
  if (hitPlayer) {
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
  const currentTurn = data.status.turn
  currentRaid.turn = currentTurn

  if (currentTurn !== currentRaid.actionQueue.at(-1)?.turn) {
    const guard_status = Object.values(data.status.ability)
      .reduce< { is_guard_status: number; num: number }[]>((pre, cur) => {
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
    bossInfo.value.remainderSecond = status.timer
  }

  if (summonInfo.value) {
    status.summon.recast.forEach((value, idx) => {
      summonInfo.value!.summon[idx].recast = value
    })
    summonInfo.value.supporter.recast = status.supporter.recast
  }

  const bossBuffs = scenario.filter(item => item.cmd === 'condition' && item.to === 'boss').at(-1)
  const playerBuffs = scenario.filter(item => item.cmd === 'condition' && item.to === 'player' && item.pos === 0).at(-1)
  handleConditionInfo(bossBuffs?.condition, playerBuffs?.condition)
  handleDamageStatistic('start', data)
}

function handleAttackRusult(type: string, data: AttackResultJson) {
  if (!type || !data?.scenario)
    return
  const bossGauge = data.scenario.filter(item => item.cmd === 'boss_gauge').at(-1)
  const status = data.status

  if (bossInfo.value)
    bossInfo.value.interrupt_display_text = status.special_skill_indicate?.length > 0 ? status.special_skill_indicate[0].interrupt_display_text : ''

  if (bossGauge && bossInfo.value) {
    bossInfo.value.name = bossGauge.name!.ja
    bossInfo.value.hp = bossGauge.hp!
    bossInfo.value.hpmax = bossGauge.hpmax!
    bossInfo.value.hpPercent = Number.parseFloat((Number(bossGauge.hp) / Number(bossGauge.hpmax) * 100).toFixed(2))
    bossInfo.value.timer = status.timer
    bossInfo.value.turn = status.turn
  }
  const isBossDie = data.scenario.find((item: any) => item.cmd === 'die' && item.to === 'boss')

  if (isBossDie && bossInfo.value) {
    bossInfo.value.hp = 0
    bossInfo.value.hpPercent = 0
    bossInfo.value.remainderSecond = status.timer
  }

  if (summonInfo.value) {
    status.summon.recast.forEach((value, idx) => {
      summonInfo.value!.summon[idx].recast = value
    })
    summonInfo.value.supporter.recast = status.supporter.recast
  }

  const bossBuffs = data.scenario.filter(item => item.cmd === 'condition' && item.to === 'boss').at(-1)
  const playerBuffs = data.scenario.filter(item => item.cmd === 'condition' && item.to === 'player' && item.pos === 0).at(-1)
  handleConditionInfo(bossBuffs?.condition, playerBuffs?.condition)
  handleDamageStatistic(type, data)
  handleActionQueue(type, data)
}

function getAbilityList(rawAbility: Ability) {
  const prefix = 'ico-ability'
  return Object.values(rawAbility)
    .reduce<Action[]>((pre, cur) => pre.concat(Object.values(cur.list).reduce<Action[]>((p, c) => p.concat([{
      type: 'ability',
      icon: c[0].class.split(' ')[0].substring(prefix.length),
      id: c[0]['ability-id'],
    }]), [])), [])
}

const normalAttackInfo = computed(() => {
  if (!props.resultJson?.result || props.resultJson?.type !== 'normal')
    return { hit: 0, damage: 0 }

  const attackList = props.resultJson.result.scenario.filter((item: any) => item.cmd === 'attack' && item.from === 'player')
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

const memberList = computed(() => {
  if (!props.battleStartJson?.multi_raid_member_info)
    return props.lobbyMemberList || []

  return props.battleStartJson.multi_raid_member_info.reduce<Member[]>((pre, cur) => {
    pre.push({
      nickname: cur.nickname,
      userId: cur.user_id,
      userRank: cur.level,
      jobIcon: `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/${cur.job_id}.png`,
      attributeClass: `ico-attribute ico-attribute-${cur.pc_attribute}`,
      is_dead: cur.is_dead,
    })
    return pre
  }, [])
})
</script>

<template>
  <div v-if="bossInfo && buffInfo && summonInfo" w-full fc flex-col gap-10px>
    <div w-full fc gap-2 p-2>
      <BossDashboard :boss-info="bossInfo" :raid-id="raidId" />
      <div w-full flex flex-col items-center justify-start>
        <BuffBar :buff-info="buffInfo" :boss-condition-json="bossConditionJson" />
        <Summon :summon-info="summonInfo" />
      </div>
    </div>
    <div w-full fc gap-2 p-2>
      <DBM :battle-record="battleRecord.find(record => record.raid_id === raidId)!" :result-json="resultJson" />
    </div>
    <div w-full flex items-start justify-start gap-2 p-2>
      <DamageRecord :battle-record="battleRecord.find(record => record.raid_id === raidId)!" />
      <ActionList :battle-record="battleRecord.find(record => record.raid_id === raidId)!" />
    </div>
    <el-descriptions v-if="battleStartJson && bossInfo && buffInfo" border :column="1">
      <el-descriptions-item label="平A结果">
        {{ `hit: ${normalAttackInfo.hit} 总伤害：${normalAttackInfo.damage}` }}
      </el-descriptions-item>
    </el-descriptions>

    <MemberList :data="memberList" />
  </div>
  <div v-else fc>
    <el-tag type="info" effect="dark" size="large" round>
      进入战斗时将会读取相关信息
    </el-tag>
  </div>
</template>
