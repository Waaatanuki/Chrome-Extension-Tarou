<script setup lang="ts">
import { battleInfo, battleRecord, combatPanelSetting } from '~/logic'

const { position } = defineProps<{ position: { x: number, y: number } }>()

const playerInfo = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId)?.player)

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
  playerInfo.value?.reduce((pre, cur) => pre > cur.damage[damageType.value].value
    ? pre
    : cur.damage[damageType.value].value, 1) ?? 0,
)

function handleCommand(command: DamageType) {
  damageType.value = command
}

function getRengeki(type: 'sa' | 'da' | 'ta', info: { total: number, sa: number, da: number, ta: number }) {
  return `${Math.floor(info[type] / info.total * 100)}%`
}

function handleDragEnd(position: { x: number, y: number }) {
  combatPanelSetting.value.DamageRecord.x = position.x
  combatPanelSetting.value.DamageRecord.y = position.y
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
          <ElProgress :percentage=" player.damage[damageType].value / maxDamage * 100" color="#e6a23c" text-inside>
            <div />
          </ElProgress>
          <div mt-10px w-full flex items-center justify-between>
            <div>
              <ElTooltip
                v-if="player.attackInfo"
                :content="`总次数: ${player.attackInfo.total} TA: ${getRengeki('ta', player.attackInfo)} DA: ${getRengeki('da', player.attackInfo)}  SA: ${getRengeki('sa', player.attackInfo)}`"
                placement="top" effect="dark" :show-after="500"
              >
                <div w-60px text-12px>
                  {{ `TA: ${getRengeki('ta', player.attackInfo)}` }}
                </div>
              </ElTooltip>
            </div>
            <div text-end text-12px>
              {{ player.damage[damageType].value.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UseDraggable>
</template>
