<script setup lang="ts">
import { battleInfo, battleRecord, combatPanelSetting } from '~/logic'

const { position } = defineProps<{ position: { x: number, y: number } }>()

const playerInfo = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId)?.player ?? [])

const handle = useTemplateRef<HTMLElement>('handle')
type DamageType = 'total' | 'attack' | 'ability' | 'special' | 'other'
const damageTypeOptions = [
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'ability', label: '技能伤害' },
  { value: 'special', label: '奥义伤害' },
  { value: 'other', label: '其他' },
  { value: 'total', label: '总计' },
] as const

const damageType = ref<DamageType>('total')
const damageTypeDesc = computed(() => damageTypeOptions.find(item => item.value === damageType.value)?.label || '总计')
const maxDamage = computed(() =>
  playerInfo.value.reduce((pre, cur) => pre > cur.damage[damageType.value].value
    ? pre
    : cur.damage[damageType.value].value, 1) ?? 0,
)

const totalDamage = computed(() =>
  damageTypeOptions.reduce<{ value: string, label: string, total: number }[]>((p, c) => {
    p.push({
      value: c.value,
      label: c.label,
      total: playerInfo.value.reduce((pre, cur) => {
        pre += cur.damage[c.value].value
        return pre
      }, 0),
    })

    return p
  }, []),
)

function handleCommand(command: DamageType) {
  damageType.value = command
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
      combatPanelSetting.DamageRecord.x = position.x
      combatPanelSetting.DamageRecord.y = position.y
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
        伤害: {{ damageTypeDesc }}
      </div>

      <el-dropdown placement="top" size="small" @command="handleCommand">
        <div i-carbon:settings icon-btn />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in damageTypeOptions"
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
          <ElProgress :percentage="player.damage[damageType].value / maxDamage * 100" color="#e6a23c" :stroke-width="8" text-inside>
            <div />
          </ElProgress>
          <div mx-2px mt-5px flex items-center justify-between text-12px>
            <div>
              {{ player.damage[damageType].value.toLocaleString() }}
            </div>
            <div>
              {{ (player.damage[damageType].value / totalDamage.find(item => item.value === damageType)!.total * 100).toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </UseDraggable>
</template>
