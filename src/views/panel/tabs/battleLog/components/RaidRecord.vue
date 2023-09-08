<script setup lang="ts">
import type { RaidRecord } from 'myStorage'

defineProps<{ raidRecord: RaidRecord }>()

const damageType = ref<'total' | 'attack' | 'ability' | 'special' | 'other'>('total')

const damageTypeOptions = ref([
  { value: 'total', label: '总计' },
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'ability', label: '技能伤害' },
  { value: 'special', label: '奥义伤害' },
  { value: 'other', label: '其他' },
])
function getImg(pid: string, index: number) {
  return index === 0
    ? 'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/sd/m/leaderskin.jpg'
    : `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/m/${pid}_01.jpg`
}
</script>

<template>
  <div w-600px>
    <div fc text-xl font-bold>
      伤害统计
    </div>
    <div>
      <el-select v-model="damageType" size="large">
        <el-option
          v-for="item in damageTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div flex items-start justify-center flex-col gap-10px>
      <div v-for="player, idx in raidRecord.player" :key="player.pid" fc gap-10px>
        <img w-100px :src="getImg(player.pid, idx)">
        <div text-xl>
          {{ player.damage[damageType].value.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>
