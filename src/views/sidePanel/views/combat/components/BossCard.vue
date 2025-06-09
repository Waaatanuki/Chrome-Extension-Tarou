<script setup lang="ts">
import { battleInfo, battleRecord, specBossBuff } from '~/logic'

const currentRaid = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
const remainderSecond = ref<number>(0)
const timerValue = computed(() => Date.now() + battleInfo.value.bossInfo!.timer * 1000)
const bossImgSrc = computed(() => getBossImg('enemy', battleInfo.value.bossInfo!.imgId, 's'))
const operationSecond = computed(() => currentRaid.value ? currentRaid.value.startTimer - currentRaid.value.endTimer : 0)

function handleTimeChange(millisecond: number) {
  remainderSecond.value = Math.round(millisecond / 1000)
}

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}
</script>

<template>
  <div v-if="battleInfo.bossInfo" relative w-300px>
    <el-descriptions direction="vertical" :border="true" size="small">
      <el-descriptions-item :rowspan="2" :width="70" :label="`TURN ${battleInfo.bossInfo.turn}`" align="center">
        <div fc flex-col>
          <img :src="bossImgSrc">
          <div>{{ `${battleInfo.bossInfo.hpPercent}%` }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item :span="2" :label="battleInfo.bossInfo.name" align="center">
        {{ `${battleInfo.bossInfo.hp.toLocaleString()}/${battleInfo.bossInfo.hpmax.toLocaleString()}` }}
      </el-descriptions-item>
      <el-descriptions-item :label="`Lv ${battleInfo.bossInfo.lv}`" align="center">
        <div v-if="battleInfo.bossInfo.hp === 0">
          {{ formatTime(remainderSecond) }}
        </div>
        <ElCountdown v-else :value="timerValue" @change="handleTimeChange" />
      </el-descriptions-item>
      <el-descriptions-item :label="battleInfo.bossInfo.attribute" align="center">
        {{ formatTime(operationSecond) }}
      </el-descriptions-item>
      <el-descriptions-item :label="battleInfo.bossInfo.interrupt_display_text" :span="3">
        <div flex flex-wrap items-center justify-end border-2 border-rose-500 p-5px>
          <img
            v-for="buff, idx in battleInfo.buffInfo?.bossBuffs" :key="idx" class="buff-icon"
            :src="getBuffIcon(buff, battleInfo.bossInfo!.turn)"
            @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
          >
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
