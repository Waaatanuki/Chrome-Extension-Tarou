<script setup lang="ts">
import { obWindowId, windowSize } from '~/logic'
import Artifact from './tabs/artifact/index.vue'
import BattleLog from './tabs/battleLog/index.vue'
import BattleRecord from './tabs/battleRecord/index.vue'
import Dashborad from './tabs/dashboard/index.vue'
import Drop from './tabs/drop/index.vue'
import EvokerPage from './tabs/evoker/index.vue'
import MarkedUser from './tabs/markedUser/index.vue'
import Party from './tabs/party/index.vue'

chrome.debugger.onEvent.addListener((source, method, params: any) => {
  if (method === 'Network.webSocketFrameReceived') {
    const payloadData: string = params.response?.payloadData || ''
    if (payloadData.substring(0, 2) === '42') {
      // console.log(JSON.parse(payloadData.substring(2))[1].bossUpdate?.param?.boss1_condition)
      handleWsPayloadJson(JSON.parse(payloadData.substring(2))[1])
    }
  }
})

chrome.windows.onBoundsChanged.addListener((windowInfo) => {
  if (obWindowId.value !== windowInfo.id)
    return
  windowSize.value.left = windowInfo.left ?? 300
  windowSize.value.top = windowInfo.top ?? 0
  windowSize.value.width = windowInfo.width ?? 800
  windowSize.value.height = windowInfo.height ?? 600
})
</script>

<template>
  <main>
    <ElTabs type="border-card">
      <ElTabPane label="主页" lazy>
        <Dashborad />
      </ElTabPane>
      <ElTabPane label="贤者素材" lazy>
        <EvokerPage />
      </ElTabPane>
      <ElTabPane label="神器甄选" lazy>
        <Artifact />
      </ElTabPane>
      <ElTabPane label="掉落统计" lazy>
        <Drop />
      </ElTabPane>
      <ElTabPane label="队伍信息" lazy>
        <Party />
      </ElTabPane>
      <ElTabPane label="战斗日志" lazy>
        <BattleLog />
      </ElTabPane>
      <ElTabPane label="战斗历史" lazy>
        <BattleRecord />
      </ElTabPane>
      <ElTabPane label="标记用户" lazy>
        <MarkedUser />
      </ElTabPane>
    </ElTabs>
  </main>
</template>
