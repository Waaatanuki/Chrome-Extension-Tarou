<script setup lang="ts">
import { battleInfo, battleRecord, combatPanelSetting } from '~/logic'
import NormalAttackInfo from '~/views/sidePanel/views/combat/components/NormalAttackInfo.vue'

const { position } = defineProps<{ position: { x: number, y: number } }>()

const innerRef = useTemplateRef<HTMLDivElement>('innerRef')
const scrollbarRef = ref<ScrollbarInstance>()

const currentRecord = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
const actionQueue = computed(() => currentRecord.value?.actionQueue || [])

watch(actionQueue, () => {
  nextTick(() => {
    scrollbarRef.value?.setScrollTop(innerRef.value?.scrollHeight || 0)
  })
}, { deep: true })
</script>

<template>
  <UseDraggable
    v-slot="{ x, y, isDragging }"
    class="absolute"
    :initial-value="position"
    :prevent-default="true"
    @end="(position) => {
      combatPanelSetting.ActionList.x = position.x
      combatPanelSetting.ActionList.y = position.y
    }"
  >
    <div :class="{ hidden: !isDragging }" class="absolute left-0 top--30px w-150px">
      {{ `X: ${parseInt(x)}, Y: ${parseInt(y)}` }}
    </div>
    <el-scrollbar
      ref="scrollbarRef"
      class="max-w-625px min-w-510px"
      :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
      max-height="600"
    >
      <div ref="innerRef" px-3>
        <ElCard v-for="list, idx in actionQueue" :key="idx" mb-2 :body-style="{ padding: '0px' }" shadow="hover">
          <div flex flex-col>
            <div flex>
              <div relative fc shrink-0 flex-col gap-10px bg-neutral-8 p-10px border-b="1  solid #414243">
                <div text-base font-bold>
                  {{ `第${list.turn}回合` }}
                </div>
                <div v-if="list.interrupt_display_text" flex flex-col gap-1px>
                  <el-tag v-for="text in list.interrupt_display_text.split('|')" :key="text" type="warning" size="small">
                    {{ text }}
                  </el-tag>
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
              <div flex flex-1 flex-wrap items-center justify-start gap-10px p-10px border-b="1  solid #414243">
                <div v-for="action, i in list.actionList" :key="i" fc gap-5px>
                  <img h-47px :src="getActionIcon(action)">
                  <template v-if="action.aim?.length">
                    <div class="i-game-icons:fast-forward-button text-xl" />
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
      </div>
    </el-scrollbar>
  </UseDraggable>
</template>
