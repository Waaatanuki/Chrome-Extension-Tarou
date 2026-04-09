<script setup lang="ts">
import { eventList } from '~/logic'

const eventInfo = computed(() => eventList.value.find(event => event.type === 'treasureraid'))
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          Token Drawbox Event({{ eventInfo.count }} boxes)
        </div>
        <el-tooltip content="Last updated" placement="top">
          {{ formatEventDate(eventInfo.updateTime) }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <MissionList :mission-list="eventInfo.mission" />
    </div>
  </el-card>
</template>
