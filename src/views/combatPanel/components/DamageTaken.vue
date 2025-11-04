<script setup lang="ts">
import { battleInfo, battleRecord, combatPanelSetting } from '~/logic'

type DamageTakenType = 'total' | 'attack' | 'super' | 'other'

const { position } = defineProps<{ position: { x: number, y: number } }>()

const damageTakenTypeOptions = [
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'super', label: '特动' },
  { value: 'other', label: '其他' },
  { value: 'total', label: '总计' },
] as const

const playerInfo = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId)?.player)

const handle = useTemplateRef<HTMLElement>('handle')
const damageTakenType = ref<DamageTakenType>('total')
const damageTakenTypeDesc = computed(() => damageTakenTypeOptions.find(item => item.value === damageTakenType.value)?.label || '总计')

const maxDamageTaken = computed(() =>
  playerInfo.value?.reduce((pre, cur) => pre > cur.damageTaken[damageTakenType.value].value
    ? pre
    : cur.damageTaken[damageTakenType.value].value, 1) ?? 0,
)

function handleCommand(command: DamageTakenType) {
  damageTakenType.value = command
}

function handleDragEnd(position: { x: number, y: number }) {
  combatPanelSetting.value.DamageTaken.x = position.x
  combatPanelSetting.value.DamageTaken.y = position.y
}
</script>

<template>
  <UseDraggable
    v-slot="{ isDragging }"
    class="absolute w-300px"
    border="~ neutral-7 rounded"
    :initial-value="position"
    :prevent-default="true"
    :handle="handle"
    @end="handleDragEnd"
  >
    <div
      class="flex items-center justify-between bg-neutral-7 px-2 py-1 text-12px"
      :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
    >
      <div ref="handle" flex-1>
        承伤: {{ damageTakenTypeDesc }}
      </div>

      <el-dropdown placement="top" size="small" @command="handleCommand">
        <div i-carbon:settings icon-btn />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in damageTakenTypeOptions"
              :key="item.value"
              :command="item.value"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div flex flex-col items-start justify-center gap-5px p-5px>
      <div v-for="player in playerInfo" :key="player.pid" fc gap-5px>
        <div relative w-45px>
          <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
            <span text-12px text-red font-bold>Dead</span>
          </div>
          <img w-full :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id, 's')">
        </div>
        <div fc flex-col gap-5px>
          <div relative w-50px>
            <img w-full :src="getLocalImg('ability-count-bg')">
            <div absolute inset-y-0 right-7px fc text-12px>
              {{ player.use_ability_count }}
            </div>
          </div>
          <div relative w-50px>
            <img w-full :src="getLocalImg('special-count-bg')">
            <div absolute inset-y-0 right-7px fc text-12px>
              {{ player.use_special_skill_count }}
            </div>
          </div>
        </div>
        <div w-180px>
          <ElProgress :percentage=" player.damageTaken[damageTakenType].value / maxDamageTaken * 100" color="#be123c" text-inside>
            <div />
          </ElProgress>
          <div mx-5px mt-10px flex items-center justify-between>
            <div />
            <div text-12px>
              {{ player.damageTaken[damageTakenType].value.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UseDraggable>
</template>
