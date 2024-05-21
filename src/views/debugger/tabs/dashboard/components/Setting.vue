<script setup lang="ts">
import { notificationSetting } from '~/logic'

const visible = defineModel<boolean>({ required: true })

function checkPermission() {
  chrome.notifications.getPermissionLevel((level) => {
    if (level === 'granted')
      ElMessage.success('当前弹窗权限正常')
    else
      ElMessage.error('当前弹窗权限被禁止')
  })
}
</script>

<template>
  <el-dialog v-model="visible" width="300">
    <el-alert title="弹窗通知" :closable="false" />
    <div flex flex-col pl-5>
      <el-checkbox v-model="notificationSetting.battleWin" label="战斗结束提醒" />
      <el-checkbox v-model="notificationSetting.battleLose" label="队伍全灭提醒" />
      <el-checkbox v-model="notificationSetting.targetItemDrop" label="掉落提醒" />
      <el-checkbox v-model="notificationSetting.replicardEvent" label="沙盒宝箱提醒" />
      <el-checkbox v-model="notificationSetting.appearanceQuest" label="Hell提醒" />
      <el-checkbox v-model="notificationSetting.itemGoal" label="底部道具数量达到目标" />
    </div>
    <template #footer>
      <TheButton @click="checkPermission">
        检查弹窗权限
      </TheButton>
    </template>
  </el-dialog>
</template>
