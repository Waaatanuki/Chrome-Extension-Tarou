export function setupActionListener() {
  const { openSidePanel } = useContextMenu()

  chrome.action.onClicked.addListener((tab) => {
    if (!isGamePage(tab?.url)) {
      createNotification({ message: '请在游戏页面进行操作' })
      return
    }
    openSidePanel(tab)
  })
}
