<script setup lang="ts">
import RaidCard from './components/RaidCard.vue'
import { eternitySandData } from '~/logic/storage'
</script>

<template>
  <main font-sans>
    <div sticky left-0 right-0 top-0 z-999 h-10 fc bg-violet text-base>
      沙漏掉落统计
      <div
        dark:i-carbon-moon i-carbon-sun absolute right-4 icon-btn
        @click="toggleDark()"
      />
    </div>
    <RaidCard :data="eternitySandData.filter(i => i.visiable)" />
    <el-collapse>
      <el-collapse-item>
        <template #title>
          <div ml-5>
            <el-text size="large">
              隐藏副本
            </el-text>
          </div>
        </template>
        <RaidCard collapse :data="eternitySandData.filter(i => !i.visiable)" />
      </el-collapse-item>
    </el-collapse>
  </main>
</template>
