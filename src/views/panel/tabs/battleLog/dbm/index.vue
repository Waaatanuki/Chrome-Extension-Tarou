<script setup lang="ts">
import type { BattleRecord } from 'myStorage'

const props = defineProps<{ battleRecord: BattleRecord }>()

const modules = import.meta.glob('./*.vue')
const currentQuestDBM = computed(() => {
  const link: any = modules[`./${props.battleRecord.quest_id}.vue`]
  if (link)
    return markRaw(defineAsyncComponent(link))
})
</script>

<template>
  <component :is="currentQuestDBM" :battle-record="battleRecord" />
</template>
