<script setup lang="ts">
import type { BuildSummon } from 'party'

const { summons } = defineProps<{ summons: BuildSummon[] }>()

const mainSummon = computed(() => summons.filter(summon => summon.isMain))
const subSummon = computed(() => summons.filter(summon => !summon.isMain))
</script>

<template>
  <div w-300px fc gap-4px>
    <div relative h-140px shrink-0>
      <img h-full :src="getAssetImg('summon', mainSummon[0]!.imageId, 'ls')">
      <img v-if="mainSummon[0]!.isQuick" :src="getLocalImg('ico-summon-quick')" absolute left-1 top-1 h-25px w-25px>
    </div>
    <div w-160px fc flex-wrap gap-4px>
      <div v-for="s, idx in subSummon" :key="idx" class="side_summon_wrapper">
        <img v-if="s.imageId" w-full :src="getAssetImg('summon', s.imageId)">
        <img v-if="s.isQuick" :src="getLocalImg('ico-summon-quick')" absolute left-1 top-1 h-25px w-25px>
      </div>
    </div>
    <div v-if="mainSummon[1]" h-140px shrink-0>
      <img h-full :src="getAssetImg('summon', mainSummon[1].imageId, 'ls')">
    </div>
  </div>
</template>
