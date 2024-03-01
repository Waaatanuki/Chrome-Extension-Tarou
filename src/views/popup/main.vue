<script setup lang="ts">
import type { RaidInfo } from 'myStorage'
import copy from 'copy-text-to-clipboard'
import { code, eternitySandData, goldBrickData, goldBrickTableData, uid, windowSize } from '~/logic/storage'
import { defaultEternitySandData, defaultGoldBrickTableData } from '~/constants'
import { updateCode } from '~/api'

const goldBrickCardData = computed<RaidInfo[]>(() =>
  goldBrickTableData.value.map(raid => ({
    quest_id: raid.quest_id,
    level: '',
    element: '',
    tweet_name_en: '',
    tweet_name_jp: '',
    quest_name_en: '',
    quest_name_jp: '',
    difficulty: '',
    stage_id: '',
    thumbnail_image: '',
    is_blue_treasure: !(raid.quest_id === '303141'),
    visiable: Object.hasOwn(raid, 'visiable') ? raid.visiable : true,
    total: raid.total,
    blueChest: raid.blueChest,
    goldBrick: raid.goldBrick,
    lastDropCount: raid.lastBlueChestCount,
    lastDropTake: raid.lastBlueChestTake,
  })),
)

const { openDashboard } = useDashboard()

function handleCommand(command: string) {
  switch (command) {
    case 'goldBrick':
      goldBrickTableData.value = defaultGoldBrickTableData
      ElMessage.success('金本数据已重置')
      break
    case 'eternitySand':
      eternitySandData.value = defaultEternitySandData
      ElMessage.success('沙漏数据已重置')
      break
    case 'windowSize':
      windowSize.value = { left: 300, top: 0, width: 800, height: 600 }
      ElMessage.success('详细面板位置已重置')
      break
    case 'cardShow':
      goldBrickTableData.value.forEach(raid => raid.visiable = true)
      ElMessage.success('金本全部展示')
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

function toggleVisible(raid: RaidInfo, type: number) {
  if (type === 1) {
    const hit = goldBrickTableData.value.find(r => r.quest_id === raid.quest_id)
    if (hit)
      hit.visiable = !hit.visiable
  }
  if (type === 2)
    raid.visiable = !raid.visiable
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
</script>

<template>
  <main>
    <div w-370px>
      <ElScrollbar max-height="450px">
        <div flex flex-col>
          <div v-for="item in goldBrickCardData.filter(i => i.visiable)" :key="item.quest_id">
            <RaidCard :raid-info="item" :type="1" @toggle-visible="toggleVisible" />
          </div>
          <div v-for="item in eternitySandData.filter(i => i.visiable)" :key="item.quest_id">
            <RaidCard :raid-info="item" :type="2" @toggle-visible="toggleVisible" />
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
                <ElDropdownItem command="goldBrick">
                  重置金本数据
                </ElDropdownItem>
                <ElDropdownItem command="eternitySand">
                  重置沙漏数据
                </ElDropdownItem>
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
