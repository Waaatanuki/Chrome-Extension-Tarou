<script setup lang="ts">
import type { EventInfo } from 'extension'
import { eventList } from '~/logic'

interface TerraAdditional {
  current_loop_num: number
  remain_square_num_to_goal: number
}

type TerraInfo = EventInfo & { additional: TerraAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'terra') as TerraInfo)

const loopNum = computed(() => {
  const diff = eventInfo.value.count - eventInfo.value.additional.remain_square_num_to_goal
  const isCurrentRemain = diff >= 0 ? 1 : 0
  return eventInfo.value.additional.current_loop_num + isCurrentRemain + Math.floor(Math.max(diff, 0) / 1200)
})
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          十天众战记({{ loopNum }}周目)
        </div>
        <el-tooltip content="最后更新时间" placement="top">
          {{ formatEventDate(eventInfo.updateTime) }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <MissionList :mission-list="eventInfo.mission" />
    </div>
  </el-card>
</template>
