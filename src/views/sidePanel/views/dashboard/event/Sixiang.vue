<script setup lang="ts">
import type { EventInfo } from 'myStorage'
import { Icon } from '@iconify/vue'
import { eventList } from '~/logic'

interface TeamraidAdditional {
  key: string
  label: string
  isAllComplete: boolean
  number: number
}

type TeamraidInfo = EventInfo & { additional: TeamraidAdditional[] }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'sixiang') as TeamraidInfo)
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          四象降临({{ eventInfo.count }}点数)
        </div>
        <el-tooltip content="最后更新时间" placement="top">
          {{ useDateFormat(eventInfo.updateTime, 'MM-DD HH:mm') }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <MissionList :mission-list="eventInfo.mission" />
      <div v-for="item, index in eventInfo.additional" :key="index" flex items-start justify-between>
        <div fc gap-1>
          <Icon
            :icon="item.isAllComplete ? 'material-symbols:check-box' : 'material-symbols:check-box-outline-blank'"
            color="#f0cb4f"
            size="5"
          />
          <div>
            {{ item.label }}
          </div>
        </div>

        <div>
          {{ item.number }}
        </div>
      </div>
    </div>
  </el-card>
</template>
