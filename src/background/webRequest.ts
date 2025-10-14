import type { Treasure } from 'api'
import type { NumberLimitPair } from 'extension'
import type { Exlb } from 'party'
import { load } from 'cheerio'
import { sendMessage } from 'webext-bridge/background'
import { battleMemo, eventList, localNpcList, notificationItem, notificationSetting, userInfo } from '~/logic/storage'

export function setupWebRequestListener() {
  const { checkUser, sendInfo } = useUser()

  chrome.webRequest.onCompleted.addListener((details) => {
    // 记录掉落结果
    if (/\/result(?:multi)?\/content\/index/.test(details.url)) {
      checkUser(details.url)
      const battleId = details.url.match(/\d+/g)![0]
      const hitMemo = battleMemo.value.find(memo => memo.battleId === battleId)
      if (!hitMemo)
        return

      sendMessage('getBattleResult', null, { context: 'content-script', tabId: details.tabId }).then((res) => {
        if (!res?.domStr)
          return
        const treasureList: Treasure[] = getTreasureList(res.domStr)
        const dropInfo = {
          battleId: hitMemo.battleId,
          questName: hitMemo.questName,
          questImage: hitMemo.questImage,
          questType: hitMemo.questType,
          timestamp: hitMemo.timestamp,
          reward: treasureList,
        }

        console.log('sendDropInfo', dropInfo)
        sendInfo([dropInfo])
          .then(() => { cleanBattleMemo(battleId) })
          .catch((err) => { console.log(err.message) })
      }).catch((err) => {
        console.log(err)
      })
    }

    // 记录历史记录里的掉落结果
    if (/\/result(?:multi)?\/content\/detail/.test(details.url)) {
      checkUser(details.url)
      const battleId = details.url.match(/\d+/g)![0]

      sendMessage('getBattleHistoryResult', null, { context: 'content-script', tabId: details.tabId }).then((res) => {
        if (!res?.domStr)
          return

        const $ = load(res.domStr)
        const questName = $('.txt-enemy-name').text().trim()
        const finishTime = $('.txt-defeat-value').first().text()
        const questImage = imgSrcToQuestImage($('.img-defeat').attr('src'))
        const treasureList: Treasure[] = getTreasureList(res.domStr)

        const dropInfo = {
          battleId,
          questName,
          questImage,
          questType: '1',
          timestamp: formatFinishTime(finishTime),
          reward: treasureList,
        }

        console.log('sendDropInfo', dropInfo)
        sendInfo([dropInfo])
          .then(() => { cleanBattleMemo(battleId) })
          .catch((err) => { console.log(err.message) })
      }).catch((err) => {
        console.log(err)
      })
    }

    // 记录友招信息
    if (details.url.includes('/profile/content/index')) {
      const searchParams = new URLSearchParams(details.url)
      const myUid = searchParams.get('uid') || ''
      const match = details.url.match(/\/(\d+)\?/)!
      const currentUid = match[1]

      if (myUid !== currentUid)
        return

      sendMessage('getSupportSummon', null, { context: 'content-script', tabId: details.tabId }).then((res) => {
        if (!res?.domStr)
          return

        userInfo.value.uid = myUid

        const $ = load(res.domStr)
        userInfo.value.imgPc = String($(`.img-pc`).data().imageName)
        userInfo.value.name = String($(`.txt-user-name`).text())
        userInfo.value.support = {}

        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 4; j++) {
            if (i !== 0 && j > 1)
              continue
            const target = $(`#js-fix-summon${i}${j}`)
            if (target.length) {
              const imgId = String(target.data().imageId)
              const name = $(`#js-fix-summon${i}${j}-name`).text()
              const infoClass = $(`#js-fix-summon${i}${j}-info`).attr('class')
              const rank = infoClass?.match(/bless-(.*?)-style/)
              userInfo.value.support[`${i}${j}`] = { imgId, name, rank: rank ? rank[1] : '', necessary: userInfo.value.support[`${i}${j}`]?.necessary ?? false }
            }
            else {
              userInfo.value.support[`${i}${j}`] = { imgId: 'empty', name: '', rank: '', necessary: userInfo.value.support[`${i}${j}`]?.necessary ?? false }
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    // 记录角色信息
    if (details.url.includes('/npczenith/content/index')) {
      sendMessage('getNpczenith', null, { context: 'content-script', tabId: details.tabId }).then((res) => {
        if (!res?.domStr)
          return

        const $ = load(res.domStr)
        const paramId = Number($(`div.cnt-zenith.npc`).data()?.userNpcId)
        if (!paramId)
          return

        const hitNpc = localNpcList.value.find(n => n.paramId === paramId)
        if (!hitNpc)
          return

        const exlb: Exlb[] = []
        $('#prt-extra-lb-list').children('.prt-extra-lb-title').each((i, elem) => {
          const type = $(elem).text()
          const lb: Exlb = { type, bonuse: [] }
          exlb.push(lb)
          $(elem).next('.prt-extra-lb-info').children('.prt-bonus-detail').each((i, elem) => {
            if (!$(elem).hasClass('is-master')) {
              lb.bonuse.push({
                icon: $(elem).find('.prt-bonus-icon').attr('class')?.replace('prt-bonus-icon ', '') || '',
                name: $(elem).find('.txt-bonus-name').text().trim(),
                value: $(elem).find('.txt-current-bonus').text().trim(),
              })
            }
          })
        })
        hitNpc.exlb = exlb.filter(i => i.bonuse.length !== 0)
      }).catch((err) => {
        console.log(err)
      })
    }

    // 记录首页信息
    if (details.url.includes('/user/content/index')) {
      sendMessage('getMypage', null, { context: 'content-script', tabId: details.tabId }).then((res) => {
        if (!res?.domStr)
          return

        const $ = load(res.domStr)

        const $popArcarum = load($('#tpl-pop-arcarum-point-detail').text())
        const $popFollow = load($('#tpl-pop-follow-point-detail').text())

        userInfo.value.arcarum = {
          passport: parseNumberLimit($('.prt-arcarum-passport-box').text()),
          point: {
            weekly: parseNumberLimit($popArcarum('.txt-point-num').text()),
            total: parseNumberLimit($('.prt-arcarum-point-box').text()),
          },
        }

        userInfo.value.artifact = parseNumberLimit($('.prt-artifact-dropcount-info-box').text())

        userInfo.value.followPoint = {
          weekly: parseNumberLimit($popFollow('.txt-point-num').text()),
          total: parseNumberLimit($('.prt-follow-point-box').text()),
        }

        // 获取当前进行中的活动信息
        const currentEventList: string[] = []
        $('.btn-global-banner').each((index, element) => {
          const dataHref = $(element).data('href') as string | undefined
          if (dataHref && dataHref.startsWith('event')) {
            const eventType = dataHref.split('/')[1]!.replace(/\d/g, '')
            currentEventList.push(eventType)
          }
        })

        eventList.value.forEach((event) => { event.isActive = currentEventList.includes(event.type) })
      }).catch((err) => {
        console.log(err)
      })
    }
  }, { urls: ['*://*.granbluefantasy.jp/*', '*://gbf.game.mbga.jp/*'] })
}

function getTreasureList(domStr: string) {
  const $ = load(domStr)
  const res: Treasure[] = []

  $('.prt-item-list').children('.lis-treasure').each((i, elem) => {
    const isItem = $(elem).hasClass('btn-treasure-item')
    const isArtifact = $(elem).hasClass('btn-artifact')

    if (isItem) {
      const imgSrc = $(elem).find('.img-treasure-item').attr('src')
      const itemKey = imgSrcToKey(imgSrc)
      if (notificationItem.value.includes(itemKey))
        showNotifications(itemKey)

      const count = $(elem).find('.prt-article-count').text().split('x')[1]
      res.push({
        box: String($(elem).data().box),
        key: $(elem).data().key as string,
        count: count ? Number(count) : 1,
      })
    }

    if (isArtifact) {
      const imgSrc = $(elem).find('.img-artifact').attr('src')
      const itemKey = imgSrcToKey(imgSrc)
      if (notificationItem.value.includes(itemKey))
        showNotifications(itemKey)

      const artifact = $(elem).find('.img-artifact').attr('alt')
      const attr = $(elem).find('.ico-attr').attr('alt')
      const kind = $(elem).find('.ico-kind').attr('alt')
      res.push({
        box: 'artifact',
        key: `${artifact}-${attr}-${kind}`,
        count: 1,
      })
    }
  })

  return res
}

function cleanBattleMemo(battleId: string) {
  battleMemo.value = battleMemo.value.filter(memo => memo.battleId !== battleId && Date.now() - memo.timestamp < 14 * 24 * 60 * 60 * 1000)
}

function showNotifications(item: string) {
  if (!notificationSetting.value.targetItemDrop)
    return

  const length = Math.floor(Math.random() * 10) + 1
  let str = ''
  for (let i = 0; i < length; i++)
    str += 'e'

  createNotification({
    message: `G${str}t☆Daze!`,
    iconUrl: `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets${item}`,
    sound: 'drop',
  })
}

function parseNumberLimit(text: string): NumberLimitPair {
  const [number, limit] = text.split('/').map(Number)
  return { number: Number.isNaN(number) ? 0 : number, limit: Number.isNaN(limit) ? 0 : limit }
}
