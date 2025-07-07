<script setup lang="ts">
import type { Mission } from 'myStorage'

const { missionList = [] } = defineProps<{ missionList?: Mission[] }>()
</script>

<template>
  <div v-for="mission, index in missionList" :key="index" flex items-start justify-between>
    <el-tooltip
      effect="dark"
      :content="mission.reward"
      :disabled="!mission.reward"
      raw-content
      placement="top-start"
    >
      <div fc gap-1>
        <Icon
          :icon="mission.isAllComplete ? 'material-symbols:check-box' : 'material-symbols:check-box-outline-blank'"
          :color="mission.isDailyMission ? '#60a5fa' : '#f0cb4f'"
          size="5"
        />
        <div v-html="mission.desc" />
      </div>
    </el-tooltip>

    <NumberLimitDisplay :value="{ number: mission.number, limit: mission.limit }" />
  </div>
</template>
