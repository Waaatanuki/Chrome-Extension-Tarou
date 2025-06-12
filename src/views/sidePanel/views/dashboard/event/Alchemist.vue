<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { eventList } from '~/logic'

const eventInfo = computed(() => eventList.value.find(event => event.type === 'alchemist'))
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          炼金活动({{ eventInfo?.count }}个)
        </div>
        <el-tooltip content="最后更新时间" placement="top">
          {{ useDateFormat(eventInfo.updateTime, 'MM-DD HH:mm') }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <div v-for="mission, index in eventInfo?.mission" :key="index" flex items-start justify-between>
        <el-tooltip
          effect="dark"
          :content="mission.reward"
          :disabled="!mission.reward"
          raw-content
          placement="top-start"
        >
          <div fc gap-1>
            <Icon
              :icon="mission.isAllComplete ? 'material-symbols:check-box' : 'material-symbols:check-box-outline-blank'"
              :color="mission.isDailyMission ? '#60a5fa' : '#f0cb4f'"
              size="5"
            />
            <div v-html="mission.desc" />
          </div>
        </el-tooltip>

        <NumberLimitDisplay :value="{ number: mission.number, limit: mission.limit }" />
      </div>
    </div>
  </el-card>
</template>
