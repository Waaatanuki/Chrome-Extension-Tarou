<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { snapdom } from '@zumer/snapdom'

const visible = ref(false)
const foo = ref('')
const currentView = ref('Dashboard')

const upViewList = [
  { key: 'Dashboard', label: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', label: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', label: '设置', icon: 'carbon:settings' },
]

async function handleClick() {
  console.log('handleClick')
  try {
    const element = document.querySelector(`.foo`)!
    const result = await snapdom(element)
    await result.download({ quality: 3, scale: 3, type: 'png', filename: `配置截图${Date.now()}` })
  }
  catch (error) {
    console.error(error)
  }
}
const gachaInfo = ref({
  id: '12',
})
</script>

<template>
  <div fc flex-col flex-wrap gap-3 p-10>
    <Demo :position="{ x: 30, y: 240 }" />
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
        <div p-10px class="foo">
          content
        </div>
      </el-scrollbar>
      <div class="bg-#3C3C3C" w-40px flex shrink-0 flex-col justify-between p-5px>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in upViewList" :key="view.key" effect="dark" :content="view.label" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in downViewList" :key="view.key" effect="dark" :content="view.label" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
