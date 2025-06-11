<script setup lang="ts">
import { deckList } from '~/logic'
import Effect from './components/Effect.vue'
import Npc from './components/Npc.vue'
import Summon from './components/Summon.vue'
import Weapon from './components/Weapon.vue'

const deck = computed(() => deckList.value[0])
</script>

<template>
  <div v-if="deck" flex flex-col gap-10px>
    <Npc :leader="deck.leader" :npcs="deck.npcs" />
    <Weapon :weapons="deck.weapons" />
    <Summon :summons="deck.summons" />
    <Effect :effects="deck.effects" />
  </div>
  <el-result v-else icon="info" sub-title="进入编成界面读取队伍信息" />
</template>
