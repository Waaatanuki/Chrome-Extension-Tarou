<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PlayerStatus from './PlayerStatus.vue'
import DamageRecord from './DamageRecord.vue'
import DamageTaken from './DamageTaken.vue'

const tabName = ref('damage')
const battleLogStore = useBattleLogStore()
const { currentRaid } = storeToRefs(battleLogStore)
</script>

<template>
  <ElCard v-if="currentRaid" w-420px shrink-0>
    <ElTabs v-model="tabName" stretch>
      <ElTabPane label="角色状态" name="status">
        <PlayerStatus />
      </ElTabPane>
      <ElTabPane label="伤害统计" name="damage">
        <DamageRecord />
      </ElTabPane>
      <ElTabPane label="承伤统计" name="damageTaken">
        <DamageTaken />
      </ElTabPane>
    </ElTabs>
  </ElCard>
</template>
