<script setup lang="ts">
import type { RaidRecord } from 'myStorage'

const props = defineProps<{ raidRecord: RaidRecord }>()

const damageType = ref<'total' | 'attack' | 'ability' | 'special' | 'other'>('total')

const damageTypeOptions = ref([
  { value: 'total', label: '总计' },
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'ability', label: '技能伤害' },
  { value: 'special', label: '奥义伤害' },
  { value: 'other', label: '其他' },
])

const maxDamage = computed(() =>
  props.raidRecord.player.reduce((pre, cur) =>
    pre > cur.damage[damageType.value].value ? pre : cur.damage[damageType.value].value
  , 0),
)

const totalDamage = computed(() =>
  props.raidRecord.player.reduce((pre, cur) => {
    pre += cur.damage[damageType.value].value
    return pre
  }, 0),
)

function getImg(pid: string, index: number) {
  return index === 0
    ? 'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/sd/m/leaderskin.jpg'
    : `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/m/${pid}_01.jpg`
}
</script>

<template>
  <el-card w-400px>
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
      <div v-for="player, idx in raidRecord.player" :key="player.pid" fc gap-10px>
        <img w-100px :src="getImg(player.pid, idx)">
        <div w-250px>
          <el-progress :percentage=" player.damage[damageType].value / maxDamage * 100" color="#e6a23c" text-inside>
            <div />
          </el-progress>
          <div mr-5px mt-10px text-end text-xl>
            {{ player.damage[damageType].value.toLocaleString() }}
          </div>
        </div>
      </div>
      <div mr-5px mt-10px w-full text-end text-xl>
        合计： {{ totalDamage.toLocaleString() }}
      </div>
    </div>
  </el-card>
</template>
