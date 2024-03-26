<script setup lang="ts">
import type { DropData } from 'api'
import type { Quest } from 'myStorage'

const props = defineProps<{ questInfo: Quest, data?: DropData, visible: boolean }>()
defineEmits(['toggleVisible'])

function getRatio(a = 0, b = 0) {
  if (b === 0)
    return '0.00'

  return ((a / b) * 100).toFixed(2)
}

function getDropRatio(item?: DropData) {
  if (!item)
    return '0.00'
  if (item.isBlueTreasure)
    return getRatio(item.targetItemCount, item.blueChest)
  else
    return getRatio(item.targetItemCount, item.total)
}

function getMsg(item?: DropData) {
  if (!item)
    return '收藏后刷新获取数据'
  let prefix: string
  switch (props.questInfo?.targetItemKey) {
    case '17_20004':
      if (item.targetItemCount === 0)
        return '还未出过金'

      // 超巴不返回信息
      if (item.questId === '303141')
        return ''

      prefix = item.lastDropTake ? `上次出金${item.lastDropTake}蓝箱，` : ''
      return `${prefix}已经${item.lastDropCount}蓝箱没出过了`
    case '10_215':
      if (item.targetItemCount === 0)
        return '还未出过沙漏'

      prefix = item.lastDropTake ? `上次沙漏${item.lastDropTake}场，` : ''
      return `${prefix}已经${item.lastDropCount}场没出过了`
  }
}
</script>

<template>
  <ElCard v-if="questInfo" :body-style="{ padding: '5px' }">
    <div relative h-100px fc gap-10px text-sm>
      <div v-if="visible" i-carbon:star-filled absolute right-0 top-0 text-sm text-amber hover:scale-120 @click="$emit('toggleVisible', questInfo)" />
      <div v-else i-carbon:star absolute right-0 top-0 text-sm hover:scale-120 @click="$emit('toggleVisible', questInfo)" />
      <div relative shrink-0>
        <img w-100px draggable="false" :src="getQuestImg(questInfo.questId)">
        <div mt-2px fc gap-2px>
          <div i-game-icons:crossed-swords />
          <div text-orange font-black>
            {{ data?.total?.toLocaleString() }}
          </div>
          <div i-game-icons:crossed-swords />
        </div>
      </div>
      <div fc flex-col>
        <div w-230px flex items-center justify-around>
          <div v-if="questInfo.isBlueBox" class="desc-item">
            <el-badge :value="data?.blueChest" type="danger" :max="999999">
              <img w-40px draggable="false" :src="getLocalImg('blueChest')">
            </el-badge>

            <div text-xs>
              {{ getRatio(data?.blueChest, data?.total) }}%
            </div>
          </div>

          <div v-else class="desc-item">
            <img w-40px brightness-40 draggable="false" :src="getLocalImg('blueChest')">
          </div>

          <div class="desc-item">
            <el-badge :value="data?.targetItemCount" type="danger" :max="999999">
              <img w-40px draggable="false" :src="getLocalImg(questInfo.targetItemKey, 'item')">
            </el-badge>

            <div text-xs>
              {{ getDropRatio(data) }}%
            </div>
          </div>
        </div>
        <div text-xs text-gray>
          {{ getMsg(data) }}
        </div>
      </div>
    </div>
  </ElCard>
</template>

<style scoped>
.desc-item{
  width: 60px;
  height: 60px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
}
</style>
