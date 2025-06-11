<script setup lang="ts">
import { battleInfo, battleRecord } from '~/logic'
import BattleAnalysis from './components/BattleAnalysis.vue'
import BossBuff from './components/BossBuff.vue'
import BossCard from './components/BossCard.vue'
import MemberList from './components/MemberList.vue'

const currentRecord = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
</script>

<template>
  <div v-if="currentRecord" fc flex-col gap-10px>
    <BossCard />
    <BossBuff />
    <BattleAnalysis :battle-record="currentRecord" :turn="battleInfo.bossInfo?.turn" />
    <MemberList :member-info="battleInfo.memberInfo" :mvp-info="battleInfo.mvpInfo" />
  </div>
  <el-result v-else icon="info" sub-title="进入战斗时将会读取相关信息" />
</template>
