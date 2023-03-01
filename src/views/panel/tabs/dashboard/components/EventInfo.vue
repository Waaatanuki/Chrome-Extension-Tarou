<template>
  <el-card class="m-3 w-52 h-full">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-xl"> 活动信息</span>
        <el-button type="primary" link @click="reset">重置</el-button>
      </div>
    </template>
    <div class="flex flex-col">
      活动开始和结束时间，战货多少箱，还差多少20箱
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useStore from '@/store'
import dayjs from 'dayjs'
const { dashboard } = useStore()

function reset() {
  dashboard.saveStoneDate = dayjs().unix()
}
</script>

<style lang="scss" scoped></style>
