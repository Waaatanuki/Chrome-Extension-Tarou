export function getLocalImg(prop: string, type = 'common') {
  return new URL(`/src/assets/image/${type}/${prop}.png`, import.meta.url).href
}

export function getQuestImg(quest_id: string) {
  let id = quest_id
  if (quest_id === '305491')
    id = `${id}_shade`
  return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/lobby/${id}.png`
}
