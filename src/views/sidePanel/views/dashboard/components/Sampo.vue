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

  sampoInfo.value.currentStamina = Math.min(
    sampoInfo.value.maxStamina,
    sampoInfo.value.maxStamina - Math.ceil(ms / (1000 * 60 * 10)),
  )
}, 10000)

function handleStaminaChange(ms: number) {
  throttledStaminaChange(ms)
}

function handleFinish() {
  sampoInfo.value.isFinished = true

  if (notificationSetting.value.sampoFinish) {
    createNotification({
      message: 'Expedition complete',
      iconUrl: 'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/vyrnsampo/assets/character/team_captain/1.png',
      sound: 'warning',
    })
  }
}
</script>

<template>
  <el-descriptions v-if="sampoInfo.areaName" :column="3" :border="true" direction="vertical" w-300px size="small">
    <el-descriptions-item label="Expedition Info" align="center" :span="3">
      <template #label>
        <div flex justify-between>
          <el-tooltip content="Open expedition setup" placement="top">
            <div cursor-pointer text-12px text-teal-6 hover:text-teal-4 @click="openPopupWindow('SampoSetup')">
              {{ `Expedition Lv${sampoInfo.level}` }}
            </div>
          </el-tooltip>

          <el-tag v-if="sampoInfo.areaName" :type="sampoInfo.isFinished ? 'success' : 'danger' ">
            {{ sampoInfo.isFinished ? 'Idle' : 'Exploring' }}
          </el-tag>
        </div>
      </template>
      {{ sampoInfo.areaName }}
    </el-descriptions-item>
    <el-descriptions-item label="Current/End" align="center" label-width="100">
      <el-tooltip content="Current stamina / stamina at end">
        {{ sampoInfo.maxStamina ? `${sampoInfo.currentStamina}/${sampoInfo.isFinished ? '-' : sampoInfo.endStamina}` : '-' }}
      </el-tooltip>
    </el-descriptions-item>
    <el-descriptions-item label="Expedition Countdown" align="center" label-width="100">
      <div v-if="sampoInfo.isFinished">
        -
      </div>
      <el-tooltip v-else :content="useDateFormat(sampoInfo.remainTime, 'MM-DD HH:mm:ss').value">
        <el-countdown value-style="font-size: 12px" :value="sampoInfo.remainTime" @change="handleSampoChange" @finish="handleFinish" />
      </el-tooltip>
    </el-descriptions-item>
    <el-descriptions-item label="Full Stamina In" align="center" label-width="100">
      <div v-if="!sampoInfo.recoveryRemainTime || sampoInfo.recoveryRemainTime < Date.now()">
        -
      </div>
      <el-tooltip v-else :content="useDateFormat(sampoInfo.recoveryRemainTime, 'MM-DD HH:mm:ss').value">
        <el-countdown value-style="font-size: 12px" :value="sampoInfo.recoveryRemainTime" @change="handleStaminaChange" />
      </el-tooltip>
    </el-descriptions-item>
  </el-descriptions>

  <el-alert v-else title="No expedition data yet" type="info" :center="true" :closable="false" />
</template>
