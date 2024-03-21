import { load } from 'cheerio'
import type { BattleMemo } from 'myStorage'
import type { Treasure } from 'api'
import { sendDropInfo } from '~/api'
import { battleMemo } from '~/logic/storage'
import { noticeItem } from '~/constants'

(() => {
  const MaxMemoLength = 50
  const { registerContextMenu, addMenuClickListener } = useContextMenu()
  const { checkUid, checkCode } = useUser()

  chrome.tabs.onUpdated.addListener(() => {
    console.log('wake up!')
  })

  chrome.webRequest.onBeforeRequest.addListener((details) => {
    // 记录战斗id与副本名称
    if (/\/rest\/(raid|multiraid)\/start\.json/.test(details.url)) {
      checkUid(details.url)

      if (!details.requestBody?.raw) {
        console.log('details.requestBody==>', details.requestBody)
        return
      }
      const arrayBuffer = details.requestBody.raw[0].bytes!

      const decoder = new TextDecoder('utf-8')
      const uint8Array = new Uint8Array(arrayBuffer)
      const jsonString = decoder.decode(uint8Array)
      const requestBody: RequestBody = JSON.parse(jsonString)
      const battleId = String(requestBody.raid_id)
      const timestamp = Number(requestBody.time)
      const hitMemo = battleMemo.value.find(memo => memo.battleId === battleId)
      if (hitMemo)
        return
      console.log('gogogo')

      chrome.tabs.sendMessage(details.tabId, { todo: 'getRaidName' }).then((res) => {
        if (!res?.questName)
          return
        console.log('新增memo==>', { battleId, quest_name: res.questName, timestamp })

        battleMemo.value.push({ battleId, questName: res.questName, timestamp })

        if (battleMemo.value.length > MaxMemoLength)
          battleMemo.value.shift()
        console.log('memoList==>', battleMemo.value)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, { urls: ['*://*.granbluefantasy.jp/*'] }, ['requestBody'])

  chrome.webRequest.onCompleted.addListener((details) => {
    // 记录掉落结果
    if (/\/result(multi)?\/content\/index/.test(details.url)) {
      checkUid(details.url)
      const battleId = details.url.match(/\d+/g)![0]
      const hitMemo = battleMemo.value.find(memo => memo.battleId === battleId)
      if (!hitMemo)
        return

      chrome.tabs.sendMessage(details.tabId, { todo: 'getBattleResult' }).then((res) => {
        if (!res?.domStr)
          return

        const treasureList: Treasure[] = getTreasureList(res.domStr)

        showNotifications(treasureList)

        const dropInfo = {
          battleId: hitMemo.battleId,
          questName: hitMemo.questName,
          questImage: hitMemo.questImage,
          questType: hitMemo.questType,
          timestamp: hitMemo.timestamp,
          reward: treasureList,
        }

        battleMemo.value = battleMemo.value.filter(memo => memo.battleId !== battleId)

        console.log('sendDropInfo', dropInfo)
        sendDropInfo(dropInfo).catch((err) => { console.log(err.message) })
      }).catch((err) => {
        console.log(err)
      })
    }

    // 记录历史记录里的掉落结果
    if (/\/result(multi)?\/content\/detail/.test(details.url)) {
      checkUid(details.url)
      const battleId = details.url.match(/\d+/g)![0]

      chrome.tabs.sendMessage(details.tabId, { todo: 'getBattleHistoryResult' }).then((res) => {
        if (!res?.domStr)
          return

        const $ = load(res.domStr)
        const questName = $('.txt-enemy-name').text().trim()
        const finishTime = $('.txt-defeat-value').first().text()
        const questImage = $('.img-defeat').attr('alt') ?? ''
        const treasureList: Treasure[] = getTreasureList(res.domStr)

        const dropInfo = {
          battleId,
          questName,
          questImage,
          questType: '1',
          timestamp: getTimestamp(finishTime),
          reward: treasureList,
        }

        console.log('sendDropInfo', dropInfo)
        sendDropInfo(dropInfo).catch((err) => { console.log(err.message) })

        showNotifications(treasureList)
      }).catch((err) => {
        console.log(err)
      })
    }

    // 记录未结算战斗信息
    if (details.url.includes('/quest/unclaimed_reward')) {
      checkUid(details.url)
      chrome.tabs.sendMessage(details.tabId, { todo: 'getUnclaimedList' }).then((res) => {
        if (!res?.domStr)
          return

        const unclaimedList = getBattleList(res.domStr)

        unclaimedList.forEach((battle) => {
          const hitMemo = battleMemo.value.find(memo => memo.battleId === battle.battleId)
          if (hitMemo)
            return

          console.log('未记录过的战斗信息', battle)

          battleMemo.value.push({
            battleId: battle.battleId,
            questName: battle.questName,
            questImage: battle.questImage,
            questType: '1',
            timestamp: battle.timestamp,
          })
        })

        while (battleMemo.value.length > MaxMemoLength)
          battleMemo.value.shift()

        console.log('memoList==>', battleMemo.value)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, { urls: ['*://*.granbluefantasy.jp/*'] })

  function getBattleList(domStr: string) {
    const $ = load(domStr)
    const res: BattleMemo[] = []

    $('.lis-raid').each((i, elem) => {
      const questName = $(elem).find('.txt-raid-name')?.text()
      const finishTime = $(elem).find('.prt-finish-time')?.text()
      const questImage = $(elem).find('.img-raid-thumbnail').attr('alt') ?? ''
      res.push({
        battleId: String($(elem).data().raidId),
        questName: questName.trim(),
        questImage,
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

  chrome.runtime.onInstalled.addListener(() => {
    registerContextMenu()
    checkCode()
  })

  addMenuClickListener()
})()

interface RequestBody {
  special_token: any
  raid_id: string
  action: string
  is_multi: boolean
  time: number
}
