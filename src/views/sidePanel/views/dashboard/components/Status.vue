<script setup lang="ts">
import { userInfo } from '~/logic'
</script>

<template>
  <el-descriptions :column="2" :border="true" direction="vertical" w-300px size="small">
    <el-descriptions-item label="Renown" label-width="200" :rowspan="2">
      <div>
        <div flex justify-between>
          <span>Daily</span>
          <NumberLimitDisplay :value="userInfo.mbp?.daily" />
        </div>
        <div flex justify-between>
          <span>Weekly</span>
          <NumberLimitDisplay :value="userInfo.mbp?.weekly" />
        </div>
        <div flex flex-1 justify-between>
          <span>R Bonus</span>
          <NumberLimitDisplay :value="userInfo.mbp?.bonus.r" />
        </div>
        <div flex flex-1 justify-between>
          <span>SR Bonus</span>
          <NumberLimitDisplay :value="userInfo.mbp?.bonus.sr" />
        </div>
        <div flex justify-between>
          <span>Total</span>
          <NumberLimitDisplay :value="userInfo.mbp?.total" />
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="FP">
      <div>
        <div flex justify-between>
          <span>Weekly</span>
          <NumberLimitDisplay :value="userInfo.followPoint?.weekly" />
        </div>
        <div flex justify-between>
          <span>Total</span>
          <NumberLimitDisplay :value="userInfo.followPoint?.total" />
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Artifacts">
      <div flex justify-between>
        <span>Drop Up</span>
        <NumberLimitDisplay :value="userInfo.artifact" />
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Prestige">
      <div>
        <div flex justify-between>
          <span>Weekly</span>
          <NumberLimitDisplay :value="userInfo.hmbp?.weekly" />
        </div>
        <div flex justify-between gap-2>
          <div flex flex-1 justify-between>
            <span>Crew Bonus</span>
            <NumberLimitDisplay :value="userInfo.hmbp?.bonus.crew" />
          </div>
        </div>
        <div flex justify-between>
          <span>Total</span>
          <NumberLimitDisplay :value="userInfo.hmbp?.total" />
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Arcarum" label-width="200">
      <div>
        <div flex justify-between>
          <span>Arcarum Badges</span>
          <NumberLimitDisplay :value="userInfo.arcarum?.passport" />
        </div>
        <div flex justify-between>
          <span>Weekly</span>
          <NumberLimitDisplay :value="userInfo.arcarum?.point.weekly" />
        </div>
        <div flex justify-between>
          <span>Total</span>
          <NumberLimitDisplay :value="userInfo.arcarum?.point.total" />
        </div>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>
