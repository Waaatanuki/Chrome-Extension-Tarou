<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { battleRecord } from '~/logic'
import ActionList from './components/ActionList.vue'
import BattleAnalysis from './components/BattleAnalysis.vue'
import BossDashboard from './components/BossDashboard.vue'
import BuffBar from './components/BuffBar.vue'
import MemberList from './components/MemberList.vue'
import NormalAttackInfo from './components/NormalAttackInfo.vue'
import Summon from './components/Summon.vue'

const battleLogStore = useBattleLogStore()
const { inLobby, bossInfo, lobbyMemberList, normalAttackInfo, memberInfo, mvpInfo, raidId } = storeToRefs(battleLogStore)
</script>

<template>
  <div v-if="inLobby" mb-10px>
    <MemberList :member-info="lobbyMemberList" />
  </div>
  <div v-if="bossInfo" w-full fc flex-col gap-10px>
    <div w-full fc gap-2 p-2>
      <BossDashboard />
      <div w-full flex flex-col items-center justify-start>
        <BuffBar />
        <Summon />
      </div>
    </div>
    <div w-full flex items-start justify-start gap-2 p-2>
      <BattleAnalysis :battle-record="battleRecord.find(record => record.raid_id === raidId)!" :turn="bossInfo.turn" />
      <ActionList :battle-record="battleRecord.find(record => record.raid_id === raidId)!" />
    </div>
    <NormalAttackInfo :normal-attack-info="normalAttackInfo" />
    <MemberList :member-info="memberInfo" :mvp-info="mvpInfo" />
  </div>
  <div v-else m-auto w-100>
    <el-alert type="info" effect="dark" show-icon center :closable="false" title="进入战斗时将会读取相关信息" />
  </div>
</template>
