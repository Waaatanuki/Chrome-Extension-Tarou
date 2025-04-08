import type { BuildLeaderAbility, BuildNpc, BuildSummon, BuildWeapon, Deck, SkillType } from 'party'
import type { CalculateSetting, DeckJson } from 'source'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { calculateSettingList, jobAbilityList, localNpcList } from '~/logic'

export const usePartyStore = defineStore('party', () => {
  const deckList = ref<Deck[]>([])

  function handleDeckJson(data: DeckJson) {
    deckList.value.unshift({
      priority: String(data.priority),
      weapons: processWeapon(data),
      summons: processSummon(data),
      leader: processLeader(data),
      npcs: processNpc(data),
      effects: processEffect(data),
    })

    if (deckList.value.length > 10)
      deckList.value.pop()
  }

  function handleCalculateSetting(data: CalculateSetting) {
    const hit = calculateSettingList.value.find(item => item.priority === data?.priority)
    if (hit)
      hit.setting = { ...data.setting }
    else
      calculateSettingList.value.push(cloneDeep(data))
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

  function processSummon(data: DeckJson) {
    const hitSetting = calculateSettingList.value.find(item => item.priority === String(data.priority))

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

    if (hitSetting?.setting.summon_id) {
      summon.push ({
        paramId: 0,
        masterId: 0,
        rarity: 0,
        imageId: hitSetting.setting.image_id!,
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
    for (let i = 1; i <= 5; i++) {
      const npc = data.npc[i]
      if (npc?.param) {
        const hit = localNpcList.value.find(n => n.paramId === npc.param.id)

        newNpcs.push({
          paramId: npc.param.id,
          masterId: Number(npc.master.id),
          imageId: npc.param.image_id_3,
          isAugment: npc.param.has_npcaugment_constant,
          arousalForm: hit ? hit.arousalForm : 0,
          ability: hit ? [...hit.ability] : [],
        })
      }
    }
    return newNpcs
  }

  function processEffect(data: DeckJson) {
    const damageInfo = Object.keys(data.pc.after_damage_info).length === 0 ? data.pc.damage_info : data.pc.after_damage_info
    return damageInfo.effect_value_info.map(e => ({ iconImg: e.icon_img, isMax: e.is_max, value: e.value }))
  }

  return {
    deckList,
    handleDeckJson,
    handleCalculateSetting,
  }
})
