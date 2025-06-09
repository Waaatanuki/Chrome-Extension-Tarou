<script setup lang="ts">
import type { BattleRecord } from 'myStorage'
import DamageRecord from './DamageRecord.vue'
import PlayerStatus from './PlayerStatus.vue'

defineProps<{ battleRecord: BattleRecord, turn?: number }>()

const tabName = ref('damage')
</script>

<template>
  <ElCard v-if="battleRecord" w-300px shrink-0 body-style="padding: 5px">
    <ElTabs v-model="tabName" stretch>
      <ElTabPane v-if="turn" label="角色状态" name="status">
        <PlayerStatus :battle-record="battleRecord" :turn="turn" />
      </ElTabPane>
      <ElTabPane label="伤害统计" name="damage">
        <DamageRecord :battle-record="battleRecord" />
      </ElTabPane>
    </ElTabs>
  </ElCard>
</template>
