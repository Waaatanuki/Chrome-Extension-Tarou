<script setup lang="ts">
import { battleInfo, battleRecord } from '~/logic'
import BossCard from './components/BossCard.vue'

// const currentRecord = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
</script>

<template>
  <div v-if="battleInfo.bossInfo" fc flex-col gap-10px>
    <BossCard />
  </div>
  <div v-else m-auto w-full>
    <el-alert type="info" effect="dark" show-icon center :closable="false" title="进入战斗时将会读取相关信息" />
  </div>
</template>
