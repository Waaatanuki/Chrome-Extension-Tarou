<script setup lang="ts">
import type { AdventAdditional, EventInfo } from 'extension'
import { eventList } from '~/logic'

type AdventInfo = EventInfo & { additional: AdventAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'advent') as AdventInfo)
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          RotB(<span>{{ eventInfo.count.toLocaleString() }}</span>)
        </div>
        <el-tooltip content="Last updated" placement="top">
          {{ formatEventDate(eventInfo.updateTime) }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <MissionList :mission-list="eventInfo.mission" />
      <div fc gap-10px>
        <div v-for="reward in eventInfo.additional.defeatReward" :key="reward.key" fc flex-col text-12px>
          <img w-52px :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/event/defeat/${reward.key}/s/5000.jpg`">
          <div>
            {{ `${reward.value} tokens` }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
