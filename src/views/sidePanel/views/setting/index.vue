<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { defaultWidget } from '~/constants'
import { buildNpcFilter, notificationItem, notificationSetting, widgetList } from '~/logic'

function handleDelete(item: string) {
  const index = notificationItem.value.findIndex(i => i === item)
  notificationItem.value.splice(index, 1)
}

function updateNpcFilter(item: number) {
  const index = buildNpcFilter.value.findIndex(b => b === item)
  if (index !== -1)
    buildNpcFilter.value.splice(index, 1)
}

onMounted(() => {
  for (const widget of defaultWidget) {
    const hit = widgetList.value.find(w => w.key === widget.key)
    if (!hit)
      widgetList.value.push({ ...widget })
  }
  widgetList.value = widgetList.value.filter(widget =>
    defaultWidget.some(defaultWidget => defaultWidget.key === widget.key),
  )
})
</script>

<template>
  <el-alert :closable="false">
    <template #title>
      <div w-268px>
        <el-tooltip content="Click or drag to configure" placement="top-start">
          <span>
            Home Page settings
          </span>
        </el-tooltip>
      </div>
    </template>
  </el-alert>

  <VueDraggableNext v-model="widgetList" my-10px flex flex-col gap-10px px-10px>
    <transition-group name="draglist">
      <div
        v-for="widget in widgetList" :key="widget.key"
        :class=" { 'bg-neutral-6!': !widget.visible }"
        cursor-grab select-none rounded-lg bg-teal-6 text-center text-14px leading-loose
        @click="widget.visible = !widget.visible"
      >
        {{ widget.name }}
      </div>
    </transition-group>
  </VueDraggableNext>

  <el-alert :closable="false">
    <template #title>
      <div w-268px flex items-center justify-between gap-2>
        <div>
          Popup notifications
        </div>
        <VolumeControl />
      </div>
    </template>
  </el-alert>
  <div flex flex-col pl-5>
    <el-checkbox v-model="notificationSetting.battleWin" label="Battle end reminder" />
    <el-checkbox v-model="notificationSetting.battleLose" label="Party wipe reminder" />
    <el-checkbox v-model="notificationSetting.replicardEvent" label="Replicard Chest Reminder" />
    <el-checkbox v-model="notificationSetting.appearanceQuest" label="Hell Reminder" />
    <el-checkbox v-model="notificationSetting.itemGoal" label="Bottom Item Goal Reached" />
    <el-checkbox v-model="notificationSetting.isPointOverLimit" label="Advent Points Over Cap" />
    <el-checkbox v-model="notificationSetting.sampoFinish" label="Expedition Complete Reminder" />
    <el-checkbox v-model="notificationSetting.checkUpdate" label="Check for Updates" />
    <el-checkbox v-model="notificationSetting.pointReach" label="Threshold Reminder" />
  </div>
  <el-alert :closable="false">
    <template #title>
      <div w-268px flex items-center justify-between gap-2>
        <el-tooltip content="Right-click item image to add drop tracking" placement="top-start">
          <div>
            Drop Reminder
          </div>
        </el-tooltip>
        <el-switch v-model="notificationSetting.targetItemDrop" />
      </div>
    </template>
  </el-alert>
  <div px-5>
    <el-card my-10px body-style="padding: 10px">
      <div flex flex-wrap gap-12px>
        <div v-for="item in notificationItem" :key="item" relative fc flex-col select-none class="group">
          <img h-50px w-50px :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets${item}`">
          <div absolute hidden h-full w-full fc bg-black opacity-70 group-hover:flex>
            <div i-carbon:close-filled absolute icon-btn @click="handleDelete(item)" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
  <el-alert :closable="false">
    <template #title>
      <div w-268px>
          <el-tooltip content="Click a character in Build Search to configure" placement="top-start">
          <span>
            Unowned Characters
          </span>
        </el-tooltip>
      </div>
    </template>
  </el-alert>
  <div v-if="buildNpcFilter.length" px-5>
    <el-card my-10px body-style="padding: 10px">
      <div flex flex-wrap gap-12px>
        <div v-for="item in buildNpcFilter" :key="item" relative fc flex-col select-none class="group">
          <img :src="getAssetImg('npc', `${item}_01`, 's')" h-50px w-50px>
          <div absolute hidden h-full w-full fc bg-black opacity-70 group-hover:flex>
            <div i-carbon:close-filled absolute icon-btn @click="updateNpcFilter(item)" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
