<script setup lang="ts">
import type { GoldBrickTableData, RaidInfo } from 'myStorage'
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
    case 'windowSize':
      windowSize.value = { left: 300, top: 0, width: 800, height: 600 }
      ElMessage.success('详细面板位置已重置')
      break
  }
}

function getMsg(item: GoldBrickTableData) {
  if (item.lastBlueChestTake)
    return `上次出金打了${item.lastBlueChestTake}蓝箱，已经有${item.lastBlueChestCount}蓝箱没出过金了`
  else
    return `距离上次出金已经打了${item.lastBlueChestCount}蓝箱`
}

function getRatio(a = 0, b = 0) {
  if (b === 0)
    return '0.00'

  return ((a / b) * 100).toFixed(2)
}

function getEternitySandRatio(item: RaidInfo) {
  if (item.is_blue_eternitySand)
    return getRatio(item.eternitySand, item.blueChest)
  else
    return getRatio(item.eternitySand, item.total)
}

function getEternitySandMsg(item: RaidInfo) {
  if (item.eternitySand === 0)
    return '还未出过沙漏'

  if (item.lastDropTake)
    return `上次出沙漏经历${item.lastDropTake}场，已经${item.lastDropCount}场没出过了`
  else
    return `距离上次出沙漏已经过去了${item.lastDropCount}场`
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
    <div w-340px>
      <ElScrollbar max-height="400px">
        <div flex flex-col>
          <div v-for="item in goldBrickTableShowData" :key="item.quest_id">
            <ElTooltip placement="left">
              <template #content>
                {{ getMsg(item) }}
              </template>

              <ElCard :body-style="{ padding: '5px' }">
                <div h-80px w-325px flex items-center justify-start text-sm>
                  <div shrink-0>
                    <img w-100px :src="getQuestImg(item.quest_id)">
                  </div>
                  <div class="desc-item">
                    <div>
                      总次数
                    </div>
                    <div text-xs>
                      {{ item.total }}
                    </div>
                  </div>
                  <div class="desc-item">
                    <div>蓝箱</div>
                    <div text-xs>
                      {{ item.blueChest }}
                    </div>
                    <div text-xs>
                      {{ getRatio(item.blueChest, item.total) }}%
                    </div>
                  </div>
                  <div class="desc-item">
                    <div>绯绯金</div>
                    <div text-xs>
                      {{ item.goldBrick }}
                    </div>
                    <div text-xs>
                      {{ getRatio(item.goldBrick, item.blueChest) }}%
                    </div>
                  </div>
                </div>
              </ElCard>
            </ElTooltip>
          </div>
          <div v-for="item in eternitySandData.filter(i => i.visiable)" :key="item.quest_id">
            <ElTooltip placement="left">
              <template #content>
                {{ getEternitySandMsg(item) }}
              </template>

              <ElCard :body-style="{ padding: '5px' }">
                <div h-80px w-325px flex items-center justify-start text-sm>
                  <div shrink-0>
                    <img w-100px :src="getQuestImg(item.quest_id)">
                  </div>
                  <div class="desc-item">
                    <div>
                      总次数
                    </div>
                    <div text-xs>
                      {{ item.total }}
                    </div>
                  </div>
                  <div v-if="item.is_blue_treasure" class="desc-item">
                    <div>蓝箱</div>
                    <div text-xs>
                      {{ item.blueChest }}
                    </div>
                    <div text-xs>
                      {{ getRatio(item.blueChest, item.total) }}%
                    </div>
                  </div>
                  <div class="desc-item">
                    <div>沙漏</div>
                    <div text-xs>
                      {{ item.eternitySand }}
                    </div>
                    <div text-xs>
                      {{ getEternitySandRatio(item) }}%
                    </div>
                  </div>
                </div>
              </ElCard>
            </ElTooltip>
          </div>
        </div>
      </ElScrollbar>

      <div flex items-center justify-between>
        <div>
          <ElDropdown @command="handleReset">
            <div m-2 flex btn size="small" type="danger">
              <div i-carbon:reset mr-1 />
              重置
            </div>
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
                <ElDropdownItem command="windowSize">
                  面板位置
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </div>
        <div mr-15px flex gap-10px>
          <el-tooltip content="切换模式" placement="bottom">
            <div i-carbon-sun dark:i-carbon-moon icon-btn @click="toggleDark()" />
          </el-tooltip>
          <el-tooltip content="导入至APP" placement="bottom">
            <div i-carbon:document-import icon-btn @click="importData" />
          </el-tooltip>
          <el-tooltip content="导出" placement="bottom">
            <div i-carbon:document-export icon-btn @click="exportData" />
          </el-tooltip>
          <el-tooltip content="详细面板" placement="bottom">
            <div i-carbon:dashboard icon-btn @click="openDashboard" />
          </el-tooltip>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.desc-item{
  width: 70px;
  height: 60px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-end;
}
</style>
