<script setup lang="ts">
import { eventList } from '~/logic'

const eventInfo = computed(() => eventList.value.find(event => event.type === 'biography'))
const articleIitemNum = computed(() => Object.values (eventInfo.value?.additional || {}).join(' | '))
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          剧情活动{{ `( ${articleIitemNum} )` }}
        </div>
        <el-tooltip content="最后更新时间" placement="top">
          {{ useDateFormat(eventInfo.updateTime, 'MM-DD HH:mm') }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <MissionList :mission-list="eventInfo.mission" />
    </div>
  </el-card>
</template>
