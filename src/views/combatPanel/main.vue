<script setup lang="ts">
import type { CombatPanelSetting } from 'extension'
import { defaultCombatPanelSetting } from '~/constants'
import { combatPanelSetting } from '~/logic'

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
  setTimeout(() => {
    combatPanelSetting.value = mergeConfig(defaultCombatPanelSetting, combatPanelSetting.value)
  })
})
</script>

<template>
  <main class="relative p-20px">
    {{ combatPanelSetting }}
    <component
      :is="componentMap[componentName]"
      v-for="componentName in Object.keys(componentMap)"
      :key="componentName"
      :position="{
        x: combatPanelSetting[componentName as keyof CombatPanelSetting]?.x || 0,
        y: combatPanelSetting[componentName as keyof CombatPanelSetting]?.y || 0,
      }"
    />
  </main>
</template>
