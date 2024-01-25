/* eslint-disable no-console */
import { load } from 'cheerio'
import type { BattleMemo, GoldBrickData } from 'myStorage'
import { battleMemo, eternitySandData, goldBrickData, goldBrickTableData } from '~/logic/storage'
import { noticeItem } from '~/constants'
import { Raid_EternitySand, Raid_GoldBrick, targetRaid } from '~/constants/raid'

(() => {
  // 重载清除
  const MaxMemoLength = 20
  const { registerContextMenu, addMenuClickListener } = useContextMenu()

  chrome.tabs.onUpdated.addListener(() => {
    console.log('wake up!')
  })

  chrome.webRequest.onBeforeRequest.addListener((details) => {
    // 记录战斗id与副本名称
    if (details.url.includes('/rest/multiraid/start.json')) {
      if (!details.requestBody?.raw) {
        console.log('details.requestBody==>', details.requestBody)
        return
      }
      const arrayBuffer = details.requestBody.raw[0].bytes!

      const decoder = new TextDecoder('utf-8')
      const uint8Array = new Uint8Array(arrayBuffer)
      const jsonString = decoder.decode(uint8Array)
      const requestBody: RequestBody = JSON.parse(jsonString)

      const battle_id = String(requestBody.raid_id)
      const hitMemo = battleMemo.value.find(memo => memo.battle_id === battle_id)
      if (hitMemo)
        return
      console.log('gogogo')

      chrome.tabs.sendMessage(details.tabId, { todo: 'getRaidName' }).then((res) => {
        if (!res?.questName)
          return
        console.log('memo==>', { battle_id, quest_name: res.questName, timestamp: Date.now() })
        const hit = targetRaid.find(r => r.tweet_name_en.includes(res.questName) || r.tweet_name_jp.includes(res.questName))
        if (!hit) {
          console.log('没有匹配到设定副本')
          return
        }

        battleMemo.value.push({ battle_id, quest_id: hit.quest_id, quest_name: res.questName, timestamp: Date.now() })

        if (battleMemo.value.length > MaxMemoLength)
          battleMemo.value.shift()
        console.log('memoList==>', battleMemo.value)
      })
    }
  }, { urls: ['*://*.granbluefantasy.jp/*'] }, ['requestBody'])

  chrome.webRequest.onCompleted.addListener((details) => {
    // 记录掉落结果
    if (details.url.includes('/resultmulti/content/index')) {
      const battle_id = details.url.match(/\d+/g)![0]
      const hitMemo = battleMemo.value.find(memo => memo.battle_id === battle_id)
      if (!hitMemo)
        return
      chrome.tabs.sendMessage(details.tabId, { todo: 'getBattleResult' }).then((res) => {
        if (!res?.domStr)
          return

        const treasureList: Treasure[] = getTreasureList(res.domStr)

        showNotifications(treasureList)
        checkGoldBrick(treasureList, hitMemo)
        checkEternitySand(treasureList, hitMemo)

        battleMemo.value = battleMemo.value.filter(memo => memo.battle_id !== battle_id)
      })
    }

    // 记录历史记录里的掉落结果
    if (details.url.includes('/resultmulti/content/detail')) {
      const battle_id = details.url.match(/\d+/g)![0]

      const hitData = goldBrickData.value.find(data => data.battleId === battle_id)
      if (hitData) {
        console.log('该战斗数据已经记录')
        return
      }

      chrome.tabs.sendMessage(details.tabId, { todo: 'getBattleHistoryResult' }).then((res) => {
        if (!res?.domStr)
          return

        const $ = load(res.domStr)
        const raidName = $('.txt-enemy-name').text().trim()
        const finishTime = $('.txt-defeat-value').first().text()

        const hitRaid = Raid_GoldBrick.find(r => r.quest_name_jp === raidName || r.quest_name_en === raidName)
        if (!hitRaid) {
          console.log('没有匹配到设定副本')
          return
        }
        const treasureList: Treasure[] = getTreasureList(res.domStr)
        const memo = {
          battle_id,
          quest_id: hitRaid.quest_id,
          quest_name: raidName,
          timestamp: getTimestamp(finishTime),
        }
        showNotifications(treasureList)
        checkGoldBrick(treasureList, memo)
      })
    }

    // 记录未结算战斗信息
    if (details.url.includes('/quest/unclaimed_reward')) {
      chrome.tabs.sendMessage(details.tabId, { todo: 'getUnclaimedList' }).then((res) => {
        if (!res?.domStr)
          return

        const unclaimedList = getBattleList(res.domStr)

        unclaimedList.forEach((raid) => {
          const hitMemo = battleMemo.value.find(memo => memo.battle_id === raid.battle_id)
          if (hitMemo) {
            console.log('已经记录过该战斗信息')
            return
          }
          console.log('未记录过的战斗信息', raid)

          const hitRaid = targetRaid.find(r => r.quest_name_jp === raid.raidName || r.quest_name_en === raid.raidName)
          if (!hitRaid) {
            console.log('没有匹配到设定副本')
            return
          }

          battleMemo.value.push({ battle_id: raid.battle_id, quest_id: hitRaid.quest_id, quest_name: raid.raidName, timestamp: raid.timestamp })
        })

        while (battleMemo.value.length > MaxMemoLength)
          battleMemo.value.shift()

        console.log('memoList==>', battleMemo.value)
      })
    }
  }, { urls: ['*://*.granbluefantasy.jp/*'] })

  function getBattleList(domStr: string) {
    const $ = load(domStr)
    const res: BattleInfo[] = []

    $('.lis-raid').each((i, elem) => {
      const raidName = $(elem).find('.txt-raid-name')?.text()
      const finishTime = $(elem).find('.prt-finish-time')?.text()

      res.push({
        battle_id: String($(elem).data().raidId),
        raidName: raidName.trim(),
        timestamp: getTimestamp(finishTime),
      })
    })
    return res
  }

  function getTreasureList(domStr: string) {
    const $ = load(domStr)
    const res: Treasure[] = []

    $('.btn-treasure-item').each((i, elem) => {
      const count = $(elem).find('.prt-article-count')?.text().split('x')[1]
      res.push({
        box: String($(elem).data().box),
        key: $(elem).data().key as string,
        count: count ? Number(count) : 1,
      })
    })
    return res
  }

  function getTimestamp(finishTime: string) {
    // finishTime格式MM/DD HH:mm
    const currentYear = new Date().getFullYear()
    const [monthDay, time] = finishTime.split(' ')
    const [month, day] = monthDay.split('/')
    const finishDate = new Date(`${currentYear}-${month}-${day}T${time}:00+09:00`)
    if (!finishDate.valueOf())
      return Date.now()

    const compareDate = new Date(finishDate.getTime() - 24 * 60 * 60 * 1000)

    if (compareDate.valueOf() > new Date().valueOf())
      finishDate.setFullYear(currentYear - 1)
    return finishDate.valueOf()
  }

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
      hitRaid = { ...raid, visiable: true, total: 0, blueChest: 0, eternitySand: 0 }
      eternitySandData.value.push(hitRaid)
    }

    hitRaid.total!++
    hitRaid.lastDropCount!++
    treasureList.forEach((treasure) => {
      treasure.box === '11' && hitRaid!.blueChest!++
      if (treasure.key === '10_215') {
        hitRaid!.eternitySand!++
        hitRaid!.lastDropTake = hitRaid!.lastDropCount
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

    const data: GoldBrickData = { raidName: raid.raidName, battleId: hitMemo.battle_id, timestamp: hitMemo.timestamp }

    hitRaid.total!++
    treasureList.forEach((treasure) => {
      if (treasure.box === '11') {
        data.blueChests = treasure.key

        hitRaid!.blueChest++
        hitRaid!.lastBlueChestCount++
        treasure.key === '73_1' && hitRaid!.ring1++
        treasure.key === '73_2' && hitRaid!.ring2++
        treasure.key === '73_3' && hitRaid!.ring3++
        if (treasure.key === '17_20004') {
          hitRaid!.goldBrick++
          hitRaid!.lastBlueChestTake = hitRaid!.lastBlueChestCount
          hitRaid!.lastBlueChestCount = 0
        }
      }
      if (treasure.key === '17_20004')
        data.goldBrick = treasure.box
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
    registerContextMenu()
  })
  addMenuClickListener()

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

interface BattleInfo {
  battle_id: string
  raidName: string
  timestamp: number
}

interface RequestBody {
  special_token: any
  raid_id: string
  action: string
  is_multi: boolean
  time: number
}
