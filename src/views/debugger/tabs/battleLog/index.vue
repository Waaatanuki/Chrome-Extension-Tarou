<script setup lang="ts">
import { storeToRefs } from 'pinia'
import BossDashboard from './components/BossDashboard.vue'
import BuffBar from './components/BuffBar.vue'
import MemberList from './components/MemberList.vue'
import Summon from './components/Summon.vue'
import BattleAnalysis from './components/BattleAnalysis.vue'
import ActionList from './components/ActionList.vue'
import { battleRecord } from '~/logic'

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
    <ElDescriptions border :column="1">
      <ElDescriptionsItem label="攻击结果">
        <div fc gap-2>
          <el-tag type="primary" effect="dark">
            {{ `hit: ${normalAttackInfo.hit}` }}
          </el-tag>
          <el-tag type="success" effect="dark">
            {{ `技伤: ${normalAttackInfo.ability.toLocaleString()}` }}
          </el-tag>
          <el-tag type="warning" effect="dark">
            {{ `奥伤: ${normalAttackInfo.special.toLocaleString()}` }}
          </el-tag>
          <el-tag type="danger" effect="dark">
            {{ `总伤害: ${normalAttackInfo.total.toLocaleString()}` }}
          </el-tag>
        </div>
      </ElDescriptionsItem>
    </ElDescriptions>

    <MemberList :member-info="memberInfo" :mvp-info="mvpInfo" />
  </div>
  <div v-else m-auto w-100>
    <el-alert type="info" effect="dark" show-icon center :closable="false" title="进入战斗时将会读取相关信息" />
  </div>
</template>
