<script setup lang="ts">
import type { ActionQueue } from 'myStorage'
import NormalAttackInfo from './NormalAttackInfo.vue'

const { mode = 'vertical' } = defineProps<{ actionQueue: ActionQueue[], mode?: 'horizontal' | 'vertical' }>()
</script>

<template>
  <ElCard v-for="list, idx in actionQueue" :key="idx" :body-style="{ padding: '0px' }" shadow="hover" mb-2>
    <div flex flex-col>
      <div flex :class="{ 'flex-col': mode === 'vertical', 'flex-row': mode === 'horizontal' }">
        <div border-b="1  solid #414243">
          <div relative fc shrink-0 flex-col gap-10px bg-neutral-8 p-10px>
            <div text-base font-bold>
              {{ `第${list.turn}回合` }}
            </div>
            <ElTag v-if="list.interrupt_display_text" type="warning" size="small">
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
        </div>
        <div flex flex-1 flex-wrap items-center justify-start gap-10px p-10px border-b="1  solid #414243">
          <div v-for="action, i in list.acitonList" :key="i" fc gap-5px>
            <img h-47px :src="getActionIcon(action)">
            <template v-if="action.aim?.length">
              <div i-game-icons:fast-forward-button text-xl />
              <template v-for="a, n in action.aim" :key="n">
                <img h-47px :src="getOfficialUrl(a)">
              </template>
            </template>
          </div>
        </div>
      </div>
      <NormalAttackInfo v-if="list.normalAttackInfo" :normal-attack-info="list.normalAttackInfo" />
    </div>
  </ElCard>
</template>
