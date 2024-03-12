<script setup lang="ts">
import type { RaidInfo } from 'myStorage'
import { eternitySandData } from '~/logic/storage'

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
        if (!hit.lastDropTake && item.lastDropTake)
          hit.lastDropTake = item.lastDropTake
      }
    })
    ElMessage.success('导入成功')
  }
}

function handleExport() {
  const exportData = eternitySandData.value.map(cur => ({
    quest_id: cur.quest_id,
    quest_name_en: cur.quest_name_en,
    quest_name_jp: cur.quest_name_jp,
    total: cur.total,
    blueChest: cur.blueChest,
    eternitySand: cur.eternitySand,
    lastDropCount: cur.lastDropCount,
  }))

  const data = JSON.stringify(exportData, null, 2)
  const timeStr = useDateFormat(new Date(), 'YYYY-MM-DD').value
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

chrome.storage.onChanged.addListener((changes) => {
  if (changes.eternitySandData)
    eternitySandData.value = JSON.parse(changes.eternitySandData.newValue)
})

function toggleVisible(raid: RaidInfo, type: number) {
  if (type === 2)
    raid.visiable = !raid.visiable
}
</script>

<template>
  <main>
    <div sticky left-0 right-0 top-0 z-999 h-10 flex items-center justify-end bg-violet px-4 text-base>
      <div fc gap-2>
        <div fc text-xs btn @click="handleExport">
          <div i-carbon:document-export mr-1 />
          导出
        </div>
        <ElUpload v-model:file-list="filesList" :on-change="handleUploadChange" :show-file-list="false" :limit="1" :auto-upload="false" accept=".json">
          <template #trigger>
            <div fc text-xs btn @click="filesList = []">
              <div i-carbon:document-import mr-1 />
              导入
            </div>
          </template>
        </ElUpload>
      </div>
    </div>
    <div mt-10px fc flex-wrap gap-10px>
      <div v-for="item in eternitySandData.filter(i => i.visiable)" :key="item.quest_id">
        <RaidCard :raid-info="item" :type="2" @toggle-visible="toggleVisible" />
      </div>
    </div>
    <ElCollapse>
      <ElCollapseItem>
        <template #title>
          <div ml-5>
            <ElText size="large">
              未收藏副本
            </ElText>
          </div>
        </template>
        <div flex flex-wrap gap-10px>
          <div v-for="item in eternitySandData.filter(i => !i.visiable)" :key="item.quest_id">
            <RaidCard :raid-info="item" :type="2" @toggle-visible="toggleVisible" />
          </div>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </main>
</template>
