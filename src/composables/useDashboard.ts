import { tabId, windowId, windowSize } from '~/logic/storage'

export default function useDashboard() {
  async function openDashboard() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    if (tab?.url?.includes('game.granbluefantasy.jp')) {
      chrome.windows.get(windowId.value).then(() => {
        chrome.notifications.create({
          iconUrl: '/assets/icon-48.png',
          message: '已开启详细面板',
          type: 'basic',
          title: '通知',
        })
      }).catch(() => {
        return chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
      }).catch(() => {
        windowSize.value = { left: 300, top: 0, width: 800, height: 600 }
        return chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
      }).then(async (windowInfo) => {
        if (windowInfo) {
          tabId.value = tab.id
          windowId.value = windowInfo.id
          await chrome.debugger.attach({ tabId: tab.id }, '1.2')
          await chrome.debugger.sendCommand({ tabId: tab.id }, 'Network.enable')
        }
      }).catch((err) => {
        chrome.notifications.create({
          iconUrl: '/assets/icon-48.png',
          message: String(err),
          type: 'basic',
          title: '错误',
        })
      })
    }
    else {
      chrome.notifications.create({
        iconUrl: '/assets/icon-48.png',
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
