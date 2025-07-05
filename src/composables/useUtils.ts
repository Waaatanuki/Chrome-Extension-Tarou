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
  const windowSize: Record<string, { height: number, width: number }> = {
    SupportSummon: { height: 400, width: 600 },
    ArtifactRule: { height: 700, width: 700 },
    RecoveryItem: { height: 1000, width: 900 },
  }

  chrome.windows.create({ url: `src/views/popup/main.html?${key}`, type: 'popup', ...(windowSize[key] ?? { height: 800, width: 800 }) })
    .catch((err) => { createNotification({ message: String(err) }) })
}
