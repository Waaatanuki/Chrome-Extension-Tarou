import { battleInfo, deckList, obTabId, obWindowId, windowSize } from '~/logic/storage'

export default function useDashboard() {
  async function openDashboard() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    if (tab?.url?.includes('game.granbluefantasy.jp')) {
      chrome.windows.get(obWindowId.value).then(() => {
        createNotification({ message: '已开启详细面板' })
      }).catch(() => {
        return chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
      }).catch(() => {
        windowSize.value = { left: 300, top: 0, width: 800, height: 600 }
        return chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
      }).then(async (windowInfo) => {
        if (windowInfo) {
          obTabId.value = tab.id
          obWindowId.value = windowInfo.id
          battleInfo.value = {}
          deckList.value = []
          try {
            await chrome.debugger.detach({ tabId: tab.id })
          }
          catch (error) {
            console.log(error)
          }
          await chrome.debugger.attach({ tabId: tab.id }, '1.2')
          await chrome.debugger.sendCommand({ tabId: tab.id }, 'Network.enable')
        }
      }).catch((err) => {
        createNotification({ message: String(err) })
      })
    }
    else {
      createNotification({ message: '请先进入游戏页面' })
    }
  }

  return {
    openDashboard,
  }
}
