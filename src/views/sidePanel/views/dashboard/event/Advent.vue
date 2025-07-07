<script setup lang="ts">
import type { AdventAdditional, EventInfo } from 'myStorage'
import { eventList } from '~/logic'

type AdventInfo = EventInfo & { additional: AdventAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'advent') as AdventInfo)
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          四象降临(<span :class="{ 'overflowed-point': eventInfo.additional.isOverflowed }">{{ eventInfo.count.toLocaleString() }}</span>)
        </div>
        <el-tooltip content="最后更新时间" placement="top">
          {{ useDateFormat(eventInfo.updateTime, 'MM-DD HH:mm') }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <MissionList :mission-list="eventInfo.mission" />
      <div fc gap-10px>
        <div v-for="reward in eventInfo.additional.defeatReward" :key="reward.key" fc flex-col text-12px>
          <img w-52px :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/item/event/defeat/${reward.key}/s/5000.jpg`">
          <div :class="{ 'text-max': reward.isAllComplete }">
            {{ `${reward.value}枚` }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style>
.overflowed-point {
  color: #e3b7ff;
  text-shadow:
    0px 0px 1px #7f12b7,
    0px 0px 1px #7f12b7,
    0px 0px 1px #7f12b7,
    0px 0px 2px #7f12b7,
    0px 0px 2px #7f12b7,
    0px 0px 2px #7f12b7;
}
</style>
