/* eslint-disable no-console */
import { load } from 'cheerio'
import type { BattleMemo, GoldBrickData } from '~/logic/types'
import { battleMemo, eternitySandData, goldBrickData, goldBrickTableData } from '~/logic/storage'
import { isForbiddenUrl } from '~/env'
import { noticeItem } from '~/constants'
import { Raid_EternitySand, Raid_GoldBrick, targetRaid } from '~/constants/raid'

(() => {
  const raidUrlREG = /granbluefantasy.jp\/#raid_multi\/[0-9]+/
  const resultUrlREG = /granbluefantasy.jp\/#result_multi\/[0-9]+/
  let checkFlag = false
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 记录id与副本名称
    if (changeInfo.url && raidUrlREG.test(changeInfo.url) && tab.favIconUrl && !isForbiddenUrl(changeInfo.url))
      checkFlag = false

    if (changeInfo.status === 'loading' && !changeInfo.url && tab.url && raidUrlREG.test(tab.url) && !isForbiddenUrl(tab.url))
      checkFlag = true

    if (changeInfo.status === 'complete' && tab.url && raidUrlREG.test(tab.url) && !isForbiddenUrl(tab.url)) {
      if (!checkFlag)
        return

      const battle_id = tab.url.match(/[0-9]+/g)![0]
      const hitMemo = battleMemo.value.find(memo => memo.battle_id === battle_id)
      if (hitMemo)
        return
      console.log('gogogo')
      chrome.tabs.sendMessage(tabId, { todo: 'getRaidName' }).then((res) => {
        if (!res?.questName)
          return
        console.log('memo===>', { battle_id, quest_name: res.questName, timestamp: Date.now() })
        const hit = targetRaid.find(r => r.tweet_name_en === res.questName || r.tweet_name_jp === res.questName)
        if (!hit)
          return

        battleMemo.value.push({ battle_id, quest_id: hit.quest_id, timestamp: Date.now() })

        if (battleMemo.value.length > 15)
          battleMemo.value.shift()
        console.log('memoList===>', battleMemo.value)
      })
    }

    if (changeInfo.url && resultUrlREG.test(changeInfo.url) && tab.favIconUrl && !isForbiddenUrl(changeInfo.url)) {
      // 记录id与掉落结果
      const battle_id = changeInfo.url.match(/[0-9]+/g)![0]
      const hitMemo = battleMemo.value.find(memo => memo.battle_id === battle_id)
      if (!hitMemo)
        return
      chrome.tabs.sendMessage(tabId, { todo: 'getBattleResult' }).then((res) => {
        if (!res?.domStr)
          return

        const $ = load(res.domStr)
        const treasureList: Treasure[] = []

        $('.btn-treasure-item').each((i, elem) => {
          const count = $(elem).find('.prt-article-count')?.text().split('x')[1]
          treasureList.push({
            box: String($(elem).data().box),
            key: $(elem).data().key as string,
            count: count ? Number(count) : 1,
          })
        })
        showNotifications(treasureList)
        checkGoldBrick(treasureList, hitMemo)
        checkEternitySand(treasureList, hitMemo)

        battleMemo.value = battleMemo.value.filter(memo => memo.battle_id !== battle_id)
      })
    }
  })

  function showNotifications(treasureList: Treasure[]) {
    const hitTreasure = treasureList.find(treasure => noticeItem.some(item => item.key === treasure.key))
    const length = Math.floor(Math.random() * 10) + 1

    let str = ''
    for (let i = 0; i < length; i++)
      str += 'e'

    if (hitTreasure) {
      chrome.notifications.create({
        iconUrl: `/assets/${hitTreasure.key}.png`,
        message: ` G${str}t☆Daze!`,
        type: 'basic',
        title: '通知',
      })
    }
  }

  function checkEternitySand(treasureList: Treasure[], hitMemo: BattleMemo) {
    const raid = Raid_EternitySand.find(raid => raid.quest_id === hitMemo.quest_id)
    if (!raid)
      return

    let hitRaid = eternitySandData.value.find(raid => raid.quest_id === hitMemo.quest_id)
    if (!hitRaid) {
      hitRaid = { ...raid, total: 0, blueChest: 0, eternitySand: 0 }
      eternitySandData.value.push(hitRaid)
    }

    hitRaid.total!++
    hitRaid.lastDropCount!++
    treasureList.forEach((treasure) => {
      treasure.box === '11' && hitRaid!.blueChest!++
      if (treasure.key === '10_215') {
        hitRaid!.eternitySand!++
        hitRaid!.lastDropCount = 0
      }
    })
  }

  function checkGoldBrick(treasureList: Treasure[], hitMemo: BattleMemo) {
    const raid = Raid_GoldBrick.find(raid => raid.quest_id === hitMemo.quest_id)
    if (!raid)
      return

    let hitRaid = goldBrickTableData.value.find(raid => raid.quest_id === hitMemo.quest_id)
    if (!hitRaid) {
      hitRaid = {
        quest_id: raid.quest_id,
        total: 0,
        blueChest: 0,
        goldBrick: 0,
        ring1: 0,
        ring2: 0,
        ring3: 0,
        lastBlueChestCount: 0,
      }
      goldBrickTableData.value.push(hitRaid)
    }

    const data: GoldBrickData = { raidName: raid.raidName, battleId: hitMemo.battle_id, timestamp: Date.now() }

    hitRaid.total!++
    treasureList.forEach((treasure) => {
      if (treasure.box === '11') {
        data.blueChests = treasure.key

        hitRaid!.blueChest!++
        treasure.key === '73_1' && hitRaid!.ring1++
        treasure.key === '73_2' && hitRaid!.ring2++
        treasure.key === '73_3' && hitRaid!.ring3++
        hitRaid!.lastBlueChestCount = treasure.key === '17_20004' ? 0 : hitRaid!.lastBlueChestCount++
      }
      if (treasure.key === '17_20004') {
        data.goldBrick = treasure.box
        hitRaid!.goldBrick++
      }
    })
    goldBrickData.value.push(data)
  }

  function setBadge() {
    const total = goldBrickData.value.length
    const color = total <= 100 ? '#25b506' : total <= 200 ? '#becc00' : '#be0000'
    chrome.action.setBadgeText({ text: total.toString() }, () => {
      chrome.action.setBadgeBackgroundColor({ color })
    })
  }

  chrome.runtime.onInstalled.addListener(() => {
    setBadge()
  })

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.goldBrickData) {
      goldBrickData.value = JSON.parse(changes.goldBrickData.newValue)
      setBadge()
    }
    if (changes.battleMemo)
      battleMemo.value = JSON.parse(changes.battleMemo.newValue)

    if (changes.eternitySandData)
      eternitySandData.value = JSON.parse(changes.eternitySandData.newValue)

    if (changes.goldBrickData)
      goldBrickData.value = JSON.parse(changes.goldBrickData.newValue)

    if (changes.goldBrickTableData)
      goldBrickTableData.value = JSON.parse(changes.goldBrickTableData.newValue)
  })
})()

interface Treasure {
  box: string
  key: string
  count: number
}
