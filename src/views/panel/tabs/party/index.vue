<script setup lang="ts">
import Effect from './components/Effect.vue'
import Weapon from './components/Weapon.vue'
import Npc from './components/Npc.vue'
import Summon from './components/Summon.vue'
import type { CalculateSetting, DamageInfo, DeckJson, DeckNpc, DeckSummon, DeckWeapon } from '~/logic/types'

const props = defineProps<{
  deckJson: DeckJson
  calculateSetting: CalculateSetting
}>()

interface Deck {
  priority: string
  leader: { image: string }
  npcs: DeckNpc
  setAction: { name: string }[]
  weapons: DeckWeapon
  summons: DeckSummon
  quickSummoniId: string
  subSummons: DeckSummon
  damageInfo: DamageInfo
  calculateSetting?: CalculateSetting
}

const deckList = ref<Deck[]>([])
const weaponChecked = ref(true)
const summonChecked = ref(true)
const npcChecked = ref(true)
const effectChecked = ref(true)

watch(() => props.deckJson, (value) => {
  if (value) {
    let lastCalculateSetting
    if (deckList.value.length > 0 && deckList.value.at(-1)!.priority === String(value.priority))
      lastCalculateSetting = deckList.value.at(-1)!.calculateSetting

    deckList.value.push({
      priority: String(value.priority),
      leader: value.pc.param,
      npcs: value.npc,
      setAction: value.pc.set_action,
      weapons: value.pc.weapons,
      summons: value.pc.summons,
      quickSummoniId: String(value.pc.quick_user_summon_id),
      subSummons: value.pc.sub_summons,
      damageInfo: value.pc.damage_info,
      calculateSetting: lastCalculateSetting,
    })
  }
})

watch(() => props.calculateSetting, (value) => {
  if (deckList.value.length > 0 && value)
    deckList.value.at(-1)!.calculateSetting = value
})
</script>

<template>
  <div flex justify-between items-center mb-2>
    <div pl-5>
      <el-checkbox-button v-model="weaponChecked">
        武器
      </el-checkbox-button>

      <el-checkbox-button v-model="summonChecked">
        召唤
      </el-checkbox-button>

      <el-checkbox-button v-model="npcChecked">
        队伍
      </el-checkbox-button>

      <el-checkbox-button v-model="effectChecked">
        效果量
      </el-checkbox-button>
    </div>
    <div pr-5>
      <div btn @click="deckList = []">
        清空队伍
      </div>
    </div>
  </div>
  <el-card v-for="deck, idx in deckList" :key="idx" :body-style="{ padding: '10px' }">
    <div fc flex-col gap-2 relative>
      <div w-1250px fc flex-wrap gap-2>
        <Weapon v-show="weaponChecked" :weapons="deck.weapons" />
        <Summon v-show="summonChecked" :summons="deck.summons" :sub-summons="deck.subSummons" :calculate-setting="deck.calculateSetting" :quick-summoni-id="deck.quickSummoniId" />
        <Npc v-show="npcChecked" :npcs="deck.npcs" :leader="deck.leader" :set-action="deck.setAction" :damage-info="deck.damageInfo" />
      </div>
      <div w-1250px fc>
        <Effect v-show="effectChecked" :effect-value-info="deck.damageInfo.effect_value_info" />
      </div>
      <div i-carbon:close-outline absolute right-2 bottom-2 text-sm icon-btn @click="deckList.splice(idx, 1)" />
    </div>
  </el-card>
</template>
