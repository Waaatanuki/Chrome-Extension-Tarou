<script setup lang="ts">
import type { EventInfo, TeamraidAdditional } from 'extension'
import { Icon } from '@iconify/vue'
import { getEventGachaBoxNum } from '~/constants/event'
import { eventList } from '~/logic'

type TeamraidInfo = EventInfo & { additional: TeamraidAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'teamraid') as TeamraidInfo)
const token = computed(() => eventInfo.value.additional.hasSpReward ? eventInfo.value.additional.gachaPoint : eventInfo.value.additional.gachaPoint + eventInfo.value.additional.honor / 1000000 * 60)

function onSetTarget() {
  ElMessageBox.prompt('Please enter target honors', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    inputPattern: /^\d+$/,
      inputErrorMessage: 'Please enter a valid number',
      inputPlaceholder: eventInfo.value.additional.targetHonor ? `Current target: ${eventInfo.value.additional.targetHonor.toLocaleString()}` : '',
  })
    .then(({ value }) => {
      eventInfo.value.additional.targetHonor = Number(value)
    })
    .catch(() => { })
}
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive && eventInfo.additional" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          Unite and Fight({{ getEventGachaBoxNum({ eventType: eventInfo.type, currentToken: token, drawnBox: eventInfo.additional.drawnBox }) }} boxes)
        </div>
        <el-tooltip content="Last updated" placement="top">
          {{ formatEventDate(eventInfo.updateTime) }}
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
            Fortune Old Chests
          </div>
        </div>
        <NumberLimitDisplay :value="{ number: eventInfo.additional.lottery.number, limit: eventInfo.additional.lottery.limit }" />
      </div>
      <MissionList :mission-list="eventInfo.mission" />

      <div flex items-center justify-between text-12px>
        <div fc gap-1>
          <Icon icon="game-icons:medal" size="5" />
          <div>
            {{ eventInfo.additional.honor.toLocaleString() }}
          </div>
        </div>
          <el-tooltip content="Click to set target honors and show the difference" placement="top">
          <TheButton link @click="onSetTarget">
              {{ eventInfo.additional.targetHonor ? (eventInfo.additional.targetHonor - eventInfo.additional.honor).toLocaleString() : 'Set Target' }}
          </TheButton>
        </el-tooltip>
      </div>
    </div>
  </el-card>
</template>
