<script setup lang="ts">
import type { BattleRecord } from 'myStorage'
import PlayerStatus from './PlayerStatus.vue'
import DamageRecord from './DamageRecord.vue'
import DamageTaken from './DamageTaken.vue'

defineProps<{ battleRecord: BattleRecord, turn: number }>()

const tabName = ref('damage')
</script>

<template>
  <ElCard v-if="battleRecord" w-420px shrink-0>
    <ElTabs v-model="tabName" stretch>
      <ElTabPane label="角色状态" name="status">
        <PlayerStatus :battle-record="battleRecord" :turn="turn" />
      </ElTabPane>
      <ElTabPane label="伤害统计" name="damage">
        <DamageRecord :battle-record="battleRecord" />
      </ElTabPane>
      <ElTabPane label="承伤统计" name="damageTaken">
        <DamageTaken :battle-record="battleRecord" />
      </ElTabPane>
    </ElTabs>
  </ElCard>
</template>
