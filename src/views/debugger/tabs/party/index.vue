<script setup lang="ts">
import type { CheckboxValueType } from 'element-plus'
import type { CalculateSetting, DeckJson, NpcAbility, NpcInfo } from 'requestData'
import type { Deck } from 'party'
import { cloneDeep } from 'lodash-es'
import Effect from './components/Effect.vue'
import Weapon from './components/Weapon.vue'
import Npc from './components/Npc.vue'
import Summon from './components/Summon.vue'
import BuildCompare from './components/BuildCompare.vue'
import { jobAbilityList, localNpcList } from '~/logic'

const props = defineProps<{
  deckJson: DeckJson
  calculateSetting: CalculateSetting
}>()

const deckList = ref<Deck[]>([])
const simpleChecked = ref(false)
const weaponChecked = ref(true)
const summonChecked = ref(true)
const npcChecked = ref(true)
const effectChecked = ref(true)
const dialogVisiable = ref(false)
const calculateSettingList = ref<CalculateSetting[]>([])

watch(() => props.deckJson, (value) => {
  if (value) {
    const npcs = value.npc
    const newNpcs: NpcInfo[] = []
    for (let i = 1; i <= 5; i++) {
      const npc = npcs[i]
      if (npc?.param) {
        const newNpc: NpcInfo = {
          id: npc.param.id,
          image_id_3: npc.param.image_id_3,
          master: {
            id: npc.master.id,
            name: npc.master.name,
          },
          action_ability: [],
        }
        const hit = localNpcList.value.find(n => n.id === newNpc.id)
        if (hit)
          newNpc.action_ability = hit.action_ability
        newNpcs.push(newNpc)
      }
    }

    // 获取主角技能
    const job_param_id = String(value.pc.job.param.id)
    const jobFirstAbility = jobAbilityList.value.find(a => a.job_param_id === job_param_id)

    const leaderAbilityList: NpcAbility[] = []
    const setAction: { name: string, set_action_id: string, icon_id?: string }[] = []
    if (jobFirstAbility) {
      leaderAbilityList[0] = jobFirstAbility
      value.pc.set_action.forEach((ab, idx) => {
        const hitAb = jobAbilityList.value.find(a => a.action_id === ab.set_action_id)
        const action: { name: string, set_action_id: string, icon_id?: string } = { name: ab.name, set_action_id: ab.set_action_id }
        if (hitAb) {
          leaderAbilityList[idx + 1] = { ...hitAb }
          action.icon_id = hitAb.icon_id
        }
        setAction.push({ ...action })
      })
    }

    const hitSetting = calculateSettingList.value.find(item => item.priority === String(value.priority))

    deckList.value.unshift({
      priority: String(value.priority),
      leader: value.pc.param,
      leaderAbilityList,
      npcs: newNpcs,
      setAction,
      weapons: value.pc.weapons,
      summons: value.pc.summons,
      quickSummoniId: String(value.pc.quick_user_summon_id),
      subSummons: value.pc.sub_summons,
      damageInfo: Object.keys(value.pc.after_damage_info || []).length === 0 ? value.pc.damage_info : value.pc.after_damage_info,
      calculateSetting: cloneDeep(hitSetting),
    })

    if (deckList.value.length > 10)
      deckList.value.pop()
  }
})

watch(() => props.calculateSetting, (data) => {
  const hit = calculateSettingList.value.find(item => item.priority === data?.priority)
  if (hit)
    hit.setting = { ...data.setting }
  else
    calculateSettingList.value.push(cloneDeep(data))
})

function triggerSimpleModel(value: CheckboxValueType) {
  weaponChecked.value = !value
  summonChecked.value = !value
  npcChecked.value = !value
  effectChecked.value = !value
}
</script>

<template>
  <div mb-2 flex items-center justify-between px-5>
    <div fc>
      <ElCheckboxButton v-model="simpleChecked" @change="triggerSimpleModel">
        简略模式
      </ElCheckboxButton>

      <ElCheckboxButton v-model="weaponChecked" :disabled="simpleChecked">
        武器
      </ElCheckboxButton>

      <ElCheckboxButton v-model="summonChecked" :disabled="simpleChecked">
        召唤
      </ElCheckboxButton>

      <ElCheckboxButton v-model="npcChecked" :disabled="simpleChecked">
        队伍
      </ElCheckboxButton>

      <ElCheckboxButton v-model="effectChecked" :disabled="simpleChecked">
        效果量
      </ElCheckboxButton>

      <div ml-30px btn @click="dialogVisiable = true">
        队伍比较
      </div>
    </div>
    <div btn @click="deckList = []">
      清空队伍
    </div>
  </div>
  <div fc flex-col gap-2 :class="{ simpleMode: simpleChecked }">
    <ElTag v-if="deckList.length === 0" type="info" effect="dark" size="large" round>
      进入编成界面读取队伍信息
    </ElTag>
    <ElCard v-for="deck, idx in deckList" :key="idx" :body-style="{ padding: '10px' }" max-w-1300px>
      <div relative fc flex-col gap-2>
        <div fc flex-wrap gap-2>
          <Weapon v-show="weaponChecked || simpleChecked" :weapons="deck.weapons" :simple-checked="simpleChecked" :damage-info="deck.damageInfo" />
          <Summon v-show="summonChecked" :summons="deck.summons" :sub-summons="deck.subSummons" :calculate-setting="deck.calculateSetting" :quick-summoni-id="deck.quickSummoniId" />
          <Npc v-show="npcChecked" :npcs="deck.npcs" :leader-ability-list="deck.leaderAbilityList" :leader="deck.leader" :set-action="deck.setAction" :damage-info="deck.damageInfo" />
        </div>
        <div fc>
          <Effect v-show="effectChecked" :effect-value-info="deck.damageInfo.effect_value_info" />
        </div>
        <div i-carbon:close-outline absolute bottom--8px right--8px text-sm icon-btn @click="deckList.splice(idx, 1)" />
      </div>
    </ElCard>
  </div>

  <ElDialog v-model="dialogVisiable" width="1300">
    <BuildCompare :last-deck="deckList[0]" />
  </ElDialog>
</template>

<style scoped>
.simpleMode{
  flex-wrap: wrap;
  flex-direction: row !important
}
</style>
