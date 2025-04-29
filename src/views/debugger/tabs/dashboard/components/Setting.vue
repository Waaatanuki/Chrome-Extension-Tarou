<script setup lang="ts">
import { notificationItem, notificationSetting } from '~/logic'

const visible = defineModel<boolean>({ required: true })

function checkPermission() {
  chrome.notifications.getPermissionLevel((level) => {
    if (level === 'granted')
      ElMessage.success('当前弹窗权限正常')
    else
      ElMessage.error('当前弹窗权限被禁止')
  })
}

function handleDelete(item: string) {
  const index = notificationItem.value.findIndex(i => i === item)
  notificationItem.value.splice(index, 1)
}
</script>

<template>
  <el-dialog v-model="visible" width="300">
    <el-alert :closable="false">
      <template #title>
        <div fc gap-2>
          弹窗通知
          <VolumeControl />
        </div>
      </template>
    </el-alert>
    <div flex flex-col pl-5>
      <el-checkbox v-model="notificationSetting.battleWin" label="战斗结束提醒" />
      <el-checkbox v-model="notificationSetting.battleLose" label="队伍全灭提醒" />
      <el-popover placement="right" :width="300">
        <template #reference>
          <el-checkbox v-model="notificationSetting.targetItemDrop" label="掉落提醒">
            <div fc gap-1>
              掉落提醒    <div i-carbon:information icon />
            </div>
          </el-checkbox>
        </template>
        <div fc flex-wrap gap-2>
          <div v-for="item in notificationItem" :key="item" relative fc flex-col select-none class="group">
            <img h-12 w-12 :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets${item}`">
            <div absolute hidden h-full w-full fc bg-black opacity-70 group-hover:flex>
              <div i-carbon:close-filled absolute icon-btn @click="handleDelete(item)" />
            </div>
          </div>
        </div>
      </el-popover>
      <el-checkbox v-model="notificationSetting.replicardEvent" label="沙盒宝箱提醒" />
      <el-checkbox v-model="notificationSetting.appearanceQuest" label="Hell提醒" />
      <el-checkbox v-model="notificationSetting.itemGoal" label="底部道具数量达到目标" />
      <el-checkbox v-model="notificationSetting.isPointOverLimit" label="四象点数超过上限" />
    </div>
    <template #footer>
      <TheButton @click="checkPermission">
        检查弹窗权限
      </TheButton>
    </template>
  </el-dialog>
</template>
