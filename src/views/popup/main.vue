<script setup lang="ts">
import ArtifactRule from './components/ArtifactRule.vue'
import RecoveryItem from './components/RecoveryItem.vue'
import SupportSummon from './components/SupportSummon.vue'

const currentView = computed(() => document.URL.split('?')[1])

const componentMap: Record<string, Component> = {
  SupportSummon,
  ArtifactRule,
  RecoveryItem,
}
</script>

<template>
  <main h-full w-full fc>
    <component :is="componentMap[currentView]" />
  </main>
</template>
