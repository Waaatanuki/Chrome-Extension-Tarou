<script setup lang="ts">
import type { BattleRecord, Player } from 'myStorage'

const props = defineProps<{ battleRecord: BattleRecord }>()

const damageType = ref<'total' | 'attack' | 'ability' | 'special' | 'other'>('total')

const damageTypeOptions = ref([
  { value: 'total', label: '总计' },
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'ability', label: '技能伤害' },
  { value: 'special', label: '奥义伤害' },
  { value: 'other', label: '其他' },
])

const maxDamage = computed(() =>
  props.battleRecord.player.reduce((pre, cur) =>
    pre > cur.damage[damageType.value].value ? pre : cur.damage[damageType.value].value
  , 1),
)

const totalDamage = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => {
    pre += cur.damage[damageType.value].value
    return pre
  }, 0),
)

function getImg(player: Player) {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${player.is_npc ? 'npc' : 'leader'}/m/${player.image_id}.jpg`
}

function getRengeki(type: 'sa' | 'da' | 'ta', info: { total: number; sa: number; da: number; ta: number }) {
  return `${Math.floor(info[type] / info.total * 100)}%`
}
</script>

<template>
  <el-card v-if="battleRecord" w-420px shrink-0>
    <div h-520px>
      <div w-full fc flex-col gap-10px pb-10px>
        <div text-xl font-bold>
          伤害统计
        </div>
        <div>
          <el-select v-model="damageType" w-150px>
            <el-option
              v-for="item in damageTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div fc flex-col gap-10px>
        <div v-for="player in battleRecord.player" :key="player.pid" fc gap-10px>
          <img w-100px :src="getImg(player)">
          <div fc flex-col gap-5px>
            <div relative w-60px>
              <img w-full :src="getLocalImg('ability-count-bg')">
              <div absolute bottom-0 right-7px top-0 fc text-sm>
                {{ player.use_ability_count }}
              </div>
            </div>
            <div relative w-60px>
              <img w-full :src="getLocalImg('special-count-bg')">
              <div absolute bottom-0 right-7px top-0 fc text-sm>
                {{ player.use_special_skill_count }}
              </div>
            </div>
          </div>
          <div w-250px>
            <el-progress :percentage=" player.damage[damageType].value / maxDamage * 100" color="#e6a23c" text-inside>
              <div />
            </el-progress>
            <div mx-5px mt-10px flex justify-between items-center>
              <div>
                <el-tooltip
                  v-if="player.attackInfo"
                  :content="`总次数: ${player.attackInfo.total} TA: ${getRengeki('ta', player.attackInfo)} DA: ${getRengeki('da', player.attackInfo)}  SA: ${getRengeki('sa', player.attackInfo)}`"
                  placement="top" effect="dark"
                >
                  <div text-xs>
                    {{ `TA: ${getRengeki('ta', player.attackInfo)}` }}
                  </div>
                </el-tooltip>
              </div>
              <div text-base>
                {{ player.damage[damageType].value.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
        <div mr-5px mt-10px w-full text-end text-xl>
          合计： {{ totalDamage.toLocaleString() }}
        </div>
      </div>
    </div>
  </el-card>
</template>
