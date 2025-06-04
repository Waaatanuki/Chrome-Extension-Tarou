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

const userInfo = ref<any>({})
</script>

<template>
  <div flex flex-wrap gap-3 p-10>
    <Contact absolute right-15px top-15px />
    <div>
      <TheButton @click="visible = true">
        ceshi
      </TheButton>
    </div>

    <div h-150 w-200 flex rounded-xl bg-neutral>
      <div w-full flex-1 overflow-hidden bg-rose p-2>
        <div flex flex-wrap>
          <el-descriptions :column="2" :border="true" direction="vertical" w-290px size="small">
            <el-descriptions-item label="武勋" label-width="200" :rowspan="2">
              <div>
                <div flex justify-between>
                  <span>每日</span>
                  <NumberLimitDisplay :value="userInfo.mbp?.daily" />
                </div>
                <div flex justify-between>
                  <span>每周</span>
                  <NumberLimitDisplay :value="userInfo.mbp?.weekly" />
                </div>

                <div flex flex-1 justify-between>
                  <span>R奖励</span>
                  <NumberLimitDisplay :value="userInfo.mbp?.bonus.r" />
                </div>
                <div flex flex-1 justify-between>
                  <span>SR奖励</span>
                  <NumberLimitDisplay :value="userInfo.mbp?.bonus.sr" />
                </div>

                <div flex justify-between>
                  <span>总计</span>
                  <NumberLimitDisplay :value="userInfo.mbp?.total" />
                </div>
              </div>
            </el-descriptions-item>

            <el-descriptions-item label="FP">
              <div>
                <div flex justify-between>
                  <span>每周</span>
                  <NumberLimitDisplay :value="userInfo.followPoint?.weekly" />
                </div>
                <div flex justify-between>
                  <span>总计</span>
                  <NumberLimitDisplay :value="userInfo.followPoint?.total" />
                </div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="神器">
              <div flex justify-between>
                <span>掉落UP</span>
                <NumberLimitDisplay :value="userInfo.artifact" />
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="荣誉">
              <div>
                <div flex justify-between>
                  <span>每周</span>
                  <NumberLimitDisplay :value="userInfo.hmbp?.weekly" />
                </div>
                <div flex justify-between gap-2>
                  <div flex flex-1 justify-between>
                    <span>骑空团奖励</span>
                    <NumberLimitDisplay :value="userInfo.hmbp?.bonus.crew" />
                  </div>
                </div>
                <div flex justify-between>
                  <span>总计</span>
                  <NumberLimitDisplay :value="userInfo.hmbp?.total" />
                </div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="转世" label-width="200">
              <div>
                <div flex justify-between>
                  <span>门票</span>
                  <NumberLimitDisplay :value="userInfo.arcarum?.passport" />
                </div>
                <div flex justify-between>
                  <span>每周</span>
                  <NumberLimitDisplay :value="userInfo.arcarum?.point.weekly" />
                </div>
                <div flex justify-between>
                  <span>总计</span>
                  <NumberLimitDisplay :value="userInfo.arcarum?.point.total" />
                </div>
              </div>
            </el-descriptions-item>
          </el-descriptions>
          <div h-200px w-100px bg-blue>
            33
          </div>
        </div>
      </div>
      <!-- <div flex-1 bg-rose>

      </div> -->
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
  </div>
</template>
