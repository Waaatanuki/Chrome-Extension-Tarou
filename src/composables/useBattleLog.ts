import type { BossInfo, BuffInfo, MemberInfo, SummonInfo } from 'battleLog'
import type { Action, PartyCondition, Player } from 'myStorage'
import type { Ability, AttackResultJson, BattleStartJson, Condition, DamageScenario, GuardSettingJson, LoopDamageScenario, ResultJsonPayload, ScenarioType, SpecialScenario, SpecialSkillSetting, SummonScenario, SuperScenario, WsPayloadData } from 'source'
import { defineStore } from 'pinia'
import { battleRecord, notificationSetting, uid } from '~/logic'

export const useBattleLogStore = defineStore('battleLog', () => {
  const inLobby = ref(false)
  const bossInfo = ref<BossInfo>()
  const summonInfo = ref<SummonInfo>()
  const buffInfo = ref<BuffInfo>({ bossBuffs: [], playerBuffs: [] })
  const lobbyMemberList = ref<MemberInfo[]>()
  const memberInfo = ref<MemberInfo[]>()
  const raidId = ref<number>()
  const leaderAttr = ref('')
  const mvpInfo = ref<{ userId: string, rank: number, point: number }[]>()
  const battleRecordLimit = 30
  const resultJsonPayload = ref<ResultJsonPayload>()
  const normalAttackInfo = ref({ hit: 0, ability: 0, special: 0, total: 0 })

  const currentRaid = computed(() => battleRecord.value.find(b => b.raid_id === raidId.value))

  function handleStartJson(data: BattleStartJson) {
    raidId.value = data.raid_id
    const boss = data.boss.param[0]
    const leader = data.player.param[0]
    leaderAttr.value = leader.attr

    const interrupt_display_text = data.status?.special_skill_indicate
      ? data.status.special_skill_indicate[0]?.interrupt_display_text
      : data.special_skill_indicate
        ? data.special_skill_indicate[0]?.interrupt_display_text
        : ''

    const addition = { unique_gauge_time_limit: data.unique_gauge_time_limit }

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
      interrupt_display_text,
    }

    summonInfo.value = {
      summon: [...data.summon],
      supporter: data.supporter,
    }

    memberInfo.value = data.multi_raid_member_info?.map(cur => ({
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

  function handleAttackRusultJson(type: string, data: AttackResultJson) {
    if (!type || !data?.scenario)
      return
    const bossGauge = data.scenario.findLast(item => item.cmd === 'boss_gauge' && item.pos === 0)
    const status = data.status

    if (status?.unique_gauge_time_limit && bossInfo.value)
      bossInfo.value.addition = { unique_gauge_time_limit: status.unique_gauge_time_limit }

    if (bossInfo.value && status?.special_skill_indicate)
      bossInfo.value.interrupt_display_text = status.special_skill_indicate[0]?.interrupt_display_text

    if (bossGauge && bossInfo.value) {
      bossInfo.value.name = bossGauge.name!.ja
      bossInfo.value.hp = bossGauge.hp!
      bossInfo.value.hpPercent = Number.parseFloat((Number(bossGauge.hp) / Number(bossInfo.value.hpmax) * 100).toFixed(2))
      bossInfo.value.timer = status?.timer ?? bossInfo.value.timer
      bossInfo.value.turn = status?.turn ?? bossInfo.value.turn
    }
    const isBossDie = data.scenario.some(item => item.cmd === 'die' && item.to === 'boss')

    if (isBossDie && bossInfo.value) {
      bossInfo.value.hp = 0
      bossInfo.value.hpPercent = 0
    }

    const isWin = data.scenario.some(item => item.cmd === 'win' && item.is_last_raid)
    if (isWin && notificationSetting.value.battleWin)
      createNotification('战斗结束')

    const isLose = data.scenario.some(item => item.cmd === 'lose')
    if (isLose && notificationSetting.value.battleLose)
      createNotification('队伍全灭')

    if (summonInfo.value) {
      status?.summon.forEach((summon, idx) => {
        summonInfo.value!.summon[idx].recast = summon.recast
      })
      summonInfo.value.supporter.recast = status?.supporter?.recast ?? summonInfo.value.supporter.recast
    }

    const bossBuffs = data.scenario.findLast(item => item.cmd === 'condition' && item.to === 'boss' && item.pos === 0)
    const playerBuffs = data.scenario.findLast(item => item.cmd === 'condition' && item.to === 'player' && item.pos === 0)

    const partyCondition: PartyCondition[] = []
    const formation = status?.formation || currentRaid.value?.formation || []

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
    handleActionQueue(type, data)
  }

  function handleNormalAttackJson(data: AttackResultJson) {
    const scenario = data.scenario
    if (!scenario)
      return

    normalAttackInfo.value = { hit: 0, ability: 0, special: 0, total: 0 }
    for (let index = 0; index < scenario.length; index++) {
      const action = scenario[index]

      if (action.cmd === 'attack' && action.from === 'player') {
        for (let i = 0; i < action.damage.length; i++) {
          for (let j = 0; j < action.damage[i].length; j++) {
            normalAttackInfo.value.hit++
            normalAttackInfo.value.total += Number(action.damage[i][j].value)
          }
        }
      }

      if (action.cmd === 'special' || action.cmd === 'special_npc') {
        if (!action.list)
          continue

        const _action = action as unknown as SpecialScenario
        normalAttackInfo.value.hit++
        for (let i = 0; i < _action.list.length || 0; i++) {
          const detail = _action.list[i]
          for (let j = 0; j < detail.damage.length; j++) {
            normalAttackInfo.value.total += Number(detail.damage[j].value)
            normalAttackInfo.value.special += Number(detail.damage[j].value)
          }
        }
      }

      if (action.cmd === 'damage' && action.to === 'boss') {
        const _action = action as unknown as DamageScenario
        for (let i = 0; i < _action.list.length || 0; i++) {
          normalAttackInfo.value.hit++
          normalAttackInfo.value.total += Number(_action.list[i].value)
          if (isAbilityDamageAction(index, scenario))
            normalAttackInfo.value.ability += Number(_action.list[i].value)
        }
      }

      if (action.cmd === 'loop_damage' && action.to === 'boss') {
        const _action = action as unknown as LoopDamageScenario
        for (let i = 0; i < _action.list.length; i++) {
          for (let j = 0; j < _action.list[i].length; j++) {
            normalAttackInfo.value.hit++
            normalAttackInfo.value.total += Number(_action.list[i][j].value)
            if (isAbilityDamageAction(index, scenario))
              normalAttackInfo.value.ability += Number(_action.list[i][j].value)
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

  function handleGuardSettingJson(data: GuardSettingJson) {
    if (!currentRaid.value)
      return

    Object.values(data.guard_status).forEach((item) => {
      const hit = currentRaid.value?.actionQueue.at(-1)?.guard_status.find(i => i.num === item.target_num)
      if (hit)
        hit.is_guard_status = item.is_guard_status
    })
  }

  function handleSpecialSkillSettingJson(data: SpecialSkillSetting) {
    if (!currentRaid.value)
      return

    currentRaid.value.special_skill_flag = data.value
    currentRaid.value.actionQueue.at(-1)!.special_skill_flag = data.value
  }

  function handleWsPayloadJson(data: WsPayloadData) {
    if (data.bossUpdate && bossInfo.value) {
      bossInfo.value.hp = Number(data.bossUpdate.param.boss1_hp)
      bossInfo.value.hpPercent = Number.parseFloat((Number(bossInfo.value.hp) / Number(bossInfo.value.hpmax) * 100).toFixed(2))
      handleMainConditionInfo(data.bossUpdate.param.boss1_condition)
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
        jobIcon: getJobIcon(member.job_id),
        attributeClass: `ico-attribute ico-attribute-${member.pc_attribute}`,
        is_dead: false,
      })
      mvpInfo.value = data.memberJoin.mvpList.map(mvp => ({ userId: mvp.user_id, rank: mvp.rank, point: Number(mvp.point) }))
    }

    if (data.mvpUpdate)
      mvpInfo.value = data.mvpUpdate.mvpList.map(mvp => ({ userId: mvp.user_id, rank: mvp.rank, point: Number(mvp.point) }))
  }

  function mergerCondition(condition: Condition) {
    const buffs = condition.buff || []
    const debuffs = condition.debuff || []
    const totalPlayerBuffs = buffs.concat(debuffs).filter((item, index, self) => index === self.findIndex(t => t.status === item.status))
    return totalPlayerBuffs
  }

  function handlePartyConditionInfo(partyCondition: PartyCondition[]) {
    if (!currentRaid.value)
      return

    partyCondition.forEach((player) => {
      currentRaid.value!.player[player.pos].condition = {
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
    if (currentRaid.value)
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

    mvpInfo.value = []
    normalAttackInfo.value = { hit: 0, ability: 0, special: 0, total: 0 }
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

    if (battleRecord.value.length > battleRecordLimit) {
      const lastIndex = battleRecord.value.findLastIndex(record => !record.reserve)
      battleRecord.value.splice(lastIndex, 1)
    }
  }

  function handleDamageStatistic(resultType: string, data: AttackResultJson | BattleStartJson) {
    if (!currentRaid.value)
      return

    currentRaid.value.endTimer = data.status?.timer ?? currentRaid.value.endTimer

    const beforeAbilityDamageCmdList = ['special', 'special_npc', 'ability']

    data.scenario!.forEach((action, idx, array) => {
      if (action.cmd === 'contribution')
        currentRaid.value!.point! += action.amount || 0

      if (action.cmd === 'special' || action.cmd === 'special_npc') {
        const hitPlayer = currentRaid.value!.player[action.num]
        if (hitPlayer) {
          hitPlayer.use_special_skill_count++
          processSpecialScenario(action as SpecialScenario, hitPlayer)
        }
      }
      if (action.cmd === 'attack' && action.from === 'player') {
        const hitPlayer = currentRaid.value!.player[action.num]
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
        if (resultType === 'summon')
          processDamageScenario(action as DamageScenario, 0)

        let flag = true
        for (let i = 1; i <= 4; i++) {
          const preAction = array[idx - i]

          if (!preAction)
            break
          if (preAction.cmd === 'wait')
            break
          if ((preAction.to !== 'boss') && beforeAbilityDamageCmdList.includes(preAction.cmd)) {
            processDamageScenario(action as DamageScenario, preAction.num)
            flag = false
            break
          }
          if (preAction.cmd === 'chain_cutin') {
            const pos0NpcNum = currentRaid.value!.formation[0]
            processDamageScenario(action as DamageScenario, pos0NpcNum, 'other')
            flag = false
            break
          }
        }
        if (flag) {
          for (let i = 1; i <= 4; i++) {
            const preAction = array[idx - i]

            if (!preAction)
              break
            if (preAction.cmd === 'wait')
              break
            if (preAction.cmd === 'windoweffect' && preAction.kind) {
              const pid = preAction.kind.split('_')[2]
              const hitIndex = currentRaid.value!.player.findIndex(p => p.pid === pid)

              if (hitIndex !== -1) {
                processDamageScenario(action as DamageScenario, hitIndex)
                break
              }
            }
          }
        }
      }
      if (action.cmd === 'loop_damage' && action.to === 'boss') {
        let flag = true
        for (let i = 1; i <= 4; i++) {
          const preAction = array[idx - i]

          if (!preAction)
            break
          if (preAction.cmd === 'wait')
            break
          if ((preAction.to !== 'boss') && beforeAbilityDamageCmdList.includes(preAction.cmd)) {
            processLoopDamageScenario(action as LoopDamageScenario, preAction.num)
            flag = false
            break
          }
        }
        if (flag) {
          for (let i = 1; i <= 4; i++) {
            const preAction = array[idx - i]

            if (!preAction)
              break
            if (preAction.cmd === 'wait')
              break
            if (preAction.cmd === 'windoweffect' && preAction.kind) {
              const pid = preAction.kind.split('_')[2]
              const hitIndex = currentRaid.value!.player.findIndex(p => p.pid === pid)

              if (hitIndex !== -1) {
                processLoopDamageScenario(action as LoopDamageScenario, hitIndex)
                break
              }
            }
          }
        }
      }
      if (action.cmd === 'summon' && action.list.length > 0)
        processSummonScenario(action as SummonScenario)
      if ((action.cmd === 'die' || action.cmd === 'die_back') && action.to === 'player') {
        const hitPlayer = currentRaid.value!.player[Number(action.index)]
        if (hitPlayer)
          hitPlayer.is_dead = true
      }
      if (action.cmd === 'resurrection') {
        const hitPlayer = currentRaid.value!.player[Number(action.index)]
        if (hitPlayer)
          hitPlayer.is_dead = false
      }
      if (action.cmd === 'rematch')
        currentRaid.value!.player.forEach(p => p.is_dead = false)

      // 统计承伤
      if (action.cmd === 'super' && action.target === 'player')
        processSuperScenario(action as SuperScenario)
      if (action.cmd === 'attack' && action.from === 'boss') {
        Object.values(action.damage).forEach((item) => {
          item.forEach((hit) => {
            const playerNum = currentRaid.value!.formation[hit.pos]
            currentRaid.value!.player[playerNum].damageTaken.attack.value += hit.value
          })
        },
        )
      }
      if (action.cmd === 'damage' && action.to === 'player') {
        action.list.forEach((_hit) => {
          const hit: { pos: number, value: number } = _hit as any
          const playerNum = currentRaid.value!.formation[hit.pos]
          currentRaid.value!.player[playerNum].damageTaken.other.value += hit.value
        })
      }
    })
    let damage = 0
    currentRaid.value.player.forEach((player) => {
      player.damage.total.value = player.damage.ability.value + player.damage.attack.value + player.damage.other.value + player.damage.special.value
      player.damageTaken.total.value = player.damageTaken.super.value + player.damageTaken.attack.value + player.damageTaken.other.value
      damage += player.damage.total.value
    })
    currentRaid.value.damage = damage.toLocaleString()

    // 更新前排角色位置信息
    if (data.status?.formation)
      currentRaid.value.formation = data.status.formation.map(num => Number(num))
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

  function processSummonScenario(action: SummonScenario) {
    currentRaid.value!.player[0].damage.other.value += action.list.reduce((pre, cur) => {
      pre += cur.damage?.reduce((p, c) => {
        p += c.value
        return p
      }, 0) ?? 0
      return pre
    }, 0)
  }

  function processDamageScenario(action: DamageScenario, num: number, type: 'ability' | 'other' = 'ability') {
    const hitPlayer = currentRaid.value!.player[num]
    if (hitPlayer) {
      if (resultJsonPayload.value?.type === 'fc')
        type = 'other'
      hitPlayer.damage[type].value += action.list.reduce((pre, cur) => {
        pre += cur.value!
        return pre
      }, 0)
    }
  }

  function processLoopDamageScenario(action: LoopDamageScenario, num: number, type: 'ability' | 'other' = 'ability') {
    const hitPlayer = currentRaid.value!.player[num]
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

  function processSuperScenario(action: SuperScenario) {
    action.list?.forEach((item) => {
      item.damage.forEach((hit) => {
        const playerNum = currentRaid.value!.formation[hit.pos]
        if (currentRaid.value!.player[playerNum])
          (currentRaid.value!.player[playerNum].damageTaken.super.value += hit.value)
      })
    })
  }

  function handleActionQueue(type: string, data: AttackResultJson) {
    if (!resultJsonPayload.value)
      return

    if (!currentRaid.value)
      return

    const dieIndex = data.scenario.findIndex(action => action.cmd === 'die' && action.to === 'boss')

    if (dieIndex !== -1) {
      currentRaid.value.endTimestamp = Date.now()
      if (dieIndex === 0)
        return
    }

    if (!data.status)
      return

    const currentTurn = data.status.turn
    currentRaid.value.turn = currentTurn

    if (currentTurn !== currentRaid.value.actionQueue.at(-1)?.turn) {
      const guard_status = Object.values(data.status.ability)
        .reduce< { is_guard_status: number, num: number }[]>((pre, cur) => {
          pre.push({
            num: cur.pos,
            is_guard_status: 0,
          })
          return pre
        }, [])

      currentRaid.value.actionQueue.push({
        turn: currentTurn,
        bossHpPercent: bossInfo.value!.hpPercent,
        special_skill_flag: currentRaid.value.special_skill_flag!,
        acitonList: [],
        guard_status,
      })
    }

    if (type === 'ability') {
      const hit = currentRaid.value.abilityList?.find(ability => ability.id === resultJsonPayload.value?.ability_id)
      if (!hit)
        return

      currentRaid.value.player[Number(resultJsonPayload.value.ability_character_num)].use_ability_count++

      currentRaid.value.actionQueue.at(-1)?.acitonList.push({
        ...hit,
        icon: hit.subAbility ? hit.subAbility.find(a => a.index === String(resultJsonPayload.value?.ability_sub_param[0]))?.icon : hit.icon,
        id: hit.subAbility ? hit.subAbility.find(a => a.index === String(resultJsonPayload.value?.ability_sub_param[0]))?.id : hit.id,
        isSub: !!hit.subAbility,
        aim_num: resultJsonPayload.value.ability_aim_num
          ? currentRaid.value.player[Number(resultJsonPayload.value.ability_aim_num)].pid
          : '',
        aim_is_npc: resultJsonPayload.value.ability_aim_num
          ? currentRaid.value.player[Number(resultJsonPayload.value.ability_aim_num)].is_npc
          : false,
      })
    }

    if (type === 'fc') {
      currentRaid.value.actionQueue.at(-1)?.acitonList.push({
        type: 'fc',
        id: leaderAttr.value,
        icon: leaderAttr.value,
      })
    }

    if (type === 'summon') {
      const summon_id = resultJsonPayload.value.summon_id

      if (summon_id === 'supporter') {
        currentRaid.value.actionQueue.at(-1)?.acitonList.push({
          type: 'summon',
          id: summonInfo.value?.supporter.id,
          icon: summonInfo.value?.supporter.image_id,
        })
      }
      else {
        currentRaid.value.actionQueue.at(-1)?.acitonList.push({
          type: 'summon',
          id: summonInfo.value?.summon[Number(summon_id) - 1].id,
          icon: summonInfo.value?.summon[Number(summon_id) - 1].image_id,
        })
      }
    }

    if (type === 'temporary') {
      currentRaid.value.actionQueue.at(-1)?.acitonList.push({
        type: 'temporary',
        icon: resultJsonPayload.value.character_num ? '1' : '2',
        id: resultJsonPayload.value.character_num ? '1' : '2',
        aim_num: resultJsonPayload.value.character_num
          ? currentRaid.value.player[Number(resultJsonPayload.value.character_num)].pid
          : '',
        aim_is_npc: resultJsonPayload.value.character_num
          ? currentRaid.value.player[Number(resultJsonPayload.value.character_num)].is_npc
          : false,
      })
    }

    if (type === 'recovery')
      currentRaid.value.actionQueue.at(-1)?.acitonList.push({ type: 'recovery', icon: 'recovery', id: 'recovery' })

    if (type === 'normal') {
      const index = dieIndex !== -1 ? -1 : -2
      currentRaid.value.actionQueue.at(index)?.acitonList.push({ icon: 'attack', id: 'attack', type: 'attack' })
    }

    // 更新技能列表
    const currentAbilityList = getAbilityList(data.status.ability)
    currentAbilityList.forEach((abi) => {
      const hit = currentRaid.value!.abilityList.find(a => a.id === abi.id)
      if (hit)
        hit.icon = abi.icon
      else
        currentRaid.value!.abilityList.push({ ...abi })
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

  return {
    inLobby,
    raidId,
    bossInfo,
    summonInfo,
    buffInfo,
    normalAttackInfo,
    resultJsonPayload,
    lobbyMemberList,
    memberInfo,
    mvpInfo,
    battleRecordLimit,
    currentRaid,
    handleStartJson,
    handleAttackRusultJson,
    handleNormalAttackJson,
    handleGuardSettingJson,
    handleSpecialSkillSettingJson,
    handleWsPayloadJson,
  }
})
