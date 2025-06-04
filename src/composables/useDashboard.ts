import { artifactList, battleInfo, deckList, obTabId, obWindowId, windowSize } from '~/logic/storage'

export default function useDashboard() {
  async function openDashboard(tab: chrome.tabs.Tab) {
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
        artifactList.value = []
      }
    }).catch((err) => {
      createNotification({ message: String(err) })
    })
  }

  return {
    openDashboard,
  }
}
