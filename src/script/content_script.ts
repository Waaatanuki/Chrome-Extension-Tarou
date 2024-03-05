chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)

  if (message.todo === 'getRaidName') {
    const start = setInterval(() => {
      if (!/granbluefantasy.jp\/#raid(_multi)?\/[0-9]+/.test(document.URL)) {
        console.log('战斗开始检测中断', document.URL)
        clearInterval(start)
        sendResponse({})
      }

      console.log('监测到战斗开始')
      const targetEl = document.querySelector('.enemy-info .name')
      if (targetEl && targetEl.innerHTML) {
        clearInterval(start)
        sendResponse({ questName: targetEl.innerHTML })
      }
    }, 200)
  }

  if (message.todo === 'getBattleResult') {
    const start = setInterval(() => {
      if (!/granbluefantasy.jp\/#result(_multi)?\/[0-9]+/.test(document.URL)) {
        console.log('战斗结算检测中断', document.URL)
        clearInterval(start)
        sendResponse({})
      }

      console.log('监测到结算')
      const targetEl = document.querySelector('.prt-item-list')

      if (targetEl) {
        clearInterval(start)
        sendResponse({ domStr: targetEl.outerHTML })
      }
    }, 200)
  }

  // 获取历史战斗掉落数据
  if (message.todo === 'getBattleHistoryResult') {
    const start = setInterval(() => {
      if (!document.URL.includes('#result_multi/detail')) {
        console.log('历史战斗结算检测中断', document.URL)
        clearInterval(start)
        sendResponse({})
      }

      console.log('监测到历史结算')
      const targetEl = document.querySelector('.prt-result-detail')

      if (targetEl) {
        clearInterval(start)
        sendResponse({ domStr: targetEl.outerHTML })
      }
    }, 200)
  }

  // 获取未结算战斗数据
  if (message.todo === 'getUnclaimedList') {
    const start = setInterval(() => {
      if (!document.URL.includes('#quest/assist/unclaimed')) {
        console.log('未结算战斗检测中断', document.URL)
        clearInterval(start)
        sendResponse({})
      }

      console.log('监测到未结算战斗页面')
      const targetEl = document.querySelector('#prt-unclaimed-list')

      if (targetEl) {
        clearInterval(start)
        sendResponse({ domStr: targetEl.outerHTML })
      }
    }, 200)
  }

  return true
})
