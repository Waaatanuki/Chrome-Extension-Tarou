<script setup lang="ts">
import type { DropData } from 'api'
import copy from 'copy-text-to-clipboard'
import { code, goldBrickData, questConfig, uid, windowSize } from '~/logic/storage'
import { listDrop, updateCode } from '~/api'

const { openDashboard } = useDashboard()
const cardData = ref<DropData[]>([])

function handleCommand(command: string) {
  switch (command) {
    case 'windowSize':
      windowSize.value = { left: 300, top: 0, width: 800, height: 600 }
      ElMessage.success('详细面板位置已重置')
      break
    case 'import':
      importData()
      break
    case 'export':
      exportData()
      break
    case 'toggleDark':
      toggleDark()
      break
    case 'dashboard':
      openDashboard()
      break
    case 'test':
      code.value = ''
      uid.value = ''
      break
  }
}

function importData() {
  const re = /waaatanuki.[a-zA-Z]+.io\/gbf-app/
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0 && tabs[0].id && tabs[0].url && re.test(tabs[0].url)) {
      if (goldBrickData.value.length === 0)
        return ElMessage.info('当前没有可导入的数据')
      chrome.tabs.sendMessage(tabs[0].id, { todo: 'importData' }).then((res) => {
        if (res?.isDone)
          goldBrickData.value = []
      })
    }
    else {
      ElMessage.info('只能在gbfApp网站导入')
    }
  })
}

function exportData() {
  if (goldBrickData.value.length === 0)
    return ElMessage.info('当前没有可导出的数据')
  const exportData = goldBrickData.value.reduce<any[]>((pre, cur) => {
    const val: any = { ...cur }
    delete val.battleId
    pre.push({ [cur.battleId]: val })
    return pre
  }, [])
  exportJSONFile(exportData)
  goldBrickData.value = []
  ElMessage.success('导出成功,并清空原始数据')
}

function exportJSONFile(itemList: any) {
  const data = JSON.stringify(itemList, null, 2)
  const content = new Blob([data])
  const urlObject = window.URL || window.webkitURL || window
  const url = urlObject.createObjectURL(content)
  const el = document.createElement('a')
  el.href = url
  el.download = 'gbfApp_金本统计数据.json'
  el.click()
  urlObject.revokeObjectURL(url)
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
  listDrop('popup').then(({ data }) => {
    if (questConfig.value.length === 0)
      questConfig.value = data.map(quest => ({ questId: quest.questId, visible: true }))

    data.forEach((quest) => {
      if (!questConfig.value.some(q => quest.questId === q.questId))
        questConfig.value.push({ questId: quest.questId, visible: true })
    })

    const questOrder = questConfig.value.filter(q => q.visible)
    questOrder.forEach((quest) => {
      const hit = data.find(q => quest.questId === q.questId)
      hit && cardData.value.push(hit)
    })
  })
}

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <main>
    <div w-370px>
      <ElScrollbar max-height="450px">
        <div flex flex-col>
          <div v-for="quest in cardData" :key="quest.questId">
            <QuestCard :quest-info="quest" :visible="true" @toggle-visible="toggleVisible(quest)" />
          </div>
        </div>
      </ElScrollbar>

      <div flex items-center justify-between>
        <div>
          <ElDropdown @command="handleCommand">
            <div m-2 flex btn size="small" type="danger">
              操作
            </div>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem command="windowSize">
                  重置面板位置
                </ElDropdownItem>
                <ElDropdownItem command="cardShow">
                  重置金本显隐
                </ElDropdownItem>
                <ElDropdownItem command="import">
                  导入金本数据至APP
                </ElDropdownItem>
                <ElDropdownItem command="export">
                  导出金本原始数据
                </ElDropdownItem>
                <ElDropdownItem command="toggleDark">
                  切换暗黑模式
                </ElDropdownItem>
                <ElDropdownItem command="dashboard">
                  打开详细面板
                </ElDropdownItem>
                <ElDropdownItem command="test">
                  测试
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
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
