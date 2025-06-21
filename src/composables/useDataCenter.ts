import type { DisplayItem, Player } from 'myStorage'
import type { BuildLeaderAbility, BuildNpc } from 'party'
import type { BattleStartJson, GachaResult } from 'source'
import { load } from 'cheerio'
import dayjs from 'dayjs'
import { sendBossInfo } from '~/api'
import { getEventGachaBoxNum } from '~/constants/event'
import { artifactList, battleInfo, battleMemo, battleRecord, buildQuestId, dailyCost, displayList, eventList, evokerInfo, gachaRecord, jobAbilityList, localNpcList, materialInfo, notificationSetting, obTabId, obWindowId, recoveryItemList, userInfo, xenoGauge } from '~/logic'

const MaxMemoLength = 50

export async function unpack(parcel: string) {
  if (typeof parcel !== 'string')
    return

  const { url, requestData, responseData } = JSON.parse(parcel) as { url: string, requestData?: string, responseData?: any }

  // console.log({ url, requestData, responseData })

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

  // Event 获取战货活动信息
  if (/\/treasureraid\d+\/top\/content\/newindex/.test(url)) {
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

  // Event 获取古战场活动信息
  if (/\/teamraid\d+\/top\/content\/index/.test(url)) {
    const eventType = 'teamraid'
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const progressInfo = $('.prt-progress-info')
    const gachaPoint = Number(progressInfo.find('em').eq(0).text())
    const [number, limit] = progressInfo.find('em').eq(1).text().split('/').map(Number)
    const lottery = { number: Number.isNaN(number) ? 0 : number, limit: Number.isNaN(limit) ? 0 : limit }

    const eventInfo = {
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
        drawnBox: 1,
        gachaPoint,
        lottery,
      },
    }

    const index = eventList.value.findIndex(event => event.type === eventType)
    if (index === -1) {
      eventList.value.push(eventInfo)
    }
    else {
      eventInfo.additional.drawnBox = eventList.value[index].additional?.drawnBox || 1
      eventList.value[index] = eventInfo
    }
  }

  // Event 获取古战场战货信息
  if (/\/teamraid\d+\/gacha\/content\/index/.test(url)) {
    const eventType = 'teamraid'
    const eventInfo = eventList.value.find(event => event.type === eventType)
    if (!eventInfo || !eventInfo.additional)
      return
    const htmlString = decodeURIComponent(responseData.data)
    const $ = load(htmlString)
    const gachaInfo = $('.prt-gacha-infomation')
    const boxNum = gachaInfo.length ? Number((gachaInfo.data('box-num') as string).match(/\d+/)![0]) : 0
    const gachaPoint = gachaInfo.length ? Number(gachaInfo.find('.txt-current-point').text()) : 0
    eventInfo.additional.drawnBox = boxNum
    eventInfo.additional.gachaPoint = gachaPoint
  }

  // Event 获取炼金活动信息
  if (url.includes('/frontier/alchemy/content/index')) {
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

  // Event 获取神灭战活动信息
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

  // Evoker 素材数据
  if (url.includes('/item/article_list_by_filter_mode')) {
    materialInfo.value = responseData
  }

  // Evoker 贤武数据
  if (url.includes('/weapon/list')) {
    const weaponList = responseData.list
    weaponList.forEach((weapon: any) => {
      const hitEvoker = evokerInfo.value.find(evoker => evoker.weaponId === Number(weapon.master.id))
      if (hitEvoker)
        hitEvoker.weaponLevel = Number(weapon.param.evolution) + 1
    })
  }

  // Evoker 塔罗数据
  if (url.includes('/summon/list')) {
    const summonList = responseData.list
    summonList.forEach((summon: any) => {
      const hitEvoker = evokerInfo.value.find(evoker => evoker.summonId === Number(summon.master.id))
      if (hitEvoker)
        hitEvoker.tarotLevel = Number(summon.param.evolution) + 2
    })
  }

  // Evoker 贤者数据
  if (url.includes('/npc/list')) {
    const npcList = responseData.list
    npcList.forEach((npc: any) => {
      const hitEvoker = evokerInfo.value.find(evoker => evoker.npcId === Number(npc.master.id))
      if (hitEvoker)
        hitEvoker.evokerLevel = Number(npc.param.evolution) + 1
    })
  }

  // Evoker 领域数据
  if (url.includes('/rest/npcevoker/evoker_list')) {
    const data = responseData.evoker
    const hitEvoker = evokerInfo.value.find(evoker => evoker.npcId === Number(data.param.npc_id))
    if (hitEvoker)
      hitEvoker.domainLevel = Number(data.param.evoker_lv)
  }

  // Evoker 贤者四技能数据 & Party 角色数据
  if (url.includes('/npc/npc')) {
    const npcDetail = responseData

    if (!npcDetail.master.id)
      return

    const hitEvoker = evokerInfo.value.find(evoker => evoker.npcId === Number(npcDetail.master.id))
    if (hitEvoker)
      hitEvoker.isAbility4Release = !!(npcDetail.ability[4] && npcDetail.ability[4].quest?.is_clear)

    // 记录角色信息
    const npcInfo: BuildNpc = {
      paramId: npcDetail.id,
      masterId: Number(npcDetail.master.id),
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

  // Evoker 获取沙盒4个六道boss进度条
  if (url.includes('/rest/replicard/stage')) {
    if ([6, 7, 8, 9].includes(Number(responseData.stage.stage_id))) {
      for (const division of Object.values(responseData.map.division_list)) {
        const hitQuest = (division as any).quest_list.find((quest: any) => xenoGauge.value.some(xeno => xeno.questId === quest.quest_id))
        if (hitQuest) {
          xenoGauge.value.find(xeno => xeno.questId === hitQuest.quest_id)!.gauge = hitQuest.xeno_sephira_gauge || 0
          break
        }
      }
    }
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

  // BattleLog 记录使用蓝绿药日志
  if (/\/rest\/(?:raid|multiraid)\/temporary_item_result\.json/.test(url)) {
    handleAttackRusultJson('temporary', responseData, JSON.parse(requestData!))
  }

  // BattleLog 记录使用大红日志
  if (/\/rest\/(?:raid|multiraid)\/user_recovery\.json/.test(url)) {
    handleAttackRusultJson('recovery', responseData, JSON.parse(requestData!))
  }

  // Notification 战斗结果特殊事件提醒
  if (/\/result(?:multi)?\/content\/index\/\d+/.test(url)) {
    getDisplayList(responseData)
    const result_data = responseData.option.result_data
    if (!result_data)
      return

    if (result_data.appearance?.is_quest && notificationSetting.value.appearanceQuest)
      createNotification({ message: 'Hell提醒', sound: 'hell' })

    if (result_data.replicard?.has_occurred_event && notificationSetting.value.replicardEvent) {
      createNotification({
        message: '沙盒宝箱提醒',
        iconUrl: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/enemy/s/4200151.png',
        sound: 'hell',
      })
    }

    if (result_data.advent_info?.is_over_limit && notificationSetting.value.isPointOverLimit)
      createNotification({ message: '四象点数已经超过上限!!!', sound: 'warning' })

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

    // 更新炼金活动token数量
    if (result_data.alchemist?.lottery_reward_info && Object.keys(result_data.alchemist?.lottery_reward_info).length > 0) {
      const eventInfo = eventList.value.find(event => event.type === 'alchemist')
      if (eventInfo)
        eventInfo.count = Number(result_data.alchemist.lottery_reward_info[0].possession_num)
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

  // BattleLog 记录副本start信息
  if (/\/rest\/(?:raid|multiraid)\/start\.json/.test(url)) {
    const battleId = String(responseData.raid_id)
    const timestamp = new Date().valueOf()
    const hitMemo = battleMemo.value.find(memo => memo.battleId === battleId)
    if (!hitMemo) {
      const questName = responseData.boss.param[0].monster

      const memo = { battleId, questName, timestamp, date: dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss') }
      battleMemo.value.push(memo)
      console.log('新增memo==>', memo)

      if (battleMemo.value.length > MaxMemoLength)
        battleMemo.value.shift()
      console.log('memoList==>', battleMemo.value)
    }

    if (!obTabId.value)
      return

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

  // ===============侧栏或详细面板打开时进行以下接口分析=====================
  // ===============侧栏或详细面板打开时进行以下接口分析=====================
  // ===============侧栏或详细面板打开时进行以下接口分析=====================
  // ===============侧栏或详细面板打开时进行以下接口分析=====================
  // ===============侧栏或详细面板打开时进行以下接口分析=====================
  // ===============侧栏或详细面板打开时进行以下接口分析=====================
  // ===============侧栏或详细面板打开时进行以下接口分析=====================
  // ===============侧栏或详细面板打开时进行以下接口分析=====================

  if (!obWindowId.value && !obTabId.value)
    return

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
  if (url.includes('/socket/uri')) {
    chrome.debugger.detach({ tabId: obTabId.value })
      .catch(error => console.log(error))
      .then(() => chrome.debugger.attach({ tabId: obTabId.value }, '1.2'))
      .then(() => chrome.debugger.sendCommand({ tabId: obTabId.value }, 'Network.enable'))
      .catch(error => console.log(error))
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
        is_dead: false,
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
      icon: item.image,
      id: item.action_id,
      index: item.index,
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
          reserve: false,
          abilityList: [],
        })
        battleRecord.value.sort((a, b) => Number(b.raid_id) - Number(a.raid_id))

        if (battleRecord.value.length > 30) {
          const lastIndex = battleRecord.value.findLastIndex(record => !record.reserve)
          battleRecord.value.splice(lastIndex, 1)
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

function initDailyCost() {
  if (!dailyCost.value.dateTime || !dayjs().isSame(dailyCost.value.dateTime, 'day')) {
    dailyCost.value = {
      dateTime: Date.now(),
      ap: 0,
      aap: 0,
      bp: 0,
      quest: [],
      raidIds: [],
    }
  }
}
