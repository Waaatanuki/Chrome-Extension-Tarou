export default function useContextMenu() {
  const { openDashboard } = useDashboard()

  function registerContextMenu() {
    chrome.contextMenus.create({ id: 'openDetail', title: '开启详细面板', contexts: ['all'] })
  }

  function addMenuClickListener() {
    chrome.contextMenus.onClicked.addListener((info) => {
      switch (info.menuItemId) {
        case 'openDetail':
          openDashboard()
          break
      }
    })
  }

  return { registerContextMenu, addMenuClickListener }
}
