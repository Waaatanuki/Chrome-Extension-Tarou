<script setup lang="ts">
import { userInfo } from '~/logic'
</script>

<template>
  <el-descriptions :column="2" :border="true" direction="vertical" w-290px size="small">
    <el-descriptions-item label="武勋" label-width="200" :rowspan="2">
      <div>
        <div flex justify-between>
          <span>每日</span>
          <NumberLimitDisplay :value="userInfo.mbp?.daily" />
        </div>
        <div flex justify-between>
          <span>每周</span>
          <NumberLimitDisplay :value="userInfo.mbp?.weekly" />
        </div>
        <div flex flex-1 justify-between>
          <span>R奖励</span>
          <NumberLimitDisplay :value="userInfo.mbp?.bonus.r" />
        </div>
        <div flex flex-1 justify-between>
          <span>SR奖励</span>
          <NumberLimitDisplay :value="userInfo.mbp?.bonus.sr" />
        </div>
        <div flex justify-between>
          <span>总计</span>
          <NumberLimitDisplay :value="userInfo.mbp?.total" />
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="FP">
      <div>
        <div flex justify-between>
          <span>每周</span>
          <NumberLimitDisplay :value="userInfo.followPoint?.weekly" />
        </div>
        <div flex justify-between>
          <span>总计</span>
          <NumberLimitDisplay :value="userInfo.followPoint?.total" />
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="神器">
      <div flex justify-between>
        <span>掉落UP</span>
        <NumberLimitDisplay :value="userInfo.artifact" />
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="荣誉">
      <div>
        <div flex justify-between>
          <span>每周</span>
          <NumberLimitDisplay :value="userInfo.hmbp?.weekly" />
        </div>
        <div flex justify-between gap-2>
          <div flex flex-1 justify-between>
            <span>骑空团奖励</span>
            <NumberLimitDisplay :value="userInfo.hmbp?.bonus.crew" />
          </div>
        </div>
        <div flex justify-between>
          <span>总计</span>
          <NumberLimitDisplay :value="userInfo.hmbp?.total" />
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="转世" label-width="200">
      <div>
        <div flex justify-between>
          <span>门票</span>
          <NumberLimitDisplay :value="userInfo.arcarum?.passport" />
        </div>
        <div flex justify-between>
          <span>每周</span>
          <NumberLimitDisplay :value="userInfo.arcarum?.point.weekly" />
        </div>
        <div flex justify-between>
          <span>总计</span>
          <NumberLimitDisplay :value="userInfo.arcarum?.point.total" />
        </div>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>
