<script setup lang="ts">
import type { SummonInfo } from 'battleLog'

defineProps<{ summonInfo: SummonInfo }>()

function getImg(type: string, id: string, size = 'm') {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/${size}/${id}.jpg`
}
</script>

<template>
  <el-card :body-style="{ padding: '10px' }">
    <div fc gap-5px>
      <div v-for="idx in 5" :key="idx" relative h-46px w-80px fc bg-slate-300>
        <img v-if="summonInfo.summon[idx - 1]?.image_id" w-full :src="getImg('summon', summonInfo.summon[idx - 1]?.image_id)">
        <div v-if="summonInfo.summon[idx - 1]?.image_id && Number(summonInfo.summon[idx - 1]?.recast) !== 0" absolute h-full w-full fc>
          <div absolute h-full w-full bg-slate-900 opacity-50 />
          <div z-999 h-30px w-30px fc border-3 border-red-700 rounded-full text-lg text-white>
            {{ Number(summonInfo.summon[idx - 1]?.recast) > 100 ? '∞' : summonInfo.summon[idx - 1]?.recast }}
          </div>
        </div>
      </div>
      <div v-if="summonInfo.supporter?.id" relative h-46px w-80px fc bg-slate-300>
        <img w-full :src="getImg('summon', summonInfo.supporter.image_id)">
        <div v-if=" Number(summonInfo.supporter.recast) !== 0" absolute h-full w-full fc>
          <div absolute h-full w-full bg-slate-900 opacity-50 />
          <div z-999 h-30px w-30px fc border-3 border-red-700 rounded-full text-lg text-white>
            {{ Number(summonInfo.supporter.recast) > 100 ? '∞' : summonInfo.supporter.recast }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
