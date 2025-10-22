<script setup lang="ts">
import type { Deck } from 'party'
import { deckList } from '~/logic'
import Npc from '~/views/sidePanel/views/party/components/Npc.vue'
import Summon from '~/views/sidePanel/views/party/components/Summon.vue'
import Weapon from '~/views/sidePanel/views/party/components/Weapon.vue'

interface Result {
  iconImg: string
  diff: -1 | 0 | 1
  value1: {
    str: string
    value: number
    isMax: boolean
  }
  value2: {
    str: string
    value: number
    isMax: boolean
  }
}

const deckInfo = ref<(Deck | undefined)[]>([undefined, undefined])
const currentIndex = ref(0)

const regex = /-?\d+(\.\d+)?/g

watchEffect(() => {
  deckInfo.value[currentIndex.value] = deckList.value[0]
})

const compareResult = computed<Result[]>(() => {
  if (deckInfo.value.some(d => !d))
    return []
  const list: Result[] = deckInfo.value[0]!.effects.map(v => ({
    iconImg: v.iconImg,
    value1: {
      str: v.value,
      value: Number(String(v.value).match(regex)![0]),
      isMax: v.isMax,
    },
    value2: {
      str: String(v.value).replace(regex, '0'),
      value: 0,
      isMax: false,
    },
    diff: 0,
  }))
  deckInfo.value[1]!.effects.forEach((v) => {
    const hit = list.find(item => item.iconImg === v.iconImg)
    if (hit) {
      hit.value2 = {
        str: v.value,
        value: Number(String(v.value).match(regex)![0]),
        isMax: v.isMax,
      }
    }
    else {
      list.push({
        iconImg: v.iconImg,
        value1: {
          str: String(v.value).replace(regex, '0'),
          value: 0,
          isMax: false,
        },
        value2: {
          str: v.value,
          value: Number(String(v.value).match(regex)![0]),
          isMax: v.isMax,
        },
        diff: 0,
      })
    }
  })

  return list.map(item => ({ ...item, diff: item.value1.value < item.value2.value ? 1 : item.value1.value > item.value2.value ? -1 : 0 }))
})

function dataSort(data: Result[]) {
  return data.sort((a, b) => {
    const diffOrder = { '1': 0, '-1': 1, '0': 2 }
    if (diffOrder[a.diff] < diffOrder[b.diff])
      return -1
    if (diffOrder[a.diff] > diffOrder[b.diff])
      return 1

    const aIconPrefix = Number.parseInt(a.iconImg.substring(0, 2))
    const bIconPrefix = Number.parseInt(b.iconImg.substring(0, 2))

    return aIconPrefix - bIconPrefix
  })
}

const showDamage = computed(() => {
  if (deckInfo.value.some(d => !d))
    return

  return [{
    label: '预测伤害',
    before: deckInfo.value[0]!.leader.normalDamage.toLocaleString(),
    after: deckInfo.value[1]!.leader.normalDamage.toLocaleString(),
    diff: deckInfo.value[1]!.leader.normalDamage - deckInfo.value[0]!.leader.normalDamage,
  }, {
    label: '克属伤害',
    before: deckInfo.value[0]!.leader.advantageDamage.toLocaleString(),
    after: deckInfo.value[1]!.leader.advantageDamage.toLocaleString(),
    diff: deckInfo.value[1]!.leader.advantageDamage - deckInfo.value[0]!.leader.advantageDamage,
  }]
})
</script>

<template>
  <div flex flex-col>
    <div flex justify-center gap-10px>
      <div v-for="deck, index in deckInfo" :key="index" min-h-650px w-320px flex flex-col items-center justify-between gap-10px>
        <div h-30px w-200px fc cursor-pointer rounded opacity-50 :class="{ 'text-amber opacity-100! ring-1 ring-amber': currentIndex === index }" @click="currentIndex = index">
          当前配置
        </div>
        <div w-320px fc flex-1 flex-col gap-10px rounded-xl p-10px ring-1 ring-neutral-5>
          <template v-if="deck">
            <Npc :leader="deck.leader" :npcs="deck.npcs" :priority="deck.priority" />
            <Weapon :weapons="deck.weapons" />
            <Summon :summons="deck.summons" />
          </template>
        </div>
      </div>
      <div min-h-650px w-320px flex flex-col items-center justify-between gap-10px>
        <div h-30px />
        <ElScrollbar max-height="700px" w-320px rounded-xl ring-1 ring-neutral-5>
          <div fc flex-col gap-10px p-10px>
            <div
              v-for="effect in dataSort(compareResult)" :key="effect.iconImg"
              w-300px flex items-center justify-between text-base
              :class="{ effect_up: effect.diff === 1, effect_down: effect.diff === -1 }"
            >
              <img w-100px :src="getSkillLabelIcon(effect.iconImg)">
              <div fc>
                <div :class="{ max: effect.value1.isMax }">
                  {{ effect.value1.str }}
                </div>
                <div i-carbon:direction-straight-right mx-5px />
                <div :class="{ max: effect.value2.isMax }">
                  {{ effect.value2.str }}
                </div>
              </div>
            </div>
          </div>
        </ElScrollbar>
      </div>
    </div>
    <div v-if="showDamage" mt-10px fc gap-20px text-16px>
      <div v-for="damage in showDamage" :key="damage.label" w-400px class="flex items-center justify-between rounded-xl p-10px" :class="damage.diff > 0 ? 'effect_up' : 'effect_down'">
        <div> {{ `${damage.label}: ${damage.before}=>${damage.after}` }}</div>
        <div>{{ `${damage.diff > 0 ? '+' : ''}${damage.diff.toLocaleString()}` }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.max {
  color: #ffa826;
}
.effect_up {
  box-shadow: 0 0 3px 3px #059669;
}
.effect_down {
  box-shadow: 0 0 3px 3px #dc2626;
}
</style>
