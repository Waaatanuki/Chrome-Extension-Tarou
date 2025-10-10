<script setup lang="ts">
import ArtifactBox from './components/ArtifactBox.vue'
import ArtifactRule from './components/ArtifactRule.vue'
import BuildCompare from './components/BuildCompare.vue'
import Debug from './components/Debug.vue'
import ExportRecord from './components/ExportRecord.vue'
import GachaRecord from './components/GachaRecord.vue'
import RecoveryItem from './components/RecoveryItem.vue'
import RewardList from './components/RewardList.vue'
import SampoSetup from './components/SampoSetup.vue'
import SupportSummon from './components/SupportSummon.vue'

const currentView = computed(() => document.URL.split('?')[1])

const componentMap: Record<string, Component> = {
  SupportSummon,
  ArtifactRule,
  ArtifactBox,
  RecoveryItem,
  GachaRecord,
  RewardList,
  Debug,
  BuildCompare,
  SampoSetup,
  ExportRecord,
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
