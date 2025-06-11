import type { Action, BattleRecord, PartyCondition, Player } from 'myStorage'
import type { Ability, AttackResultJson, BattleStartJson, Condition, DamageScenario, GuardSettingJson, LoopDamageScenario, ResultJsonPayload, ScenarioType, SpecialScenario, SpecialSkillSetting, SummonScenario, SuperScenario, WsPayloadData } from 'source'
import { battleInfo, battleRecord, notificationSetting, uid } from '~/logic'

export function handleStartJson(data: BattleStartJson) {
  const boss = data.boss.param[0]
  const leader = data.player.param[0]
  battleInfo.value.leaderAttr = leader.attr

  const interrupt_display_text = data.status?.special_skill_indicate
    ? data.status.special_skill_indicate[0]?.interrupt_display_text
    : data.special_skill_indicate
      ? data.special_skill_indicate[0]?.interrupt_display_text
      : ''

  const addition = { unique_gauge_time_limit: data.unique_gauge_time_limit }

  battleInfo.value.bossInfo = {
    questId: data.quest_id,
    battleId: String(data.raid_id),
    shareId: data.twitter?.battle_id,
    imgId: boss.cjs.split('_').at(-1)!,
    name: boss.monster,
    hp: Number(boss.hp),
    hpmax: Number(boss.hpmax),
    hpPercent: Number.parseFloat((Number(boss.hp) / Number(boss.hpmax) * 100).toFixed(2)),
    timer: data.timer,
    turn: data.turn,
    addition,
    interrupt_display_text,
    lv: boss.Lv,
    attribute: boss.attribute,
    limitNum: Number(data.limit_number || 1),
    fellow: data.multi_raid_member_info?.length || 1,
  }

  battleInfo.value.summonInfo = {
    summon: [...data.summon],
    supporter: data.supporter,
  }

  battleInfo.value.memberInfo = data.multi_raid_member_info?.map(cur => ({
    nickname: cur.nickname,
    userId: cur.user_id,
    userRank: cur.level,
    jobIcon: getJobIcon(cur.job_id),
    attributeClass: `ico-attribute ico-attribute-${cur.pc_attribute}`,
    is_dead: cur.is_dead,
    is_host: cur.is_host,
  }))

  handleMainConditionInfo(boss.condition, leader.condition)
  recordRaidInfo(data)
  // 处理开幕特动情况start
  if (data.scenario)
    handleAttackRusultJson('start', data as AttackResultJson)
}

export function handleAttackRusultJson(type: string, data: AttackResultJson, payload?: ResultJsonPayload) {
  if (!type || !data?.scenario)
    return

  const isWin = data.scenario.some(item => item.cmd === 'win' && item.is_last_raid)
  if (isWin && notificationSetting.value.battleWin) {
    createNotification({ message: `战斗结束`, sound: 'win' })
  }

  const isLose = data.scenario.some(item => item.cmd === 'lose')
  if (isLose && notificationSetting.value.battleLose)
    createNotification({ message: `队伍全灭`, sound: 'lose' })

  const currentRaid = battleRecord.value.find(b => String(b.raid_id) === battleInfo.value.bossInfo?.battleId)

  if (!currentRaid)
    return

  const bossGauge = data.scenario.findLast(item => item.cmd === 'boss_gauge' && item.pos === 0)
  const status = data.status

  if (status?.fellow && battleInfo.value.bossInfo)
    battleInfo.value.bossInfo.fellow = Number(status?.fellow)

  if (status?.unique_gauge_time_limit && battleInfo.value.bossInfo)
    battleInfo.value.bossInfo.addition = { unique_gauge_time_limit: status.unique_gauge_time_limit }

  if (battleInfo.value.bossInfo && status?.special_skill_indicate)
    battleInfo.value.bossInfo.interrupt_display_text = status.special_skill_indicate[0]?.interrupt_display_text

  if (bossGauge && battleInfo.value.bossInfo) {
    battleInfo.value.bossInfo.name = bossGauge.name!.ja
    battleInfo.value.bossInfo.hp = bossGauge.hp!
    battleInfo.value.bossInfo.hpPercent = Number.parseFloat((Number(bossGauge.hp) / Number(battleInfo.value.bossInfo.hpmax) * 100).toFixed(2))
    battleInfo.value.bossInfo.timer = status?.timer ?? battleInfo.value.bossInfo.timer
    battleInfo.value.bossInfo.turn = status?.turn ?? battleInfo.value.bossInfo.turn
  }
  const isBossDie = data.scenario.some(item => item.cmd === 'die' && item.to === 'boss')

  if (isBossDie && battleInfo.value.bossInfo) {
    battleInfo.value.bossInfo.hp = 0
    battleInfo.value.bossInfo.hpPercent = 0
    battleInfo.value.bossInfo.timer = status?.timer ?? battleInfo.value.bossInfo.timer
  }

  if (battleInfo.value.summonInfo) {
    status?.summon.forEach((summon, idx) => {
      battleInfo.value.summonInfo!.summon[idx].recast = summon.recast
    })
    battleInfo.value.summonInfo.supporter.recast = status?.supporter?.recast ?? battleInfo.value.summonInfo.supporter.recast
  }

  const bossBuffs = data.scenario.findLast(item => item.cmd === 'condition' && item.to === 'boss' && item.pos === 0)
  const playerBuffs = data.scenario.findLast(item => item.cmd === 'condition' && item.to === 'player' && item.pos === 0)

  const partyCondition: PartyCondition[] = []
  const formation = status?.formation || currentRaid?.formation || []

  for (let i = 0; i < 6; i++) {
    const playerBuffs = data.scenario.findLast(item => item.cmd === 'condition' && item.to === 'player' && item.pos === i)
    if (playerBuffs?.condition) {
      partyCondition.push({
        pos: Number(formation[i]),
        buff: mergerCondition(playerBuffs.condition),
        coating_value: playerBuffs.condition.coating_value ?? 0,
      })
    }
  }

  handleMainConditionInfo(bossBuffs?.condition, playerBuffs?.condition)
  handlePartyConditionInfo(partyCondition)
  handleDamageStatistic(type, data)
  handleActionQueue(type, data, payload)
}

function handleNormalAttackJson(data: AttackResultJson) {
  const scenario = data.scenario
  if (!scenario)
    return

  battleInfo.value.normalAttackInfo = { hit: 0, ability: 0, special: 0, total: 0 }
  for (let index = 0; index < scenario.length; index++) {
    const action = scenario[index]

    if (action.cmd === 'attack' && action.from === 'player') {
      for (let i = 0; i < action.damage.length; i++) {
        for (let j = 0; j < action.damage[i].length; j++) {
          battleInfo.value.normalAttackInfo.hit++
          battleInfo.value.normalAttackInfo.total += Number(action.damage[i][j].value)
        }
      }
    }

    if (action.cmd === 'special' || action.cmd === 'special_npc') {
      if (!action.list)
        continue

      const _action = action as unknown as SpecialScenario
      battleInfo.value.normalAttackInfo.hit++
      for (let i = 0; i < _action.list.length || 0; i++) {
        const detail = _action.list[i]
        for (let j = 0; j < detail.damage.length; j++) {
          battleInfo.value.normalAttackInfo.total += Number(detail.damage[j].value)
          battleInfo.value.normalAttackInfo.special += Number(detail.damage[j].value)
        }
      }
    }

    if (action.cmd === 'damage' && action.to === 'boss') {
      const _action = action as unknown as DamageScenario
      for (let i = 0; i < _action.list.length || 0; i++) {
        battleInfo.value.normalAttackInfo.hit++
        battleInfo.value.normalAttackInfo.total += Number(_action.list[i].value)
        if (isAbilityDamageAction(index, scenario))
          battleInfo.value.normalAttackInfo.ability += Number(_action.list[i].value)
      }
    }

    if (action.cmd === 'loop_damage' && action.to === 'boss') {
      const _action = action as unknown as LoopDamageScenario
      for (let i = 0; i < _action.list.length; i++) {
        for (let j = 0; j < _action.list[i].length; j++) {
          battleInfo.value.normalAttackInfo.hit++
          battleInfo.value.normalAttackInfo.total += Number(_action.list[i][j].value)
          if (isAbilityDamageAction(index, scenario))
            battleInfo.value.normalAttackInfo.ability += Number(_action.list[i][j].value)
        }
      }
    }
    if (action.cmd === 'turn' && action.mode === 'boss')
      break
  }
}

function isAbilityDamageAction(idx: number, scenario: ScenarioType[]) {
  const beforeAbilityDamageCmdList = ['special', 'special_npc', 'ability']
  let flag = true
  for (let i = 1; i <= 4; i++) {
    if (scenario[idx - i]?.cmd === 'wait') {
      flag = false
      break
    }

    if (scenario[idx - i] && beforeAbilityDamageCmdList.includes(scenario[idx - i].cmd) && (scenario[idx - i].to !== 'boss'))
      break

    if (scenario[idx - i] && scenario[idx - i].cmd === 'chain_cutin') {
      flag = false
      break
    }
  }
  return flag
}

export function handleGuardSettingJson(data: GuardSettingJson) {
  const currentRaid = battleRecord.value.find(b => String(b.raid_id) === battleInfo.value.bossInfo?.battleId)
  if (!currentRaid)
    return

  Object.values(data.guard_status).forEach((item) => {
    const hit = currentRaid.actionQueue.at(-1)?.guard_status.find(i => i.num === item.target_num)
    if (hit)
      hit.is_guard_status = item.is_guard_status
  })
}

export function handleSpecialSkillSettingJson(data: SpecialSkillSetting) {
  const currentRaid = battleRecord.value.find(b => String(b.raid_id) === battleInfo.value.bossInfo?.battleId)
  if (!currentRaid)
    return

  currentRaid.special_skill_flag = data.value
  currentRaid.actionQueue.at(-1)!.special_skill_flag = data.value
}

export function handleWsPayloadJson(data: WsPayloadData) {
  if (data.bossUpdate && battleInfo.value.bossInfo) {
    battleInfo.value.bossInfo.hp = Number(data.bossUpdate.param.boss1_hp)
    battleInfo.value.bossInfo.hpPercent = Number.parseFloat((Number(battleInfo.value.bossInfo.hp) / Number(battleInfo.value.bossInfo.hpmax) * 100).toFixed(2))
    handleMainConditionInfo(data.bossUpdate.param.boss1_condition)
  }

  if (data.battleFinish && battleInfo.value.bossInfo) {
    battleInfo.value.bossInfo.hp = 0
    battleInfo.value.bossInfo.hpPercent = 0
  }

  if (data.memberJoin) {
    const member = data.memberJoin.member
    if (battleInfo.value.memberInfo?.some(m => m.userId === member.user_id))
      return
    battleInfo.value.memberInfo?.push({
      nickname: member.nickname,
      userId: member.user_id,
      userRank: String(member.level),
      jobIcon: getJobIcon(member.job_id),
      attributeClass: `ico-attribute ico-attribute-${member.pc_attribute}`,
      is_dead: false,
    })
    battleInfo.value.mvpInfo = data.memberJoin.mvpList.map(mvp => ({ userId: mvp.user_id, rank: mvp.rank, point: Number(mvp.point) }))
  }

  if (data.mvpUpdate)
    battleInfo.value.mvpInfo = data.mvpUpdate.mvpList.map(mvp => ({ userId: mvp.user_id, rank: mvp.rank, point: Number(mvp.point) }))
}

function mergerCondition(condition: Condition) {
  const buffs = condition.buff || []
  const debuffs = condition.debuff || []
  const totalPlayerBuffs = buffs.concat(debuffs).filter((item, index, self) => index === self.findIndex(t => t.status === item.status))
  return totalPlayerBuffs
}

function handlePartyConditionInfo(partyCondition: PartyCondition[]) {
  const currentRaid = battleRecord.value.find(b => String(b.raid_id) === battleInfo.value.bossInfo?.battleId)
  if (!currentRaid)
    return

  partyCondition.forEach((player) => {
    currentRaid.player[player.pos].condition = {
      buff: player.buff,
      coating_value: player.coating_value,
    }
  })
}

function handleMainConditionInfo(bossCondition?: Condition, playerCondition?: Condition) {
  if (bossCondition) {
    const bossBuffs = bossCondition.buff?.filter(item => !item.personal_buff_user_id || item.personal_buff_user_id === uid.value) || []
    const bossDebuffs = bossCondition.debuff?.filter(item => !item.personal_debuff_user_id || item.personal_debuff_user_id === uid.value) || []
    const totalBossBuffs = bossBuffs.concat(bossDebuffs).filter((item, index, self) => index === self.findIndex(t => t.status === item.status))
    battleInfo.value.buffInfo = battleInfo.value.buffInfo ? { ...battleInfo.value.buffInfo, bossBuffs: totalBossBuffs } : { bossBuffs: totalBossBuffs, playerBuffs: [] }
  }

  if (playerCondition) {
    const playerBuffs = playerCondition.buff || []
    const playerDebuffs = playerCondition.debuff || []
    const totalPlayerBuffs = playerBuffs.concat(playerDebuffs).filter((item, index, self) => index === self.findIndex(t => t.status === item.status))
    battleInfo.value.buffInfo = battleInfo.value.buffInfo ? { ...battleInfo.value.buffInfo, playerBuffs: totalPlayerBuffs } : { playerBuffs: totalPlayerBuffs, bossBuffs: [] }
  }
}

function recordRaidInfo(data: BattleStartJson) {
  const isRecorded = battleRecord.value.some(b => String(b.raid_id) === battleInfo.value.bossInfo?.battleId)

  if (isRecorded)
    return
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
      condition: {
        buff: mergerCondition(cur.condition),
        coating_value: cur.condition.coating_value ?? 0,
      },
    })
    return pre
  }, [])

  battleInfo.value.mvpInfo = []
  battleInfo.value.normalAttackInfo = { hit: 0, ability: 0, special: 0, total: 0 }
  const formation = Object.values(data.ability).map(a => a.pos)
  const guard_status = Object.values(data.ability).map(a => ({ num: a.pos, is_guard_status: 0 }))

  const actionQueue = [{
    turn: data.turn,
    bossHpPercent: battleInfo.value.bossInfo!.hpPercent,
    special_skill_flag: Number(data.special_skill_flag),
    acitonList: [],
    guard_status,
    interrupt_display_text: battleInfo.value.bossInfo!.interrupt_display_text,
  }]

  const abilityList = getAbilityList(data.ability)

  battleRecord.value.unshift({
    quest_id: data.quest_id,
    raid_id: data.raid_id,
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
    point: 0,
  })

  if (battleRecord.value.length > 30) {
    const lastIndex = battleRecord.value.findLastIndex(record => !record.reserve)
    battleRecord.value.splice(lastIndex, 1)
  }
}

function handleDamageStatistic(resultType: string, data: AttackResultJson | BattleStartJson) {
  const currentRaid = battleRecord.value.find(b => String(b.raid_id) === battleInfo.value.bossInfo?.battleId)

  if (!currentRaid)
    return

  currentRaid.endTimer = data.status?.timer ?? currentRaid.endTimer

  const beforeAbilityDamageCmdList = ['special', 'special_npc', 'ability']

  for (const [idx, action] of data.scenario!.entries()) {
    if (action.cmd === 'contribution')
      currentRaid.point! += action.amount || 0

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
        hitPlayer.damage.attack.value += Object.values(action.damage)!.reduce((pre, cur) => {
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
      if (resultType === 'summon') {
        processDamageScenario(currentRaid, action as DamageScenario, 0)
        continue
      }
      if (resultType === 'fc') {
        processDamageScenario(currentRaid, action as DamageScenario, 0, 'other')
        continue
      }

      let flag = true
      let playerIndex = -1
      for (let i = 1; i <= 4; i++) {
        const preAction = data.scenario![idx - i]

        if (!preAction)
          break
        if (preAction.cmd === 'wait')
          break
        if ((preAction.to !== 'boss') && beforeAbilityDamageCmdList.includes(preAction.cmd)) {
          processDamageScenario(currentRaid, action as DamageScenario, preAction.num)
          flag = false
          break
        }
        if (preAction.cmd === 'chain_cutin') {
          const pos0NpcNum = currentRaid.formation[0]
          processDamageScenario(currentRaid, action as DamageScenario, pos0NpcNum, 'other')
          flag = false
          break
        }
        if (preAction.cmd === 'windoweffect' && preAction.kind) {
          const pid = preAction.kind.split('_')[2]
          const hitIndex = currentRaid.player.findIndex(p => p.pid === pid)

          if (playerIndex === -1 && hitIndex !== -1) {
            playerIndex = hitIndex
          }
        }
      }
      if (flag && playerIndex !== -1) {
        processDamageScenario(currentRaid, action as DamageScenario, playerIndex)
      }
    }
    if (action.cmd === 'loop_damage' && action.to === 'boss') {
      let flag = true
      let playerIndex = -1
      for (let i = 1; i <= 4; i++) {
        const preAction = data.scenario![idx - i]

        if (!preAction)
          break
        if (preAction.cmd === 'wait')
          break
        if ((preAction.to !== 'boss') && beforeAbilityDamageCmdList.includes(preAction.cmd)) {
          processLoopDamageScenario(currentRaid, action as LoopDamageScenario, preAction.num)
          flag = false
          break
        }
        if (preAction.cmd === 'windoweffect' && preAction.kind) {
          const pid = preAction.kind.split('_')[2]
          const hitIndex = currentRaid.player.findIndex(p => p.pid === pid)

          if (playerIndex === -1 && hitIndex !== -1) {
            playerIndex = hitIndex
          }
        }
      }
      if (flag && playerIndex !== -1) {
        processLoopDamageScenario(currentRaid, action as LoopDamageScenario, playerIndex)
      }
    }
    if (action.cmd === 'summon' && action.list.length > 0)
      processSummonScenario(currentRaid, action as SummonScenario)
    if ((action.cmd === 'die' || action.cmd === 'die_back') && action.to === 'player') {
      const hitPlayer = currentRaid.player[Number(action.index)]
      if (hitPlayer)
        hitPlayer.is_dead = true
    }
    if (action.cmd === 'resurrection') {
      const hitPlayer = currentRaid.player[Number(action.index)]
      if (hitPlayer)
        hitPlayer.is_dead = false
    }
    if (action.cmd === 'resurrection_back')
      currentRaid.player[0].is_dead = false
    if (action.cmd === 'rematch')
      currentRaid.player.forEach(p => p.is_dead = false)

    // 统计承伤
    if (action.cmd === 'super' && action.target === 'player')
      processSuperScenario(currentRaid, action as SuperScenario)
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
  }
  let damage = 0
  currentRaid.player.forEach((player) => {
    player.damage.total.value = player.damage.ability.value + player.damage.attack.value + player.damage.other.value + player.damage.special.value
    player.damageTaken.total.value = player.damageTaken.super.value + player.damageTaken.attack.value + player.damageTaken.other.value
    damage += player.damage.total.value
  })
  currentRaid.damage = damage.toLocaleString()

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

function processSummonScenario(raid: BattleRecord, action: SummonScenario) {
  raid.player[0].damage.other.value += action.list.reduce((pre, cur) => {
    pre += cur.damage?.reduce((p, c) => {
      p += c.value
      return p
    }, 0) ?? 0
    return pre
  }, 0)
}

function processDamageScenario(raid: BattleRecord, action: DamageScenario, num: number, type: 'ability' | 'other' = 'ability') {
  const hitPlayer = raid.player[num]
  if (hitPlayer) {
    hitPlayer.damage[type].value += action.list.reduce((pre, cur) => {
      pre += cur.value!
      return pre
    }, 0)
  }
}

function processLoopDamageScenario(raid: BattleRecord, action: LoopDamageScenario, num: number, type: 'ability' | 'other' = 'ability') {
  const hitPlayer = raid.player[num]
  if (hitPlayer) {
    hitPlayer.damage[type].value += Object.values(action.list).reduce((pre, cur) => {
      pre += cur.reduce((p, c) => {
        p += c.value!
        return p
      }, 0)
      return pre
    }, 0)
  }
}

function processSuperScenario(raid: BattleRecord, action: SuperScenario) {
  action.list?.forEach((item) => {
    item.damage.forEach((hit) => {
      const playerNum = raid.formation[hit.pos]
      if (raid.player[playerNum])
        (raid.player[playerNum].damageTaken.super.value += hit.value)
    })
  })
}

function handleActionQueue(type: string, data: AttackResultJson, payload?: ResultJsonPayload) {
  if (!payload)
    return

  const currentRaid = battleRecord.value.find(b => String(b.raid_id) === battleInfo.value.bossInfo?.battleId)

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
      .reduce<{ is_guard_status: number, num: number }[]>((pre, cur) => {
        pre.push({
          num: cur.pos,
          is_guard_status: 0,
        })
        return pre
      }, [])

    currentRaid.actionQueue.push({
      turn: currentTurn,
      bossHpPercent: battleInfo.value.bossInfo!.hpPercent,
      special_skill_flag: currentRaid.special_skill_flag!,
      acitonList: [],
      guard_status,
      interrupt_display_text: battleInfo.value.bossInfo!.interrupt_display_text,
    })
  }

  if (type === 'ability') {
    const hit = currentRaid.abilityList?.find(ability => ability.id === payload.ability_id)
    if (!hit)
      return

    currentRaid.player[Number(payload.ability_character_num)].use_ability_count++

    currentRaid.actionQueue.at(-1)?.acitonList.push({
      ...hit,
      icon: hit.subAbility ? hit.subAbility.find(a => a.index === String(payload.ability_sub_param[0]))?.icon : hit.icon,
      id: hit.subAbility ? hit.subAbility.find(a => a.index === String(payload.ability_sub_param[0]))?.id : hit.id,
      isSub: !!hit.subAbility,
      aim_num: payload.ability_aim_num
        ? currentRaid.player[Number(payload.ability_aim_num)].pid
        : '',
      aim_is_npc: payload.ability_aim_num
        ? currentRaid.player[Number(payload.ability_aim_num)].is_npc
        : false,
    })
  }

  if (type === 'fc') {
    currentRaid.actionQueue.at(-1)?.acitonList.push({
      type: 'fc',
      id: battleInfo.value.leaderAttr,
      icon: battleInfo.value.leaderAttr,
    })
  }

  if (type === 'summon') {
    const summon_id = payload.summon_id

    if (summon_id === 'supporter') {
      currentRaid.actionQueue.at(-1)?.acitonList.push({
        type: 'summon',
        id: battleInfo.value.summonInfo?.supporter.id,
        icon: battleInfo.value.summonInfo?.supporter.image_id,
      })
    }
    else {
      currentRaid.actionQueue.at(-1)?.acitonList.push({
        type: 'summon',
        id: battleInfo.value.summonInfo?.summon[Number(summon_id) - 1].id,
        icon: battleInfo.value.summonInfo?.summon[Number(summon_id) - 1].image_id,
      })
    }
  }

  if (type === 'temporary') {
    currentRaid.actionQueue.at(-1)?.acitonList.push({
      type: 'temporary',
      icon: payload.character_num ? '1' : '2',
      id: payload.character_num ? '1' : '2',
      aim_num: payload.character_num
        ? currentRaid.player[Number(payload.character_num)].pid
        : '',
      aim_is_npc: payload.character_num
        ? currentRaid.player[Number(payload.character_num)].is_npc
        : false,
    })
  }

  if (type === 'recovery')
    currentRaid.actionQueue.at(-1)?.acitonList.push({ type: 'recovery', icon: 'recovery', id: 'recovery' })

  if (type === 'normal') {
    handleNormalAttackJson(data)
    const index = dieIndex !== -1 ? -1 : -2
    if (currentRaid.actionQueue.at(index)) {
      currentRaid.actionQueue.at(index)!.acitonList.push({ icon: 'attack', id: 'attack', type: 'attack' })
      currentRaid.actionQueue.at(index)!.normalAttackInfo = { ...battleInfo.value.normalAttackInfo! }
    }
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
