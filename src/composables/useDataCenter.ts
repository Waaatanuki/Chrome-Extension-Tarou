import type { AdventAdditional, DisplayItem, EventInfo, GachaNpc, Mission, Player, SampoParam, TeamforceAdditional, TeamraidAdditional } from 'extension'
import type { BuildLeaderAbility, BuildNpc } from 'party'
import type { BattleStartJson, GachaRatioAppear, GachaRatioAppearItem, GachaResult } from 'source'
import { load } from 'cheerio'
import dayjs from 'dayjs'
import { sendBossInfo } from '~/api'
import { getEventGachaBoxNum } from '~/constants/event'
import { artifactList, battleInfo, battleMemo, battleRecord, buildQuestId, dailyCost, displayList, eventList, gachaInfo, gachaRecord, jobAbilityList, localNpcList, notificationSetting, obTabId, recoveryItemList, sampoInfo, sampoSetup, skipQuest, userInfo } from '~/logic'

const MaxMemoLength = 50

export async function unpack(parcel: string) {
  if (typeof parcel !== 'string')
    return

  const { url, requestData, responseData } = JSON.parse(parcel) as { url: string, requestData?: string, responseData?: any }

  // console.log({ url, requestData, responseData })

  // Dashboard 处理活动信息展示
  processEventData(url, responseData)

  // Dashboard 每日消耗-获取自发副本AP信息
  if (url.includes('/quest/quest_data')) {
    initDailyCost()
    const payload = JSON.parse(requestData!)
    const questId = String(payload.quest_id)
    let questInfo = dailyCost.value.quest?.find(q => q.questId === questId)
    if (!questInfo) {
      questInfo = { questId, ap: 0, bossImgId: '', bossName: '', count: 0 }
      dailyCost.value.quest?.push(questInfo)
    }
    questInfo.ap = Number(responseData.action_point)
  }

  // Dashboard 每日消耗-获取沙盒自发副本APP信息
  if (url.includes('/rest/replicard/user_aap_recovery_info')) {
    initDailyCost()
    const payload = JSON.parse(requestData!)
    const questId = String(payload.quest_id)
    let questInfo = dailyCost.value.quest?.find(q => q.questId === questId)
    if (!questInfo) {
      questInfo = { questId, ap: 0, isReplicard: true, bossImgId: '', bossName: '', count: 0 }
      dailyCost.value.quest?.push(questInfo)
    }
    questInfo.ap = Number(responseData.consume_aap)
  }

  // Dashboard 每日消耗-进入自发副本
  if (url.includes('/quest/create_quest')) {
    initDailyCost()
    const payload = JSON.parse(requestData!)
    dailyCost.value.raidIds?.push(Number(responseData.raid_id))
    const questInfo = dailyCost.value.quest?.find(q => q.questId === String(payload.quest_id))
    if (questInfo) {
      if (questInfo.isReplicard)
        dailyCost.value.aap! += questInfo.ap || 0
      else
        dailyCost.value.ap! += questInfo.ap || 0
    }
    getDisplayList(responseData)
  }

  // Dashboard 每日消耗-记录扫荡副本
  if (url.includes('/rest/quest/questskip/skip')) {
    initDailyCost()
    const payload = JSON.parse(requestData!)
    const questInfo = dailyCost.value.quest?.find(q => q.questId === String(payload.quest_id))
    if (questInfo)
      dailyCost.value.ap! += questInfo.ap || 0

    const skipQuestInfo = skipQuest.value.list.find(q => q.questId === String(payload.quest_id))
    if (skipQuestInfo)
      skipQuestInfo.limitedCount--
  }

  // Dashboard 每日消耗-进入他人创建的副本
  if (url.includes('/quest/raid_deck_data_create')) {
    initDailyCost()
    const payload = JSON.parse(requestData!)
    dailyCost.value.bp! += Number(payload.select_bp)
    dailyCost.value.raidIds!.push(Number(payload.raid_id))
  }

  // Dashboard 首页数据
  if (url.includes('/user/content/index')) {
    const urlObj = new URL(url)
    userInfo.value.uid = urlObj.searchParams.get('uid')!
    const mbp_limit_info = responseData.option?.mbp_limit_info

    if (!mbp_limit_info)
      return

    userInfo.value.mbp = {
      daily: {
        number: Number(mbp_limit_info[92001].limit_info[10100].data.daily.get_number),
        limit: Number(mbp_limit_info[92001].limit_info[10100].data.daily.get_limit),
      },
      weekly: {
        number: Number(mbp_limit_info[92001].limit_info[10100].data.weekly.get_number),
        limit: Number(mbp_limit_info[92001].limit_info[10100].data.weekly.get_limit),
      },
      bonus: {
        r: {
          number: Number(mbp_limit_info[92001].limit_info[20100].data.weekly.get_number),
          limit: Number(mbp_limit_info[92001].limit_info[20100].data.weekly.get_limit),
        },
        sr: {
          number: Number(mbp_limit_info[92001].limit_info[20200].data.weekly.get_number),
          limit: Number(mbp_limit_info[92001].limit_info[20200].data.weekly.get_limit),
        },
      },
      total: {
        number: Number(mbp_limit_info[92001].article.number),
        limit: Number(mbp_limit_info[92001].article.limit),
      },
    }

    userInfo.value.hmbp = {
      weekly: {
        number: Number(mbp_limit_info[92002].limit_info[10100].data.weekly.get_number),
        limit: Number(mbp_limit_info[92002].limit_info[10100].data.weekly.get_limit),
      },
      bonus: {
        crew: {
          number: Number(mbp_limit_info[92002].limit_info[20300].data.weekly.get_number),
          limit: Number(mbp_limit_info[92002].limit_info[20300].data.weekly.get_limit),
        },
      },
      total: {
        number: Number(mbp_limit_info[92002].article.number),
        limit: Number(mbp_limit_info[92002].article.limit),
      },
    }

    getDisplayList(responseData)
  }

  // Dashboard 监视底部物品栏
  if (url.includes('/item/add_display_select_item')) {
    getDisplayList(responseData)
  }

  // Dashboard 监视底部物品栏
  if (url.includes('/item/remove_display_select_item')) {
    getDisplayList(responseData)
  }

  // Dashboard 抽卡数据
  if (url.includes('game.granbluefantasy.jp/gacha/list')) {
    userInfo.value.stone = Number(responseData.stone_num)

    // 十连ticket id为 20010
    userInfo.value.legendticket10 = Number(
      responseData.legend.lineup
        .find((item: any) => item.text_btn_image === 'text_legend10')
        .legend_gacha_ticket_list.find((ticket: any) => Number(ticket.ticket_id) === 20010).ticket_num,
    )
    // 单抽ticket id为 20011
    userInfo.value.legendticket = Number(
      responseData.legend.lineup
        .find((item: any) => item.text_btn_image === 'text_legend')
        .legend_gacha_ticket_list.find((ticket: any) => Number(ticket.ticket_id) === 20011).ticket_num,
    )

    const hitLineup = responseData.legend.lineup.find((l: any) => l.class_name === 'prt-title-legend10')
    if (hitLineup) {
      gachaInfo.value.id = hitLineup.id
      gachaInfo.value.randomKey = responseData.legend.random_key
      gachaInfo.value.serviceStart = hitLineup.service_start
      gachaInfo.value.serviceEnd = hitLineup.service_end
    }
  }

  // Dashboard 探险队
  if (url.includes('/vyrnsampo/content/area_index')) {
    const progressSampoInfo = responseData.option.progress_sampo_info

    if (Object.keys(progressSampoInfo).length === 0)
      return

    const endStamina = Math.min(
      progressSampoInfo.captain_info.max_stamina,
      progressSampoInfo.captain_info.current_stamina + Math.floor(progressSampoInfo.remain_time / (60 * 10)),
    )

    sampoInfo.value = {
      areaName: `${progressSampoInfo.area_name} 线路${progressSampoInfo.route_id}`,
      remainTime: Date.now() + progressSampoInfo.remain_time * 1000,
      recoveryRemainTime: Date.now() + progressSampoInfo.captain_info.recovery_remain_time * 1000,
      currentStamina: progressSampoInfo.captain_info.current_stamina,
      endStamina,
      maxStamina: progressSampoInfo.captain_info.max_stamina,
      isFinished: progressSampoInfo.is_finished,
      level: progressSampoInfo.captain_info.adventure_level,
    }
  }

  // Dashboard 探险队队员信息
  if (url.includes('/rest/vyrnsampo/crew_list')) {
    if (!responseData || responseData.length === 0)
      return

    const crewMap = {
      1: 'observation',
      2: 'endurance',
      3: 'charm',
      4: 'power',
    } as Record<number, keyof SampoParam>

    sampoSetup.value.crew = responseData.map((item: any) => ({
      id: item.crew_id,
      lv: item.friendship_level,
      [crewMap[item.crew_id]]: Number(item.skill[0].comment.match(/\d+/)?.[0] || '0'),
    }))
  }

  // Dashboard 探险队地图信息
  if (url.includes('/vyrnsampo/content/area/')) {
    const teamInfo = responseData.option.team_info
    const areaInfo = responseData.option.area_info

    if (!teamInfo || Object.keys(teamInfo).length === 0 || !areaInfo || Object.keys(areaInfo).length === 0)
      return

    sampoInfo.value.recoveryRemainTime = Date.now() + teamInfo.captain_info.recovery_remain_time * 1000
    sampoInfo.value.currentStamina = teamInfo.captain_info.current_stamina
    sampoInfo.value.maxStamina = teamInfo.captain_info.max_stamina
    sampoInfo.value.level = teamInfo.captain_info.adventure_level

    sampoSetup.value.captain = {
      id: teamInfo.captain_info.captain_id,
      lv: teamInfo.captain_info.adventure_level,
      power: Number(teamInfo.captain_info.power),
      endurance: Number(teamInfo.captain_info.endurance),
      observation: Number(teamInfo.captain_info.observation),
      charm: Number(teamInfo.captain_info.charm),
      luck: Number(teamInfo.captain_info.luck),
    }

    const isEmpty = Object.values(teamInfo.cosmetic_info_list).every((item: any) => Object.keys(item).length === 0)
      && Object.values(teamInfo.crew_info_list).every((item: any) => Object.keys(item).length === 0)

    sampoSetup.value.area = sampoSetup.value.area || []
    sampoSetup.value.currentAreaId = Number(areaInfo.area_id)
    let hitArea = sampoSetup.value.area.find(a => a.id === Number(areaInfo.area_id))

    if (!hitArea) {
      hitArea = {
        id: Number(areaInfo.area_id),
        isEmpty,
        power: Number(areaInfo.recommend_power),
        endurance: Number(areaInfo.recommend_endurance),
        observation: Number(areaInfo.recommend_observation),
        charm: Number(areaInfo.recommend_charm),
        luck: Number(areaInfo.recommend_luck),
        equip: [],
      }
      sampoSetup.value.area.push(hitArea)
    }
    hitArea.isEmpty = isEmpty
    hitArea.power = Number(areaInfo.recommend_power)
    hitArea.endurance = Number(areaInfo.recommend_endurance)
    hitArea.observation = Number(areaInfo.recommend_observation)
    hitArea.charm = Number(areaInfo.recommend_charm)
    hitArea.luck = Number(areaInfo.recommend_luck)
  }

  // Dashboard 探险队装备信息
  if (url.includes('/rest/vyrnsampo/equip_cosmetic_list')) {
    const setting = JSON.parse(requestData!)
    const areaId = Number(setting.area_id)

    if (sampoSetup.value.currentAreaId !== areaId)
      return

    const hitArea = sampoSetup.value.area?.find(p => p.id === areaId)

    if (!hitArea || !hitArea.isEmpty)
      return

    const list = responseData.list

    if (!list || list.length === 0 || !sampoSetup.value.captain)
      return

    for (const item of list) {
      let hit = hitArea.equip.find(p => p.id === item.cosmetic_id)
      if (!hit) {
        hit = {
          id: item.cosmetic_id,
          slot: Number(item.slot),
          power: 0,
          endurance: 0,
          observation: 0,
          charm: 0,
          luck: 0,
        }
        hitArea.equip.push(hit)
      }
      hit.power = item.after_parameter.power - sampoSetup.value.captain.power
      hit.endurance = item.after_parameter.endurance - sampoSetup.value.captain.endurance
      hit.observation = item.after_parameter.observation - sampoSetup.value.captain.observation
      hit.charm = item.after_parameter.charm - sampoSetup.value.captain.charm
      hit.luck = item.after_parameter.luck - sampoSetup.value.captain.luck

      Object.keys(hit).forEach((key) => {
        if (hit[key as keyof SampoParam] === 0) {
          delete hit[key as keyof SampoParam]
        }
      })
    }
  }

  // Gacha 卡池数据
  if (url.includes('/gacha/provision_ratio/legend/')) {
    const regex = /\/gacha\/provision_ratio\/legend\/(\d+)\/(\d+)/
    const match = url.match(regex)

    if (!match || match[1] !== gachaInfo.value.id)
      return

    const cardType = ['weapon', 'weapon', 'summon']
    const rarityType = ['', '', 'r', 'sr', 'ssr']
    const data = responseData.appear as GachaRatioAppear[]

    const createGachaNpc = (item: GachaRatioAppear, obj: GachaRatioAppearItem): GachaNpc => ({
      id: obj.reward_id,
      rate: Number.parseFloat(obj.drop_rate) * 1000 / 100000,
      cat: cardType[item.category],
      type: rarityType[item.rarity],
      incidence: !!obj.incidence,
    })

    const ratioType = match[2] as '1' | '2'
    gachaInfo.value[`ratio${ratioType}`] = {
      id: match[1],
      updateTime: Date.now(),
      appear: data.flatMap(item => item.item.map(obj => createGachaNpc(item, obj)) || []),
    }
  }

  // Gacha 卡池角色数据
  if (url.includes('/gacha/content/release/legend/')) {
    const regex = /\/gacha\/content\/release\/legend\/(\d+)/
    const match = url.match(regex)
    if (!match)
      return

    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)

    const ids: string[] = []
    $(`.img-open-character`).each((i, el) => {
      ids.push(el.attribs.alt)
    })

    gachaInfo.value.npc = {
      id: match[1],
      updateTime: Date.now(),
      list: ids,
    }
  }

  // Dashboard 抽卡记录
  if (url.includes('gacha/result//legend')) {
    const RawData: GachaResult = responseData

    let hit = gachaRecord.value.find(pool => pool.random_key === RawData.random_key)
    if (!hit) {
      hit = {
        random_key: RawData.random_key,
        service_start: RawData.ceiling.start,
        service_end: RawData.ceiling.end,
        count: 0,
        use_count: 0,
        ssrList: [],
      }
      gachaRecord.value.unshift(hit)
    }

    // 避免刷新结果重复计算
    if (hit.use_count === Number(RawData.ceiling.use_count))
      return
    hit.use_count = Number(RawData.ceiling.use_count)

    RawData.result.forEach((item) => {
      hit!.count++
      if (item.reward_rare_val === '4') {
        hit!.ssrList.push({
          id: item.reward_id,
          type: item.reward_type,
          is_new: item.is_new,
        })
      }
    })
  }

  // Dashboard 体力道具数据
  if (url.includes('/item/recovery_and_evolution_list_by_filter_mode')) {
    const itemList = responseData
    const firstList = itemList[0]

    const recoveryList = [
      { item_id: '1', prop: 'fullElixir', number: 0 },
      { item_id: '2', prop: 'halfElixir', number: 0 },
      { item_id: '3', prop: 'soulBalm', number: 0 },
      { item_id: '5', prop: 'soulBerry', number: 0 },
    ]
    const res: any = {}
    res.timeStamp = dayjs().valueOf()

    if (recoveryItemList.value.length > 0) {
      const lastData = recoveryItemList.value[0]
      if (dayjs().isSame(dayjs(lastData.timeStamp), 'day'))
        return
      recoveryList.forEach((item) => {
        const target = firstList.find((i: any) => String(i.item_id) === item.item_id)
        const targetNumber = Number(target?.number) || 0
        res[item.prop] = targetNumber
        res[`${item.prop}Diff`] = targetNumber - lastData[item.prop as 'fullElixir' | 'halfElixir' | 'soulBalm' | 'soulBerry']
      })
    }
    else {
      recoveryList.forEach((item) => {
        const target = firstList.find((i: any) => String(i.item_id) === item.item_id)
        res[item.prop] = Number(target?.number) || 0
        res[`${item.prop}Diff`] = 0
      })
    }
    recoveryItemList.value.unshift(res)
  }

  // Dashboard skip副本信息
  if (url.includes('/rest/quest/skip_quest_list')) {
    skipQuest.value.updateTime = Date.now()
    skipQuest.value.list = Object.values(responseData.list)
      .flat()
      .map((item: any) => ({
        chapterId: item.chapter_id,
        questId: item.quest_id,
        thumbnailImage: item.thumbnail_image,
        useItemId: item.use_item_id[0],
        limitedCount: item.limited_count,
      }))
  }

  // Party 角色数据
  if (/\/(?:party|npc)\/npc\//.test(url)) {
    const npcDetail = responseData

    if (!npcDetail.master?.id)
      return

    const npcInfo: BuildNpc = {
      paramId: npcDetail.id,
      masterId: Number(npcDetail.master.id),
      attribute: npcDetail.master.attribute,
      imageId: '',
      isAugment: npcDetail.has_npcaugment_constant,
      arousalForm: npcDetail.npc_arousal_form,
      ability: [],
      artifact: [],
    }

    for (let i = 1; i <= 4; i++) {
      const currentAbility = npcDetail.ability[i]
      if (currentAbility) {
        npcInfo.ability.push({
          iconType: currentAbility.icon_type,
          fa: !!currentAbility.user_full_auto_setting_flag,
        })
      }

      const artifactSkillInfo = npcDetail.artifact[`skill${i}_info`]
      if (artifactSkillInfo) {
        npcInfo.artifact!.push({
          value: artifactSkillInfo.effect_value,
          icon: artifactSkillInfo.icon_image,
          level: artifactSkillInfo.level,
          name: artifactSkillInfo.name,
        })
      }
    }
    const hitIndex = localNpcList.value.findIndex(npc => npc.paramId === npcDetail.id)

    if (hitIndex === -1)
      localNpcList.value.push(npcInfo)
    else
      localNpcList.value[hitIndex] = { ...npcInfo, exlb: localNpcList.value[hitIndex].exlb }

    localNpcList.value = localNpcList.value.filter(n => !Object.hasOwn(n, 'id'))
  }

  // Party 记录伤害计算设置
  if (url.includes('party/calculate_setting')) {
    const regex = /calculate_setting\/(\d+)\/(\d+)/
    const matches = url.match(regex)
    const priority = matches ? matches.slice(1).join('') : null
    if (priority)
      handleCalculateSetting({ priority, setting: responseData })
  }

  // Party 记录更改伤害计算设置
  if (url.includes('party/save_calculate_setting')) {
    const setting = JSON.parse(requestData!)
    handleCalculateSetting({ priority: String(setting.group_priority) + String(setting.priority), setting })
  }

  // Party 主角技能
  if (url.includes('/party/job_equipped')) {
    const jobInfo = responseData.job
    const job_param_id = jobInfo.param.id

    for (let i = 1; i <= 4; i++) {
      const actionAbility = jobInfo.ability[i]
      if (actionAbility) {
        const ab: BuildLeaderAbility = {
          jobParamId: i === 1 ? job_param_id : 0,
          actionId: String(actionAbility.action_id),
          iconId: actionAbility.class_name,
          name: actionAbility.name,
          iconType: actionAbility.action_icon.split('_')[1],
          fa: !!actionAbility.user_full_auto_setting_flag,
        }

        if (i === 1)
          jobAbilityList.value = jobAbilityList.value.filter(a => !(a.jobParamId === job_param_id && a.actionId !== ab.actionId))

        const hitIndex = jobAbilityList.value.findIndex(a => a.actionId === ab.actionId)
        if (hitIndex === -1)
          jobAbilityList.value.push(ab)
        else
          jobAbilityList.value[hitIndex] = ab
      }
    }
    jobAbilityList.value = jobAbilityList.value.filter(a => !Object.hasOwn(a, 'action_id'))
  }

  // Party 角色技能切换fa开关
  if (url.includes('/npc/full_auto_ability_setting')) {
    const faAbilitySetting = JSON.parse(requestData!)
    const hit = localNpcList.value.find(npc => npc.paramId === faAbilitySetting.user_npc_id)
    if (hit)
      hit.ability[faAbilitySetting.ability_num - 1].fa = !!faAbilitySetting.auto_execute_flag
  }

  //  Party 主角技能切换fa开关
  if (url.includes('/job/fullautosetting/pc_full_auto_setting')) {
    const faAbilitySetting = JSON.parse(requestData!)
    const hit = jobAbilityList.value.find(a => a.actionId === String(faAbilitySetting.ability_id))
    if (hit)
      hit.fa = !!faAbilitySetting.auto_execute_flag
  }

  // BattleLog 记录单次攻击日志
  if (/\/rest\/(?:raid|multiraid)\/normal_attack_result\.json/.test(url)) {
    handleAttackRusultJson('normal', responseData, JSON.parse(requestData!))
  }

  // BattleLog 记录使用召唤日志
  if (/\/rest\/(?:raid|multiraid)\/summon_result\.json/.test(url)) {
    handleAttackRusultJson('summon', responseData, JSON.parse(requestData!))
  }

  // BattleLog 记录使用FC日志
  if (/\/rest\/(?:raid|multiraid)\/fatal_chain_result\.json/.test(url)) {
    handleAttackRusultJson('fc', responseData, JSON.parse(requestData!))
  }

  // BattleLog 记录使用技能日志
  if (/\/rest\/(?:raid|multiraid)\/ability_result\.json/.test(url)) {
    handleAttackRusultJson('ability', responseData, JSON.parse(requestData!))
  }

  // BattleLog 记录使用DC连锁技能日志
  if (/\/rest\/(?:raid|multiraid)\/group_gauge_action_result\.json/.test(url)) {
    handleAttackRusultJson('ability', responseData, JSON.parse(requestData!))
  }

  // BattleLog 记录使用蓝绿药日志
  if (/\/rest\/(?:raid|multiraid)\/temporary_item_result\.json/.test(url)) {
    handleAttackRusultJson('temporary', responseData, JSON.parse(requestData!))
  }

  // BattleLog 记录使用【活动】药品日志
  if (/\/rest\/(?:raid|multiraid)\/event_temporary_item_result\.json/.test(url)) {
    handleAttackRusultJson('event/temporary', responseData, JSON.parse(requestData!))
  }

  // BattleLog 记录使用大红日志
  if (/\/rest\/(?:raid|multiraid)\/user_recovery\.json/.test(url)) {
    handleAttackRusultJson('recovery', responseData, JSON.parse(requestData!))
  }

  // BattleLog 战斗结算
  if (/\/result(?:multi)?\/content\/(?:index|skip_raid)\/\d+/.test(url)) {
    handleResultContent(responseData)
  }

  // BattleLog 记录副本start信息
  if (/\/rest\/(?:raid|multiraid)\/start\.json/.test(url)) {
    const battleId = String(responseData.raid_id)
    const timestamp = new Date().valueOf()
    const hitMemo = battleMemo.value.find(memo => memo.battleId === battleId)
    if (!hitMemo && responseData.boss) {
      const questName = responseData.boss.param[0].monster

      const memo = { battleId, questName, timestamp, date: dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss') }
      battleMemo.value.push(memo)
      console.log('新增memo==>', memo)

      if (battleMemo.value.length > MaxMemoLength)
        battleMemo.value.shift()
      console.log('memoList==>', battleMemo.value)
    }

    battleInfo.value.inLobby = false
    const battleStartJson: BattleStartJson = responseData

    // 统计每日副本
    if (dailyCost.value.dateTime && dayjs().isSame(dailyCost.value.dateTime, 'day')) {
      const hitIndex = dailyCost.value.raidIds!.findIndex(id => id === Number(battleStartJson.raid_id))

      if (hitIndex !== -1) {
        dailyCost.value.raidIds!.splice(hitIndex, 1)
        const questId = String(battleStartJson.quest_id)
        let hitQuest = dailyCost.value.quest?.find(q => q.questId === questId)
        if (!hitQuest) {
          hitQuest = { questId, ap: 0, bossImgId: '', bossName: '', count: 0 }
          dailyCost.value.quest?.push(hitQuest)
        }
        hitQuest.bossImgId = hitQuest.bossImgId || battleStartJson.boss.param[0].cjs.split('_').at(-1)!
        hitQuest.bossName = hitQuest.bossName || battleStartJson.boss.param[0].monster
        hitQuest.count++
      }
    }

    // 分析副本数据
    handleStartJson(battleStartJson)

    // 上传副本信息
    const matchName = battleStartJson.boss.param.reduce<string[]>((pre, cur) => {
      pre.push(cur.name.ja, cur.name.en)
      return pre
    }, [])
    const bossInfo = {
      battleId: String(battleStartJson.raid_id),
      userId: battleStartJson.user_id,
      questId: battleStartJson.quest_id,
      battleTotal: Number(battleStartJson.battle.total),
      battleCount: Number(battleStartJson.battle.count),
      matchName,
      boss: battleStartJson.boss.param.map(boss => ({
        id: boss.enemy_id,
        name: boss.name.ja,
        lv: boss.Lv,
        attr: boss.attr,
        cjs: boss.cjs,
        hp: Number(boss.hpmax),
      })),
    }
    console.log('sendBossInfo', bossInfo)
    sendBossInfo(bossInfo).catch((err) => { console.log(err.message) })
  }

  // Drop 记录未结算战斗信息
  if (url.includes('/quest/unclaimed_reward')) {
    for (const battle of responseData.list) {
      const hitMemo = battleMemo.value.find(memo => memo.battleId === String(battle.raid_id))
      if (hitMemo)
        continue

      const battleInfo = {
        battleId: String(battle.raid_id),
        questName: battle.chapter_name,
        questType: '1',
        timestamp: formatFinishTime(battle.finish_time),
        date: dayjs(formatFinishTime(battle.finish_time)).format('YYYY-MM-DD HH:mm:ss'),
      }

      console.log('未记录过的战斗信息', battleInfo)

      battleMemo.value.push({ ...battleInfo })
    }

    while (battleMemo.value.length > MaxMemoLength)
      battleMemo.value.shift()

    console.log('memoList==>', battleMemo.value)
  }

  // Build 获取自发副本的questId
  if (url.includes('/quest/content/supporter/')) {
    const regex = /\/quest\/content\/supporter\/(\d+)\//
    const match = url.match(regex)
    if (match)
      buildQuestId.value = match[1]
  }

  // Build 获取参战他人副本的questId
  if (url.includes('/quest/check_multi_start')) {
    const paylaod = JSON.parse(requestData!)
    if (paylaod.quest_id)
      buildQuestId.value = String(paylaod.quest_id)
  }

  // Party 记录当前队伍信息
  if (url.includes('party/deck')) {
    handleDeckJson(responseData.deck)
  }

  // Artifact 记录当前神器信息
  if (url.includes('/rest/artifact/list')) {
    artifactList.value = responseData.list
  }

  // 判断是否开启debugger
  if (url.includes('/socket/uri/raid')) {
    chrome.runtime.getContexts({}).then((ctx) => {
      if (ctx.filter(c => c.documentUrl?.includes('src/views/sidePanel/main.html')).length === 0)
        obTabId.value = 0

      if (!obTabId.value)
        return

      chrome.debugger.getTargets().then((targets) => {
        const isAttached = targets.some(target => target.tabId === obTabId.value && target.attached)

        if (!isAttached) {
          chrome.debugger
            .attach({ tabId: obTabId.value }, '1.3')
            .then(() => chrome.debugger.sendCommand({ tabId: obTabId.value }, 'Network.enable'))
        }
      })
    })
  }

  // BattleLog 查询房间成员
  if (url.includes('/lobby/content/room_member')) {
    battleInfo.value.inLobby = true
    battleInfo.value.lobbyMemberList = []
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const memberEl = $('.prt-room-member').children()
    memberEl.each((i, elem) => {
      battleInfo.value.lobbyMemberList!.push({
        nickname: elem.attribs['data-nick-name'],
        userId: elem.attribs['data-user-id'],
        userRank: elem.attribs['data-user-rank'],
        jobIcon: $(elem).find('.img-job-icon').attr('src') ?? '',
        attributeClass: $(elem).find('.ico-attribute').attr('class') ?? '',
        isDead: false,
        groupNum: null,
      })
    })
  }

  // BattleLog 记录子技能日志
  if (/\/rest\/(?:raid|multiraid)\/get_select_if\.json/.test(url)) {
    const data = responseData
    const paylaod = JSON.parse(requestData!)
    const hit = battleRecord.value.find(record => record.raid_id === paylaod.raid_id)
    if (!hit)
      return
    const hitAbility = hit.abilityList.find(ability => ability.id === paylaod.ability_id)
    if (!hitAbility)
      return
    hitAbility.subAbility = Object.values(data.select_ability_info).map((item: any) => ({
      icon: `/sp/assets/item/ability/s/${item.image}.jpg`,
      id: item.action_id,
      index: item.index,
    }))
  }

  // BattleLog 记录暗器设置
  if (/\/rest\/(?:raid|multiraid)\/get_hiddenweapon/.test(url)) {
    // 两个使用暗器职业的一技能ID
    const HIDDEN_WEAPON_ABILITY_ID = ['7241', '201581']
    const data = responseData
    const paylaod = JSON.parse(requestData!) as { raid_id: number, pid: string }
    const hit = battleRecord.value.find(record => record.raid_id === paylaod.raid_id)
    if (!hit)
      return
    const hitAbility = hit.abilityList.find(ability => HIDDEN_WEAPON_ABILITY_ID.includes(ability.id || ''))
    if (!hitAbility)
      return
    hitAbility.subAbility = Object.values(data.hiddenweapon_info.set_hidden_weapon).map((item: any) => ({
      icon: `/sp/assets/item/hiddenweapon/s/${item.hiddenweapon_id}.jpg`,
      id: item.hiddenweapon_id,
      index: item.set_pos,
    }))
  }

  // BattleLog 记录切换guard日志
  if (/\/rest\/(?:raid|multiraid)\/guard_setting\.json/.test(url)) {
    const paylaod = JSON.parse(requestData!)
    handleGuardSettingJson({ raid_id: paylaod.raid_id, guard_status: responseData.guard_status })
  }

  // BattleLog 记录切换奥义温存日志
  if (/\/rest\/(?:raid|multiraid)\/special_skill_setting/.test(url)) {
    const paylaod = JSON.parse(requestData!)
    handleSpecialSkillSettingJson(paylaod)
  }

  // BattleLog 记录战斗结果
  if (url.includes('resultmulti/content/detail')) {
    const regex = /\/detail\/(\d+)\?/
    const match = regex.exec(url) as RegExpExecArray
    const raid_id = Number(match[1])
    const hit = battleRecord.value.find(record => record.raid_id === raid_id)
    if (!hit || !hit.hasResult) {
      const htmlString = decodeURIComponent(responseData.data)
      const $ = load(htmlString)
      const raidName = $('.txt-enemy-name').text()
      const finishTime = $('.txt-defeat-value').first().text()
      const endTimestamp = formatFinishTime(finishTime)
      const gainList: string[] = []

      $('.txt-gain-value').each((i, elem) => {
        gainList.push($(elem).text())
      })
      const damage = gainList[2]
      const turn = gainList[3]
      const time = gainList[4]

      const treasureList: { src: string, number: string, boxClass: string }[] = []

      $('.lis-treasure').each((i, elem) => {
        treasureList.push({
          src: $(elem).find('img').attr('src') || '',
          number: $(elem).find('.prt-article-count').text().split('x')[1],
          boxClass: $(elem).children().last().attr('class') || '',
        })
      })

      const memberList: any[] = responseData.option.member_list
      const player = memberList.reduce<Player[]>((pre, cur) => {
        pre.push({
          pid: cur.image_id.split('_')[0],
          image_id: `${cur.image_id.split('_')[0]}_01`,
          use_ability_count: Number(cur.use_ability_count),
          use_special_skill_count: Number(cur.use_special_skill_count),
          is_npc: cur.is_npc,
          is_dead: false,
          damage: {
            total: { comment: '总计', value: Number(cur.damage) },
            attack: { comment: '通常攻击&反击', value: Number(cur.normal_damage) },
            ability: { comment: '技能伤害', value: Number(cur.ability_damage) },
            special: { comment: '奥义伤害', value: Number(cur.special_damage) },
            other: { comment: '其他', value: Number(cur.other_damage) },
          },
          damageTaken: {
            total: { comment: '总计', value: 0 },
            attack: { comment: '通常攻击&反击', value: 0 },
            super: { comment: '特动', value: 0 },
            other: { comment: '其他', value: 0 },
          },
          condition: {
            buff: [],
            coating_value: 0,
          },
        })
        return pre
      }, [])
      if (!hit) {
        battleRecord.value.unshift({
          quest_id: '',
          raid_id,
          raid_name: raidName,
          turn: Number(turn),
          endTimestamp,
          startTimer: 0,
          endTimer: 0,
          formation: [0, 1, 2, 3],
          player,
          actionQueue: [],
          hasResult: true,
          damage,
          duration: time,
          treasureList,
          abilityList: [],
        })
        battleRecord.value.sort((a, b) => Number(b.raid_id) - Number(a.raid_id))

        while (battleRecord.value.length > 10) {
          battleRecord.value.pop()
        }
      }
      else {
        hit.endTimestamp = endTimestamp
        hit.player[0].image_id = player[0].image_id
        hit.hasResult = true
        hit.damage = damage
        hit.duration = time
        hit.treasureList = treasureList
      }
    }
  }
}

// 处理战斗结算数据
function handleResultContent(responseData: any) {
  getDisplayList(responseData)
  initDailyCost()
  const result_data = responseData.option?.result_data
  if (!result_data)
    return

  if (result_data.appearance?.is_quest && !result_data.appearance?.is_retry && notificationSetting.value.appearanceQuest)
    createNotification({ message: 'Hell提醒', sound: 'hell' })

  if (result_data.replicard?.has_occurred_event && notificationSetting.value.replicardEvent) {
    createNotification({
      message: '沙盒宝箱提醒',
      iconUrl: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/enemy/s/4200151.png',
      sound: 'hell',
    })
  }

  // 非古战场副本,非扫荡副本结算时探险时间减60秒
  if (result_data.event?.event_type !== 3 && result_data.quest_type !== 28 && sampoInfo.value.remainTime) {
    sampoInfo.value.remainTime -= 60000
  }

  const isInAdvent = !!Object.keys(result_data.advent_info).length
  const isInSolotreasure = !!eventList.value.find(e => e.type === 'solotreasure')?.isActive
  const isInBiography = !!eventList.value.find(e => e.type === 'biography')?.isActive

  // 收集掉落信息
  for (const element of Object.values(result_data.rewards.reward_list)) {
    for (const [key, value] of Object.entries(element as Record<string, any>)) {
      const reward = {
        key,
        imgId: `${value.type}/m/${value.thumbnail_img || value.id}`,
        count: Number(value.count),
      }

      const hitReward = dailyCost.value.rewardList?.find(r => r.key === reward.key)
      if (hitReward)
        hitReward.count += reward.count
      else
        dailyCost.value.rewardList?.push(reward)

      // 更新四象讨伐章
      if (isInAdvent) {
        const additional = eventList.value.find(event => event.type === 'advent')?.additional as AdventAdditional | undefined
        if (additional) {
          const hitReward = additional.defeatReward.find(r => `item/event/defeat/${r.key}` === value.type)
          if (hitReward)
            hitReward.value += Number(value.count)
        }
      }

      // 更新剧情复刻道具数量
      if (isInSolotreasure) {
        const additional = eventList.value.find(event => event.type === 'solotreasure')?.additional as Record<string, number> | undefined
        if (additional && additional[key]) {
          additional[key] += Number(value.count)
        }
      }

      // 更新剧情活动道具数量
      if (isInBiography) {
        const additional = eventList.value.find(event => event.type === 'biography')?.additional as Record<string, number> | undefined
        if (additional && additional[key]) {
          additional[key] += Number(value.count)
        }
      }
    }
  }

  if (result_data.rewards.artifact_list.length !== 0) {
    const hitReward = dailyCost.value.rewardList?.find(r => r.key === 'artifact')
    if (hitReward)
      hitReward.count += result_data.rewards.artifact_list.length
    else
      dailyCost.value.rewardList?.push({ key: 'artifact', imgId: 'artifact/m/301010101', count: result_data.rewards.artifact_list.length })
  }

  // 更新FP点数信息
  if (result_data.follow_point_info && Object.keys(result_data.follow_point_info).length > 0) {
    userInfo.value.followPoint = {
      weekly: {
        number: Number(result_data.follow_point_info.weekly_get_number),
        limit: Number(result_data.follow_point_info.weekly_limit_number),
      },
      total: {
        number: Number(result_data.follow_point_info.amount),
        limit: Number(result_data.follow_point_info.limit_number),
      },
    }
  }

  // 更新神器掉落结果
  if (result_data.rewards?.artifact_drop_count_info) {
    userInfo.value.artifact = {
      number: Number(result_data.rewards.artifact_drop_count_info.current_count),
      limit: Number(result_data.rewards.artifact_drop_count_info.max_count),
    }
  }

  // 更新战货活动任务信息
  if (result_data.popup_data?.treasureraid_mission && Object.keys(result_data.popup_data?.treasureraid_mission).length > 0) {
    const eventInfo = eventList.value.find(event => event.type === 'treasureraid')
    const progress = result_data.popup_data.treasureraid_mission.progress ?? []
    const achieve_mission = result_data.popup_data.treasureraid_mission.achieve_mission ?? []
    for (const item of progress) {
      const mission = eventInfo?.mission.find(m => m.desc === item.description)
      if (mission) {
        mission.number = Number(item.numerator)
        mission.limit = Number(item.denominator)
        mission.isAllComplete = mission.number >= mission.limit
      }
    }
    for (const item of achieve_mission) {
      const mission = eventInfo?.mission.find(m => m.desc === item.description)
      if (mission) {
        mission.number = mission.limit
        mission.isAllComplete = true
      }
    }
  }

  // 更新古战场活动任务信息
  if (result_data.popup_data?.teamraid_mission_beginner && Object.keys(result_data.popup_data?.teamraid_mission_beginner).length > 0) {
    const eventInfo = eventList.value.find(event => event.type === 'teamraid')
    const progress = result_data.popup_data.teamraid_mission_beginner.progress ?? []
    const achieve_mission = result_data.popup_data.teamraid_mission_beginner.achieve_mission ?? []
    for (const item of progress) {
      const mission = eventInfo?.mission.find(m => m.desc === item.description)
      if (mission) {
        mission.number = Number(item.numerator)
        mission.limit = Number(item.denominator)
        mission.isAllComplete = mission.number >= mission.limit
      }
    }
    for (const item of achieve_mission) {
      const mission = eventInfo?.mission.find(m => m.desc === item.description)
      if (mission) {
        mission.number = mission.limit
        mission.isAllComplete = true
      }
    }
  }

  // 更新古战场果报古箱掉落信息
  if (result_data.character_message?.lottery_reward_info) {
    const hitItem = result_data.character_message?.lottery_reward_info.find((reward: any) => reward.item_image.includes('30711'))
    const eventInfo = eventList.value.find(event => event.type === 'teamraid')
    if (hitItem && eventInfo) {
      eventInfo.additional!.lottery.number += Number(hitItem.number)
    }
  }

  // 更新古战场贡献信息
  if (result_data.event?.data) {
    const hitItem = result_data.event?.data.find((reward: any) => reward.item_image === 'service')
    const eventInfo = eventList.value.find(event => event.type === 'teamraid')
    if (hitItem && eventInfo) {
      eventInfo.additional!.honor += Number(hitItem.get_num) + Number(hitItem.get_bonus_num)
    }
  }

  // 更新工会战活动任务信息
  if (result_data.popup_data?.teamforce_mission && Object.keys(result_data.popup_data?.teamforce_mission).length > 0) {
    const eventInfo = eventList.value.find(event => event.type === 'teamforce')
    const progress = result_data.popup_data.teamforce_mission.progress ?? {}
    const achieve_mission = result_data.popup_data.teamforce_mission.achieve_mission ?? []

    const mission = eventInfo?.mission.find(m => m.desc === progress.description)
    if (mission) {
      mission.number = Number(progress.numerator)
      mission.limit = Number(progress.denominator)
      mission.isAllComplete = mission.number >= mission.limit
    }

    for (const item of achieve_mission) {
      const mission = eventInfo?.mission.find(m => m.desc === item.description)
      if (mission) {
        mission.number = mission.limit
        mission.isAllComplete = true
      }
    }
  }

  // 更新四象点数信息
  if (isInAdvent) {
    const is_over_limit = result_data.advent_info?.is_over_limit
    if (is_over_limit && notificationSetting.value.isPointOverLimit)
      createNotification({ message: '四象点数已经超过上限!!!', sound: 'warning' })

    const eventInfo = eventList.value.find(event => event.type === 'advent')
    if (eventInfo) {
      eventInfo.count += result_data.advent_info.final_point
      eventInfo.additional!.isOverflowed = is_over_limit
    }
  }

  // 更新四象，剧情活动和剧情复刻任务信息
  if (result_data.popup_data?.daily_mission) {
    const targetEvent = ['advent', 'solotreasure', 'biography']
    for (const eventType of targetEvent) {
      const eventInfo = eventList.value.find(event => event.type === eventType && event.isActive)
      if (!eventInfo)
        continue
      const daily_mission = result_data.popup_data.daily_mission
      const mission = eventInfo?.mission.find(m => m.desc === daily_mission.comment)
      if (mission) {
        mission.number = Number(daily_mission.num)
        mission.limit = Number(daily_mission.max_num)
        mission.isAllComplete = mission.number >= mission.limit
      }
    }
  }

  // 更新炼金活动token数量
  if (result_data.alchemist?.lottery_reward_info && Object.keys(result_data.alchemist?.lottery_reward_info).length > 0) {
    const eventInfo = eventList.value.find(event => event.type === 'alchemist')
    if (eventInfo)
      eventInfo.count = Number(result_data.alchemist.lottery_reward_info[0].possession_num)
  }

  // 更新转世外传token数量
  if (result_data.interlude_info && Object.keys(result_data.interlude_info).length > 0) {
    const eventInfo = eventList.value.find(event => event.type === 'interlude')
    if (eventInfo)
      eventInfo.count += Number(result_data.interlude_info.token)
  }

  // 更新转世外传任务信息
  if (result_data.replicard.event_mission_result?.mission_list) {
    const eventInfo = eventList.value.find(event => event.type === 'interlude')
    if (eventInfo) {
      for (const mission of eventInfo.additional!.dailyList) {
        const hitMission = result_data.replicard.event_mission_result.mission_list.find((m: any) => m.description === mission.desc)
        if (hitMission) {
          mission.number = hitMission.progress.current
          mission.limit = hitMission.progress.max
          mission.isAllComplete = hitMission.progress.current >= hitMission.progress.max
        }
      }
    }
  }

  // 更新十天众战记任务信息
  if (result_data.popup_data?.terra && Object.keys(result_data.popup_data?.terra).length > 0) {
    const eventInfo = eventList.value.find(event => event.type === 'terra')
    if (!eventInfo)
      return
    const progress = result_data.popup_data.terra.mission.progress ?? []

    // 达成时触发的任务
    const achieve_mission = result_data.popup_data.terra.mission.achieve_mission ?? []
    for (const item of progress) {
      const mission = eventInfo?.mission.find(m => m.desc === item.description)
      if (mission) {
        mission.number = Number(item.numerator)
        mission.limit = Number(item.denominator)
        mission.isAllComplete = mission.number >= mission.limit
      }
    }
    for (const item of achieve_mission) {
      const mission = eventInfo?.mission.find(m => m.desc === item.description)
      if (mission) {
        mission.number = mission.limit
        mission.isAllComplete = true
      }
    }
    if (result_data.popup_data.terra.walk_point.walk_point_after)
      eventInfo.count = result_data.popup_data.terra.walk_point.walk_point_after
  }

  const display_list = responseData.display_list
  if (!display_list || !notificationSetting.value.itemGoal)
    return
  const itemList = Object.values(display_list)
  itemList.forEach((item: any) => {
    const current = Number(item.number)
    const goal = Number(item.registration_number)
    if (goal > 0 && goal <= current)
      createNotification({ message: `${item.name}达到目标数量`, sound: 'warning' })
  })
}

function processEventData(url: string, responseData: any) {
  // 战货活动
  if (/\/treasureraid\d+\/top\/content\/newindex/.test(url)) {
    if (!responseData.option)
      return

    const eventType = 'treasureraid'
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const gachaInfo = $('.prt-gacha-infomation')
    const boxNum = gachaInfo.length ? Number((gachaInfo.data('box-num') as string).match(/\d+/)![0]) : 0
    const gachaPoint = gachaInfo.length ? Number(gachaInfo.find('.txt-gacha-point').text()) : 0
    const eventInfo = {
      type: eventType,
      isActive: true,
      mission: responseData.option.event_mission_list.map((m: any) => ({
        reward: m.level_details[m.level].reward_name,
        desc: m.level_details[m.level].description,
        number: Number(m.progress),
        limit: Number(m.max_progress),
        isAllComplete: m.is_all_complete,
        isDailyMission: m.is_daily_mission,
      })),
      count: getEventGachaBoxNum({ eventType, currentToken: gachaPoint, drawnBox: boxNum }),
      updateTime: dayjs().valueOf(),
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      eventList.value[index] = eventInfo
    }
  }

  // 古战场
  if (/\/teamraid\d+\/top\/content\/index/.test(url)) {
    if (!responseData.option)
      return

    const eventType = 'teamraid'
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const progressInfo = $('.prt-progress-info')
    const gachaPoint = Number(progressInfo.find('em').eq(0).text())
    const [number, limit] = progressInfo.find('em').eq(1).text().split('/').map(Number)
    const honor = Number(progressInfo.find('em').eq(3).text().replace(/,/g, ''))
    const lottery = { number: Number.isNaN(number) ? 0 : number, limit: Number.isNaN(limit) ? 0 : limit }
    const isBattleShow = !!$('.prt-battle-show').length
    const log = {
      guild1: $('.prt-battle-show').find('.txt-guild-name').text(),
      guild2: $('.prt-battle-show').find('.txt-rival-name').text(),
      key: getJapanMMDD(),
      point: [
        Date.now(),
        Number($('.prt-battle-show').find('.txt-guild-point').text().replace(/,/g, '')),
        Number($('.prt-battle-show').find('.txt-rival-point').text().replace(/,/g, '')),
      ],
    }

    const firstPoint = [getJapan7AMTimestamp(), 0, 0]

    const eventInfo: EventInfo & { additional: TeamraidAdditional } = {
      type: eventType,
      isActive: true,
      mission: responseData.option.mission_beginner_list.map((m: any) => ({
        reward: m.level_details[m.level].reward_name,
        desc: m.level_details[m.level].description,
        number: Number(m.progress),
        limit: Number(m.max_progress),
        isAllComplete: m.is_all_complete,
        isDailyMission: m.is_daily_mission,
      })),
      count: 0,
      updateTime: dayjs().valueOf(),
      additional: {
        drawnBox: 0,
        gachaPoint,
        lottery,
        honor,
        targetHonor: 0,
        log: { ...log, point: [] },
      },
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    const eventLog = eventInfo.additional.log

    if (index === -1) {
      eventLog.point = [firstPoint, log.point]
      eventList.value.push(eventInfo)
    }
    else {
      const existingEvent = eventList.value[index]
      const existingEventLog = existingEvent.additional?.log
      eventInfo.additional.drawnBox = existingEvent.additional?.drawnBox || 0
      eventInfo.additional.targetHonor = existingEvent.additional?.targetHonor || 0

      if (isBattleShow) {
        eventLog.point = existingEventLog?.key === log.key
          ? [...existingEventLog.point, log.point]
          : [firstPoint, log.point]
        eventLog.guild1 = log.guild1
        eventLog.guild2 = log.guild2
        eventLog.key = log.key
      }
      else {
        eventInfo.additional.log = { ...existingEventLog }
      }

      // 间隔小于一分钟的不记录
      if (eventLog.point.length > 1 && (eventLog.point.at(-1)![0] - eventLog.point.at(-2)![0]) < 60 * 1000) {
        eventLog.point.pop()
      }
      eventLog.point = eventLog.point.filter(p => !Number.isNaN(p[1]) && !Number.isNaN(p[2]))
      eventList.value[index] = eventInfo
    }
  }

  // 古战场战货
  if (/\/teamraid\d+\/gacha\/content\/index/.test(url)) {
    const eventType = 'teamraid'
    const eventInfo = eventList.value.find(event => event.type === eventType)
    if (!eventInfo || !eventInfo.additional)
      return
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const gachaInfo = $('.prt-gacha-infomation')
    if (!gachaInfo.length) {
      eventInfo.additional.drawnBox = 0
      return
    }
    const boxNum = Number((gachaInfo.data('box-num') as string).match(/\d+/)![0])
    const gachaPoint = Number(gachaInfo.find('.txt-current-point').text())

    eventInfo.additional.drawnBox = boxNum
    eventInfo.additional.gachaPoint = gachaPoint
  }

  // 工会战
  if (/\/teamforce\/top\/content\/index\/\d+/.test(url)) {
    if (!responseData.option)
      return

    const eventType = 'teamforce'

    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const remainDailyPlayLimit = Number($('.prt-strong-quest-remain').text())

    const eventInfo: EventInfo & { additional: TeamforceAdditional } = {
      type: eventType,
      isActive: true,
      mission: Object.values(responseData.option.mission_list).map((m: any) => ({
        reward: m.level_details[m.level].reward_name,
        desc: m.level_details[m.level].description,
        number: Number(m.progress),
        limit: Number(m.max_progress),
        isAllComplete: m.is_all_complete,
        isDailyMission: false,
      })),
      count: remainDailyPlayLimit,
      updateTime: dayjs().valueOf(),
      additional: {
        drawnBox: 0,
        gachaPoint: 0,
      },
    }

    const index = eventList.value.findIndex(event => event.type === eventType)

    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      const existingEvent = eventList.value[index]
      eventInfo.additional.drawnBox = existingEvent.additional?.drawnBox || 0
      eventInfo.additional.gachaPoint = existingEvent.additional?.gachaPoint || 0
      eventList.value[index] = eventInfo
    }
  }

  // 工会战战货
  if (/\/teamforce\/gacha\/content\/index/.test(url)) {
    const eventType = 'teamforce'
    const eventInfo = eventList.value.find(event => event.type === eventType)
    if (!eventInfo || !eventInfo.additional)
      return
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const gachaInfo = $('.prt-gacha-infomation')
    if (!gachaInfo.length) {
      eventInfo.additional.drawnBox = 0
      return
    }
    const boxNum = Number((gachaInfo.data('box-num') as string).match(/\d+/)![0])
    const gachaPoint = Number(gachaInfo.find('.txt-current-point').text())

    eventInfo.additional.drawnBox = boxNum
    eventInfo.additional.gachaPoint = gachaPoint
  }

  // 炼金活动
  if (url.includes('/frontier/alchemy/content/index')) {
    if (!responseData.option)
      return

    const eventType = 'alchemist'
    const eventInfo = {
      type: eventType,
      isActive: true,
      mission: responseData.option.event_mission_list.map((m: any) => ({
        reward: m.level_details[m.level].reward_name,
        desc: m.level_details[m.level].description,
        number: Number(m.progress),
        limit: Number(m.max_progress),
        isAllComplete: m.is_all_complete,
        isDailyMission: !!m.is_daily_mission,
      })),
      count: Number(responseData.option.event_item.item_num),
      updateTime: dayjs().valueOf(),
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      eventList.value[index] = eventInfo
    }
  }

  // 神灭战
  if (url.includes('rest/godslayer/top/quest_list')) {
    const eventType = 'godslayer'
    const eventInfo = {
      type: eventType,
      isActive: true,
      mission: responseData.boss_quest_mission.map((m: any) => ({
        reward: m.item_message,
        desc: m.quest_name,
        number: Number(m.is_clear.map((b: boolean) => b ? '1' : '0').join('')),
        limit: m.is_clear.length,
        isAllComplete: m.is_clear.every((b: boolean) => b),
        isDailyMission: !!m.is_daily_mission,
      })),
      count: Number(responseData.memorial_info.memorial_level),
      updateTime: dayjs().valueOf(),
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      eventList.value[index] = eventInfo
    }
  }

  // 四象降临
  if (url.includes('/advent/top/content/newindex')) {
    const eventType = 'advent'
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const [point, pointLimit] = $('.prt-point').text().replace(/,/g, '').split('/').map(Number)

    const missionList: Mission[] = []
    const $dailyMission = load($('#tpl-pop-check-daily-mission').text())
    $dailyMission('.prt-mission-info').each((i, el) => {
      const desc = $dailyMission(el).find('.prt-mission-description').text()
      const [number, limit] = $dailyMission(el).find('.prt-mission-complete').length
        ? [3, 3]
        : $dailyMission(el).find('.prt-mission-progress').text().split('/').map(s => Number(s.replace(/\D+/g, '')))
      missionList.push({ desc, number, limit, reward: '', isDailyMission: true, isAllComplete: number >= limit })
    })

    const defeatSort = [
      { id: '4', label: '朱雀討伐章', key: 'platinum' },
      { id: '1', label: '玄武討伐章', key: 'copper' },
      { id: '3', label: '白虎討伐章', key: 'gold' },
      { id: '2', label: '青龙討伐章', key: 'silver' },
      { id: '5', label: '瑞神討伐章', key: 'diamond' },
    ]
    const defeatReward: { id: string, label: string, key: string, value: number }[] = []
    $('.prt-boss-tab .btn-boss-tab').each((i, el) => {
      const defeatInfo = defeatSort[i]
      defeatReward.push({ ...defeatInfo, value: Number($(el).text().replace(/\D+/g, '')) })
    })

    const eventInfo: EventInfo & { additional: AdventAdditional } = {
      type: eventType,
      isActive: true,
      mission: missionList,
      count: point,
      updateTime: dayjs().valueOf(),
      additional: {
        isOverflowed: point >= pointLimit,
        defeatReward,
      },
    }

    const index = eventList.value.findIndex(event => event.type === eventType)

    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      eventList.value[index] = eventInfo
    }
  }

  // 转世外传
  if (url.includes('/interlude/top/content/index')) {
    if (!responseData.option)
      return

    const eventType = 'interlude'

    const dailyList: Mission[] = []
    const daily_popup = responseData.option.daily_popup
    for (const mission of daily_popup) {
      dailyList.push({
        reward: mission.reward_name,
        desc: mission.description,
        number: mission.progress.current,
        limit: mission.progress.max,
        isAllComplete: mission.progress.current >= mission.progress.max,
        isDailyMission: true,
      })
    }

    const missionList: Mission[] = []
    const missionInfo = responseData.option.current_progress.missions_cleared
    const sort = { 1: 'C级任务', 2: 'B级任务', 3: 'A级任务', 4: 'S级任务' }
    for (const [key, label] of Object.entries(sort)) {
      const mission = missionInfo[key]
      missionList.push({
        reward: '',
        desc: label,
        number: mission.current,
        limit: mission.max,
        isAllComplete: mission.current >= mission.max,
        isDailyMission: false,
      })
    }

    const eventInfo = {
      type: eventType,
      isActive: true,
      mission: missionList,
      count: Number(responseData.option.current_progress.sephira_token_balance),
      updateTime: dayjs().valueOf(),
      additional: {
        dailyList,
      },
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      if (eventInfo.additional.dailyList.length === 0) {
        eventInfo.additional.dailyList = eventList.value[index].additional?.dailyList || []
      }

      eventList.value[index] = eventInfo
    }
  }

  // 转世外传任务
  if (url.includes('/rest/interlude/mission/mission_list')) {
    const eventType = 'interlude'
    const eventInfo = eventList.value.find(event => event.type === eventType)
    if (!eventInfo)
      return

    const list = responseData.list.filter((m: any) => !m.mission_rank)

    for (const mission of list) {
      const hitMission = eventInfo.additional!.dailyList.find((m: Mission) => m.desc === mission.description)
      if (hitMission) {
        hitMission.number = mission.progress.current
        hitMission.limit = mission.progress.max
        hitMission.isAllComplete = mission.progress.current >= mission.progress.max
      }
      else {
        eventInfo.additional!.dailyList.unshift({
          reward: mission.reward_name,
          desc: mission.description,
          number: mission.progress.current,
          limit: mission.progress.max,
          isAllComplete: mission.progress.current >= mission.progress.max,
          isDailyMission: true,
        })
      }
    }
  }

  // 剧情活动
  if (/\/biography\d+\/top\/content\/newindex/.test(url)) {
    if (!responseData.option)
      return

    const eventType = 'biography'
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const $dailyPopup = load($('#tpl-pop-check-daily-mission').text())

    const missionList: Mission[] = []

    $dailyPopup('.prt-mission-info').each((i, el) => {
      const [number, limit] = $dailyPopup(el).find('.prt-mission-complete').length
        ? [5, 5]
        : $dailyPopup(el).find('.prt-mission-progress').text().split('/').map(s => Number(s.replace(/\D+/g, '')))

      missionList.push({
        desc: $dailyPopup(el).find('.prt-mission-description').html()!,
        number,
        limit,
        isAllComplete: number >= limit,
        isDailyMission: true,
        reward: '',
      })
    })

    const articleInfo = responseData.option.status.article_item.reduce((obj: any, item: any) => {
      obj[`${item.item_kind}_${item.id}`] = Number (item.possessed)
      return obj
    }, {} as Record<number, number>)

    const eventInfo = {
      type: eventType,
      isActive: true,
      mission: missionList,
      count: 0,
      updateTime: dayjs().valueOf(),
      additional: articleInfo,
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      eventList.value[index] = eventInfo
    }
  }

  // 剧情复刻
  if (/\/solotreasure\d+\/top\/content\/newindex/.test(url)) {
    if (!responseData.option)
      return

    const eventType = 'solotreasure'
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const $dailyPopup = load($('#tpl-pop-check-daily-mission').text())

    const missionList: Mission[] = []

    $dailyPopup('.prt-mission-info').each((i, el) => {
      const [number, limit] = $dailyPopup(el).find('.prt-mission-complete').length
        ? [5, 5]
        : $dailyPopup(el).find('.prt-mission-progress').text().split('/').map(s => Number(s.replace(/\D+/g, '')))

      missionList.push({
        desc: $dailyPopup(el).find('.prt-mission-description').html()!,
        number,
        limit,
        isAllComplete: number >= limit,
        isDailyMission: true,
        reward: '',
      })
    })

    const articleInfo = responseData.option.status.article_item.reduce((obj: any, item: any) => {
      obj[`${item.item_kind}_${item.id}`] = Number (item.possessed)
      return obj
    }, {} as Record<number, number>)

    const eventInfo = {
      type: eventType,
      isActive: true,
      mission: missionList,
      count: 0,
      updateTime: dayjs().valueOf(),
      additional: articleInfo,
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      eventList.value[index] = eventInfo
    }
  }

  // 十天众战记
  if (url.includes('/terra/content/index')) {
    if (!responseData.option)
      return

    const eventType = 'terra'
    const map_info = responseData.option.map_info

    const eventInfo = {
      type: eventType,
      isActive: true,
      mission: [
        ...responseData.option.daily_mission_list.map((m: any) => ({
          reward: m.level_details.find((d: any) => d.level === m.level).reward_name,
          desc: m.level_details.find((d: any) => d.level === m.level).description,
          number: Number(m.progress),
          limit: Number(m.max_progress),
          isAllComplete: m.is_all_complete,
          isDailyMission: true,
        })),
        ...responseData.option.mission_list.map((m: any) => ({
          reward: m.level_details.find((d: any) => d.level === m.level).reward_name,
          desc: m.level_details.find((d: any) => d.level === m.level).description,
          number: Number(m.progress),
          limit: Number(m.max_progress),
          isAllComplete: m.is_all_complete,
          isDailyMission: false,
        })),
      ],
      count: map_info.current_walk_point,
      updateTime: dayjs().valueOf(),
      additional: {
        current_loop_num: map_info.current_loop_num,
        remain_square_num_to_goal: map_info.remain_square_num_to_goal,
      },
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      eventList.value[index] = eventInfo
    }
  }
}

// 获取设定道具数量信息
function getDisplayList(responseData: any) {
  if (!responseData.display_list)
    return

  displayList.value = Object.entries(responseData.display_list).reduce<DisplayItem[]>((acc, [key, value]) => {
    acc.push({
      itemKey: key,
      imageId: (value as any).image,
      number: Number((value as any).number),
      limit: Number((value as any).registration_number),
    })
    return acc
  }, [])
}

// 初始化每日统计
function initDailyCost() {
  if (!dailyCost.value.dateTime || !dayjs().isSame(dailyCost.value.dateTime, 'day')) {
    dailyCost.value = {
      dateTime: Date.now(),
      ap: 0,
      aap: 0,
      bp: 0,
      quest: dailyCost.value.quest?.filter(q => q.pinned).map(q => ({ ...q, count: 0 })) || [],
      raidIds: [],
      rewardList: [],
    }
  }
}

// 获取日本时区的MM-DD
function getJapanMMDD(): string {
  const now = new Date()
  const utcTimestamp = now.getTime() + now.getTimezoneOffset() * 60 * 1000
  const japanTimestamp = utcTimestamp + 9 * 60 * 60 * 1000
  const japanDate = new Date(japanTimestamp)
  const month = String(japanDate.getMonth() + 1).padStart(2, '0')
  const date = String(japanDate.getDate()).padStart(2, '0')
  return `${month}-${date}`
}

function getJapan7AMTimestamp(): number {
  const localDate = new Date()
  const year = localDate.getFullYear()
  const month = localDate.getMonth()
  const day = localDate.getDate()
  const japan7AM = new Date(Date.UTC(year, month, day, 7 - 9, 0, 0, 0))
  return japan7AM.getTime()
}
