<script setup lang="ts">
import type { BossInfo } from 'battleLog'
import copy from 'copy-text-to-clipboard'
import Memo from './Memo.vue'
import { battleRecord } from '~/logic'

const props = defineProps<{ bossInfo: BossInfo, raidId?: number }>()
const remainderSecond = ref<number>(0)
const timerValue = computed(() => Date.now() + props.bossInfo.timer * 1000)
const endTimerValue = computed(() => Date.now() + Number(props.bossInfo.addition?.unique_gauge_time_limit?.rest_time) * 1000 || 0)
const bossImgSrc = computed(() => `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/enemy/s/${props.bossInfo.imgId}.png`)

const operationSecond = computed(() => {
  const hit = battleRecord.value.find(record => record.raid_id === props.raidId)
  if (hit)
    return hit.startTimer - hit.endTimer
  else
    return 0
})

function handleTimeChange(millisecond: number) {
  remainderSecond.value = Math.round(millisecond / 1000)
}

function handleCopy(text: string) {
  if (copy(text))
    ElMessage.success(`已复制救援码${text}`)
}
</script>

<template>
  <div relative w-350px>
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
      title="END" value-style="color: red" format="mm:ss" :value="endTimerValue"
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
      <Memo :quest-id="props.bossInfo.questId" :quest-name="props.bossInfo.name" />
    </div>
  </div>
</template>
