<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import type { DropInfo, RawDrop, Stat } from 'api'
import { questConfig } from '~/logic/storage'
import { listDrop, listQuest } from '~/api'

const { sendInfo } = useUser()
const questData = ref<Stat[]>([])
const queryBtnLoading = ref(false)
const importBtnLoading = ref(false)
const dialogVisible = ref(false)
const dialogLoading = ref(false)
const filesList = ref([])

function toggleVisible(questId: string) {
  const hit = questConfig.value.find(q => q.questId === questId)
  if (hit) {
    if (!hit.visible && questConfig.value.filter(q => q.visible).length >= 7)
      return ElMessage.info('最多只能收藏7个副本')

    hit.visible = !hit.visible
  }
}

function handleQuery() {
  if (queryBtnLoading.value)
    return
  const questIds = questConfig.value.filter(q => q.visible).map(q => q.questId)
  if (questIds.length === 0) {
    console.log('还未收藏副本')
    return
  }
  queryBtnLoading.value = true
  listDrop(questIds).then(({ data }) => {
    questData.value = data
  }).catch(() => {
    ElMessage.error('请求失败')
  }).finally(() => {
    queryBtnLoading.value = false
  })
}

function handleUploadChange(uploadFile: any) {
  const selectedFile = uploadFile.raw
  const reader = new FileReader()
  reader.readAsText(selectedFile)

  reader.onload = function () {
    const Quest_GoldBrick = [
      { questId: '301061', questName: '邂逅、黒銀の翼ＨＬ', raidName: 'tuyobaha' },
      { questId: '303251', questName: '崩天、虚空の兆', raidName: 'akx' },
      { questId: '305161', questName: '降臨、調停の翼ＨＬ', raidName: 'gurande' },
      { questId: '303141', questName: '神撃、究極の竜ＨＬ', raidName: 'cb' },
    ]

    const dataSet: RawDrop[] = JSON.parse(reader.result as string)
    const dataList: DropInfo[] = []

    dataSet.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        const hit = Quest_GoldBrick.find(raid => raid.raidName === value.raidName)
        if (hit) {
          const reward = []
          if (value.blueChests)
            reward.push({ box: '11', key: value.blueChests, count: 1 })

          if (value.goldBrick && !value.blueChests)
            reward.push({ box: value.goldBrick, key: '17_20004', count: 1 })

          const battle: DropInfo = {
            battleId: key,
            questName: hit.questName,
            timestamp: value.timestamp,
            reward,
          }

          dataList.push({ ...battle })
        }
      }
    })

    if (dataList.length === 0)
      return ElMessage.error('没有可导入的数据')

    importBtnLoading.value = true

    sendInfo(dataList).then(() => {
      ElMessage.success('导入成功')
      handleQuery()
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      importBtnLoading.value = false
    })
  }
}

function manageQuest() {
  dialogVisible.value = true
  dialogLoading.value = true

  listQuest().then(({ data }) => {
    data.forEach((quest) => {
      if (!questConfig.value.some(q => quest.questId === q.questId))
        questConfig.value.push({ ...quest, visible: false })
    })
  }).catch((err) => {
    ElMessage.error(err.message)
  }).finally(() => {
    dialogLoading.value = false
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
    <div sticky left-0 right-0 top-0 z-999 h-10 flex items-center justify-between rounded bg-violet px-4 text-base>
      <TheButton icon="carbon:update-now" :loading="queryBtnLoading" @click="handleQuery">
        刷新
      </TheButton>
      <div fc gap-2>
        <TheButton icon="carbon:document-download" @click="manageQuest">
          管理副本
        </TheButton>
        <ElUpload
          v-model:file-list="filesList" :on-change="handleUploadChange"
          :show-file-list="false" :limit="1" :auto-upload="false" accept=".json" :disabled="importBtnLoading"
        >
          <template #trigger>
            <TheButton icon="carbon:document-import" :loading="importBtnLoading" @click="filesList = []">
              导入
            </TheButton>
          </template>
        </ElUpload>
      </div>
    </div>

    <el-skeleton :loading="queryBtnLoading" animated :throttle="500">
      <template #template>
        <div my-10px w-500px w-full fc flex-wrap gap-10px>
          <el-skeleton-item v-for="i in questConfig.filter(q => q.visible).length" :key="i" variant="p" style="width: 370px; height: 110px" />
        </div>
      </template>

      <template #default>
        <div my-10px fc flex-wrap gap-10px>
          <QuestCard v-for="quest in questData" :key="quest.questId" :data="quest" />
          <div v-if="questConfig.filter(q => q.visible).length === 0" mt-10px h-50px text-center text-xl>
            还未收藏副本
          </div>
        </div>
      </template>
    </el-skeleton>

    <el-dialog v-model="dialogVisible" width="700" @close="handleQuery">
      <el-skeleton :loading="dialogLoading" animated>
        <template #template>
          <div w-full fc flex-wrap gap-10px>
            <el-skeleton-item variant="p" style="width: 100%; height: 400px" />
          </div>
        </template>

        <VueDraggableNext v-model="questConfig" flex flex-wrap gap-10px>
          <transition-group name="list">
            <div
              v-for="quest in questConfig" :key="quest.questId"
              :class="{ 'brightness-50': !quest.visible }"
              cursor-pointer select-none
              @click="toggleVisible(quest.questId)"
            >
              <img w-100px :src="getQuestImg(quest.questId, 'lobby')">
            </div>
          </transition-group>
        </VueDraggableNext>
      </el-skeleton>
    </el-dialog>
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
