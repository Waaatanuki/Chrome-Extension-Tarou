<script setup lang="ts">
import type { Action, BattleRecord } from 'myStorage'

const props = defineProps<{ battleRecord: BattleRecord }>()
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref()

watch(() => props.battleRecord, () => {
  nextTick(() => {
    scrollbarRef.value?.setScrollTop(innerRef.value?.scrollHeight || 0)
  })
}, { deep: true })

function getImg(action: Action) {
  if (action.type === 'ability') {
    return action.isSub
      ? `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/ability/s/${action.icon}.jpg`
      : `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/ability/m/${action.icon}.png`
  }
  if (action.type === 'fc')
    return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/ability/m/fatal_chain_${action.icon}.png`
  if (action.type === 'summon')
    return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/summon/m/${action.icon}.jpg`
  if (action.type === 'temporary')
    return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/item/temporary/m/${action.icon}.jpg`
  if (action.type === 'recovery')
    return 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/item/normal/s/1.jpg'
  if (action.type === 'attack')
    return 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/ability/m/normal_attack.png'
}

function getNpcImg(action: Action) {
  return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/${action.aim_is_npc ? 'npc' : 'leader'}/m/${action.aim_num}_01.jpg`
}
</script>

<template>
  <ElCard v-if="battleRecord" min-w-400px>
    <ElScrollbar ref="scrollbarRef" height="554px">
      <div ref="innerRef">
        <ElCard
          v-for="list, idx in battleRecord.actionQueue" :key="idx"
          :body-style="{ padding: '0px', display: 'flex' }"
          shadow="hover"
        >
          <div relative w-200px fc shrink-0 flex-col gap-10px p-10px class="bg-#f5f7fa dark:bg-#262727">
            <div text-base font-bold>
              {{ `Turn ${list.turn}` }}
            </div>
            <div fc gap-2px>
              <ElCheckTag v-for="index in 4" :key="index" label="G" :checked="!!list.guard_status[index - 1]?.is_guard_status">
                G
              </ElCheckTag>
            </div>
            <div absolute left-5px top-5px fc>
              <ElTag :type="list.special_skill_flag ? 'danger' : 'success'" effect="dark" size="small">
                {{ list.special_skill_flag ? 'OFF' : 'ON' }}
              </ElTag>
            </div>
            <div absolute right-5px top-5px text-sm>
              {{ Math.ceil(list.bossHpPercent) }}
            </div>
          </div>

          <div flex flex-wrap items-center justify-start gap-10px p-10px>
            <div v-for="action, i in list.acitonList" :key="i" fc>
              <img h-50px :src="getImg(action)">
              <template v-if="action.aim_num">
                <div i-carbon:arrow-right w-20px text-xl />
                <img h-50px :src="getNpcImg(action)">
              </template>
            </div>
          </div>
        </ElCard>
      </div>
    </ElScrollbar>
  </ElCard>
</template>
