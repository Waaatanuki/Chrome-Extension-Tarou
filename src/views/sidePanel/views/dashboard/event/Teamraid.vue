<script setup lang="ts">
import type { EventInfo, TeamraidAdditional } from 'extension'
import { Icon } from '@iconify/vue'
import { getEventGachaBoxNum } from '~/constants/event'
import { eventList } from '~/logic'

type TeamraidInfo = EventInfo & { additional: TeamraidAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'teamraid') as TeamraidInfo)
const token = computed(() => eventInfo.value.additional.gachaPoint + eventInfo.value.additional.honor / 1000000 * 60)

function onSetTarget() {
  ElMessageBox.prompt('请输入目标贡献值', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /^\d+$/,
    inputErrorMessage: '请输入正确的数字',
    inputPlaceholder: eventInfo.value.additional.targetHonor ? `当前目标: ${eventInfo.value.additional.targetHonor.toLocaleString()}` : '',
  })
    .then(({ value }) => {
      eventInfo.value.additional.targetHonor = Number(value)
    })
    .catch(() => { })
}
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive && eventInfo.additional" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          古战场({{ getEventGachaBoxNum({ eventType: eventInfo.type, currentToken: token, drawnBox: eventInfo.additional.drawnBox }) }}箱)
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
      <MissionList :mission-list="eventInfo.mission" />

      <div flex items-center justify-between text-12px>
        <div fc gap-1>
          <Icon icon="game-icons:medal" size="5" />
          <div>
            {{ eventInfo.additional.honor.toLocaleString() }}
          </div>
        </div>
        <el-tooltip content="点击设置贡献目标，显示差值" placement="top">
          <TheButton link @click="onSetTarget">
            {{ eventInfo.additional.targetHonor ? (eventInfo.additional.targetHonor - eventInfo.additional.honor).toLocaleString() : '设置目标' }}
          </TheButton>
        </el-tooltip>
      </div>
    </div>
  </el-card>
</template>
