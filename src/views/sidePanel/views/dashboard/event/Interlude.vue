<script setup lang="ts">
import type { EventInfo, InterludeAdditional } from 'extension'
import { eventList } from '~/logic'

type InterludeInfo = EventInfo & { additional: InterludeAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'interlude') as InterludeInfo)
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          转世外传({{ eventInfo.count }}点数)
        </div>
        <el-tooltip content="最后更新时间" placement="top">
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
