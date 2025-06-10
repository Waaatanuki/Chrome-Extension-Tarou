import { artifactList, battleInfo, deckList, notificationItem, obTabId, obWindowId, windowSize } from '~/logic'

export default function useContextMenu() {
  function registerContextMenu() {
    chrome.contextMenus.create({ id: 'openSidePanel', title: '开启侧边栏', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'openDashboard', title: '开启详细面板', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'pushInTargetItem', title: '加入掉落监控', contexts: ['image'] })
  }

  function isGamePage(url?: string) {
    if (!url)
      return false

    const urlObj = new URL(url)
    const HOST = ['game.granbluefantasy.jp', 'gbf.game.mbga.jp']
    return HOST.includes(urlObj.host)
  }

  function addMenuClickListener() {
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      if (!isGamePage(tab?.url)) {
        createNotification({ message: '请在游戏页面进行操作' })
        return
      }

      if (!tab?.id) {
        createNotification({ message: '请在游戏页面进行操作' })
        return
      }

      switch (info.menuItemId) {
        case 'openDashboard':
          openDashboard(tab)
          break
        case 'openSidePanel':{
          openSidePanel(tab)
          break
        }
        case 'pushInTargetItem':
          if (info.srcUrl) {
            const itemKey = imgSrcToKey(info.srcUrl)

            if (!itemKey) {
              createNotification({ message: '该物品无法添加' })
              return
            }
            if (notificationItem.value.includes(itemKey)) {
              createNotification({ message: '该物品已在提醒列表中' })
              return
            }

            notificationItem.value.push(itemKey)
            createNotification({
              message: '添加成功',
              iconUrl: `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets${itemKey}`,
              sound: 'tip',
            })
          }
          break
      }
    })
  }

  function openSidePanel(tab: chrome.tabs.Tab) {
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
    chrome.windows.get(obWindowId.value).then(() => {
      createNotification({ message: '已开启详细面板' })
    }).catch(() => {
      return chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
    }).catch(() => {
      windowSize.value = { left: 300, top: 0, width: 800, height: 600 }
      return chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
    }).then((windowInfo) => {
      if (windowInfo) {
        obTabId.value = tab.id
        obWindowId.value = windowInfo.id
      }
    }).catch((err) => {
      createNotification({ message: String(err) })
    })
  }

  return { registerContextMenu, openSidePanel, isGamePage, addMenuClickListener }
}
