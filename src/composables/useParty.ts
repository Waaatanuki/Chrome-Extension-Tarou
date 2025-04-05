import type { BuildSummon, Deck } from 'party'
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

    const { mainSummon, subSummon } = processSummon(data, hitSetting)

    deckList.value.unshift({
      priority: String(data.priority),
      leader: data.pc.param,
      leaderAbilityList,
      npcs: newNpcs,
      setAction,
      weapons: data.pc.weapons,
      damageInfo: Object.keys(data.pc.after_damage_info || []).length === 0 ? data.pc.damage_info : data.pc.after_damage_info,
      calculateSetting: cloneDeep(hitSetting),
      mainSummon,
      subSummon,
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

  function processSummon(data: DeckJson, setting?: CalculateSetting) {
    const summons = data.pc.summons
    const sub_summons = data.pc.sub_summons
    const quickSummonId = Number(data.pc.quick_user_summon_id)

    const mainSummon: (BuildSummon | null)[] = [{ imageId: summons[1].param!.image_id, paramId: Number(summons[1].param!.id), isQuick: quickSummonId === Number(summons[1].param!.id) }]
    const subSummon: (BuildSummon | null)[] = []

    for (let i = 2; i <= 5; i++) {
      const summon = summons[i]
      if (summon.param) {
        const isQuick = quickSummonId === Number(summon.param.id)
        subSummon.push({ imageId: summon.param.image_id, paramId: Number(summon.param.id), isQuick })
      }
      else {
        subSummon.push(null)
      }
    }

    for (let i = 1; i <= 2; i++) {
      const summon = sub_summons[i]
      if (summon.param) {
        const isQuick = quickSummonId === Number(summon.param.id)
        subSummon.push({ imageId: summon.param.image_id, paramId: Number(summon.param.id), isQuick })
      }
      else {
        subSummon.push(null)
      }
    }

    if (setting?.setting.summon_id)
      mainSummon[1] = { imageId: setting.setting.image_id!, paramId: 0, isQuick: false }

    return { mainSummon, subSummon }
  }

  return {
    deckList,
    handleDeckJson,
    handleCalculateSetting,
  }
})
