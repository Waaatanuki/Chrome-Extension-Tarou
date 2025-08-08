<script setup lang="ts">
import { eventList } from '~/logic'

const eventInfo = computed(() => eventList.value.find(event => event.type === 'alchemist'))
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          炼金活动({{ eventInfo.count }}个)
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
