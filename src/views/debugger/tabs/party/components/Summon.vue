<script setup lang="ts">
import type { CalculateSetting, DeckSummon } from 'requestData'

defineProps<{
  summons: DeckSummon
  subSummons: DeckSummon
  calculateSetting?: CalculateSetting
  quickSummoniId?: string
}>()

function getImg(type: string, id: string, size = 'm') {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/${size}/${id}.jpg`
}
</script>

<template>
  <div h-210px fc>
    <div relative h-full w-100px bg-slate-300>
      <img w-full :src="getImg('summon', summons[1].param.image_id, 'ls')">
      <div v-if="quickSummoniId === summons[1].param.id" class="ico-summon-quick" absolute left-1 top-1 />
    </div>
    <div w-250px fc flex-wrap gap-5px>
      <div v-for="idx in 4" :key="idx" relative h-65px w-115px fc bg-slate-300>
        <img v-if="summons[idx + 1]?.param?.image_id" w-full :src="getImg('summon', summons[idx + 1]?.param?.image_id)">
        <div v-if="quickSummoniId === summons[idx + 1]?.param?.id" class="ico-summon-quick" absolute left-1 top-1 />
      </div>
      <div v-for="idx in 2" :key="idx" h-65px w-115px fc bg-slate-300>
        <img v-if="subSummons[idx ]?.param?.image_id" w-full :src="getImg('summon', subSummons[idx ]?.param?.image_id)">
      </div>
    </div>
    <div v-if="calculateSetting?.setting.image_id" h-full w-100px bg-slate-300>
      <img h-full w-full :src="getImg('summon', calculateSetting.setting.image_id, 'ls')">
    </div>
  </div>
</template>

<style scoped>
.ico-summon-quick{
  background: url(https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/summon-sdb20d1475e.png) no-repeat 0 -85px;
  -webkit-background-size: 28px 124px;
  background-size: 28px 124px;
  width: 20px;
  height: 20px;
}
</style>
