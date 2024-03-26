<script setup lang="ts">
import type { DropData } from 'api'
import { questConfig } from '~/logic/storage'
import { listDrop, listQuest, sendMultiDropInfo } from '~/api'

const cardData = ref<DropData[]>([])
const btnLoading = ref(false)
const filesList = ref([])
function toggleVisible(quest: DropData) {
  const hit = questConfig.value.find(q => q.questId === quest.questId)
  if (hit)
    hit.visible = !hit.visible
}

function handleQuery() {
  if (btnLoading.value)
    return
  const questIds = questConfig.value.filter(q => q.visible).map(q => q.questId)
  if (questIds.length === 0) {
    console.log('还未收藏副本')
    return
  }
  btnLoading.value = true
  listDrop(questIds).then(({ data }) => {
    cardData.value = data
  }).catch(() => {
    ElMessage.error('掉落数据请求失败')
  }).finally(() => {
    btnLoading.value = false
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

    sendMultiDropInfo(dataSet).then(() => {
      ElMessage.success('导入成功')
      handleQuery()
    }).catch((err) => {
      ElMessage.error(err.message)
    })
  }
}

function updateQuestList() {
  listQuest().then(({ data }) => {
    data.forEach((quest) => {
      if (!questConfig.value.some(q => quest.questId === q.questId))
        questConfig.value.push({ ...quest, visible: false })
    })
    ElMessage.success('更新副本列表成功')
  })
}

onMounted(() => {
  setTimeout(() => {
    handleQuery()
  }, 0)
})
</script>

<template>
  <main>
    <div sticky left-0 right-0 top-0 z-999 h-10 flex items-center justify-between bg-violet px-4 text-base>
      <div fc text-xs btn @click="handleQuery">
        <div v-if="btnLoading" i-svg-spinners:90-ring-with-bg />
        <div v-else i-carbon:update-now />
        刷新
      </div>
      <div fc gap-2>
        <div fc text-xs btn @click="updateQuestList">
          <div i-carbon:document-download mr-1 />
          更新副本列表
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
        <QuestCard :quest-info="quest" :data="cardData.find(q => q.questId === quest.questId)" :visible="true" @toggle-visible="toggleVisible" />
        <div v-if="questConfig[currentIdx]?.questId === quest.questId" border="1 dashed #ccc" absolute left-0 top-0 h-full w-full bg-slate-900 opacity-50 />
      </div>
      <div v-if="questConfig.filter(q => q.visible).length === 0" mt-10px h-50px text-center text-xl>
        还未收藏副本
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
            <QuestCard :quest-info="quest" :visible="false" @toggle-visible="toggleVisible" />
          </div>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </main>
</template>
