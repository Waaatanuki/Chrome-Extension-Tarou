<script setup lang="ts">
import SupportSummon from './components/SupportSummon.vue'

const currentView = computed(() => document.URL.split('?')[1])

const componentMap: Record<string, Component> = {
  SupportSummon,
}
</script>

<template>
  <main h-full w-full fc>
    <component :is="componentMap[currentView]" />
  </main>
</template>
