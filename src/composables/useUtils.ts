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
