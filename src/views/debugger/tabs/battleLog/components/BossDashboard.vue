<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { storeToRefs } from 'pinia'
import Memo from './Memo.vue'

const battleLogStore = useBattleLogStore()
const { bossInfo, currentRaid } = storeToRefs(battleLogStore)
const remainderSecond = ref<number>(0)
const timerValue = computed(() => Date.now() + bossInfo.value!.timer * 1000)
const endTimerValue = computed(() => Date.now() + Number(bossInfo.value!.addition?.unique_gauge_time_limit?.rest_time) * 1000 || 0)
const bossImgSrc = computed(() => getBossImg('enemy', bossInfo.value!.imgId, 's'))

const operationSecond = computed(() => currentRaid.value ? currentRaid.value.startTimer - currentRaid.value.endTimer : 0)

function handleTimeChange(millisecond: number) {
  remainderSecond.value = Math.round(millisecond / 1000)
}

function handleCopy(text: string) {
  if (copy(text))
    ElMessage.success(`已复制救援码${text}`)
}
</script>

<template>
  <div v-if="bossInfo" relative w-350px>
    <ElProgress type="circle" :percentage="bossInfo.hpPercent" :stroke-width="15" status="exception" :width="350">
      <template #default="{ percentage }">
        <div flex flex-col gap-2>
          <div fc gap-5 text-xl>
            {{ `TURN ${bossInfo.turn}` }}
            <div v-if="bossInfo.hp === 0">
              {{ formatTime(remainderSecond) }}
            </div>
            <ElCountdown v-else :value="timerValue" @change="handleTimeChange" />
          </div>
          <div fc>
            <img :src="bossImgSrc">
            <span>{{ percentage }}%</span>
          </div>
          <div text-base>
            {{ bossInfo.name }}
          </div>
          <div text-base>
            {{ `${bossInfo.hp.toLocaleString()}/${bossInfo.hpmax.toLocaleString()}` }}
          </div>
        </div>
      </template>
    </ElProgress>
    <ElCountdown
      v-if="bossInfo.addition?.unique_gauge_time_limit"
      value-style="color: #b91c1c" format="mm:ss" :value="endTimerValue"
      absolute class="left-1/2 top-1/2 translate-y--110px -translate-x-1/2"
    />
    <ElTag v-if="bossInfo.interrupt_display_text" absolute class="left-1/2 top-1/2 translate-y-85px -translate-x-1/2">
      {{ bossInfo.interrupt_display_text }}
    </ElTag>
    <div absolute left-1 top-1 text-lg>
      {{ formatTime(operationSecond) }}
    </div>
    <div absolute right-1 top-1 text-base>
      <el-link :underline="false" @click="handleCopy(bossInfo.battleId ?? '')">
        {{ bossInfo.battleId }}
      </el-link>
    </div>
    <div absolute bottom-1 left-1>
      <Memo :quest-id="bossInfo.questId" :quest-name="bossInfo.name" />
    </div>
  </div>
</template>
