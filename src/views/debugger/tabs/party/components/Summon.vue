<script setup lang="ts">
import type { BuildSummon } from 'party'

defineProps<{
  mainSummon: (BuildSummon | null)[]
  subSummon: (BuildSummon | null)[]
}>()
</script>

<template>
  <div h-210px fc>
    <div relative h-full w-100px>
      <img w-full :src="getAssetImg('summon', mainSummon[0]!.imageId, 'ls')">
      <img v-if="mainSummon[0]!.isQuick" :src="getLocalImg('ico-summon-quick')" absolute left-1 top-1 h-30px w-30px>
    </div>
    <div w-250px fc flex-wrap gap-5px>
      <div v-for="summon, idx in subSummon" :key="idx" class="party_summon_wrapper">
        <img v-if="summon?.imageId" w-full :src="getAssetImg('summon', summon.imageId)">
        <img v-if="summon?.isQuick" :src="getLocalImg('ico-summon-quick')" absolute left-1 top-1 h-20px w-20px>
      </div>
    </div>
    <div v-if="mainSummon[1]" h-full w-100px>
      <img h-full w-full :src="getAssetImg('summon', mainSummon[1].imageId, 'ls')">
    </div>
  </div>
</template>
