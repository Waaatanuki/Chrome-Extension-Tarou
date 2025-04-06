<script setup lang="ts">
import type { BuildSummon } from 'party'

const { summons } = defineProps<{ summons: BuildSummon[] }>()

const mainSummon = computed(() => summons.filter(summon => summon.isMain))
const subSummon = computed(() => summons.filter(summon => !summon.isMain))
</script>

<template>
  <div h-210px fc>
    <div relative h-full w-100px>
      <img w-full :src="getAssetImg('summon', mainSummon[0]!.imageId, 'ls')">
      <img v-if="mainSummon[0]!.isQuick" :src="getLocalImg('ico-summon-quick')" absolute left-1 top-1 h-30px w-30px>
    </div>
    <div w-250px fc flex-wrap gap-5px>
      <div v-for="s, idx in subSummon" :key="idx" class="party_summon_wrapper">
        <img v-if="s.imageId" w-full :src="getAssetImg('summon', s.imageId)">
        <img v-if="s.isQuick" :src="getLocalImg('ico-summon-quick')" absolute left-1 top-1 h-20px w-20px>
      </div>
    </div>
    <div v-if="mainSummon[1]" h-full w-100px>
      <img h-full w-full :src="getAssetImg('summon', mainSummon[1].imageId, 'ls')">
    </div>
  </div>
</template>
