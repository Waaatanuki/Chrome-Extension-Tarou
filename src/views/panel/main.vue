<script setup lang="ts">
import { load } from 'cheerio'
import dayjs from 'dayjs'
import Dashborad from './tabs/dashboard/index.vue'
import EvokerPage from './tabs/evoker/index.vue'
import BattleLog from './tabs/battleLog/index.vue'
import Party from './tabs/party/index.vue'
import { evokerInfo, jobAbilityList, legendticket, legendticket10, localNpcList, materialInfo, recoveryItemList, stone } from '~/logic'
import type { BattleResult, NpcAbility, NpcInfo } from '~/logic/types'

const userId = ref<string>('')
const battleStartJson = ref()
const normalAttackResultJson = ref()
const summonResultJson = ref()
const abilityResultJson = ref()
const bossConditionJson = ref()

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
        hitEvoker.isAbility4Release = !!(npcDetail.action_ability4 && npcDetail.action_ability4.quest.is_clear)

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
        const currentAbility = npcDetail[`action_ability${i}`]
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
      const job_param_id = jobInfo.param.id

      for (let i = 1; i <= 4; i++) {
        const actionAbility = jobInfo.action_ability[i]
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
  if (request.request.url.includes('rest/raid/start.json') || request.request.url.includes('rest/multiraid/start.json')) {
    request.request.queryString.forEach((param) => {
      if (param.name === 'uid')
        userId.value = param.value
    })
    request.getContent((content: string) => {
      battleStartJson.value = JSON.parse(content)
    })
  }

  // BattleLog 记录单次攻击日志
  if (request.request.url.includes('rest/raid/normal_attack_result.json') || request.request.url.includes('rest/multiraid/normal_attack_result.json')) {
    request.getContent((content: string) => {
      normalAttackResultJson.value = JSON.parse(content)
    })
  }

  // BattleLog 记录使用召唤日志
  if (request.request.url.includes('rest/raid/summon_result.json') || request.request.url.includes('rest/multiraid/summon_result.json')) {
    request.getContent((content: string) => {
      summonResultJson.value = JSON.parse(content)
    })
  }

  // BattleLog 记录使用技能日志
  if (request.request.url.includes('rest/raid/ability_result.json') || request.request.url.includes('rest/multiraid/ability_result.json')) {
    request.getContent((content: string) => {
      abilityResultJson.value = JSON.parse(content)
    })
  }

  // BattleLog 记录boss buff信息
  if (request.request.url.includes('rest/raid/condition')) {
    request.getContent((content: string) => {
      bossConditionJson.value = JSON.parse(content).condition
    })
  }

  // BattleLog 记录战斗结果
  if (request.request.url.includes('resultmulti/content/detail')) {
    const regex = /\/detail\/(\d+)\?/
    const match = regex.exec(request.request.url) as RegExpExecArray
    const battleId = match[1]
    if (!battleResultList.value.some(result => result.battleId === battleId)) {
      request.getContent((content: string) => {
        const resp = JSON.parse(content)
        const htmlString = decodeURIComponent(resp.data)

        const $ = load(htmlString)
        const raidName = $('.txt-enemy-name').text()
        const raidTime = $('.txt-defeat-value').first().text()
        const gainList: string[] = []

        $('.txt-gain-value').each((i, elem) => {
          gainList.push($(elem).text())
        })
        const point = gainList[2]
        const turn = gainList[3]
        const time = gainList[4]

        function getSpeed(point: string, time: string): string {
          const _point = Number(point.split(',').join(''))
          const minute = Number(time.split(':')[0])
          const second = Number(time.split(':')[1])
          return (_point / (second / 60 + minute) / 1000000).toFixed(0)
        }

        const speed = getSpeed(point, time)

        const treasureList: { src: string; number: string; boxClass: string }[] = []

        $('.lis-treasure').each((i, elem) => {
          treasureList.push({
            src: $(elem).find('img').attr('src') || '',
            number: $(elem).find('.prt-article-count').text().split('x')[1],
            boxClass: $(elem).children().last().attr('class') || '',
          })
        })

        battleResultList.value.push({ battleId, raidTime, raidName, point, turn, time, speed, treasureList })
        battleResultList.value.sort((a, b) => Number(b.battleId) - Number(a.battleId))
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
  <el-tabs type="border-card">
    <el-tab-pane label="主页">
      <Dashborad />
    </el-tab-pane>
    <el-tab-pane label="贤者素材">
      <EvokerPage />
    </el-tab-pane>
    <el-tab-pane label="战斗日志">
      <BattleLog
        :user-id="userId"
        :battle-start-json="battleStartJson"
        :normal-attack-result-json="normalAttackResultJson"
        :summon-result-json="summonResultJson"
        :ability-result-json="abilityResultJson"
        :boss-condition-json="bossConditionJson"
        :lobby-member-list="lobbyMemberList"
        :battle-result-list="battleResultList"
      />
    </el-tab-pane>
    <el-tab-pane label="队伍信息">
      <Party :deck-json="deckJson" :calculate-setting="calculateSetting" />
    </el-tab-pane>
  </el-tabs>
</template>
