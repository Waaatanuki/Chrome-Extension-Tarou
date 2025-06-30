export default function useContextMenu() {
  function registerContextMenu() {
    chrome.contextMenus.create({ id: 'openSidePanel', title: '开启侧边栏', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'pushInTargetItem', title: '加入掉落监控', contexts: ['image'] })
  }

  function openSidePanel(tab: chrome.tabs.Tab) {
    chrome.sidePanel.open({ tabId: tab.id! }).catch((err) => {
      createNotification({ message: String(err) })
    })
  }

  return { registerContextMenu, openSidePanel }
}
