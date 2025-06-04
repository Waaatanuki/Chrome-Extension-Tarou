<script setup lang="ts">
import { Icon } from '@iconify/vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Dashborad from './views/dashboard/index.vue'
import Drop from './views/drop/index.vue'
import Setting from './views/setting/index.vue'

const componentMap: Record<string, Component> = {
  Dashborad,
  Drop,
  Setting,
}
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div h-vh w-vw flex>
      <div flex-1 p-10px>
        <keep-alive>
          <component :is="componentMap[currentView]" />
        </keep-alive>
      </div>
      <div class="bg-#3C3C3C" w-50px flex shrink-0 flex-col justify-between p-10px>
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
