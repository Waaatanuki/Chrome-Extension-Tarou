<script setup lang="ts">
import { Icon } from '@iconify/vue'
// import Gacha from '~/views/sidePanel/views/gacha/index.vue'

const visible = ref(false)
const foo = ref('')
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

function handleClick() {
  console.log('handleClick')
}
const gachaInfo = ref({
  id: '12',
})
const data = ref({})

const bar = [
  { key: 'Drop', lable: '复制配置', icon: 'material-symbols:content-copy' },
  { key: 'Dashborad', lable: '下载配置', icon: 'streamline-flex:screenshot' },
  { key: 'Setting', lable: '配置对比', icon: 'material-symbols:compare' },
]
</script>

<template>
  <div fc flex-wrap gap-3 p-10>
    <div
      fixed left-0 top-100px h-30px w-30px flex items-center
      overflow-hidden rounded-r-3xl bg-teal-7 transition-all duration-300 hover:w-90px
    >
      <el-tooltip v-for="view in bar" :key="view.key" effect="dark" :content="view.lable" placement="top" :show-after="500">
        <div mx-5px h-20px w-20px fc shrink-0 cursor-pointer rounded-full hover:bg-teal-9 @click="currentView = view.key">
          <Icon :icon="view.icon" text-12px />
        </div>
      </el-tooltip>
    </div>
    <div h-600px w-600px ring-1>
      <div fc gap-2 p-2>
        <el-input v-model="foo" type="text" style="width: 200px;" />
        <TheButton title="测试" @click="handleClick">
          按钮
        </TheButton>
      </div>
    </div>

    <div h-600px w-360px flex rounded-xl>
      <el-scrollbar flex-1 ring-1>
        <div p-10px>
          content
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
  </div>
</template>
