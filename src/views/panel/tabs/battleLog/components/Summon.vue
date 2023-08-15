<script setup lang="ts">
import type { SummonInfo } from '../types'

defineProps<{ summonInfo: SummonInfo }>()

function getSummonImg(id: string) {
  return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/summon/raid_normal/${id || 'empty'}.jpg`
}
</script>

<template>
  <div flex>
    <div v-for="summon, idx in summonInfo.summon" :key="idx" m-1>
      <div relative>
        <div v-if="Number(summon.recast) !== 0" class="absolute w-full h-full bg-black/40" />
        <img block :src="getSummonImg(summon.image_id)">
      </div>
      <div v-if="Number(summon.recast) !== 0" text-center>
        <span>还差{{ summon.recast }}回合</span>
      </div>
    </div>
    <div v-if="summonInfo.supporter.id" m-1>
      <div relative>
        <div v-if="Number(summonInfo.supporter.recast) !== 0" class="absolute w-full h-full bg-black/40" />
        <img block :src="getSummonImg(summonInfo.supporter.image_id)">
      </div>
      <div v-if="Number(summonInfo.supporter.recast) !== 0" text-center>
        <span>还差{{ summonInfo.supporter.recast }}回合</span>
      </div>
    </div>
  </div>
</template>
