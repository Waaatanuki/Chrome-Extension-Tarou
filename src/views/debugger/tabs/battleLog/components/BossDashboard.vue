<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { battleInfo, battleRecord } from '~/logic'
import Memo from './Memo.vue'

const currentRaid = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
const timerValue = computed(() => Date.now() + battleInfo.value.bossInfo!.timer * 1000)
const endTimerValue = computed(() => Date.now() + Number(battleInfo.value.bossInfo!.addition?.unique_gauge_time_limit?.rest_time) * 1000 || 0)
const bossImgSrc = computed(() => getBossImg('enemy', battleInfo.value.bossInfo!.imgId, 's'))
const operationSecond = computed(() => currentRaid.value ? currentRaid.value.startTimer - currentRaid.value.endTimer : 0)

function handleCopy(text: string) {
  if (copy(text))
    ElMessage.success(`已复制救援码${text}`)
}
</script>

<template>
  <div v-if="battleInfo.bossInfo" relative w-350px>
    <ElProgress type="circle" :percentage="battleInfo.bossInfo.hpPercent" :stroke-width="15" status="exception" :width="350">
      <template #default="{ percentage }">
        <div flex flex-col gap-2>
          <div fc gap-5 text-xl>
            {{ `TURN ${battleInfo.bossInfo.turn}` }}
            <div v-if="battleInfo.bossInfo.hp === 0">
              {{ formatTime(battleInfo.bossInfo.timer) }}
            </div>
            <ElCountdown v-else :value="timerValue" />
          </div>
          <div fc>
            <img :src="bossImgSrc">
            <span>{{ percentage }}%</span>
          </div>
          <div text-base>
            {{ battleInfo.bossInfo.name }}
          </div>
          <div text-base>
            {{ `${battleInfo.bossInfo.hp.toLocaleString()}/${battleInfo.bossInfo.hpmax.toLocaleString()}` }}
          </div>
        </div>
      </template>
    </ElProgress>
    <ElCountdown
      v-if="battleInfo.bossInfo.addition?.unique_gauge_time_limit"
      value-style="color: #b91c1c" format="mm:ss" :value="endTimerValue"
      absolute class="left-1/2 top-1/2 translate-y--110px -translate-x-1/2"
    />
    <ElTag v-if="battleInfo.bossInfo.interrupt_display_text" absolute class="left-1/2 top-1/2 translate-y-85px -translate-x-1/2">
      {{ battleInfo.bossInfo.interrupt_display_text }}
    </ElTag>
    <div absolute left-1 top-1 text-lg>
      {{ formatTime(operationSecond) }}
    </div>
    <div absolute right-1 top-1 text-base>
      <el-link :underline="false" @click="handleCopy(battleInfo.bossInfo.shareId ?? '')">
        {{ battleInfo.bossInfo.shareId }}
      </el-link>
    </div>
    <div absolute bottom-1 left-1>
      <Memo :quest-id="battleInfo.bossInfo.questId" :quest-name="battleInfo.bossInfo.name" />
    </div>
  </div>
</template>
