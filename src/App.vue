<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
// import Treasureraid from '~/views/sidePanel/views/dashboard/components/Treasureraid.vue'

const visible = ref(false)
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

const eventInfo = [
  {
    name: '古战场',
    type: 0,
    boxToken: [
      [1600, 1],
      [2400, 3],
      [2000, 41],
      [10000, 35],
    ],
    last: 15000,
  },
  {
    name: '月末战货',
    type: 'treasureraid',
    boxToken: [
      [1200, 1],
      [1580, 1],
      [1980, 1],
      [2112, 17],
    ],
    last: 2104,
  },
  {
    name: '公会战',
    type: 2,
    boxToken: [
      [1600, 1],
      [2400, 3],
      [2000, 16],
      [10000, 20],
    ],
    last: 15000,
  },
]

const form = reactive({
  type: 'treasureraid',
  currentToken: 42500,
  drawnBox: 0,
})

const result = computed(() => {
  const event = eventInfo.find(e => e.type === form.type)
  if (!event) {
    return { totalBox: 0 }
  }

  const tokenList = event.boxToken.flatMap(([token, count]) => Array.from<number>({ length: count }).fill(token))
  let remainingToken = form.currentToken
  let totalBox = form.drawnBox

  for (let i = form.drawnBox; i < tokenList.length; i++) {
    const token = tokenList[i]
    if (remainingToken >= token) {
      totalBox++
      remainingToken -= token
    }
    else {
      break
    }
  }

  // 计算额外可开启的宝箱数量
  if (totalBox >= tokenList.length) {
    totalBox += Math.floor(remainingToken / event.last)
  }

  return { totalBox }
})
</script>

<template>
  <div flex flex-wrap gap-3 p-10>
    <Contact absolute right-15px top-15px />
    <div>
      <TheButton @click="visible = true">
        ceshi
      </TheButton>
    </div>

    <div h-320px w-360px flex rounded-xl>
      <el-scrollbar flex-1>
        <div p-10px>
          <div h-50px fc flex-wrap>
            <Icon icon="material-symbols:check-box" size="5" />
            <div i-material-symbols:check-box text-yellow />
            <div>你好</div>
          </div>
          <div h-50px flex flex-wrap>
            <div i-material-symbols:check-box-outline-blank text-blue />
            <div>你好</div>
          </div>
          <div h-50px flex flex-wrap>
            <div i-material-symbols:check-box text-blue />
            <div>你好</div>
          </div>
        </div>
      </el-scrollbar>
      <!-- <div flex-1 bg-rose>

      </div> -->
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
