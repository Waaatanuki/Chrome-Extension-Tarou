<script setup lang="ts">
import ArtifactRule from './components/ArtifactRule.vue'
import BuildCompare from './components/BuildCompare.vue'
import Debug from './components/Debug.vue'
import GachaRecord from './components/GachaRecord.vue'
import RecoveryItem from './components/RecoveryItem.vue'
import RewardList from './components/RewardList.vue'
import SupportSummon from './components/SupportSummon.vue'

const currentView = computed(() => document.URL.split('?')[1])

const componentMap: Record<string, Component> = {
  SupportSummon,
  ArtifactRule,
  RecoveryItem,
  GachaRecord,
  RewardList,
  Debug,
  BuildCompare,
}
</script>

<template>
  <main h-full w-full fc>
    <component :is="componentMap[currentView]" />
  </main>
</template>
