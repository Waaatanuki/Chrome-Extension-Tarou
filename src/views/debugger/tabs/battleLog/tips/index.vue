<script setup lang="ts">
const props = defineProps<{ questId: string }>()

const modules = import.meta.glob('./*.vue')
const currentQuestTips = computed(() => {
  const link: any = modules[`./${props.questId}.vue`]
  if (link)
    return markRaw(defineAsyncComponent(link))
})
</script>

<template>
  <ElTooltip v-if="currentQuestTips" effect="dark" placement="bottom-start">
    <div i-carbon:information absolute bottom-1 left-1 text-lg />
    <template #content>
      <component :is="currentQuestTips" />
    </template>
  </ElTooltip>
</template>
