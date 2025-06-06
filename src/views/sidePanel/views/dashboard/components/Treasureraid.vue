<script setup lang="ts">
import { eventList } from '~/logic'

const eventInfo = computed(() => eventList.value.find(event => event.type === 'treasureraid'))
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          战货活动({{ eventInfo?.count }}箱)
        </div>
        <div>
          {{ useDateFormat(eventInfo.updateTime, 'MM-DD HH:mm') }}
        </div>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <div v-for="mission, index in eventInfo?.mission" :key="index" flex items-start justify-between>
        <el-tooltip
          effect="dark"
          :content="mission.reward"
          raw-content
          placement="top-start"
        >
          <div v-html="mission.desc" />
        </el-tooltip>

        <NumberLimitDisplay :value="{ number: mission.number, limit: mission.limit }" />
      </div>
    </div>
  </el-card>
</template>
