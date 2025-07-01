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

function handleClick() {
  console.log(foo.value)
}
</script>

<template>
  <div fc flex-col flex-wrap gap-3 p-10>
    <input v-model="foo" type="text">

    <div h-800px w-800px fc ring-1 ring-rose>
      <el-card w-717px header="掉落统计" :body-style="{ padding: '20px 5px 20px 5px' }">
        <template #header>
          <div flex items-center justify-between>
            <div text-lg>
              掉落统计
            </div>
            <div>
              <el-switch
                v-model="visible"
                inline-prompt
                style="--el-switch-on-color: #3c3c3c; --el-switch-off-color: #6c6c6c"
                active-text="获取顺序"
                inactive-text="数量顺序"
              />
            </div>
          </div>
        </template>
        <el-scrollbar :height="600" px-15px>
          <div flex flex-wrap gap-5px text-14px>
            <div v-for="i in 80" :key="i" w-80px fc flex-col>
              <img src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/item/article/m/1131.jpg">
              <div>33</div>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
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
