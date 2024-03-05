<script setup lang="ts">
import type { DropData } from 'api'
import { questConfig } from '~/logic/storage'
import { listDrop } from '~/api'

const cardData = ref<DropData[]>([])

function toggleVisible(quest: DropData) {
  const hit = questConfig.value.find(q => q.questId === quest.questId)
  if (hit)
    hit.visible = !hit.visible
}

function handleQuery() {
  cardData.value = []
  listDrop('popup').then(({ data }) => {
    cardData.value = data
    if (questConfig.value.length === 0)
      questConfig.value = data.map(quest => ({ questId: quest.questId, visible: true }))

    data.forEach((quest) => {
      if (!questConfig.value.some(q => quest.questId === q.questId))
        questConfig.value.push({ questId: quest.questId, visible: true })
    })
  })
}

const currentIdx = ref<number>(-1)

function handleDragStart(e: DragEvent, quest: { questId: string, visible: boolean }) {
  console.log('handleDragStart')
  nextTick(() => {
    const idx = questConfig.value.findIndex(q => q.questId === quest.questId)
    currentIdx.value = idx
  })
}

function handleDragEnter(e: DragEvent, quest: { questId: string, visible: boolean }) {
  console.log('handleDragEnter')

  const idx = questConfig.value.findIndex(q => q.questId === quest.questId)
  const [item] = questConfig.value.splice(currentIdx.value, 1)
  questConfig.value.splice(idx, 0, item)
  currentIdx.value = idx
}

function handleDragEnd() {
  currentIdx.value = -1
}

function foo() {
  questConfig.value = []
}

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <main>
    <div btn @click="handleQuery">
      刷新
    </div>
    <div btn @click="foo">
      重置
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
