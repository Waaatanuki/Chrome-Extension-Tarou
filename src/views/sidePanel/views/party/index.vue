<script setup lang="ts">
import { deckList } from '~/logic'
import Effect from './components/Effect.vue'
import Npc from './components/Npc.vue'
import Summon from './components/Summon.vue'
import Weapon from './components/Weapon.vue'

const deck = computed(() => deckList.value[0])
</script>

<template>
  <div h-10 flex items-center rounded bg-neutral-8 px-4 text-base>
    <TheButton @click="openPopupWindow('BuildCompare')">
      配置对比
    </TheButton>
  </div>

  <div v-if="deck" my-10px flex flex-col gap-10px>
    <Npc :leader="deck.leader" :npcs="deck.npcs" />
    <Weapon :weapons="deck.weapons" />
    <Summon :summons="deck.summons" />
    <Effect :effects="deck.effects" />
  </div>
  <el-result v-else icon="info" sub-title="进入编成界面读取队伍信息" />
</template>
