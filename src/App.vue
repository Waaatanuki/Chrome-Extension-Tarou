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
  console.log(foo.value)
}
const gachaInfo = ref({
  id: '12',
})
const data = ref({})
</script>

<template>
  <div fc flex-wrap gap-3 p-10>
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
          <el-card header-class="my-card-header" body-style="padding: 10px">
            <template #header>
              <div v-if="gachaInfo.id" flex items-center justify-between text-12px>
                <div>
                  <el-tooltip content="编号: 123231">
                    <img w-100px src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/banner/gacha/banner_455j7uhn_1.png">
                  </el-tooltip>
                </div>
                <div flex flex-col items-end justify-center gap-5px>
                  <div>{{ `2025/7/15 19:00` }}</div>
                  <div>{{ `2025/7/19 18:59` }}</div>
                </div>
              </div>
              <div v-else text-center>
                未获取卡池信息
              </div>
            </template>
            <div text-12px>
              <div flex items-center justify-between>
                <div>{{ `卡池概率1(${gachaInfo.ratio1?.id || '未获取'})` }}</div>
                <div>{{ gachaInfo.ratio1 ? useDateFormat(gachaInfo.ratio1.updateTime, 'MM-DD HH:mm') : '' }}</div>
              </div>
              <div flex items-center justify-between>
                <div>{{ `卡池概率2(${gachaInfo.ratio2?.id || '未获取'})` }}</div>
                <div>{{ gachaInfo.ratio2 ? useDateFormat(gachaInfo.ratio2.updateTime, 'MM-DD HH:mm') : '' }}</div>
              </div>
            </div>
          </el-card>

          <el-descriptions direction="vertical" :column="1" border size="small">
            <el-descriptions-item :label="`当前卡池(${gachaInfo.id || '未获取'})`">
              <div>
                <div v-if="gachaInfo.id " flex items-center justify-between>
                  <div>持续时间</div>
                  <div>{{ `${gachaInfo.serviceStart}—${gachaInfo.serviceEnd}` }}</div>
                </div>
                <div flex items-center justify-between>
                  <div>{{ `卡池概率1(${gachaInfo.ratio1?.id || '未获取'})` }}</div>
                  <div>{{ gachaInfo.ratio1 ? useDateFormat(gachaInfo.ratio1.updateTime, 'MM-DD HH:mm') : '' }}</div>
                </div>
                <div flex items-center justify-between>
                  <div>{{ `卡池概率2(${gachaInfo.ratio2?.id || '未获取'})` }}</div>
                  <div>{{ gachaInfo.ratio2 ? useDateFormat(gachaInfo.ratio2.updateTime, 'MM-DD HH:mm') : '' }}</div>
                </div>
              </div>
            </el-descriptions-item>
          </el-descriptions>
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
