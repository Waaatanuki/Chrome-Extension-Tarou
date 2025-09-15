<script setup lang="ts">
import { notificationSetting, sampoInfo } from '~/logic'

const throttledSampoChange = useThrottleFn((ms: number) => {
  if (!sampoInfo.value.maxStamina)
    return

  sampoInfo.value.endStamina = Math.min(
    sampoInfo.value.maxStamina,
    sampoInfo.value.currentStamina! + Math.floor(ms / (1000 * 60 * 10)),
  )
}, 10000)

function handleSampoChange(ms: number) {
  throttledSampoChange(ms)
}

const throttledStaminaChange = useThrottleFn((ms: number) => {
  if (!sampoInfo.value.maxStamina)
    return

  sampoInfo.value.currentStamina = sampoInfo.value.maxStamina - Math.ceil(ms / (1000 * 60 * 10))
}, 10000)

function handleStaminaChange(ms: number) {
  throttledStaminaChange(ms)
}

function handleFinish() {
  sampoInfo.value.isFinished = true

  if (notificationSetting.value.sampoFinish) {
    createNotification({
      message: '探险完成',
      iconUrl: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/vyrnsampo/assets/character/team_captain/1.png',
      sound: 'warning',
    })
  }
}
</script>

<template>
  <el-descriptions v-if="sampoInfo.areaName" :column="3" :border="true" direction="vertical" w-300px size="small">
    <el-descriptions-item label="探险队情报" align="center" :span="3">
      <template #label>
        <div flex justify-between>
          <div>
            {{ `探险队 Lv${sampoInfo.level}` }}
          </div>
          <el-tag v-if="sampoInfo.areaName" :type="sampoInfo.isFinished ? 'success' : 'danger' ">
            {{ sampoInfo.isFinished ? '待机中' : '探险中' }}
          </el-tag>
        </div>
      </template>
      {{ sampoInfo.areaName }}
    </el-descriptions-item>
    <el-descriptions-item label="当前/结束" align="center" label-width="100">
      <el-tooltip content="当前元气/探险结束时元气">
        {{ sampoInfo.maxStamina ? `${sampoInfo.currentStamina}/${sampoInfo.isFinished ? '-' : sampoInfo.endStamina}` : '-' }}
      </el-tooltip>
    </el-descriptions-item>
    <el-descriptions-item label="探险倒计时" align="center" label-width="100">
      <div v-if="sampoInfo.isFinished">
        -
      </div>
      <el-countdown v-else value-style="font-size: 12px" :value="sampoInfo.remainTime" @change="handleSampoChange" @finish="handleFinish" />
    </el-descriptions-item>
    <el-descriptions-item label="元气全回复" align="center" label-width="100">
      <el-countdown value-style="font-size: 12px" :value="sampoInfo.recoveryRemainTime" @change="handleStaminaChange" />
    </el-descriptions-item>
  </el-descriptions>

  <el-alert v-else title="未获取探险信息" type="info" :center="true" :closable="false" />
</template>
