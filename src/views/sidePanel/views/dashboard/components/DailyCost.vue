<script setup lang="ts">
import { dailyCost } from '~/logic'
</script>

<template>
  <el-card v-if="dailyCost.dateTime" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex items-center justify-between>
        <el-tooltip content="点击显示每日掉落统计" placement="top">
          <div cursor-pointer text-12px text-teal-6 hover:text-teal-4 @click="openPopupWindow('RewardList')">
            {{ `每日统计(${useDateFormat(dailyCost.dateTime, 'MM-DD').value})` }}
          </div>
        </el-tooltip>

        <div fc gap-1>
          <el-tooltip :content="`AP(${Math.ceil((dailyCost.ap || 0) / 75)}小红)`" placement="top">
            <el-tag type="success">
              {{ dailyCost.ap }}
            </el-tag>
          </el-tooltip>
          <el-tooltip content="AAP" placement="top">
            <el-tag type="primary">
              {{ dailyCost.aap }}
            </el-tag>
          </el-tooltip>
          <el-tooltip content="BP" placement="top">
            <el-tag type="danger">
              {{ dailyCost.bp }}
            </el-tag>
          </el-tooltip>
        </div>
      </div>
    </template>
    <el-scrollbar max-height="215">
      <div flex flex-wrap gap-7px text-12px>
        <el-tooltip v-for="quest in dailyCost.quest?.filter(q => q.bossImgId)" :key="quest.questId" :content="quest.bossName" placement="top">
          <div w-50px fc flex-col>
            <img :src="getBossImg('enemy', quest.bossImgId, 's')">
            <div>{{ quest.count }}</div>
          </div>
        </el-tooltip>
      </div>
    </el-scrollbar>
  </el-card>
</template>
