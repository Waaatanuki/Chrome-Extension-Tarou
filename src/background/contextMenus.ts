import { notificationItem } from '~/logic'

export function setupContextMenuListener() {
  const { openDashboard, openSidePanel } = useContextMenu()

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
