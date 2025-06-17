<script setup lang="ts">
import { Icon } from '@iconify/vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Artifact from './views/artifact/index.vue'
import Battle from './views/battle/index.vue'
import Build from './views/build/index.vue'
import Combat from './views/combat/index.vue'
import Dashborad from './views/dashboard/index.vue'
import Drop from './views/drop/index.vue'
import History from './views/history/index.vue'
import Info from './views/info/index.vue'
import Party from './views/party/index.vue'
import Patient from './views/patient/index.vue'
import Setting from './views/setting/index.vue'

const componentMap: Record<string, Component> = {
  Dashborad,
  Drop,
  Artifact,
  Party,
  Build,
  Combat,
  History,
  Patient,
  Battle,
  Setting,
  Info,
}
const currentView = ref('Dashborad')

// TODO:团战期间展示Battle标签
const upViewList = [
  { key: 'Dashborad', lable: '常用信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落统计', icon: 'game-icons:gold-stack' },
  { key: 'Artifact', lable: '神器甄选', icon: 'game-icons:glowing-artifact' },
  { key: 'Party', lable: '队伍信息', icon: 'ri:team-fill' },
  { key: 'Build', lable: '配置查询', icon: 'material-symbols:document-search' },
  { key: 'Combat', lable: '战斗信息', icon: 'game-icons:battle-axe' },
  { key: 'History', lable: '战斗记录', icon: 'game-icons:scroll-unfurled' },
  { key: 'Patient', lable: '标记玩家', icon: 'material-symbols:patient-list' },
  { key: 'Battle', lable: '接战', icon: 'game-icons:crossed-swords' },
]

const downViewList = [
  { key: 'Info', lable: '用户信息', icon: 'carbon:information-filled' },
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

onMounted(() => {
  chrome.runtime.connect({ name: 'mySidepanel' })
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div h-full w-full flex>
      <el-scrollbar w-full>
        <div p-10px>
          <keep-alive>
            <component :is="componentMap[currentView]" />
          </keep-alive>
        </div>
      </el-scrollbar>

      <div class="bg-#3C3C3C" w-40px flex shrink-0 flex-col justify-between p-5px>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in upViewList" :key="view.key" effect="dark" :content="view.lable" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in downViewList" :key="view.key" effect="dark" :content="view.lable" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>
