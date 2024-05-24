<script setup lang="ts">
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'

const notificationSetting = ref({
  battleWin: false,
  battleLose: false,
  targetItemDrop: false,
  replicardEvent: false,
})

const defaultNotificationItem = [
  '/item/evolution/s/20004.jpg',
  '/item/article/s/215.jpg',
]

function handleDelete(item: string) {
  console.log(item)
}
</script>

<template>
  <div flex flex-wrap gap-3>
    <Contact absolute right-15px top-15px />

    <div m-auto mt-100>
      <div flex flex-col pl-5>
        <el-checkbox v-model="notificationSetting.battleWin" label="战斗结束提醒" />
        <el-checkbox v-model="notificationSetting.battleLose" label="队伍全灭提醒" />

        <el-popover placement="right" :width="300">
          <template #reference>
            <el-checkbox v-model="notificationSetting.targetItemDrop" label="掉落提醒">
              <div fc gap-1>
                掉落提醒    <div icon i-carbon:information />
              </div>
            </el-checkbox>
          </template>
          <div fc flex-wrap gap-2>
            <div v-for="item in defaultNotificationItem" :key="item" relative fc flex-col select-none class="group">
              <img h-12 w-12 :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets${item}`">
              <div absolute hidden h-full w-full fc bg-black opacity-100 group-hover:flex>
                <div i-carbon:close-filled absolute icon-btn @click="handleDelete(item)" />
              </div>
            </div>
          </div>
        </el-popover>

        <el-checkbox v-model="notificationSetting.replicardEvent" label="沙盒宝箱提醒" />
      </div>

      <div fc flex-wrap gap-2>
        <div v-for="item in defaultNotificationItem" :key="item" relative fc flex-col select-none class="group">
          <img h-12 w-12 :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets${item}`">
          <div absolute hidden h-full w-full fc bg-black opacity-70 group-hover:flex>
            <div i-carbon:close-filled absolute icon-btn />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
