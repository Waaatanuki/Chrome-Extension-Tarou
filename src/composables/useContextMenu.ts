import { isSidePanelOpened, obTabId, obWindowId, windowSize } from '~/logic'

export default function useContextMenu() {
  function registerContextMenu() {
    chrome.contextMenus.create({ id: 'openSidePanel', title: '开启侧边栏', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'openDashboard', title: '开启详细面板', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'pushInTargetItem', title: '加入掉落监控', contexts: ['image'] })
  }

  function openSidePanel(tab: chrome.tabs.Tab) {
    if (isSidePanelOpened.value) {
      createNotification({ message: '只能打开一个侧边栏' })
      return
    }
    if (obTabId.value && obTabId.value !== tab.id) {
      createNotification({ message: '侧边栏和详细面板只能在同一个页面打开' })
      return
    }
    chrome.sidePanel.open({ tabId: tab.id! }).catch((err) => {
      createNotification({ message: String(err) })
    })
  }

  function openDashboard(tab: chrome.tabs.Tab) {
    if (obTabId.value && obTabId.value !== tab.id) {
      createNotification({ message: '侧边栏和详细面板只能在同一个页面打开' })
      return
    }

    chrome.windows.get(obWindowId.value)
      .then(() => {
        createNotification({ message: '已开启详细面板' })
      })
      .catch(() => {
        return chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
      })
      .catch(() => {
        windowSize.value = { left: 300, top: 0, width: 800, height: 600 }
        return chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
      })
      .then((windowInfo) => {
        if (windowInfo) {
          obTabId.value = tab.id
          obWindowId.value = windowInfo.id
        }
      })
      .catch((err) => {
        createNotification({ message: String(err) })
      })
  }

  return { registerContextMenu, openSidePanel, openDashboard }
}
