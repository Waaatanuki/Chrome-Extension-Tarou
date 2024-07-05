<script setup lang="ts">
import type { Stat } from 'api'
import copy from 'copy-text-to-clipboard'
import { code, questConfig, uid } from '~/logic/storage'
import { listDrop, updateCode } from '~/api'

const { openDashboard } = useDashboard()
const questData = ref<Stat[]>([])

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
const loading = ref(false)
const btnLoading = ref(false)

function showDialog() {
  if (!code.value || !uid.value)
    return ElMessage.info('进入战斗获取信息')

  dialogVisible.value = true
  form.oldValue = code.value
  form.newValue = ''
}

function handleCopy(text: string) {
  if (copy(text))
    ElMessage.success(`已复制引继码`)
}

function submit() {
  if (btnLoading.value)
    return
  btnLoading.value = true
  updateCode({ code: form.newValue }).then((data) => {
    code.value = data.code
    dialogVisible.value = false
    ElMessage.success('迁移成功')
  }).catch((err) => {
    ElMessage.error(err.message)
  }).finally(() => {
    btnLoading.value = false
  })
}

function handleQuery() {
  const questIds = questConfig.value.filter(q => q.visible).map(q => q.questId)
  if (questIds.length === 0)
    return

  loading.value = true
  listDrop(questIds).then(({ data }) => {
    questData.value = data
  }).catch(() => {
    ElMessage.error('请求失败')
  }).finally(() => {
    loading.value = false
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
    <div w-380px>
      <ElScrollbar v-loading="loading" max-height="450px">
        <div min-h-350px flex flex-col>
          <QuestCard v-for="quest in questData" :key="quest.questId" :data="quest" />
          <div v-if="questConfig.filter(q => q.visible).length === 0" m-auto h-50px text-center text-xl>
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
          <el-link :type="code ? 'success' : 'default'" @click="showDialog">
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
        <TheButton :loading="btnLoading" @click="submit">
          确定
        </TheButton>
      </template>
    </el-dialog>
  </main>
</template>
