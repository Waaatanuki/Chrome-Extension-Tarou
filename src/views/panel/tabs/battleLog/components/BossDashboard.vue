<script setup lang="ts">
import type { BossInfo } from 'battleLog'
import { battleRecord } from '~/logic'

const props = defineProps<{ bossInfo: BossInfo; raidId?: number }>()
const timerValue = computed(() => Date.now() + props.bossInfo.timer * 1000)
const bossImgSrc = computed(() => `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/enemy/s/${props.bossInfo.imgId}.png`)

const operationSecond = computed(() => {
  const hit = battleRecord.value.find(record => record.raid_id === props.raidId)
  if (hit)
    return hit.startTimer - hit.endTimer
  else
    return 0
})

function formatTime(seconds: number): string {
  if (seconds === 0)
    return ''
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  if (hours > 0) {
    const formattedHours = hours.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }
  else {
    return `${formattedMinutes}:${formattedSeconds}`
  }
}
</script>

<template>
  <div relative w-350px>
    <el-progress type="circle" :percentage="bossInfo.hpPercent" :stroke-width="15" status="exception" :width="350">
      <template #default="{ percentage }">
        <div flex flex-col gap-2>
          <div fc gap-5 text-xl>
            {{ `TURN ${bossInfo.turn}` }}
            <div v-if="bossInfo.hp === 0">
              {{ formatTime(bossInfo.remainderSecond) }}
            </div>
            <el-countdown v-else :value="timerValue" />
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
    </el-progress>
    <div absolute left-1 top-1 text-lg>
      {{ formatTime(operationSecond) }}
    </div>
    <div absolute right-1 top-1 text-base>
      {{ bossInfo.battleId }}
    </div>
    <el-text truncated absolute bottom-1 right-1 w-100px text-right size="small">
      {{ bossInfo.interrupt_display_text }}
    </el-text>
  </div>
</template>
