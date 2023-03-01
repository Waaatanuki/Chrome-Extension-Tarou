<template>
  <el-tabs type="border-card">
    <el-tab-pane label="主页"> <Dashborad /></el-tab-pane>
    <el-tab-pane label="贤者素材"> <EvokerPage /></el-tab-pane>
    <el-tab-pane label="战斗日志"><BattleLog /></el-tab-pane>
    <el-tab-pane label="猎金统计"><GoldBrick /></el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>
  <div></div>
</template>

<script setup lang="ts">
import Dashborad from './tabs/dashboard/index.vue'
import EvokerPage from './tabs/evoker/index.vue'
import BattleLog from './tabs/battleLog/index.vue'
import GoldBrick from './tabs/goldBrick/index.vue'
import useStore from '@/store'
import { load } from 'cheerio'
const { dashboard, evoker, battleLog } = useStore()

chrome.devtools.network.onRequestFinished.addListener(async function (request) {
  if (request.request.url.includes('game.granbluefantasy.jp/gacha/list')) {
    request.getContent((content: string) => {
      const gachaInfo = JSON.parse(content)
      console.log(gachaInfo)
      dashboard.stone = Number(gachaInfo.stone_num)

      dashboard.legendticket10 = Number(
        gachaInfo.legend.lineup.find(
          (item: any) => item.text_btn_image == 'text_legend10'
        ).ticket_num
      )

      dashboard.legendticket = Number(
        gachaInfo.legend.lineup.find(
          (item: any) => item.text_btn_image == 'text_legend'
        ).ticket_num
      )
    })
  }

  if (request.request.url.includes('/item/article_list_by_filter_mode')) {
    request.getContent((content: string) => {
      evoker.materialInfo = JSON.parse(content)
    })
  }
  if (request.request.url.includes('/weapon/list')) {
    request.getContent((content: string) => {
      const weaponList = JSON.parse(content).list

      weaponList.forEach((weapon: any) => {
        const hitEvoker = evoker.evokerInfo.find(
          (evoker: any) => evoker.weaponId == weapon.master.id
        )
        if (hitEvoker)
          hitEvoker.weaponLevel = Number(weapon.param.evolution) + 1
      })
    })
  }
  if (request.request.url.includes('/npc/list')) {
    request.getContent((content: string) => {
      const npcList = JSON.parse(content).list

      npcList.forEach((npc: any) => {
        const hitEvoker = evoker.evokerInfo.find(
          (evoker: any) => evoker.npcId == npc.master.id
        )
        if (hitEvoker) {
          hitEvoker.evokerLevel = Number(npc.param.evolution) + 1
        }
      })
    })
  }
  if (request.request.url.includes('/summon/list')) {
    request.getContent((content: string) => {
      const summonList = JSON.parse(content).list

      summonList.forEach((summon: any) => {
        const hitEvoker = evoker.evokerInfo.find(
          (evoker: any) => evoker.summonId == summon.master.id
        )
        if (hitEvoker) {
          hitEvoker.tarotLevel = Number(summon.param.evolution) + 2
        }
      })
    })
  }
  if (request.request.url.includes('/rest/npcevoker/evoker_list')) {
    request.getContent((content: string) => {
      const data = JSON.parse(content).evoker

      const hitEvoker = evoker.evokerInfo.find(
        (evoker: any) => evoker.npcId == data.param.npc_id
      )
      if (hitEvoker) {
        hitEvoker.domainLevel = Number(data.param.evoker_lv)
      }
    })
  }

  // 记录战斗日志
  if (
    request.request.url.includes('rest/raid/start.json') ||
    request.request.url.includes('rest/multiraid/start.json')
  ) {
    request.getContent((content: string) => {
      battleLog.rawData = JSON.parse(content)
    })
  }
  // 记录单次攻击日志
  if (
    request.request.url.includes('rest/raid/normal_attack_result.json') ||
    request.request.url.includes('rest/multiraid/normal_attack_result.json')
  ) {
    request.getContent((content: string) => {
      battleLog.attackResult = JSON.parse(content)
      console.log(battleLog.attackResult)
    })
  }
  // 记录战斗结果
  if (request.request.url.includes('resultmulti/content/detail')) {
    const regex = /\/detail\/(\d+)\?/
    const match = regex.exec(request.request.url) as RegExpExecArray
    const raidId = match[1]
    if (!battleLog.battleResultList.some(result => result.raidId == raidId))
      request.getContent((content: string) => {
        const resp = JSON.parse(content)
        const htmlString = decodeURIComponent(resp.data)

        const $ = load(htmlString)
        const raidName = $('.txt-enemy-name').text()
        const raidTime = $('.txt-defeat-value').first().text()
        const gainList: string[] = []

        $('.txt-gain-value').each(function (i, elem) {
          gainList.push($(this).text())
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

        const treasureList: any[] = []

        $('.lis-treasure').each(function (i, elem) {
          treasureList.push({
            src: $(this).find('img').attr('src'),
            number: $(this).find('.prt-article-count').text().split('x')[1],
            boxClass: $(this).children().last().attr('class'),
          })
        })

        const info = {
          raidId,
          raidTime,
          raidName,
          point,
          turn,
          time,
          speed,
          treasureList,
        }

        battleLog.battleResultList.push(info)

        battleLog.battleResultList.sort(
          (a, b) => Number(b.raidId) - Number(a.raidId)
        )
      })
  }
})
</script>

<style scoped></style>
