<script setup lang="ts">
import type { EffectValueInfo } from '~/logic/types'

defineProps<{
  effectValueInfo: EffectValueInfo[]
}>()

function getSkillIcon(id: string) {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/weapon_skill_label/${id}`
}
</script>

<template>
  <div flex flex-wrap justify-start gap-1 px-8 py-2>
    <div
      v-for="effect in effectValueInfo" :key="effect.icon_img"
      w-190px flex items-center justify-between text-base
    >
      <img w-100px :src="getSkillIcon(effect.icon_img)">
      <div>{{ effect.value }}</div>
    </div>
  </div>
</template>
