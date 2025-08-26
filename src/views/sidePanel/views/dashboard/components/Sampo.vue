<script setup lang="ts">
import { notificationSetting, sampoInfo } from '~/logic'

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
  <el-card body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex items-center justify-between>
        <div>
          {{ `探险队信息 Lv${sampoInfo.level}` }}
        </div>
        <el-tag v-if="sampoInfo.areaName" :type="sampoInfo.isFinished ? 'success' : 'danger' ">
          {{ sampoInfo.isFinished ? '待机中' : '探险中' }}
        </el-tag>
      </div>
    </template>
    <div v-if="sampoInfo.areaName" flex flex-col>
      <div flex items-center justify-between>
        <div>
          元气回复
        </div>
        <el-countdown value-style="font-size: 12px" :value="sampoInfo.recoveryRemainTime" />
      </div>
      <div v-if="!sampoInfo.isFinished" flex items-center justify-between>
        <div>
          探险计时
        </div>
        <el-countdown value-style="font-size: 12px" :value="sampoInfo.remainTime" @finish="handleFinish" />
      </div>
    </div>
    <el-alert v-else title="未获取探险信息" type="info" :center="true" :closable="false" />
  </el-card>
</template>
