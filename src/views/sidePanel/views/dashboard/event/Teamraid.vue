<script setup lang="ts">
import type { EventInfo, TeamraidAdditional } from 'myStorage'
import { Icon } from '@iconify/vue'
import { getEventGachaBoxNum } from '~/constants/event'
import { eventList } from '~/logic'

type TeamraidInfo = EventInfo & { additional: TeamraidAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'teamraid') as TeamraidInfo)
const token = computed(() => eventInfo.value.additional.gachaPoint + eventInfo.value.additional.honor / 1000000 * 60)
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive && eventInfo.additional" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          古战场({{ getEventGachaBoxNum({ eventType: eventInfo.type, currentToken: token, drawnBox: eventInfo.additional.drawnBox }) }}箱)
        </div>
        <el-tooltip content="最后更新时间" placement="top">
          {{ useDateFormat(eventInfo.updateTime, 'MM-DD HH:mm') }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <div flex items-start justify-between>
        <div fc gap-1>
          <Icon
            :icon="eventInfo.additional.lottery.number >= eventInfo.additional.lottery.limit ? 'material-symbols:check-box' : 'material-symbols:check-box-outline-blank'"
            color="#f0cb4f"
            size="5"
          />
          <div>
            果報の古箱
          </div>
        </div>
        <NumberLimitDisplay :value="{ number: eventInfo.additional.lottery.number, limit: eventInfo.additional.lottery.limit }" />
      </div>
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
