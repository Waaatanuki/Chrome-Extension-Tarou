export function isGamePage(url?: string) {
  if (!url)
    return false

  const urlObj = new URL(url)
  const HOST = ['game.granbluefantasy.jp', 'gbf.game.mbga.jp']
  return HOST.includes(urlObj.host)
}

export function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}

export function openPopupWindow(key: string) {
  chrome.windows.create({ url: `src/views/popup/main.html?${key}`, type: 'popup', height: 400, width: 600 }).catch((err) => {
    createNotification({ message: String(err) })
  })
}
