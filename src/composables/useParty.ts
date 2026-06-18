import type { BuildLeaderAbility, BuildNpc, BuildSummon, BuildSupporter, BuildWeapon, SkillType } from 'party'
import type { CalculateSetting, DeckJson } from 'source'
import { deckList, jobAbilityList, localNpcList } from '~/logic'

export function handleDeckJson(data: DeckJson, isTrue: boolean) {
  if (!data)
    return

  const hitIndex = deckList.value.findIndex(d => d.priority === String(data.priority))
  let createTime = Date.now()
  let supporter: BuildSupporter | undefined

  if (hitIndex !== -1) {
    createTime = isTrue ? deckList.value[hitIndex].createTime : createTime
    supporter = deckList.value[hitIndex].supporter
    deckList.value.splice(hitIndex, 1)
  }

  deckList.value.unshift({
    priority: String(data.priority),
    attr: Number(data.pc.weapons[1].master?.attribute),
    weapons: processWeapon(data),
    summons: processSummon(data, supporter),
    leader: processLeader(data),
    npcs: processNpc(data),
    effects: processEffect(data),
    enhance: processEnhance(data),
    supporter,
    createTime,
  })
}

export function handleCalculateSetting(data: CalculateSetting) {
  const hit = deckList.value.find(item => item.priority === data?.priority)
  if (hit) {
    hit.supporter = {
      summonId: String(data.setting.summon_id),
      imageId: String(data.setting.image_id),
    }
  }
}

export function handleSupporterInfo(responseData: any) {
  if (!responseData.option?.auto_select?.decks_info)
    return

  const decks_info = responseData.option.auto_select.decks_info
  const groupPriority = decks_info.last_used_group_priority
  const deckPriority = decks_info.last_used_deck_priority
  const priority = String(groupPriority) + String(deckPriority)
  const hitDeck = deckList.value.find(d => d.priority === priority)

  if (hitDeck) {
    hitDeck.supporter = {
      imageId: String(decks_info.supporter.summon_image_id),
      summonId: String(decks_info.supporter.summon_id),
    }
  }
}

function processWeapon(data: DeckJson) {
  const { weapons } = data.pc

  const createWeapon = (weapon: typeof weapons[number], isMain: boolean): BuildWeapon => {
    return weapon
      ? {
          seriesId: Number(weapon.master?.series_id),
          masterId: Number(weapon.master?.id),
          imageId: weapon.param?.image_id ?? '',
          level: weapon.param?.level ?? '',
          arousalForm: weapon.param?.arousal.form ?? 0,
          augmentSkill: weapon.param?.odiant.is_odiant_weapon ? weapon.param.augment_skill_icon_image[0] : undefined,
          skill: [1, 2, 3].map((num) => {
            const skillType = `skill${num}` as SkillType
            const skill = weapon[skillType]
            return skill
              ? {
                  type: skillType,
                  description: skill.description,
                  image: skill.image,
                }
              : null
          }).filter(s => s !== null),
          isMain,
        }
      : { seriesId: 0, masterId: 0, imageId: '', level: '', arousalForm: 0, skill: [], isMain }
  }

  return Array.from({ length: 13 }, (_, i) => i + 1).map(i => createWeapon(weapons[i], i === 1))
}

function processSummon(data: DeckJson, supporter: BuildSupporter | undefined) {
  const { summons, sub_summons, quick_user_summon_id } = data.pc
  const quickSummonId = Number(quick_user_summon_id)

  const createSummon = (summon: typeof summons[number], isMain: boolean): BuildSummon => {
    return {
      paramId: Number(summon.param?.id ?? 0),
      masterId: Number(summon.master?.id ?? 0),
      rarity: Number(summon.master?.rarity ?? 0),
      imageId: summon.param?.image_id ?? '',
      isMain,
      isQuick: quickSummonId === Number(summon.param?.id),
    }
  }

  const summon: BuildSummon[] = [
    createSummon(summons[1], true),
    ...[2, 3, 4, 5].map(i => createSummon(summons[i], false)),
    ...[1, 2].map(i => createSummon(sub_summons[i], false)),
  ]

  if (supporter) {
    summon.push ({
      paramId: 0,
      masterId: 0,
      rarity: 0,
      imageId: supporter.imageId,
      isMain: true,
      isQuick: false,
    })
  }

  return summon
}

function processLeader(data: DeckJson) {
  const { job, param } = data.pc
  const damageInfo = Object.keys(data.pc.after_damage_info).length === 0 ? data.pc.damage_info : data.pc.after_damage_info
  const jobFirstAbility = jobAbilityList.value.find(a => a.jobParamId === job.param.id)

  const leaderAbilityList: (BuildLeaderAbility | null)[] = []

  leaderAbilityList[0] = jobFirstAbility ? { ...jobFirstAbility } : null
  data.pc.set_action.forEach((ab) => {
    if (!ab.set_action_id)
      return
    const hitAb = jobAbilityList.value.find(a => a.actionId === ab.set_action_id)
    leaderAbilityList.push({
      jobParamId: hitAb?.jobParamId ?? 0,
      name: ab.name,
      actionId: ab.set_action_id,
      iconId: hitAb?.iconId ?? '',
      iconType: hitAb?.iconType ?? '',
      fa: hitAb?.fa ?? false,
    })
  })

  return {
    masterId: job.master.id,
    imageId: param.image,
    familiarId: data.pc.familiar_id,
    normalDamage: damageInfo.assumed_normal_damage,
    advantageDamage: damageInfo.assumed_advantage_damage,
    ability: leaderAbilityList,
  }
}

function processNpc(data: DeckJson) {
  const newNpcs: BuildNpc[] = []
  for (let i = 1; i <= 8; i++) {
    const npc = data.npc[i]
    if (npc?.param) {
      const hit = localNpcList.value.find(n => n.paramId === npc.param.id)

      newNpcs.push({
        paramId: npc.param.id,
        masterId: Number(npc.master.id),
        imageId: formatNpcImageId(npc.param.image_id_3),
        attribute: npc.master.attribute,
        isAugment: npc.param.has_npcaugment_constant,
        arousalForm: npc.param.npc_arousal_form,
        ability: hit ? [...hit.ability] : [],
        exlb: hit?.exlb,
        artifact: hit?.artifact,
      })
    }
  }
  return newNpcs
}

function processEffect(data: DeckJson) {
  const damageInfo = Object.keys(data.pc.after_damage_info).length === 0 ? data.pc.damage_info : data.pc.after_damage_info
  return damageInfo.effect_value_info.map(e => ({ iconImg: e.icon_img, isMax: e.is_max, value: e.value }))
}

function processEnhance(data: DeckJson) {
  const damageInfo = Object.keys(data.pc.after_damage_info).length === 0 ? data.pc.damage_info : data.pc.after_damage_info
  return {
    enhance: damageInfo.weapon_skill_enhance_param.weapon_skill_enhance,
    enhanceMagna: damageInfo.weapon_skill_enhance_param.weapon_skill_enhance_magna,
    enhanceEvil: damageInfo.weapon_skill_enhance_param.weapon_skill_enhance_evil,
  }
}
