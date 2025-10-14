<script setup lang="ts">
const currentView = computed(() => document.URL.split('?')[1])

const componentMap: Record<string, Component> = (() => {
  const modules = import.meta.glob('./components/*.vue')
  const map: Record<string, Component> = {}

  for (const path in modules) {
    const componentName = path.split('/').pop()?.replace('.vue', '') || ''
    map[componentName] = defineAsyncComponent(modules[path] as any)
  }

  return map
})()

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
