import { notificationItem } from '~/logic'

export default function useContextMenu() {
  const { openDashboard } = useDashboard()

  function registerContextMenu() {
    chrome.contextMenus.create({ id: 'openDetail', title: '开启详细面板', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'pushInTargetItem', title: '加入掉落监控', contexts: ['image'] })
  }

  function addMenuClickListener() {
    chrome.contextMenus.onClicked.addListener((info) => {
      switch (info.menuItemId) {
        case 'openDetail':
          openDashboard()
          break
        case 'pushInTargetItem':
          if (info.srcUrl) {
            const itemKey = imgSrcToKey(info.srcUrl)
            if (itemKey) {
              if (!notificationItem.value.includes(itemKey)) {
                notificationItem.value.push(itemKey)
                createNotification('添加成功', `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets${itemKey}`)
              }
              else {
                createNotification('该物品已在提醒列表中')
              }
            }
            else {
              createNotification('该物品无法添加')
            }
          }
          break
      }
    })
  }

  return { registerContextMenu, addMenuClickListener }
}
