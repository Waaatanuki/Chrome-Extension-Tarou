<script setup lang="ts">
import type { RaidInfo } from 'myStorage'

// type 1绯绯金 2为沙漏
const props = defineProps<{ raidInfo: RaidInfo, type: number }>()
defineEmits(['toggleVisible'])

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
  let prefix: string
  switch (props.type) {
    case 1:
      if (item.goldBrick === 0)
        return '还未出过金'

      // 超巴不返回信息
      if (item.quest_id === '303141')
        return ''

      prefix = item.lastDropTake ? `上次出金${item.lastDropTake}蓝箱，` : ''
      return `${prefix}已经${item.lastDropCount}蓝箱没出过了`
    case 2:
      if (item.eternitySand === 0)
        return '还未出过沙漏'

      prefix = item.lastDropTake ? `上次沙漏${item.lastDropTake}场，` : ''
      return `${prefix}已经${item.lastDropCount}场没出过了`
  }
}
</script>

<template>
  <ElCard :body-style="{ padding: '5px' }">
    <div relative h-100px fc gap-10px text-sm>
      <div v-if="raidInfo.visiable" i-carbon:star-filled absolute right-0 top-0 text-sm text-amber hover:scale-120 @click="$emit('toggleVisible', raidInfo, type)" />
      <div v-else i-carbon:star absolute right-0 top-0 text-sm hover:scale-120 @click="$emit('toggleVisible', raidInfo, type)" />
      <div relative shrink-0>
        <img w-100px :src="getQuestImg(raidInfo.quest_id)">
        <div mt-2px fc gap-2px>
          <div i-game-icons:crossed-swords />
          <div text-orange font-black>
            {{ raidInfo.total?.toLocaleString() }}
          </div>
          <div i-game-icons:crossed-swords />
        </div>
      </div>
      <div fc flex-col>
        <div w-230px flex items-center justify-around>
          <div v-if="raidInfo.is_blue_treasure" class="desc-item">
            <el-badge :value="raidInfo.blueChest" type="danger" :max="999999">
              <img w-40px :src="getLocalImg('blueChest')">
            </el-badge>

            <div text-xs>
              {{ getRatio(raidInfo.blueChest, raidInfo.total) }}%
            </div>
          </div>

          <div v-else class="desc-item">
            <img w-40px brightness-40 :src="getLocalImg('blueChest')">
          </div>
          <div v-if="type === 1" class="desc-item">
            <el-badge :value="raidInfo.goldBrick" type="danger" :max="999999">
              <img w-40px :src="getLocalImg('goldBrick', 'item')">
            </el-badge>

            <div v-if="raidInfo.quest_id !== '303141'" text-xs>
              {{ getRatio(raidInfo.goldBrick, raidInfo.blueChest) }}%
            </div>
          </div>
          <div v-if="type === 2" class="desc-item">
            <el-badge :value="raidInfo.eternitySand" type="danger" :max="999999">
              <img w-40px :src="getLocalImg('eternitySand', 'item')">
            </el-badge>

            <div text-xs>
              {{ getEternitySandRatio(raidInfo) }}%
            </div>
          </div>
        </div>
        <div text-xs text-gray>
          {{ getMsg(raidInfo) }}
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
