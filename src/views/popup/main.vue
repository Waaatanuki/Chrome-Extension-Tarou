<script setup lang="ts">
import type { GoldBrickTableData } from 'myStorage'
import { eternitySandData, goldBrickData, goldBrickTableData, tabId, windowId, windowSize } from '~/logic/storage'
import { defaultEternitySandData, defaultGoldBrickTableData } from '~/constants'

const goldBrickTableShowData = computed(() => goldBrickTableData.value.filter(raid => raid.quest_id !== '303141'))

async function openDashboard() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  if (tab && tab.url?.includes('game.granbluefantasy.jp')) {
    try {
      await chrome.windows.get(windowId.value)
      ElMessage.warning('已开启详细面板')
    }
    catch (error) {
      const windowInfo = await chrome.windows.create({ url: `src/views/debugger/main.html?${tab.id}`, type: 'popup', ...windowSize.value })
      tabId.value = tab.id
      windowId.value = windowInfo.id

      const result = await chrome.debugger.getTargets()
      const hit = result.find(item => item.tabId === tabId.value)
      if (hit?.attached)
        await chrome.debugger.detach({ tabId: tabId.value })

      await chrome.debugger.attach({ tabId: tabId.value }, '1.2')
      await chrome.debugger.sendCommand({ tabId: tabId.value }, 'Network.enable')
    }
  }
  else {
    ElMessage.warning('请先进入游戏页面')
  }
}

function handleReset(command: string) {
  switch (command) {
    case 'all':
      goldBrickTableData.value = defaultGoldBrickTableData
      eternitySandData.value = defaultEternitySandData
      ElMessage.success('全部数据已重置')
      break
    case 'goldBrick':
      goldBrickTableData.value = defaultGoldBrickTableData
      ElMessage.success('金本数据已重置')
      break
    case 'eternitySand':
      eternitySandData.value = defaultEternitySandData
      ElMessage.success('沙漏本数据已重置')
      break
  }
}

function getMsg(item: GoldBrickTableData) {
  if (item.lastBlueChestTake)
    return `上次出金打了${item.lastBlueChestTake}蓝箱，已经有${item.lastBlueChestCount}蓝箱没出过金了`
  else
    return `距离上次出金已经打了${item.lastBlueChestCount}蓝箱`
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
  ElMessage.success('导出成功,并清空数据')
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
</script>

<template>
  <main>
    <div w-500px>
      <ElTable :data="goldBrickTableShowData">
        <ElTableColumn prop="name" align="center">
          <template #header>
            <div
              class="icon-btn" i-carbon-sun dark:i-carbon-moon m-auto
              @click="toggleDark()"
            />
          </template>
          <template #default="{ row }">
            <img m-auto w-full :src="getQuestImg(row.quest_id)">
          </template>
        </ElTableColumn>
        <ElTableColumn prop="blueChest" align="center">
          <template #header="{ column }">
            <img m-auto w-30px :src="getLocalImg(column.property)">
          </template>
          <template #default="{ row }">
            <ElTooltip effect="dark" placement="top">
              <template #content>
                总次数：{{ row.total }}<br>
                蓝箱率：{{ ((row.blueChest / row.total || 0) * 100).toFixed(1) }}%
              </template>
              {{ row.blueChest }}
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="goldBrick" align="center">
          <template #header="{ column }">
            <img m-auto w-30px :src="getLocalImg(column.property, 'item')">
          </template>
          <template #default="{ row }">
            <ElTooltip effect="dark" placement="top">
              <template #content>
                蓝箱金率：{{ ((row.goldBrick / row.blueChest || 0) * 100).toFixed(1) }}%
                <br>
                {{ getMsg(row) }}
              </template>
              {{ row.goldBrick }}
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="ring3" align="center">
          <template #header="{ column }">
            <img m-auto w-30px :src="getLocalImg(column.property, 'item')">
          </template>
        </ElTableColumn>
        <ElTableColumn prop="ring2" align="center">
          <template #header="{ column }">
            <img m-auto w-30px :src="getLocalImg(column.property, 'item')">
          </template>
        </ElTableColumn>
        <ElTableColumn prop="ring1" align="center">
          <template #header="{ column }">
            <img m-auto w-30px :src="getLocalImg(column.property, 'item')">
          </template>
        </ElTableColumn>
      </ElTable>
      <div flex justify-between>
        <div>
          <ElDropdown @command="handleReset">
            <ElButton m-2 size="small" type="danger">
              <div i-carbon:reset mr-1 />
              重置
            </ElButton>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem command="all">
                  全部重置
                </ElDropdownItem>
                <ElDropdownItem command="goldBrick">
                  仅金本
                </ElDropdownItem>
                <ElDropdownItem command="eternitySand">
                  仅沙漏本
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </div>
        <div>
          <ElButton m-2 size="small" type="primary" @click="importData">
            <div i-carbon:document-import mr-1 />
            导入至APP
          </ElButton>
          <ElButton m-2 size="small" type="primary" @click="exportData">
            <div i-carbon:document-export mr-1 />
            导出
          </ElButton>
          <ElButton m-2 size="small" type="primary" @click="openDashboard">
            <div i-carbon:dashboard mr-1 />
            详细面板
          </ElButton>
        </div>
      </div>
    </div>
  </main>
</template>
