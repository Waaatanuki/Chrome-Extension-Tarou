<script setup lang="ts">
import type { RaidInfo } from 'myStorage'

// type 1绯绯金 2为沙漏
const props = defineProps<{ raidInfo: RaidInfo, type: number }>()
defineEmits(['close'])
const closeBtnVisible = ref(false)

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
    <div h-75px fc gap-10px text-sm>
      <div relative shrink-0 @mouseenter="closeBtnVisible = true" @mouseleave="closeBtnVisible = false">
        <img w-100px :src="getQuestImg(raidInfo.quest_id)">
        <div v-if="closeBtnVisible" absolute left-0 top-0 h-full w-full fc @click="$emit('close', raidInfo, type)">
          <div absolute h-full w-full bg-slate-900 opacity-50 />
          <div i-carbon:close-outline text-3xl />
        </div>
      </div>

      <div fc flex-col>
        <div w-210px flex items-center justify-start>
          <div class="desc-item">
            <div>
              总次数
            </div>
            <div text-xs>
              {{ raidInfo.total }}
            </div>
          </div>
          <div v-if="raidInfo.is_blue_treasure" class="desc-item">
            <div>蓝箱</div>
            <div text-xs>
              {{ raidInfo.blueChest }}
            </div>
            <div text-xs>
              {{ getRatio(raidInfo.blueChest, raidInfo.total) }}%
            </div>
          </div>
          <div v-if="type === 1" class="desc-item">
            <div>绯绯金</div>
            <div text-xs>
              {{ raidInfo.goldBrick }}
            </div>
            <div text-xs>
              {{ getRatio(raidInfo.goldBrick, raidInfo.blueChest) }}%
            </div>
          </div>
          <div v-if="type === 2" class="desc-item">
            <div>沙漏</div>
            <div text-xs>
              {{ raidInfo.eternitySand }}
            </div>
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
  width: 70px;
  height: 55px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-end;
}
</style>
