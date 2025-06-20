<script setup lang="ts">
import { Icon } from '@iconify/vue'

const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

const foo = ref(123)

const visible = ref(false)
function handleClick() {
  console.log(foo.value)
}
</script>

<template>
  <div fc flex-col flex-wrap gap-3 p-10>
    <div h-600px w-360px flex rounded-xl>
      <el-scrollbar flex-1 ring-1>
        <div p-10px>
          <el-card body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
            <template #header>
              <div flex items-center justify-between>
                <div text-12px>
                  {{ `每日统计` }}
                </div>
                <div fc gap-1>
                  <el-tooltip content="AP" placement="top">
                    <el-tag type="success">
                      {{ 123 }}
                    </el-tag>
                  </el-tooltip>
                  <el-tooltip content="AAP" placement="top">
                    <el-tag type="primary">
                      {{ 33 }}
                    </el-tag>
                  </el-tooltip>
                  <el-tooltip content="BP" placement="top">
                    <el-tag type="danger">
                      {{ 123 }}
                    </el-tag>
                  </el-tooltip>
                </div>
              </div>
            </template>
            <el-scrollbar max-height="258">
              <div flex flex-wrap gap-12px text-12px>
                <el-tooltip v-for="i in 20" :key="i" content="123" placement="top">
                  <div w-60px fc flex-col>
                    <img src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/enemy/s/8104063.png">
                    <div>{{ 3 }}</div>
                  </div>
                </el-tooltip>
              </div>
            </el-scrollbar>
          </el-card>
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
      <TheButton title="ddwq" @click="handleClick">
        Button
      </TheButton>
    </div>
  </div>
</template>
