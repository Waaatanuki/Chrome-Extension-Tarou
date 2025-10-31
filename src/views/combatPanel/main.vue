<script setup lang="ts">
const componentMap: Record<string, Component> = (() => {
  const modules = import.meta.glob('./components/*.vue')
  const map: Record<string, Component> = {}

  for (const path in modules) {
    const componentName = path.split('/').pop()?.replace('.vue', '') || ''
    map[componentName] = defineAsyncComponent(modules[path] as any)
  }

  return map
})()
</script>

<template>
  <main p-20px>
    <component :is="componentMap[componentName]" v-for="componentName in Object.keys(componentMap)" :key="componentName" m-auto />
  </main>
</template>
