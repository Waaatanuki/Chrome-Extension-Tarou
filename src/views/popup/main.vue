<script setup lang="ts">
import ArtifactRule from './components/ArtifactRule.vue'
import Debug from './components/Debug.vue'
import GachaInfo from './components/GachaInfo.vue'
import RecoveryItem from './components/RecoveryItem.vue'
import RewardList from './components/RewardList.vue'
import SupportSummon from './components/SupportSummon.vue'

const currentView = computed(() => document.URL.split('?')[1])

const componentMap: Record<string, Component> = {
  SupportSummon,
  ArtifactRule,
  RecoveryItem,
  GachaInfo,
  RewardList,
  Debug,
}
</script>

<template>
  <main h-full w-full fc>
    <component :is="componentMap[currentView]" />
  </main>
</template>
