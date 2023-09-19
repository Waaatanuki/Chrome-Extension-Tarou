export function getLocalImg(prop: string, type = 'common') {
  return new URL(`/src/assets/image/${type}/${prop}.png`, import.meta.url).href
}

export function getQuestImg(quest_id: string) {
  return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/lobby/${quest_id}.png`
}
