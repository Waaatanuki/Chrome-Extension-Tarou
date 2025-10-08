<script setup lang="ts">
import type { EventInfo, TeamforceAdditional } from 'myStorage'
import { Icon } from '@iconify/vue'
import { getEventGachaBoxNum } from '~/constants/event'
import { eventList } from '~/logic'

type TeamforceInfo = EventInfo & { additional: TeamforceAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'teamforce') as TeamforceInfo)
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive && eventInfo.additional" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          公会战({{ getEventGachaBoxNum({ eventType: eventInfo.type, currentToken: eventInfo.additional.gachaPoint, drawnBox: eventInfo.additional.drawnBox }) }}箱)
        </div>
        <el-tooltip content="最后更新时间" placement="top">
          {{ formatEventDate(eventInfo.updateTime) }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <div flex items-start justify-between>
        <div fc gap-1>
          <Icon
            :icon="eventInfo.count ? 'material-symbols:check-box-outline-blank' : 'material-symbols:check-box' "
            color="#60a5fa"
            size="5"
          />
          <div>
            强敌挑战
          </div>
        </div>
        <div>
          {{ `${eventInfo.count}回` }}
        </div>
      </div>
      <MissionList :mission-list="eventInfo.mission" />
    </div>
  </el-card>
</template>
