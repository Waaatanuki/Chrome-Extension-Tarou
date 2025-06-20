<script setup lang="ts">
import DailyCost from './components/DailyCost.vue'
import Status from './components/Status.vue'
import StoneCount from './components/StoneCount.vue'
import TreasureMonitor from './components/TreasureMonitor.vue'
import Alchemist from './event/Alchemist.vue'
import Godslayer from './event/Godslayer.vue'
import Treasureraid from './event/Treasureraid.vue'
</script>

<template>
  <div flex flex-wrap gap-3>
    <StoneCount />
    <Status />
    <Treasureraid />
    <Alchemist />
    <Godslayer />
    <TreasureMonitor />
    <DailyCost />
  </div>
</template>
