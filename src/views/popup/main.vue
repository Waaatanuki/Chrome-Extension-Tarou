<script setup lang="ts">
const currentView = computed(() => document.URL.split('?')[1])

const componentMap: Record<string, Component> = {
  ArtifactBox: defineAsyncComponent(() => import('./components/ArtifactBox.vue')),
  ArtifactRule: defineAsyncComponent(() => import('./components/ArtifactRule.vue')),
  BuildCompare: defineAsyncComponent(() => import('./components/BuildCompare.vue')),
  Debug: defineAsyncComponent(() => import('./components/Debug.vue')),
  ExportRecord: defineAsyncComponent(() => import('./components/ExportRecord.vue')),
  GachaRecord: defineAsyncComponent(() => import('./components/GachaRecord.vue')),
  RecoveryItem: defineAsyncComponent(() => import('./components/RecoveryItem.vue')),
  RewardList: defineAsyncComponent(() => import('./components/RewardList.vue')),
  SampoSetup: defineAsyncComponent(() => import('./components/SampoSetup.vue')),
  SupportSummon: defineAsyncComponent(() => import('./components/SupportSummon.vue')),
}

onMounted(() => {
  if (currentView.value.startsWith('WindowPanel')) {
    const url = chrome.runtime.getURL('/src/views/sidePanel/main.html')
    const tabId = currentView.value.split('WindowPanel')[1]
    window.location.href = `${url}?${tabId}`
  }
})
</script>

<template>
  <main p-20px>
    <component :is="componentMap[currentView]" m-auto />
  </main>
</template>
