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

const playerInfo = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId)?.player ?? [])

const handle = useTemplateRef<HTMLElement>('handle')
const damageTakenType = ref<DamageTakenType>('total')
const damageTakenTypeDesc = computed(() => damageTakenTypeOptions.find(item => item.value === damageTakenType.value)?.label || '总计')

const maxDamageTaken = computed(() =>
  playerInfo.value.reduce((pre, cur) => pre > cur.damageTaken[damageTakenType.value].value
    ? pre
    : cur.damageTaken[damageTakenType.value].value, 1) ?? 0,
)

const totalDamageTaken = computed(() =>
  damageTakenTypeOptions.reduce<{ value: string, label: string, total: number }[]>((p, c) => {
    p.push({
      value: c.value,
      label: c.label,
      total: playerInfo.value.reduce((pre, cur) => {
        pre += cur.damageTaken[c.value].value
        return pre
      }, 0),
    })
    return p
  }, []),
)

function handleCommand(command: DamageTakenType) {
  damageTakenType.value = command
}
</script>

<template>
  <UseDraggable
    v-slot="{ x, y, isDragging }"
    class="absolute w-250px"
    border="~ neutral-7 rounded"
    :initial-value="position"
    :prevent-default="true"
    :handle="handle"
    @end="(position) => {
      combatPanelSetting.DamageTaken.x = position.x
      combatPanelSetting.DamageTaken.y = position.y
    }"
  >
    <div :class="{ hidden: !isDragging }" class="absolute left-0 top--30px w-150px">
      {{ `X: ${parseInt(x)}, Y: ${parseInt(y)}` }}
    </div>
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
      <div v-for="player in playerInfo" :key="player.pid" fc gap-8px>
        <div relative w-45px>
          <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
            <span text-12px text-red font-bold>Dead</span>
          </div>
          <img w-full :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id, 's')">
        </div>
        <div w-180px py-5px>
          <ElProgress :percentage=" player.damageTaken[damageTakenType].value / maxDamageTaken * 100" :stroke-width="8" color="#be123c" text-inside>
            <div />
          </ElProgress>
          <div mx-2px mt-5px flex items-center justify-between text-12px>
            <div>
              {{ player.damageTaken[damageTakenType].value.toLocaleString() }}
            </div>
            <div>
              {{ (player.damageTaken[damageTakenType].value / totalDamageTaken.find(item => item.value === damageTakenType)!.total * 100).toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </UseDraggable>
</template>
