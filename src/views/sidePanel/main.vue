<script setup lang="ts">
import { Icon } from '@iconify/vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { eventList, obTabId } from '~/logic'
import Artifact from './views/artifact/index.vue'
import Battle from './views/battle/index.vue'
import Build from './views/build/index.vue'
import Combat from './views/combat/index.vue'
import Dashborad from './views/dashboard/index.vue'
import Drop from './views/drop/index.vue'
import Gacha from './views/gacha/index.vue'
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
  Gacha,
  Setting,
  Info,
}

const { width } = useWindowSize()
const currentView = ref('Dashborad')
const tabId = computed(() => Number(document.URL.split('?')[1]))
const inBattle = computed(() => eventList.value.find(e => e.type === 'teamraid')?.isActive)

const upViewList = computed(() => [
  { key: 'Dashborad', lable: '主页', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落统计', icon: 'game-icons:gold-stack' },
  { key: 'Artifact', lable: '神器甄选', icon: 'game-icons:glowing-artifact' },
  { key: 'Party', lable: '队伍信息', icon: 'ri:team-fill' },
  { key: 'Build', lable: '配置查询', icon: 'material-symbols:document-search' },
  { key: 'Combat', lable: '战斗信息', icon: 'game-icons:battle-axe' },
  { key: 'History', lable: '战斗记录', icon: 'game-icons:scroll-unfurled' },
  { key: 'Patient', lable: '标记玩家', icon: 'material-symbols:patient-list' },
  { key: 'Gacha', lable: '抽卡模拟', icon: 'game-icons:mimic-chest' },
  { key: 'Battle', lable: '接战', icon: 'game-icons:crossed-swords', hidden: !inBattle.value },
].filter(m => !m.hidden))

const downViewList = [
  { key: 'Info', lable: '用户信息', icon: 'carbon:information-filled' },
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

watchEffect(() => {
  const contentEl: HTMLDivElement | null = document.querySelector('#content')

  if (!contentEl)
    return
  const scale = width.value / 360
  contentEl.style.transform = `scale(${scale})`
  contentEl.style.transformOrigin = '0 0'
  contentEl.style.width = `${100 / scale}%`
  contentEl.style.height = `${100 / scale}%`
}, { flush: 'post' })

onMounted(() => {
  chrome.runtime.getContexts({}).then((ctx) => {
    if (ctx.filter(c => c.documentUrl?.includes('src/views/sidePanel/main.html')).length > 1) {
      createNotification({ message: '只能打开一个侧边栏' })
      window.close()
      return
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabInfo = tabs[0]
      if (!tabInfo) {
        window.close()
        return
      }

      obTabId.value = tabId.value || tabInfo.id
    })
  })
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div id="content" h-full w-full flex>
      <el-scrollbar w-full>
        <div p-10px>
          <keep-alive>
            <component :is="componentMap[currentView]" />
          </keep-alive>
        </div>
      </el-scrollbar>

      <div class="bg-#3C3C3C" w-40px flex shrink-0 flex-col justify-between p-5px>
        <el-scrollbar>
          <div flex flex-col items-center gap-10px>
            <el-tooltip v-for="view in upViewList" :key="view.key" effect="dark" :show-after="1000" :content="view.lable" placement="left">
              <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
                <Icon :icon="view.icon" text-20px />
              </div>
            </el-tooltip>
          </div>
        </el-scrollbar>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in downViewList" :key="view.key" effect="dark" :show-after="1000" :content="view.lable" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>
