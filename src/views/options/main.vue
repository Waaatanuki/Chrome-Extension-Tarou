<script setup lang="ts">
import dayjs from 'dayjs'
import RaidCard from './components/RaidCard.vue'
import { eternitySandData } from '~/logic/storage'
import type { RaidInfo } from '~/logic/types'

const filesList = ref([])

function handleUploadChange(uploadFile: any) {
  const selectedFile = uploadFile.raw

  const reader = new FileReader()
  reader.readAsText(selectedFile)
  reader.onload = function () {
    const dataSet = JSON.parse(reader.result as string)
    dataSet.forEach((item: RaidInfo) => {
      const hit = eternitySandData.value.find(raid => raid.quest_id === item.quest_id)
      if (hit) {
        hit.total! += item.total ?? 0
        hit.blueChest! += item.blueChest ?? 0
        hit.eternitySand! += item.eternitySand ?? 0
        hit.lastDropCount! += item.lastDropCount ?? 0
      }
    })
    ElMessage.success('导入成功')
  }
}

function handleExport() {
  const exportData = eternitySandData.value.reduce((pre, cur) => {
    pre.push({
      quest_id: cur.quest_id,
      quest_name_en: cur.quest_name_en,
      quest_name_jp: cur.quest_name_jp,
      total: cur.total,
      blueChest: cur.blueChest,
      eternitySand: cur.eternitySand,
      lastDropCount: cur.lastDropCount,
    })
    return pre
  }, [] as any[])

  const data = JSON.stringify(exportData, null, 2)
  const timeStr = dayjs().format('YYYY-MM-DD')
  const content = new Blob([data])
  const urlObject = window.URL || window.webkitURL || window
  const url = urlObject.createObjectURL(content)
  const el = document.createElement('a')
  el.href = url
  el.download = `沙漏统计数据 ${timeStr}.json`
  el.click()
  urlObject.revokeObjectURL(url)
  ElMessage.success('导出成功')
}
</script>

<template>
  <main font-sans>
    <div sticky left-0 right-0 top-0 z-999 h-10 flex items-center justify-between bg-violet px-4 text-base>
      <div fc gap-2>
        <div
          i-carbon-sun dark:i-carbon-moon icon-btn
          @click="toggleDark()"
        />沙漏掉落统计
      </div>
      <div fc gap-2>
        <div fc btn text-xs @click="handleExport">
          <div mr-1 i-carbon:document-export />
          导出
        </div>
        <el-upload v-model:file-list="filesList" :on-change="handleUploadChange" :show-file-list="false" :limit="1" :auto-upload="false" accept=".json">
          <template #trigger>
            <div fc btn text-xs @click="filesList = []">
              <div mr-1 i-carbon:document-import />
              导入
            </div>
          </template>
        </el-upload>
      </div>
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
