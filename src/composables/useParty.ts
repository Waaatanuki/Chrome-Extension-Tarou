import type { BuildSummon, BuildWeapon, Deck, SkillType } from 'party'
import type { CalculateSetting, DeckJson, NpcAbility, NpcInfo } from 'source'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { calculateSettingList, jobAbilityList, localNpcList } from '~/logic'

export const usePartyStore = defineStore('party', () => {
  const deckList = ref<Deck[]>([])

  function handleDeckJson(data: DeckJson) {
    const npcs = data.npc
    const newNpcs: NpcInfo[] = []
    for (let i = 1; i <= 5; i++) {
      const npc = npcs[i]
      if (npc?.param) {
        const newNpc: NpcInfo = {
          id: npc.param.id,
          image_id_3: npc.param.image_id_3,
          has_npcaugment_constant: npc.param.has_npcaugment_constant,
          master: {
            id: npc.master.id,
            name: npc.master.name,
          },
          action_ability: [],
        }
        const hit = localNpcList.value.find(n => n.id === newNpc.id)
        if (hit) {
          newNpc.action_ability = hit.action_ability
          newNpc.npc_arousal_form = hit.npc_arousal_form
        }
        newNpcs.push(newNpc)
      }
    }

    // 获取主角技能
    const job_param_id = String(data.pc.job.param.id)
    const jobFirstAbility = jobAbilityList.value.find(a => a.job_param_id === job_param_id)

    const leaderAbilityList: NpcAbility[] = []
    const setAction: { name: string, set_action_id: string, icon_id?: string }[] = []
    if (jobFirstAbility) {
      leaderAbilityList[0] = jobFirstAbility
      data.pc.set_action.forEach((ab, idx) => {
        if (!ab.set_action_id)
          return
        const hitAb = jobAbilityList.value.find(a => a.action_id === ab.set_action_id)
        const action: { name: string, set_action_id: string, icon_id?: string } = { name: ab.name, set_action_id: ab.set_action_id }
        if (hitAb) {
          leaderAbilityList[idx + 1] = { ...hitAb }
          action.icon_id = hitAb.icon_id
        }
        setAction.push({ ...action })
      })
    }

    const hitSetting = calculateSettingList.value.find(item => item.priority === String(data.priority))

    deckList.value.unshift({
      priority: String(data.priority),
      leader: data.pc.param,
      leaderAbilityList,
      npcs: newNpcs,
      setAction,
      damageInfo: Object.keys(data.pc.after_damage_info || []).length === 0 ? data.pc.damage_info : data.pc.after_damage_info,
      calculateSetting: cloneDeep(hitSetting),
      weapon: processWeapon(data),
      summon: processSummon(data, hitSetting),
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

  function processSummon(data: DeckJson, setting?: CalculateSetting) {
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

    if (setting?.setting.summon_id) {
      summon.push ({
        paramId: 0,
        masterId: 0,
        rarity: 0,
        imageId: setting.setting.image_id!,
        isMain: true,
        isQuick: false,
      })
    }

    return summon
  }

  return {
    deckList,
    handleDeckJson,
    handleCalculateSetting,
  }
})
