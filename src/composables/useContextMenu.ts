import { notificationItem } from '~/logic'

export default function useContextMenu() {
  const { openDashboard } = useDashboard()

  function registerContextMenu() {
    chrome.contextMenus.create({ id: 'openDetail', title: '开启详细面板', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'openSidePanel', title: '开启侧边栏', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'pushInTargetItem', title: '加入掉落监控', contexts: ['image'] })
  }

  function addMenuClickListener() {
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      if (!tab?.url) {
        createNotification({ message: '请在游戏页面进行操作' })
        return
      }
      const url = new URL(tab.url)
      const HOST = ['game.granbluefantasy.jp', 'gbf.game.mbga.jp']
      if (!HOST.includes(url.host)) {
        createNotification({ message: '请在游戏页面进行操作' })
        return
      }

      switch (info.menuItemId) {
        case 'openDetail':
          openDashboard(tab)
          break
        case 'openSidePanel':{
          chrome.sidePanel.open({ tabId: tab.id! }).catch((err) => {
            createNotification({ message: String(err) })
          })
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

  return { registerContextMenu, addMenuClickListener }
}
