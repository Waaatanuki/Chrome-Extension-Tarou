import type { Action } from 'myStorage'
import type { BuildWeapon, SkillType } from 'party'
import type { Buff } from 'source'

const imgUri = 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img'

export function getLocalImg(prop: string, type = 'common') {
  return new URL(`/src/assets/image/${type}/${prop}.png`, import.meta.url).href
}

export function getQuestImg(questId: string | number, position: string) {
  return `${imgUri}/sp/quest/assets/${position}/${questId}.png`
}

export function getBossImg(type: string, id: string, size = 'm') {
  return `${imgUri}/sp/assets/${type}/${size}/${id}.png`
}

export function getAssetImg(type: string, id: string | number, size = 'm') {
  return `${imgUri}/sp/assets/${type}/${size}/${id}.jpg`
}

export function getAssetsItemImg(type: string, id: string, size = 's') {
  return `${imgUri}/sp/assets/item/${type}/${size}/${id}.jpg`
}

export function getGachaBanner(key: string) {
  return `${imgUri}/sp/banner/gacha/banner_${key}_1.png`
}

export function getArousalIcon(form: number) {
  return `${imgUri}/sp/ui/icon/arousal_type/type_${form}.png`
}

export function getJobIcon(id: string | number) {
  return `${imgUri}/sp/ui/icon/job/${id}.png`
}

export function getAbilityIcon(id: string) {
  return `${imgUri}/sp/ui/icon/ability/m/${id}.png`
}

export function getSkillIcon(weapon: BuildWeapon, skillType: SkillType) {
  const skill = weapon.skill.find(s => s.type === skillType)
  return `${imgUri}/sp/ui/icon/skill/${skill?.image}.png`
}

export function getSkillLabelIcon(id: string) {
  return `${imgUri}/sp/ui/icon/weapon_skill_label/${id}`
}
export function getBonusIcon(id: string) {
  return `${imgUri}/sp/ui/icon/bonus/${id}.png`
}

export function getArtifactIcon(id: string) {
  return `${imgUri}/sp/artifact/ui/icon/${id}.png`
}

export function getActionIcon(action: Action) {
  if (action.type === 'ability') {
    return action.isSub
      ? getAssetsItemImg('ability', action.icon!)
      : getAbilityIcon(action.icon!)
  }
  if (action.type === 'fc')
    return getAbilityIcon(`fatal_chain_${action.icon}`)
  if (action.type === 'summon')
    return getAssetImg('summon', action.icon!, 's')
  if (action.type === 'temporary')
    return getAssetsItemImg('temporary', action.icon!, 'm')
  if (action.type === 'event/temporary')
    return getAssetsItemImg('event/temporary', action.icon!, 's')
  if (action.type === 'recovery')
    return getAssetsItemImg('normal', '1')
  if (action.type === 'attack')
    return getAbilityIcon('normal_attack')
}

export function getBuffIcon(buff: Buff, turn: number) {
  const iconUrl = `${imgUri}/sp/ui/icon/status/x64/status_`
  const endTurn = buff.personal_buff_end_turn || buff.personal_debuff_end_turn
  if (buff.personal_status !== buff.status && endTurn)
    return `${iconUrl}${buff.personal_status}${Number(endTurn) - turn}.png`

  return `${iconUrl}${buff.status.replace(/-/g, '')}.png`
}

export function getStamp(content: string) {
  return `${imgUri}/sp/assets/stamp/full//${content}`
}
