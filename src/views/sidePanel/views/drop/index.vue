<script setup lang="ts">
import type { Stat } from 'api'
import { VueDraggableNext } from 'vue-draggable-next'
import { listDrop, listQuest } from '~/api'
import { code, questConfig, userInfo } from '~/logic/storage'

const questData = ref<Stat[]>([])
const isMange = ref(false)
const loading = ref(false)

function toggleVisible(questId: string) {
  const hit = questConfig.value.find(q => q.questId === questId)
  if (hit) {
    if (!hit.visible && questConfig.value.filter(q => q.visible).length >= 7)
      return ElMessage.info('最多选择7个副本')

    hit.visible = !hit.visible
  }
}

function handleQuery() {
  if (loading.value)
    return

  if (!code.value || !userInfo.value.uid) {
    ElMessage.error('请先获取引继码和玩家ID')
    return
  }

  const questIds = questConfig.value.filter(q => q.visible).map(q => q.questId)
  if (questIds.length === 0) {
    console.log('还未收藏副本')
    return
  }
  loading.value = true
  listDrop(questIds).then(({ data }) => {
    questData.value = data
  }).catch(() => {
    ElMessage.error('请求失败')
  }).finally(() => {
    loading.value = false
  })
}

function manageQuest() {
  isMange.value = !isMange.value
  loading.value = true

  listQuest().then(({ data }) => {
    data.forEach((quest) => {
      if (!questConfig.value.some(q => quest.questId === q.questId))
        questConfig.value.push({ ...quest, visible: false })
    })

    questConfig.value = questConfig.value.filter(q =>
      data.some(quest => quest.questId === q.questId),
    )
  }).catch((err) => {
    ElMessage.error(err.message)
  }).finally(() => {
    loading.value = false
  })
}

function goBack() {
  isMange.value = !isMange.value
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
        <TheButton v-if="isMange" :loading="loading" icon="material-symbols:arrow-back-ios" @click="goBack">
          返回
        </TheButton>
        <TheButton v-else :loading="loading" icon="carbon:document-download" @click="manageQuest">
          管理副本
        </TheButton>
      </div>
      <TheButton v-if="!isMange" icon="carbon:update-now" :loading="loading" @click="handleQuery">
        刷新
      </TheButton>
    </div>

    <el-skeleton :loading="loading" animated my-10px>
      <template #template>
        <div w-full fc flex-wrap gap-10px>
          <el-skeleton-item variant="p" style="width: 100%; height: 400px" />
        </div>
      </template>
      <template #default>
        <el-card v-if="isMange" body-style="padding: 10px" my-10px h-full>
          <VueDraggableNext v-model="questConfig" flex flex-wrap gap-12px>
            <transition-group name="list">
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
            还未收藏副本
          </div>
        </div>
      </template>
    </el-skeleton>
  </main>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
