<script setup lang="ts">
import type { Player } from 'extension'
import DamageRecord from './DamageRecord.vue'
import DamageTaken from './DamageTaken.vue'
import PlayerStatus from './PlayerStatus.vue'

defineProps<{ player: Player[], formation?: number[], turn?: number }>()

const tabName = defineModel<string>()
</script>

<template>
  <ElCard v-if="player" w-300px shrink-0 body-style="padding: 5px">
    <ElTabs v-model="tabName" stretch>
      <ElTabPane v-if="turn" label="角色状态" name="status">
        <PlayerStatus :player-info="player" :formation="formation" :turn="turn" />
      </ElTabPane>
      <ElTabPane label="伤害统计" name="damage">
        <DamageRecord :player-info="player" />
      </ElTabPane>
      <ElTabPane label="承伤统计" name="damageTaken">
        <DamageTaken :player-info="player" />
      </ElTabPane>
    </ElTabs>
  </ElCard>
</template>
