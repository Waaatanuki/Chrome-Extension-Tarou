<script setup lang="ts">
import { Icon } from '@iconify/vue'

const visible = ref(false)
const foo = ref(123)
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]
const contentRef = useTemplateRef('content')

function handleClick() {
  if (!contentRef.value)
    return
  console.log(foo.value)

  const scale = Number(foo.value) / 300
  contentRef.value.style.transform = `scale(${scale})`
  contentRef.value.style.transformOrigin = '0 0'
  contentRef.value.style.width = `${100 / scale}%`
}
</script>

<template>
  <div fc flex-col flex-wrap gap-3 p-10>
    <input v-model="foo" type="text">

    <div ref="content" w-300px flex flex-wrap ring-1 ring-rose>
      <el-tooltip effect="dark" content="asdsa" placement="left">
        3123
      </el-tooltip>
      <div v-for="i in 10" :key="i" h-50px w-50px ring-1 />
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

    <div>
      <TheButton title="测试" @click="handleClick">
        Button
      </TheButton>
    </div>
  </div>
</template>
