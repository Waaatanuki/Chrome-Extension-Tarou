<template>
  <el-card class="box-card" :body-style="{ padding: '20px 20px 0px 20px' }">
    <template #header>
      <div class="card-header">
        <span>官方公告</span>
      </div>
    </template>
    <el-scrollbar height="600px">
      <el-timeline style="padding: 0 15px 0 0">
        <el-timeline-item
          placement="top"
          v-for="tweet in news"
          :timestamp="dayjs(tweet.created_at).format('MM/DD HH:mm')"
        >
          <el-card :body-style="{ padding: '10px' }" shadow="hover">
            <p style="margin: 0px">{{ tweet.text }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
  </el-card>
</template>

<script setup lang="ts">
import news from '@/assets/data/twitter.json'
import dayjs from 'dayjs'
</script>

<style lang="scss" scoped>
.box-card {
  width: 400px;
  height: 660px;

  .card-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
