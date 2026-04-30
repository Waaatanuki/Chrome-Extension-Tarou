<script setup lang="ts">
import type { EventInfo, InterludeAdditional } from 'extension'
import { eventList } from '~/logic'

type InterludeInfo = EventInfo & { additional: InterludeAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'interlude') as InterludeInfo)
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          Arcarum Gaiden ({{ eventInfo.count }} points)
        </div>
        <el-tooltip content="Last updated" placement="top">
          {{ formatEventDate(eventInfo.updateTime) }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <MissionList :mission-list="eventInfo.additional!.dailyList" />
      <MissionList :mission-list="eventInfo.mission" />
    </div>
  </el-card>
</template>
