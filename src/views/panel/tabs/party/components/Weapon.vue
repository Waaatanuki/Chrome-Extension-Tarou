<script setup lang="ts">
import type { DeckWeapon } from '~/logic/types'

defineProps<{
  weapons: DeckWeapon
}>()

function getImg(type: string, id: string, size = 'm') {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/${size}/${id}.jpg`
}
</script>

<template>
  <div h-210px fc>
    <div w-100px>
      <img w-full :src="getImg('weapon', weapons[1].master.id, 'ls')">
    </div>
    <div w-275px fc flex-wrap gap-5px>
      <div v-for="idx in 12" :key="idx" h-48px w-85px fc bg-slate-300>
        <img v-if="weapons[idx + 1]?.master?.id" w-full :src="getImg('weapon', weapons[idx + 1]?.master?.id)">
      </div>
    </div>
  </div>
</template>
