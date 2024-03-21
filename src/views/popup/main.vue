<script setup lang="ts">
import type { DropData } from 'api'
import copy from 'copy-text-to-clipboard'
import { code, questConfig, uid } from '~/logic/storage'
import { listDrop, updateCode } from '~/api'

const { openDashboard } = useDashboard()
const cardData = ref<DropData[]>([])

function handleCommand(command: string) {
  switch (command) {
    case 'toggleDark':
      toggleDark()
      break
    case 'dashboard':
      openDashboard()
      break
    case 'test':
      handleQuery()
      break
  }
}

const dialogVisible = ref(false)
const form = reactive({
  oldValue: '',
  newValue: '',
})

function showDialog() {
  dialogVisible.value = true
  form.oldValue = code.value
  form.newValue = ''
}

function toggleVisible(quest: DropData) {
  const hit = questConfig.value.find(q => q.questId === quest.questId)
  if (hit) {
    hit.visible = false
    cardData.value = cardData.value.filter(q => q.questId !== quest.questId)
  }
}

function handleCopy(text: string) {
  if (copy(text))
    ElMessage.success(`已复制引继码`)
}

function submit() {
  updateCode({ code: form.newValue }).then((data) => {
    code.value = data.code
    dialogVisible.value = false
    ElMessage.success('迁移成功')
  }).catch((err) => {
    ElMessage.error(err.message)
  })
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

onMounted(() => {
  setTimeout(() => {
    handleQuery()
  }, 0)
})
</script>

<template>
  <main>
    <div w-370px>
      <ElScrollbar max-height="450px">
        <div min-h-50px flex flex-col>
          <div v-for="quest in questConfig.filter(q => q.visible)" :key="quest.questId">
            <QuestCard :quest-info="cardData.find(q => q.questId === quest.questId)" :visible="true" @toggle-visible="toggleVisible" />
          </div>
          <div v-if="questConfig.filter(q => q.visible).length === 0" h-50px text-center>
            还未收藏副本
          </div>
        </div>
      </ElScrollbar>

      <div flex items-center justify-between px-15px py-10px>
        <div fc gap-20px text-lg>
          <el-tooltip content="切换模式" placement="bottom">
            <div i-carbon-sun dark:i-carbon-moon icon-btn @click="handleCommand('toggleDark')" />
          </el-tooltip>
          <el-tooltip content="详细面板" placement="bottom">
            <div i-carbon:dashboard icon-btn @click="handleCommand('dashboard')" />
          </el-tooltip>
        </div>
        <div mr-2>
          <el-link @click="showDialog">
            玩家ID: {{ uid || '未获取' }}
          </el-link>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" width="350">
      <el-form :model="form" label-position="top">
        <el-form-item label="当前引继码">
          <el-link ml-2 type="primary" @click="handleCopy(form.oldValue)">
            {{ form.oldValue }}
          </el-link>
        </el-form-item>
        <el-form-item label="迁移引继码">
          <el-input v-model="form.newValue" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div btn @click="submit">
          确定
        </div>
      </template>
    </el-dialog>
  </main>
</template>
