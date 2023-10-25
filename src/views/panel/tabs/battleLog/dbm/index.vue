<script setup lang="ts">
import type { BattleRecord } from 'myStorage'
import type { AttackResultJson } from 'requestData'

const props = defineProps<{ battleRecord: BattleRecord; resultJson: { type: string; result: AttackResultJson } }>()

const modules = import.meta.glob('./*.vue')
const currentQuestDBM = computed(() => {
  const link: any = modules[`./${props.battleRecord.quest_id}.vue`]
  if (link)
    return markRaw(defineAsyncComponent(link))
})
</script>

<template>
  <component :is="currentQuestDBM" :battle-record="battleRecord" :result-json="resultJson" />
</template>
