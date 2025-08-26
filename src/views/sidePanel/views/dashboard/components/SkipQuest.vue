<script setup lang="ts">
import { obTabId, skipQuest } from '~/logic'

function handleClick(quest: typeof skipQuest.value.list[number]) {
  if (quest.limitedCount === 0)
    return

  const appendStr = quest.useItemId ? `/0/${quest.useItemId}` : ''
  chrome.tabs.update(obTabId.value, { url: `https://game.granbluefantasy.jp/#quest/supporter/${quest.questId}/28${appendStr}` })
}
</script>

<template>
  <el-card body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          扫荡副本
        </div>
        <el-tooltip v-if="skipQuest.updateTime" content="最后更新时间" placement="top">
          {{ formatEventDate(skipQuest.updateTime) }}
        </el-tooltip>
      </div>
    </template>
    <template v-if="skipQuest.list.length">
      <el-alert v-if="skipQuest.list.every(item => item.limitedCount === 0)" title="讨伐次数已达到上限" type="success" :center="true" :closable="false" />
      <div v-else flex flex-wrap gap-10px>
        <div v-for="quest in skipQuest.list" :key="quest.questId" relative w-62px cursor-pointer @click="handleClick(quest)">
          <div v-if="quest.limitedCount === 0" class="absolute h-full w-full fc bg-black/40">
            <span select-none text-12px text-red font-bold>Done</span>
          </div>
          <img
            w-full
            :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/${quest.thumbnailImage}.png`"
          >
        </div>
      </div>
    </template>
    <el-alert v-else title="请先获取扫荡副本信息" type="info" :center="true" :closable="false" />
  </el-card>
</template>
