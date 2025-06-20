<script setup lang="ts">
import { dailyCost } from '~/logic'
</script>

<template>
  <el-card v-if="dailyCost.dateTime" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex items-center justify-between>
        <div text-12px>
          {{ `每日统计(${useDateFormat(dailyCost.dateTime, 'MM-DD').value})` }}
        </div>
        <el-tooltip content="当日消耗AP、BP数量" placement="top">
          <div flex gap-2>
            <el-tag type="success">
              {{ `AP ${dailyCost.ap}` }}
            </el-tag>
            <el-tag type="danger">
              {{ `BP ${dailyCost.bp}` }}
            </el-tag>
          </div>
        </el-tooltip>
      </div>
    </template>
    <div flex flex-wrap gap-12px text-12px>
      <el-tooltip v-for="quest in dailyCost.quest?.filter(q => q.bossImgId)" :key="quest.questId" :content="quest.bossName" placement="top">
        <div w-60px fc flex-col>
          <img :src="getBossImg('enemy', quest.bossImgId, 's')">
          <div>{{ quest.count }}</div>
        </div>
      </el-tooltip>
    </div>
  </el-card>
</template>
