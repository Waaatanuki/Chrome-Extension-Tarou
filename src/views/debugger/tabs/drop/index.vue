<script setup lang="ts">
import type { DropData } from 'api'
import { questConfig } from '~/logic/storage'
import { listDrop } from '~/api'

const cardData = ref<DropData[]>([])
const filesList = ref([])
function toggleVisible(quest: DropData) {
  const hit = questConfig.value.find(q => q.questId === quest.questId)
  if (hit)
    hit.visible = !hit.visible
}

function handleQuery() {
  cardData.value = []
  listDrop().then(({ data }) => {
    cardData.value = data
    if (questConfig.value.length === 0)
      questConfig.value = data.map(quest => ({ questId: quest.questId, visible: true }))

    data.forEach((quest) => {
      if (!questConfig.value.some(q => quest.questId === q.questId))
        questConfig.value.push({ questId: quest.questId, visible: true })
    })
  }).catch(() => {
    ElMessage.error('掉落数据请求失败')
  })
}

const currentIdx = ref<number>(-1)

function handleDragStart(e: DragEvent, quest: { questId: string, visible: boolean }) {
  const idx = questConfig.value.findIndex(q => q.questId === quest.questId)
  currentIdx.value = idx
}

function handleDragEnter(e: DragEvent, quest: { questId: string, visible: boolean }) {
  const idx = questConfig.value.findIndex(q => q.questId === quest.questId)
  const [item] = questConfig.value.splice(currentIdx.value, 1)
  questConfig.value.splice(idx, 0, item)
  currentIdx.value = idx
}

function handleDragEnd() {
  currentIdx.value = -1
}

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

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <main>
    <div sticky left-0 right-0 top-0 z-999 h-10 flex items-center justify-end bg-violet px-4 text-base>
      <div fc gap-2>
        <div fc text-xs btn @click="handleQuery">
          <div i-carbon:update-now mr-1 />
          刷新
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
    <div my-10px fc flex-wrap gap-10px>
      <div
        v-for="quest in questConfig.filter(q => q.visible)" :key="quest.questId"
        relative
        draggable="true"
        @dragstart="(e) => handleDragStart(e, quest)"
        @dragenter="(e) => handleDragEnter(e, quest)"
        @dragend="handleDragEnd"
      >
        <QuestCard :quest-info="cardData.find(q => q.questId === quest.questId)" :visible="true" @toggle-visible="toggleVisible" />
        <div v-if="questConfig[currentIdx]?.questId === quest.questId" border="1 dashed #ccc" absolute left-0 top-0 h-full w-full bg-slate-900 opacity-50 />
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
        <div fc flex-wrap gap-10px>
          <div v-for="quest in questConfig.filter(q => !q.visible)" :key="quest.questId">
            <QuestCard :quest-info="cardData.find(q => q.questId === quest.questId)" :visible="false" @toggle-visible="toggleVisible" />
          </div>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </main>
</template>
