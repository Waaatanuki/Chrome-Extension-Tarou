<script setup lang="ts">
import type { Stat } from 'api'
import { VueDraggableNext } from 'vue-draggable-next'
import { listDrop, listQuest } from '~/api'
import { code, questConfig, userInfo } from '~/logic/storage'

const questData = ref<Stat[]>([])
const isManage = ref(false)
const loading = ref(false)

function toggleVisible(questId: string) {
  const hit = questConfig.value.find(q => q.questId === questId)
  if (hit) {
    if (!hit.visible && questConfig.value.filter(q => q.visible).length >= 7)
      return ElMessage.info('You can select up to 7 quests')

    hit.visible = !hit.visible
  }
}

function handleQuery() {
  if (loading.value)
    return

  if (!code.value || !userInfo.value.uid) {
    ElMessage.error('Please get transfer code and player ID first')
    return
  }

  const questIds = questConfig.value.filter(q => q.visible).map(q => q.questId)
  if (questIds.length === 0) {
    console.log('No bookmarked quests yet')
    return
  }
  loading.value = true
  listDrop(questIds).then(({ data }) => {
    questData.value = data
  }).catch(() => {
    ElMessage.error('Request failed')
  }).finally(() => {
    loading.value = false
  })
}

function manageQuest() {
  isManage.value = !isManage.value
  loading.value = true

  listQuest().then(({ data }) => {
    data.forEach((quest) => {
      if (!questConfig.value.some(q => quest.questId === q.questId))
        questConfig.value.push({ ...quest, visible: false })
    })

    questConfig.value = questConfig.value.filter(q =>
      data.some(quest => quest.questId === q.questId && !quest.deprecated),
    )
  }).catch((err) => {
    ElMessage.error(err.message)
  }).finally(() => {
    loading.value = false
  })
}

function goBack() {
  isManage.value = !isManage.value
  handleQuery()
}

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <main>
    <div sticky inset-x-0 top-0 z-999 h-10 flex items-center justify-between rounded bg-neutral-8 px-4 text-base>
      <div fc gap-2>
        <TheButton v-if="isManage" :loading="loading" icon="material-symbols:arrow-back-ios" @click="goBack">
          Back
        </TheButton>
        <TheButton v-else :loading="loading" icon="carbon:document-download" @click="manageQuest">
          Manage Quests
        </TheButton>
      </div>
      <TheButton v-if="!isManage" icon="carbon:update-now" :loading="loading" @click="handleQuery">
        Refresh
      </TheButton>
    </div>

    <el-skeleton :loading="loading" animated my-10px>
      <template #template>
        <div w-full fc flex-wrap gap-10px>
          <el-skeleton-item variant="p" style="width: 100%; height: 400px" />
        </div>
      </template>
      <template #default>
        <el-card v-if="isManage" my-10px h-full>
          <VueDraggableNext v-model="questConfig" flex flex-wrap gap-12px>
            <transition-group name="draglist">
              <div
                v-for="quest in questConfig" :key="quest.questId"
                :class="{ 'brightness-50': !quest.visible }"
                cursor-pointer select-none
                @click="toggleVisible(quest.questId)"
              >
                <img w-60px :src="getQuestImg(quest.questId, 'lobby')">
              </div>
            </transition-group>
          </VueDraggableNext>
        </el-card>

        <div v-else my-10px fc flex-wrap gap-10px>
          <QuestCard v-for="quest in questData" :key="quest.questId" :data="quest" />
          <div v-if="questConfig.filter(q => q.visible).length === 0" mt-10px h-50px text-center text-xl>
            No bookmarked quests yet
          </div>
        </div>
      </template>
    </el-skeleton>
  </main>
</template>
