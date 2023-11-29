<script setup lang="ts">
import type { RaidInfo } from 'myStorage'

withDefaults(
  defineProps<{ collapse?: boolean, data: RaidInfo[] }>(),
  { collapse: false },
)

function getRatio(a = 0, b = 0) {
  if (b === 0)
    return '0.00'

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
    return `上次出沙漏经历${item.lastDropTake}场，已经${item.lastDropCount}场没出过了`
  else
    return `距离上次出沙漏已经过去了${item.lastDropCount}场`
}
</script>

<template>
  <ElCard v-for="item in data" :key="item.quest_id" relative w-520px>
    <div v-if="collapse" i-carbon:star absolute right-2 top-2 text-sm hover:scale-120 @click="item.visiable = !item.visiable" />
    <div v-else i-carbon:star-filled absolute right-2 top-2 text-sm text-amber hover:scale-120 @click="item.visiable = !item.visiable" />
    <div flex justify-evenly gap-5>
      <div w-150px fc shrink-0>
        <img w-full :src="getQuestImg(item.quest_id)">
      </div>
      <div w-full fc flex-col gap-4>
        <div flex justify-between gap-10>
          <div max-w-120px flex items-start justify-center>
            <ElStatistic :value="item.total" title="总次数" />
          </div>
          <div v-if="item.is_blue_treasure" max-w-120px flex flex-col items-center justify-start>
            <ElStatistic :value="item.blueChest" title="蓝箱" />
            <ElText size="small">
              蓝箱率： {{ getRatio(item.blueChest, item.total) }}%
            </ElText>
          </div>
          <div max-w-120px flex flex-col items-center justify-start>
            <ElStatistic :value="item.eternitySand" title="沙漏" />
            <ElTooltip placement="bottom-start">
              <template #content>
                蓝箱掉落沙漏的副本，计算沙漏率时分母为蓝箱数，否则为总次数
              </template>
              <ElText size="small">
                沙漏率： {{ getEternitySandRatio(item) }}%
              </ElText>
            </ElTooltip>
          </div>
        </div>
        <ElText v-if="item.eternitySand === 0" type="warning">
          还未出过沙漏
        </ElText>
        <ElText v-else type="info">
          {{ getMsg(item) }}
        </ElText>
      </div>
    </div>
  </ElCard>
</template>
