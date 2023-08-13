<script setup lang="ts">
import type { BossInfo } from '../types'

const props = defineProps<{ bossInfo: BossInfo }>()
const timerValue = computed(() => Date.now() + props.bossInfo.timer * 1000)
const bossImgSrc = computed(() => `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/enemy/s/${props.bossInfo.imgId}.png`)

function formatSecondsToHHMMSS(seconds: number) {
  const date = new Date(0)
  date.setSeconds(seconds)

  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const remainingSeconds = date.getSeconds().toString().padStart(2, '0')

  return `${hours}:${minutes}:${remainingSeconds}`
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
              {{ formatSecondsToHHMMSS(bossInfo.remainderSecond) }}
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
    <div absolute right-1 top-1>
      {{ bossInfo.battleId }}
    </div>
  </div>
</template>
