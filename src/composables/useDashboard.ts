import { tabId, windowId, windowSize } from '~/logic/storage'

export default function useDashboard() {
  async function openDashboard() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    if (tab?.url?.includes('game.granbluefantasy.jp')) {
      try {
        console.log('try', windowId.value)

        await chrome.windows.get(windowId.value)

        chrome.notifications.create({
          iconUrl: `/assets/icon-48.png`,
          message: '已开启详细面板',
          type: 'basic',
          title: '通知',
        })
      }
      catch (error) {
        const windowInfo = await chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
        tabId.value = tab.id
        windowId.value = windowInfo.id

        await chrome.debugger.attach({ tabId: tabId.value }, '1.2')
        await chrome.debugger.sendCommand({ tabId: tabId.value }, 'Network.enable')
      }
    }
    else {
      chrome.notifications.create({
        iconUrl: `/assets/icon-48.png`,
        message: '请先进入游戏页面',
        type: 'basic',
        title: '通知',
      })
    }
  }

  return {
    openDashboard,
  }
}
