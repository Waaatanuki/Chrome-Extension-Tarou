<script setup lang="ts">
import type { BattleResult, GachaResult, NpcAbility, NpcInfo } from 'requestData'
import type { Player } from 'myStorage'
import { load } from 'cheerio'
import dayjs from 'dayjs'
import Dashborad from './tabs/dashboard/index.vue'
import EvokerPage from './tabs/evoker/index.vue'
import Sandglass from './tabs/sandglass/index.vue'
import BattleLog from './tabs/battleLog/index.vue'
import Party from './tabs/party/index.vue'
import BattleRecord from './tabs/battleRecord/index.vue'
import MarkedUser from './tabs/markedUser/index.vue'
import { battleRecord, evokerInfo, gachaRecord, jobAbilityList, legendticket, legendticket10, localNpcList, materialInfo, recoveryItemList, stone, uid, windowId, windowSize } from '~/logic'

const battleStartJson = ref()
const resultJson = ref()
const resultJsonPayload = ref()
const guardSettingJson = ref()
const specialSkillSetting = ref()
const bossConditionJson = ref()
const battleRecordLimit = ref(30)

const inLobby = ref(false)
const lobbyMemberList = ref()
const battleResultList = ref<BattleResult[]>([])

const deckJson = ref()
const calculateSetting = ref()

const paylaod = ref<any>()
const wsPayloadData = ref<any>()

const { sendBossInfo } = useCustomFetch()

async function getResponse(tabId: number, requestId: string, cb: (resp: any) => void) {
  let count = 0
  let resp: any

  const go = setInterval(async () => {
    if (count > 100) {
      clearInterval(go)
      return
    }
    if (resp) {
      clearInterval(go)
      try {
        cb(JSON.parse(resp.body))
      }
      catch (error) { }
      return
    }
    try {
      count++
      resp = await chrome.debugger.sendCommand({ tabId }, 'Network.getResponseBody', { requestId })
    }
    catch (error) { }
  }, 100)
}

chrome.debugger.onEvent.addListener((source, method, params: any) => {
  if (method === 'Network.responseReceived' && source.tabId) {
    const responseUrl = params.response.url
    const tabId = source.tabId
    const requestId = params.requestId
    // Dashboard 抽卡数据
    if (responseUrl.includes('game.granbluefantasy.jp/gacha/list')) {
      getResponse(tabId, requestId, (resp) => {
        stone.value = Number(resp.stone_num)

        // 十连ticket id为 20010
        legendticket10.value = Number(
          resp.legend.lineup
            .find((item: any) => item.text_btn_image === 'text_legend10')
            .legend_gacha_ticket_list.find((ticket: any) => Number(ticket.ticket_id) === 20010).ticket_num,
        )
        // 单抽ticket id为 20011
        legendticket.value = Number(
          resp.legend.lineup
            .find((item: any) => item.text_btn_image === 'text_legend')
            .legend_gacha_ticket_list.find((ticket: any) => Number(ticket.ticket_id) === 20011).ticket_num,
        )
      })
    }

    // Dashboard 抽卡记录
    if (responseUrl.includes('gacha/result//legend')) {
      getResponse(tabId, requestId, (resp) => {
        const RawData: GachaResult = resp

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
      })
    }

    // Dashboard 体力道具数据
    if (responseUrl.includes('/item/recovery_and_evolution_list_by_filter_mode')) {
      getResponse(tabId, requestId, (resp) => {
        const itemList = resp
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
      })
    }

    // Evoker 素材数据
    if (responseUrl.includes('/item/article_list_by_filter_mode')) {
      getResponse(tabId, requestId, (resp) => {
        materialInfo.value = resp
      })
    }

    // Evoker 贤武数据
    if (responseUrl.includes('/weapon/list')) {
      getResponse(tabId, requestId, (resp) => {
        const weaponList = resp.list
        weaponList.forEach((weapon: any) => {
          const hitEvoker = evokerInfo.value.find(evoker => evoker.weaponId === Number(weapon.master.id))
          if (hitEvoker)
            hitEvoker.weaponLevel = Number(weapon.param.evolution) + 1
        })
      })
    }

    // Evoker 塔罗数据
    if (responseUrl.includes('/summon/list')) {
      getResponse(tabId, requestId, (resp) => {
        const summonList = resp.list
        summonList.forEach((summon: any) => {
          const hitEvoker = evokerInfo.value.find(evoker => evoker.summonId === Number(summon.master.id))
          if (hitEvoker)
            hitEvoker.tarotLevel = Number(summon.param.evolution) + 2
        })
      })
    }

    // Evoker 贤者数据
    if (responseUrl.includes('/npc/list')) {
      getResponse(tabId, requestId, (resp) => {
        const npcList = resp.list
        npcList.forEach((npc: any) => {
          const hitEvoker = evokerInfo.value.find(evoker => evoker.npcId === Number(npc.master.id))
          if (hitEvoker)
            hitEvoker.evokerLevel = Number(npc.param.evolution) + 1
        })
      })
    }

    // Evoker 领域数据
    if (responseUrl.includes('/rest/npcevoker/evoker_list')) {
      getResponse(tabId, requestId, (resp) => {
        const data = resp.evoker
        const hitEvoker = evokerInfo.value.find(evoker => evoker.npcId === Number(data.param.npc_id))
        if (hitEvoker)
          hitEvoker.domainLevel = Number(data.param.evoker_lv)
      })
    }

    // Evoker 贤者四技能数据 & Party 角色数据
    if (responseUrl.includes('/npc/npc')) {
      getResponse(tabId, requestId, (resp) => {
        const npcDetail = resp
        const hitEvoker = evokerInfo.value.find(evoker => evoker.npcId === Number(npcDetail.master.id))
        if (hitEvoker)
          hitEvoker.isAbility4Release = !!(npcDetail.ability[4] && npcDetail.ability[4].quest?.is_clear)

        // 记录角色信息
        const npcInfo: NpcInfo = {
          id: npcDetail.id,
          image_id_3: '',
          master: {
            id: npcDetail.master.id,
            name: npcDetail.master.name,
          },
          action_ability: [],
        }

        for (let i = 1; i <= 4; i++) {
          const currentAbility = npcDetail.ability[i]
          if (currentAbility) {
            npcInfo.action_ability.push({
              action_id: currentAbility.action_id,
              icon_id: currentAbility.class_name,
              name: currentAbility.name,
              icon_type: currentAbility.icon_type,
              user_full_auto_setting_flag: currentAbility.user_full_auto_setting_flag,
            })
          }
        }
        const hitIndex = localNpcList.value.findIndex(npc => npc.id === npcDetail.id)
        if (hitIndex === -1)
          localNpcList.value.push(npcInfo)
        else
          localNpcList.value[hitIndex] = npcInfo
      })
    }

    // Party 记录当前队伍信息
    if (responseUrl.includes('party/deck')) {
      getResponse(tabId, requestId, (resp) => {
        deckJson.value = resp.deck
      })
    }

    // Party 记录伤害计算设置
    if (responseUrl.includes('party/calculate_setting')) {
      getResponse(tabId, requestId, (resp) => {
        const regex = /calculate_setting\/(\d+)\/(\d+)/
        const matches = responseUrl.match(regex)
        const priority = matches ? matches.slice(1).join('') : null
        calculateSetting.value = { priority, setting: resp }
      })
    }

    // Party 主角技能
    if (responseUrl.includes('/party/job_equipped')) {
      getResponse(tabId, requestId, (resp) => {
        const jobInfo = resp.job
        const job_param_id = String(jobInfo.param.id)

        for (let i = 1; i <= 4; i++) {
          const actionAbility = jobInfo.ability[i]
          if (actionAbility) {
            const ab: NpcAbility = {
              action_id: String(actionAbility.action_id),
              icon_id: actionAbility.class_name,
              name: actionAbility.name,
              icon_type: actionAbility.action_icon.split('_')[1],
              user_full_auto_setting_flag: actionAbility.user_full_auto_setting_flag,
            }
            if (i === 1)
              ab.job_param_id = job_param_id
            const hitIndex = jobAbilityList.value.findIndex(a => a.action_id === ab.action_id)
            if (hitIndex === -1)
              jobAbilityList.value.push(ab)
            else
              jobAbilityList.value[hitIndex] = ab
          }
        }
      })
    }

    // BattleLog 查询房间成员
    if (responseUrl.includes('/lobby/content/room_member')) {
      getResponse(tabId, requestId, (resp) => {
        inLobby.value = true
        lobbyMemberList.value = []
        const htmlString = decodeURIComponent(resp.data)
        const $ = load(htmlString)
        const memberEl = $('.prt-room-member').children()
        memberEl.each((i, elem) => {
          lobbyMemberList.value.push({
            nickname: elem.attribs['data-nick-name'],
            userId: elem.attribs['data-user-id'],
            userRank: elem.attribs['data-user-rank'],
            jobIcon: $(elem).find('.img-job-icon').attr('src'),
            attributeClass: $(elem).find('.ico-attribute').attr('class'),
            is_dead: false,
          })
        })
      })
    }

    // BattleLog 记录副本start信息
    if (/\/rest\/(raid|multiraid)\/start\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        inLobby.value = false
        battleStartJson.value = resp
        sendBossInfo(resp)
      })
    }

    // BattleLog 记录单次攻击日志
    if (/\/rest\/(raid|multiraid)\/normal_attack_result\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        resultJson.value = { type: 'normal', result: resp }
      })
    }

    // BattleLog 记录使用召唤日志
    if (/\/rest\/(raid|multiraid)\/summon_result\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        resultJson.value = { type: 'summon', result: resp }
      })
    }

    // BattleLog 记录使用FC日志
    if (/\/rest\/(raid|multiraid)\/fatal_chain_result\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        resultJson.value = { type: 'fc', result: resp }
      })
    }

    // BattleLog 记录使用技能日志
    if (/\/rest\/(raid|multiraid)\/ability_result\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        resultJson.value = { type: 'ability', result: resp }
      })
    }

    // BattleLog 记录子技能日志
    if (/\/rest\/(raid|multiraid)\/get_select_if\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        const data = resp
        const hit = battleRecord.value.find(record => record.raid_id === paylaod.value.raid_id)
        if (!hit)
          return
        const hitAbility = hit.abilityList.find(ability => ability.id === paylaod.value.ability_id)
        if (!hitAbility)
          return
        hitAbility.subAbility = Object.values(data.select_ability_info).map((item: any) => ({
          icon: item.image,
          id: item.action_id,
          index: item.index,
        }))
      })
    }

    // BattleLog 记录使用蓝绿药日志
    if (/\/rest\/(raid|multiraid)\/temporary_item_result\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        resultJson.value = { type: 'temporary', result: resp }
      })
    }

    // BattleLog 记录使用大红日志
    if (/\/rest\/(raid|multiraid)\/user_recovery\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        resultJson.value = { type: 'recovery', result: resp }
      })
    }

    // BattleLog 记录切换guard日志
    if (/\/rest\/(raid|multiraid)\/guard_setting\.json/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        guardSettingJson.value = {
          raid_id: paylaod.value.raid_id,
          guard_status: resp.guard_status,
        }
      })
    }

    // BattleLog 记录boss buff信息
    if (/\/rest\/(raid|multiraid)\/condition/.test(responseUrl)) {
      getResponse(tabId, requestId, (resp) => {
        bossConditionJson.value = resp.condition
      })
    }

    // BattleLog 记录战斗结果
    if (responseUrl.includes('resultmulti/content/detail')) {
      const regex = /\/detail\/(\d+)\?/
      const match = regex.exec(responseUrl) as RegExpExecArray
      const raid_id = Number(match[1])
      const hit = battleRecord.value.find(record => record.raid_id === raid_id)
      if (!hit || !hit.hasResult) {
        getResponse(tabId, requestId, (resp) => {
          const htmlString = decodeURIComponent(resp.data)
          const $ = load(htmlString)
          const raidName = $('.txt-enemy-name').text()
          const endTimesstr = $('.txt-defeat-value').first().text()
          const endTimestamp = dayjs(endTimesstr, 'MM/DD HH:mm').year(dayjs().year()).valueOf()
          const gainList: string[] = []

          $('.txt-gain-value').each((i, elem) => {
            gainList.push($(elem).text())
          })
          const point = gainList[2]
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

          const memberList: any[] = resp.option.member_list
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
              point,
              duration: time,
              treasureList,
              reserve: false,
              abilityList: [],
            })
            battleRecord.value.sort((a, b) => Number(b.raid_id) - Number(a.raid_id))

            if (battleRecord.value.length > battleRecordLimit.value) {
              const lastIndex = battleRecord.value.findLastIndex(record => !record.reserve)
              battleRecord.value.splice(lastIndex, 1)
            }
          }
          else {
            hit.endTimestamp = endTimestamp
            hit.player[0].image_id = player[0].image_id
            hit.hasResult = true
            hit.point = point
            hit.duration = time
            hit.treasureList = treasureList
          }
        })
      }
    }
  }

  if (method === 'Network.requestWillBeSent' && source.tabId) {
    const requestUrl = params.request.url

    // Party 角色技能切换fa开关
    if (requestUrl.includes('/npc/full_auto_ability_setting')) {
      const faAbilitySetting = JSON.parse(params.request.postData)
      const hit = localNpcList.value.find(npc => npc.id === faAbilitySetting.user_npc_id)
      if (hit)
        hit.action_ability[faAbilitySetting.ability_num - 1].user_full_auto_setting_flag = faAbilitySetting.auto_execute_flag
    }

    //  Party 主角技能切换fa开关
    if (requestUrl.includes('/job/fullautosetting/pc_full_auto_setting')) {
      const faAbilitySetting = JSON.parse(params.request.postData)
      const hit = jobAbilityList.value.find(a => a.action_id === String(faAbilitySetting.ability_id))
      if (hit)
        hit.user_full_auto_setting_flag = faAbilitySetting.auto_execute_flag
    }

    // Party 记录更改伤害计算设置
    if (requestUrl.includes('party/save_calculate_setting')) {
      const setting = JSON.parse(params.request.postData)
      calculateSetting.value = { priority: String(setting.group_priority) + String(setting.priority), setting }
    }

    // BattleLog 记录副本start信息
    if (/\/rest\/(raid|multiraid)\/start\.json/.test(requestUrl)) {
      const searchParams = new URLSearchParams(requestUrl)
      uid.value = searchParams.get('uid') || ''
    }

    // BattleLog 记录单次攻击日志
    if (/\/rest\/(raid|multiraid)\/normal_attack_result\.json/.test(requestUrl))
      resultJsonPayload.value = JSON.parse(params.request.postData)

    // BattleLog 记录使用召唤日志
    if (/\/rest\/(raid|multiraid)\/summon_result\.json/.test(requestUrl))
      resultJsonPayload.value = JSON.parse(params.request.postData)

    // BattleLog 记录使用FC日志
    if (/\/rest\/(raid|multiraid)\/fatal_chain_result\.json/.test(requestUrl))
      resultJsonPayload.value = JSON.parse(params.request.postData)

    // BattleLog 记录使用技能日志
    if (/\/rest\/(raid|multiraid)\/ability_result\.json/.test(requestUrl))
      resultJsonPayload.value = JSON.parse(params.request.postData)

    // BattleLog 记录子技能日志
    if (/\/rest\/(raid|multiraid)\/get_select_if\.json/.test(requestUrl))
      paylaod.value = JSON.parse(params.request.postData)

    // BattleLog 记录切换Guard日志
    if (/\/rest\/(raid|multiraid)\/guard_setting\.json/.test(requestUrl))
      paylaod.value = JSON.parse(params.request.postData)

    // BattleLog 记录使用蓝绿药日志
    if (/\/rest\/(raid|multiraid)\/temporary_item_result\.json/.test(requestUrl))
      resultJsonPayload.value = JSON.parse(params.request.postData)

    // BattleLog 记录使用大红日志
    if (/\/rest\/(raid|multiraid)\/user_recovery\.json/.test(requestUrl))
      resultJsonPayload.value = JSON.parse(params.request.postData)

    // BattleLog 记录切换奥义温存日志
    if (/\/rest\/(raid|multiraid)\/special_skill_setting/.test(requestUrl))
      specialSkillSetting.value = JSON.parse(params.request.postData)
  }

  //   getResponse(tabId, requestId, (resp) => {
  if (method === 'Network.webSocketFrameReceived') {
    const payloadData: string = params.response?.payloadData || ''
    if (payloadData.substring(0, 2) === '42') {
      // console.log(JSON.parse(payloadData.substring(2))[1].bossUpdate?.param?.boss1_condition)
      wsPayloadData.value = JSON.parse(payloadData.substring(2))[1]
    }
  }
})

chrome.windows.onBoundsChanged.addListener((windowInfo) => {
  if (windowId.value !== windowInfo.id)
    return
  windowSize.value.left = windowInfo.left ?? 300
  windowSize.value.top = windowInfo.top ?? 0
  windowSize.value.width = windowInfo.width ?? 800
  windowSize.value.height = windowInfo.height ?? 600
})

window.addEventListener('beforeunload', () => {
  chrome.debugger.detach({ tabId: Number(document.URL.split('?')[1]) })
})
</script>

<template>
  <main>
    <ElTabs type="border-card">
      <ElTabPane label="主页">
        <Dashborad />
      </ElTabPane>
      <ElTabPane label="贤者素材">
        <EvokerPage />
      </ElTabPane>
      <ElTabPane label="沙漏统计">
        <Sandglass />
      </ElTabPane>
      <ElTabPane label="队伍信息">
        <Party :deck-json="deckJson" :calculate-setting="calculateSetting" />
      </ElTabPane>
      <ElTabPane label="战斗日志">
        <BattleLog
          :battle-start-json="battleStartJson"
          :result-json="resultJson"
          :result-json-payload="resultJsonPayload"
          :boss-condition-json="bossConditionJson"
          :in-lobby="inLobby"
          :lobby-member-list="lobbyMemberList"
          :battle-result-list="battleResultList"
          :guard-setting-json="guardSettingJson"
          :special-skill-setting="specialSkillSetting"
          :battle-record-limit="battleRecordLimit"
          :ws-payload-data="wsPayloadData"
        />
      </ElTabPane>
      <ElTabPane label="战斗历史">
        <BattleRecord :battle-record-limit="battleRecordLimit" />
      </ElTabPane>
      <ElTabPane label="标记用户">
        <MarkedUser />
      </ElTabPane>
    </ElTabs>
  </main>
</template>
