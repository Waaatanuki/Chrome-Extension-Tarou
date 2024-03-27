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

const msg = computed(() => {
  if (!props.data)
    return '收藏后刷新获取数据'

  const itemObj: { [key: string]: string } = {
    '17_20004': '金',
    '10_215': '沙漏',
  }

  const itemName = itemObj[props.data.targetItemKey]

  if (props.data.targetItemCount === 0)
    return `还未出过${itemName}`

  const type = props.data.isBlueTreasure ? '蓝箱' : '场'
  const prefix = props.data.lastDropTake ? `上次出${itemName}${props.data.lastDropTake}${type}，` : ''
  return `${prefix}已经${props.data.lastDropCount}${type}没出过了`
})
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
      <div w-250px fc flex-col>
        <div w-full flex items-center justify-around>
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
        <div text-center text-xs text-gray>
          {{ msg }}
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
