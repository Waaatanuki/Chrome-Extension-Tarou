<script setup lang="ts">
import { widgetList } from '~/logic'
import DailyCost from './components/DailyCost.vue'
import Status from './components/Status.vue'
import StoneCount from './components/StoneCount.vue'
import TreasureMonitor from './components/TreasureMonitor.vue'
import Alchemist from './event/Alchemist.vue'
import Godslayer from './event/Godslayer.vue'
import Teamraid from './event/Teamraid.vue'
import Treasureraid from './event/Treasureraid.vue'

const componentMap: Record<string, Component> = {
  Status,
  StoneCount,
  TreasureMonitor,
  DailyCost,
  'Event/Alchemist': Alchemist,
  'Event/Godslayer': Godslayer,
  'Event/Treasureraid': Treasureraid,
  'Event/Teamraid': Teamraid,
}

const showWidgets = computed(() =>
  widgetList.value.reduce<string[]>((pre, cur) => {
    if (cur.visible) {
      for (const key of Object.keys(componentMap)) {
        const k = key.split('/')[0]
        if (k === cur.key)
          pre.push(key)
      }
    }
    return pre
  }, []),
)
</script>

<template>
  <div flex flex-wrap gap-3>
    <component
      :is="componentMap[w]"
      v-for="w in showWidgets"
      :key="w"
    />

    <TheButton w-full @click="openPopupWindow('RecoveryItem')">
      回复道具信息
    </TheButton>
  </div>
</template>
