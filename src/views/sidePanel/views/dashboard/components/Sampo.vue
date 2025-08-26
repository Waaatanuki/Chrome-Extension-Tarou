<script setup lang="ts">
import { sampoInfo } from '~/logic'
</script>

<template>
  <el-card body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex items-center justify-between>
        <div>
          探险队情报
        </div>
        <el-tag :type=" sampoInfo.isFinished ? 'success' : 'danger' ">
          {{ sampoInfo.isFinished ? '探险完成' : '探险中' }}
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
      <div flex items-center justify-between>
        <div>
          探险倒计时
        </div>
        <el-countdown value-style="font-size: 12px" :value="sampoInfo.remainTime" @finish="sampoInfo.isFinished = true" />
      </div>
    </div>
    <el-alert v-else title="请先获取探险队信息" type="info" :center="true" :closable="false" />
  </el-card>
</template>
