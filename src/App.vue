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
          <el-card body-style="padding: 10px" header-class="my-card-header" h-full>
            <template #header>
              <div flex justify-between>
                <div>      攒井第2天</div>
                <div>3井</div>
              </div>
            </template>
            <div flex gap-5 text-12px>
              <div w-50px fc flex-col>
                <img :src="getLocalImg('20010', 'ticket')">
                <span text-center>
                  {{ `33` }}
                </span>
              </div>
              <div w-50px fc flex-col>
                <img :src="getLocalImg('20011', 'ticket')">
                <span text-center>
                  {{ `123` }}
                </span>
              </div>
              <div w-50px fc flex-col>
                <img :src="getLocalImg('gem')">
                <span text-center>
                  {{ `933123` }}
                </span>
              </div>
            </div>
          </el-card>
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
