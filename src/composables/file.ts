export function getLocalImg(prop: string, type = 'common') {
  return new URL(`/src/assets/image/${type}/${prop}.png`, import.meta.url).href
}

export function getQuestImg(questId: string) {
  return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/lobby/${questId}.png`
}

export function getGachaItemImg(type: string, id: string) {
  return `http://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/m/${id}.jpg`
}

export function getSkillIcon(id: string) {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/weapon_skill_label/${id}`
}
