<script setup lang="ts">
import type { BattleResult, NpcAbility, NpcInfo } from 'requestData'
import type { Player } from 'myStorage'
import { load } from 'cheerio'
import dayjs from 'dayjs'
import Dashborad from './tabs/dashboard/index.vue'
import EvokerPage from './tabs/evoker/index.vue'
import BattleLog from './tabs/battleLog/index.vue'
import Party from './tabs/party/index.vue'
import BattleRecord from './tabs/battleRecord/index.vue'
import { battleRecord, evokerInfo, jobAbilityList, legendticket, legendticket10, localNpcList, materialInfo, recoveryItemList, stone } from '~/logic'

const userId = ref<string>('')
const battleStartJson = ref()
const resultJson = ref()
const resultJsonPayload = ref()
const guardSettingJson = ref()
const specialSkillSetting = ref()
const bossConditionJson = ref()
const battleRecordLimit = ref(30)

const lobbyMemberList = ref()
const battleResultList = ref<BattleResult[]>([])

const deckJson = ref()
const calculateSetting = ref()

chrome.devtools.network.onRequestFinished.addListener((request) => {
  // Dashboard 抽卡数据
  if (request.request.url.includes('game.granbluefantasy.jp/gacha/list')) {
    request.getContent((content: string) => {
      const gachaInfo = JSON.parse(content)
      stone.value = Number(gachaInfo.stone_num)

      // 十连ticket id为 20010
      legendticket10.value = Number(
        gachaInfo.legend.lineup
          .find((item: any) => item.text_btn_image === 'text_legend10')
          .legend_gacha_ticket_list.find((ticket: any) => Number(ticket.ticket_id) === 20010).ticket_num,
      )
      // 单抽ticket id为 20011
      legendticket.value = Number(
        gachaInfo.legend.lineup
          .find((item: any) => item.text_btn_image === 'text_legend')
          .legend_gacha_ticket_list.find((ticket: any) => Number(ticket.ticket_id) === 20011).ticket_num,
      )
    })
  }

  // Dashboard 体力道具数据
  if (request.request.url.includes('/item/recovery_and_evolution_list_by_filter_mode')) {
    request.getContent((content: string) => {
      const itemList = JSON.parse(content)
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
  if (request.request.url.includes('/item/article_list_by_filter_mode')) {
    request.getContent((content: string) => {
      materialInfo.value = JSON.parse(content)
    })
  }

  // Evoker 贤武数据
  if (request.request.url.includes('/weapon/list')) {
    request.getContent((content: string) => {
      const weaponList = JSON.parse(content).list
      weaponList.forEach((weapon: any) => {
        const hitEvoker = evokerInfo.value.find(evoker => evoker.weaponId === Number(weapon.master.id))
        if (hitEvoker)
          hitEvoker.weaponLevel = Number(weapon.param.evolution) + 1
      })
    })
  }

  // Evoker 贤者数据
  if (request.request.url.includes('/npc/list')) {
    request.getContent((content: string) => {
      const npcList = JSON.parse(content).list
      npcList.forEach((npc: any) => {
        const hitEvoker = evokerInfo.value.find(evoker => evoker.npcId === Number(npc.master.id))
        if (hitEvoker)
          hitEvoker.evokerLevel = Number(npc.param.evolution) + 1
      })
    })
  }

  // Evoker 贤者四技能数据 & Party 角色数据
  if (request.request.url.includes('/npc/npc')) {
    request.getContent((content: string) => {
      const npcDetail = JSON.parse(content)
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

  // Party 角色技能切换fa开关
  if (request.request.url.includes('/npc/full_auto_ability_setting')) {
    const faAbilitySetting = JSON.parse(request.request.postData!.text!)
    const hit = localNpcList.value.find(npc => npc.id === faAbilitySetting.user_npc_id)
    if (hit)
      hit.action_ability[faAbilitySetting.ability_num - 1].user_full_auto_setting_flag = faAbilitySetting.auto_execute_flag
  }

  // Party 主角技能
  if (request.request.url.includes('/party/job_equipped')) {
    request.getContent((content: string) => {
      const jobInfo = JSON.parse(content).job
      const job_param_id = String(jobInfo.param.id)

      for (let i = 1; i <= 4; i++) {
        const actionAbility = jobInfo.ability[i]
        if (actionAbility) {
          const ab: NpcAbility = {
            action_id: String(actionAbility.action_id),
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

  // Party 主角技能切换fa开关
  if (request.request.url.includes('/job/fullautosetting/pc_full_auto_setting')) {
    const faAbilitySetting = JSON.parse(request.request.postData!.text!)
    const hit = jobAbilityList.value.find(a => a.action_id === String(faAbilitySetting.ability_id))
    if (hit)
      hit.user_full_auto_setting_flag = faAbilitySetting.auto_execute_flag
  }

  // Evoker 塔罗数据
  if (request.request.url.includes('/summon/list')) {
    request.getContent((content: string) => {
      const summonList = JSON.parse(content).list
      summonList.forEach((summon: any) => {
        const hitEvoker = evokerInfo.value.find(evoker => evoker.summonId === Number(summon.master.id))
        if (hitEvoker)
          hitEvoker.tarotLevel = Number(summon.param.evolution) + 2
      })
    })
  }

  // Evoker 领域数据
  if (request.request.url.includes('/rest/npcevoker/evoker_list')) {
    request.getContent((content: string) => {
      const data = JSON.parse(content).evoker
      const hitEvoker = evokerInfo.value.find(evoker => evoker.npcId === Number(data.param.npc_id))
      if (hitEvoker)
        hitEvoker.domainLevel = Number(data.param.evoker_lv)
    })
  }

  // BattleLog 查询房间成员
  if (request.request.url.includes('/lobby/content/room_member')) {
    request.getContent((content: string) => {
      lobbyMemberList.value = []
      const resp = JSON.parse(content)
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
  if (/\/rest\/(raid|multiraid)\/start\.json/.test(request.request.url)) {
    request.request.queryString.forEach((param) => {
      if (param.name === 'uid')
        userId.value = param.value
    })
    request.getContent((content: string) => {
      battleStartJson.value = JSON.parse(content)
    })
  }

  // BattleLog 记录单次攻击日志
  if (/\/rest\/(raid|multiraid)\/normal_attack_result\.json/.test(request.request.url)) {
    resultJsonPayload.value = JSON.parse(request.request.postData!.text!)
    request.getContent((content: string) => {
      resultJson.value = { type: 'normal', result: JSON.parse(content) }
    })
  }

  // BattleLog 记录使用召唤日志
  if (/\/rest\/(raid|multiraid)\/summon_result\.json/.test(request.request.url)) {
    resultJsonPayload.value = JSON.parse(request.request.postData!.text!)
    request.getContent((content: string) => {
      resultJson.value = { type: 'summon', result: JSON.parse(content) }
    })
  }

  // BattleLog 记录使用技能日志
  if (/\/rest\/(raid|multiraid)\/ability_result\.json/.test(request.request.url)) {
    resultJsonPayload.value = JSON.parse(request.request.postData!.text!)
    request.getContent((content: string) => {
      resultJson.value = { type: 'ability', result: JSON.parse(content) }
    })
  }

  // BattleLog 记录子技能日志
  if (/\/rest\/(raid|multiraid)\/get_select_if\.json/.test(request.request.url)) {
    const paylaod = JSON.parse(request.request.postData!.text!)
    request.getContent((content: string) => {
      const data = JSON.parse(content)
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
    })
  }

  // BattleLog 记录使用蓝绿药日志
  if (/\/rest\/(raid|multiraid)\/temporary_item_result\.json/.test(request.request.url)) {
    resultJsonPayload.value = JSON.parse(request.request.postData!.text!)
    request.getContent((content: string) => {
      resultJson.value = { type: 'temporary', result: JSON.parse(content) }
    })
  }

  // BattleLog 记录使用大红日志
  if (/\/rest\/(raid|multiraid)\/user_recovery\.json/.test(request.request.url)) {
    resultJsonPayload.value = JSON.parse(request.request.postData!.text!)
    request.getContent((content: string) => {
      resultJson.value = { type: 'recovery', result: JSON.parse(content) }
    })
  }

  // BattleLog 记录切换guard日志
  if (/\/rest\/(raid|multiraid)\/guard_setting\.json/.test(request.request.url)) {
    request.getContent((content: string) => {
      guardSettingJson.value = {
        raid_id: JSON.parse(request.request.postData!.text!).raid_id,
        guard_status: JSON.parse(content).guard_status,
      }
    })
  }

  // BattleLog 记录切换奥义温存日志
  if (/\/rest\/(raid|multiraid)\/special_skill_setting\.json/.test(request.request.url))
    specialSkillSetting.value = JSON.parse(request.request.postData!.text!)

  // BattleLog 记录boss buff信息
  if (/\/rest\/(raid|multiraid)\/condition/.test(request.request.url)) {
    request.getContent((content: string) => {
      bossConditionJson.value = JSON.parse(content).condition
    })
  }

  // BattleLog 记录战斗结果
  if (request.request.url.includes('resultmulti/content/detail')) {
    const regex = /\/detail\/(\d+)\?/
    const match = regex.exec(request.request.url) as RegExpExecArray
    const raid_id = Number(match[1])
    const hit = battleRecord.value.find(record => record.raid_id === raid_id)
    if (!hit || !hit.hasResult) {
      request.getContent((content: string) => {
        const resp = JSON.parse(content)
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

        const treasureList: { src: string; number: string; boxClass: string }[] = []

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

  // Deck 记录当前队伍信息
  if (request.request.url.includes('party/deck')) {
    request.getContent((content: string) => {
      try {
        deckJson.value = JSON.parse(content).deck
      }
      catch (error) {
      }
    })
  }

  // Deck 记录伤害计算设置
  if (request.request.url.includes('party/calculate_setting')) {
    request.getContent((content: string) => {
      calculateSetting.value = JSON.parse(content)
    })
  }

  // Deck 记录更改伤害计算设置
  if (request.request.url.includes('party/save_calculate_setting'))
    calculateSetting.value = JSON.parse(request.request.postData!.text!)
})
</script>

<template>
  <main>
    <el-tabs type="border-card">
      <el-tab-pane label="主页">
        <Dashborad />
      </el-tab-pane>
      <el-tab-pane label="贤者素材">
        <EvokerPage />
      </el-tab-pane>
      <el-tab-pane label="队伍信息">
        <Party :deck-json="deckJson" :calculate-setting="calculateSetting" />
      </el-tab-pane>
      <el-tab-pane label="战斗日志">
        <BattleLog
          :user-id="userId"
          :battle-start-json="battleStartJson"
          :result-json="resultJson"
          :result-json-payload="resultJsonPayload"
          :boss-condition-json="bossConditionJson"
          :lobby-member-list="lobbyMemberList"
          :battle-result-list="battleResultList"
          :guard-setting-json="guardSettingJson"
          :special-skill-setting="specialSkillSetting"
          :battle-record-limit="battleRecordLimit"
        />
      </el-tab-pane>
      <el-tab-pane label="战斗历史">
        <BattleRecord :battle-record-limit="battleRecordLimit" />
      </el-tab-pane>
    </el-tabs>
  </main>
</template>
