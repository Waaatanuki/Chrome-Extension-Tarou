<script setup lang="ts">
import type { CalculateSetting, DeckSummon } from 'source'

defineProps<{
  summons: DeckSummon
  subSummons: DeckSummon
  calculateSetting?: CalculateSetting
  quickSummoniId?: string
}>()
</script>

<template>
  <div h-210px fc>
    <div relative h-full w-100px>
      <img w-full :src="getAssetImg('summon', summons[1].param.image_id, 'ls')">
      <img v-if="quickSummoniId === summons[1].param.id" :src="getLocalImg('ico-summon-quick')" absolute left-1 top-1 h-30px w-30px>
    </div>
    <div w-250px fc flex-wrap gap-5px>
      <div v-for="idx in 4" :key="idx" class="party_summon_wrapper">
        <img v-if="summons[idx + 1]?.param?.image_id" w-full :src="getAssetImg('summon', summons[idx + 1]?.param?.image_id)">
        <img v-if="quickSummoniId === summons[idx + 1]?.param?.id" :src="getLocalImg('ico-summon-quick')" absolute left-1 top-1 h-20px w-20px>
      </div>
      <div v-for="idx in 2" :key="idx" class="party_summon_wrapper">
        <img v-if="subSummons[idx ]?.param?.image_id" w-full :src="getAssetImg('summon', subSummons[idx ]?.param?.image_id)">
      </div>
    </div>
    <div v-if="calculateSetting?.setting.image_id" h-full w-100px>
      <img h-full w-full :src="getAssetImg('summon', calculateSetting.setting.image_id, 'ls')">
    </div>
  </div>
</template>
