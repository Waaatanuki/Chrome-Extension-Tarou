<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'

const visible = ref(false)
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]
const notificationSetting = ref<any>({})
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
      <el-scrollbar flex-1 ring-1>
        <div p-10px>
          <el-alert :closable="false">
            <template #title>
              <div w-268px flex items-center justify-between gap-2>
                <div>
                  弹窗通知
                </div>
                <el-switch />
              </div>
            </template>
          </el-alert>
          <div flex flex-col pl-5>
            <el-checkbox v-model="notificationSetting.battleWin" label="战斗结束提醒" />
            <el-checkbox v-model="notificationSetting.battleLose" label="队伍全灭提醒" />
            <el-checkbox v-model="notificationSetting.replicardEvent" label="沙盒宝箱提醒" />
            <el-checkbox v-model="notificationSetting.appearanceQuest" label="Hell提醒" />
            <el-checkbox v-model="notificationSetting.itemGoal" label="底部道具数量达到目标" />
            <el-checkbox v-model="notificationSetting.isPointOverLimit" label="四象点数超过上限" />
          </div>
          <el-alert :closable="false">
            <template #title>
              <div w-268px flex items-center justify-between gap-2>
                <div>
                  掉落提醒
                </div>
                <el-switch />
              </div>
            </template>
          </el-alert>
          <div px-5>
            <el-card my-10px body-style="padding: 10px">
              <div flex flex-wrap gap-12px>
                <div v-for="i in 10" :key="i" relative fc flex-col select-none class="group">
                  <div h-50px w-50px bg-amber-2 />
                </div>
              </div>
            </el-card>
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
