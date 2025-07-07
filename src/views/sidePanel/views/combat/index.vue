<script setup lang="ts">
import { battleInfo, battleRecord } from '~/logic'
import BattleAnalysis from './components/BattleAnalysis.vue'
import BossBuff from './components/BossBuff.vue'
import BossCard from './components/BossCard.vue'
import MemberList from './components/MemberList.vue'
import NormalAttackInfo from './components/NormalAttackInfo.vue'

const currentRecord = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
const normalAttackInfo = computed(() => currentRecord.value?.actionQueue.findLast(queue => queue.normalAttackInfo)?.normalAttackInfo)
</script>

<template>
  <div v-if="currentRecord" fc flex-col gap-10px>
    <BossCard />
    <BossBuff />
    <BattleAnalysis :player="currentRecord.player" :turn="battleInfo.bossInfo?.turn" />
    <div v-if="normalAttackInfo" w-300px rounded-md ring-1 ring-neutral-7>
      <NormalAttackInfo :normal-attack-info="normalAttackInfo" />
    </div>
    <MemberList :member-info="battleInfo.memberInfo" :mvp-info="battleInfo.mvpInfo" />
  </div>
  <el-result v-else icon="info" sub-title="进入战斗时将会读取相关信息" />
</template>
