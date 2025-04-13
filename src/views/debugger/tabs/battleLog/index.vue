<script setup lang="ts">
import { battleInfo, battleRecord } from '~/logic'
import ActionList from './components/ActionList.vue'
import BattleAnalysis from './components/BattleAnalysis.vue'
import BossDashboard from './components/BossDashboard.vue'
import BuffBar from './components/BuffBar.vue'
import MemberList from './components/MemberList.vue'
import Summon from './components/Summon.vue'

const currentRecord = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
</script>

<template>
  <div v-if="battleInfo.inLobby" mb-10px>
    <MemberList :member-info="battleInfo.lobbyMemberList" />
  </div>
  <div v-if="battleInfo.bossInfo" w-full fc flex-col gap-10px>
    <div w-full flex items-center justify-start gap-2 p-2>
      <BossDashboard />
      <div w-full flex flex-col items-center justify-start>
        <BuffBar />
        <Summon />
      </div>
    </div>
    <div v-if="currentRecord" w-full flex items-start justify-start gap-2 p-2>
      <BattleAnalysis :battle-record="currentRecord" :turn="battleInfo.bossInfo.turn" />
      <ActionList :battle-record="currentRecord" />
    </div>
    <MemberList :member-info="battleInfo.memberInfo" :mvp-info="battleInfo.mvpInfo" />
  </div>
  <div v-else m-auto w-100>
    <el-alert type="info" effect="dark" show-icon center :closable="false" title="进入战斗时将会读取相关信息" />
  </div>
</template>
