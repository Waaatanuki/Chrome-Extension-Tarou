<script setup lang="ts">
import type { RaidInfo } from 'myStorage'

withDefaults(
  defineProps<{ collapse?: boolean; data: RaidInfo[] }>(),
  { collapse: false })

function getRatio(a = 0, b = 0) {
  if (b === 0)
    return 0

  return ((a / b) * 100).toFixed(2)
}

function getEternitySandRatio(item: RaidInfo) {
  if (item.is_blue_eternitySand)
    return getRatio(item.eternitySand, item.blueChest)
  else
    return getRatio(item.eternitySand, item.total)
}

function getMsg(item: RaidInfo) {
  if (item.lastDropTake)
    return `上次出沙漏经历了${item.lastDropTake}场，已经有${item.lastDropCount}场没出过沙漏了`
  else
    return `距离上次出沙漏已经过去了${item.lastDropCount}场`
}
</script>

<template>
  <el-card v-for="item in data" :key="item.quest_id" relative>
    <div v-if="collapse" i-carbon:checkmark-outline absolute right-2 top-2 text-sm icon-btn @click="item.visiable = !item.visiable" />
    <div v-else i-carbon:close-outline absolute right-2 top-2 text-sm icon-btn @click="item.visiable = !item.visiable" />
    <div flex justify-evenly gap-5>
      <div fc w-150px shrink-0>
        <img w-full :src="getLocalImg(item.quest_id, 'raid')">
      </div>
      <div w-full fc flex-col gap-4>
        <div flex justify-between gap-10>
          <div max-w-120px flex items-start justify-center>
            <el-statistic :value="item.total" title="总次数" />
          </div>
          <div v-if="item.is_blue_treasure" max-w-120px flex flex-col items-center justify-start>
            <el-statistic :value="item.blueChest" title="蓝箱" />
            <el-text size="small">
              蓝箱率： {{ getRatio(item.blueChest, item.total) }}%
            </el-text>
          </div>
          <div max-w-120px flex flex-col items-center justify-start>
            <el-statistic :value="item.eternitySand" title="沙漏" />
            <el-tooltip placement="bottom-start">
              <template #content>
                蓝箱掉落沙漏的副本，计算沙漏率时分母为蓝箱数，否则为总次数
              </template>
              <el-text size="small">
                沙漏率： {{ getEternitySandRatio(item) }}%
              </el-text>
            </el-tooltip>
          </div>
        </div>
        <el-text v-if="item.eternitySand === 0" type="warning">
          还未出过沙漏
        </el-text>
        <el-text v-else type="info">
          {{ getMsg(item) }}
        </el-text>
      </div>
    </div>
  </el-card>
</template>
