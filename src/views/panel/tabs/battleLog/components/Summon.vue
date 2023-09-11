<script setup lang="ts">
import type { SummonInfo } from '../types'

defineProps<{ summonInfo: SummonInfo }>()

function getImg(type: string, id: string, size = 'm') {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/${size}/${id}.jpg`
}
</script>

<template>
  <el-card v-if="summonInfo">
    <div h-210px fc>
      <div relative h-210px w-100px bg-slate-300>
        <img w-full :src="getImg('summon', summonInfo.summon[0].image_id, 'ls')">
        <div v-if="Number(summonInfo.summon[0].recast) !== 0" absolute h-full w-full fc top-0 left-0>
          <div absolute h-full w-full fc bg-slate-900 opacity-50 />
          <div z-999 h-50px w-50px fc border-5 border-red-700 rounded-full text-2xl>
            {{ Number(summonInfo.summon[0].recast) > 100 ? '∞' : summonInfo.summon[0].recast }}
          </div>
        </div>
      </div>
      <div w-250px fc flex-wrap gap-5px>
        <div v-for="idx in 6" :key="idx" relative h-65px w-115px fc bg-slate-300>
          <img v-if="summonInfo.summon[idx]?.image_id" w-full :src="getImg('summon', summonInfo.summon[idx]?.image_id)">
          <div v-if="summonInfo.summon[idx]?.image_id && Number(summonInfo.summon[idx]?.recast) !== 0" absolute h-full w-full fc top-0 left-0>
            <div absolute h-full w-full fc bg-slate-900 opacity-50 />
            <div z-999 h-50px w-50px fc border-5 border-red-700 rounded-full text-2xl>
              {{ Number(summonInfo.summon[idx]?.recast) > 100 ? '∞' : summonInfo.summon[idx]?.recast }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="summonInfo.supporter.id" h-210px w-100px bg-slate-300 relative>
        <img h-full w-full :src="getImg('summon', summonInfo.supporter.image_id, 'ls')">
        <div v-if="Number(summonInfo.supporter.recast) !== 0" absolute h-full w-full fc top-0 left-0>
          <div absolute h-full w-full fc bg-slate-900 opacity-50 />
          <div z-999 h-50px w-50px fc border-5 border-red-700 rounded-full text-2xl>
            {{ Number(summonInfo.supporter.recast) > 100 ? '∞' : summonInfo.supporter.recast }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
