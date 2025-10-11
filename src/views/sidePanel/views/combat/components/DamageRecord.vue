<script setup lang="ts">
import type { Player } from 'myStorage'

const { playerInfo, isExport = false } = defineProps<{ playerInfo: Player[], isExport?: boolean }>()

type DamageType = 'total' | 'attack' | 'ability' | 'special' | 'other'
const damageType = ref<DamageType>('total')

const damageTypeOptions = ref<{ value: DamageType, label: string }[]>([
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'ability', label: '技能伤害' },
  { value: 'special', label: '奥义伤害' },
  { value: 'other', label: '其他' },
  { value: 'total', label: '总计' },
])

const maxDamage = computed(() =>
  playerInfo.reduce((pre, cur) => pre > cur.damage[damageType.value].value ? pre : cur.damage[damageType.value].value, 1),
)

const totalDamage = computed(() =>
  damageTypeOptions.value.reduce<{ value: string, label: string, total: number }[]>((p, c) => {
    p.push({
      value: c.value,
      label: c.label,
      total: playerInfo.reduce((pre, cur) => {
        pre += cur.damage[c.value].value
        return pre
      }, 0),
    })

    return p
  }, []),
)

function getRengeki(type: 'sa' | 'da' | 'ta', info: { total: number, sa: number, da: number, ta: number }) {
  return `${Math.floor(info[type] / info.total * 100)}%`
}
</script>

<template>
  <div>
    <div v-if="!isExport" mb-15px w-full fc>
      <ElSelect v-model="damageType" style="width:150px" size="small">
        <ElOption
          v-for="item in damageTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </div>
    <div flex flex-col items-start justify-center gap-5px>
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
                placement="top" effect="dark"
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
      <div v-if="isExport" mt-5px w-full flex flex-col text-12px>
        <div v-for="damage, index in totalDamage" :key="index" flex items-center justify-between>
          <div flex-1>
            {{ damage.label }}{{ `(${(damage.total / totalDamage[4].total * 100).toFixed(2)}%)` }}
          </div>
          <div text-end>
            {{ `${damage.total.toLocaleString()}` }}
          </div>
        </div>
      </div>
      <div v-else mt-10px w-full flex justify-end text-base>
        <div fc gap-10px>
          合计： {{ totalDamage[4].total.toLocaleString() }}
          <el-popover placement="top-end" width="200">
            <template #reference>
              <div i-carbon:information />
            </template>
            <el-descriptions direction="vertical" :column="1" size="small" border>
              <el-descriptions-item v-for="damage, index in totalDamage.slice(0, 4)" :key="index" label="Username">
                <template #label>
                  <div flex items-center justify-between>
                    <div>{{ damage.label }}</div>
                    <div>{{ `${(damage.total / totalDamage[4].total * 100).toFixed(2)}%` }}</div>
                  </div>
                </template>
                <div>
                  {{ `${damage.total.toLocaleString()}` }}
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>
