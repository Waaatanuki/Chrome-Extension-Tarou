<script setup lang="ts">
import type { BattleRecord } from 'myStorage'

const props = defineProps<{ battleRecord: BattleRecord }>()
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref()

watch(() => props.battleRecord, () => {
  nextTick(() => {
    scrollbarRef.value?.setScrollTop(innerRef.value?.scrollHeight || 0)
  })
}, { deep: true })
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
              {{ `第${list.turn}回合` }}
            </div>
            <ElTag v-if="list.interrupt_display_text" type="warning">
              {{ list.interrupt_display_text }}
            </ElTag>
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
              <img h-50px :src="getActionIcon(action)">
              <template v-if="action.aim_num">
                <div i-game-icons:fast-forward-button mx-5px text-xl />
                <img h-50px :src="getAssetImg(action.aim_is_npc ? 'npc' : 'leader', `${action.aim_num}_01`, 's')">
              </template>
            </div>
          </div>
        </ElCard>
      </div>
    </ElScrollbar>
  </ElCard>
</template>
