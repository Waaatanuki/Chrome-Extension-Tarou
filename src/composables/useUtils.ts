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
    ArtifactBox: { height: 1000, width: 1580 },
    ArtifactRule: { height: 700, width: 700 },
    BuildCompare: { height: 900, width: 1100 },
    ExportRecord: { height: 800, width: 800 },
    RecoveryItem: { height: 1000, width: 900 },
    SampoSetup: { height: 900, width: 600 },
    SupportSummon: { height: 400, width: 600 },
  }

  const getWindowSize = (key: string) => {
    if (key.startsWith('WindowPanel')) {
      return { height: 800, width: 360 }
    }
    return windowSize[key] ?? { height: 800, width: 800 }
  }

  chrome.windows.create({ url: `src/views/popup/main.html?${key}`, type: 'popup', ...getWindowSize(key) })
    .catch((err) => { createNotification({ message: String(err) }) })
}

export function openCombatPanel() {
  chrome.windows.create({ url: 'src/views/combatPanel/main.html', type: 'popup', height: 800, width: 800 })
    .catch((err) => { createNotification({ message: String(err) }) })
}
