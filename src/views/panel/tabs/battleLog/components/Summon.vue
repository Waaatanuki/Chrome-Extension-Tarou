<script setup lang="ts">
import type { SummonInfo } from '../types'

defineProps<{ summonInfo: SummonInfo }>()

function getImg(type: string, id: string, size = 'm') {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/${size}/${id}.jpg`
}
</script>

<template>
  <div w-160px border-1 border-slate-500 p-10px>
    <div fc flex-col gap-5px>
      <div v-for="idx in 5" :key="idx" relative h-65px w-115px fc bg-slate-300>
        <img v-if="summonInfo.summon[idx - 1]?.image_id" w-full :src="getImg('summon', summonInfo.summon[idx - 1]?.image_id)">
        <div v-if="summonInfo.summon[idx - 1]?.image_id && Number(summonInfo.summon[idx - 1]?.recast) !== 0" absolute h-full w-full fc>
          <div absolute h-full w-full bg-slate-900 opacity-50 />
          <div z-999 h-50px w-50px fc border-5 border-red-700 rounded-full text-2xl>
            {{ Number(summonInfo.summon[idx - 1]?.recast) > 100 ? '∞' : summonInfo.summon[idx - 1]?.recast }}
          </div>
        </div>
      </div>
      <div v-if="summonInfo.supporter?.id" relative h-65px w-115px fc bg-slate-300>
        <img w-full :src="getImg('summon', summonInfo.supporter.image_id)">
        <div v-if=" Number(summonInfo.supporter.recast) !== 0" absolute h-full w-full fc>
          <div absolute h-full w-full bg-slate-900 opacity-50 />
          <div z-999 h-50px w-50px fc border-5 border-red-700 rounded-full text-2xl>
            {{ Number(summonInfo.supporter.recast) > 100 ? '∞' : summonInfo.supporter.recast }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
