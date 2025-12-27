<script setup lang="ts">
import type { BuildEffect, BuildEnhance } from 'party'

defineProps<{
  effects: BuildEffect[]
  enhance: BuildEnhance
}>()
</script>

<template>
  <div v-if="enhance" class="my-10px flex items-center justify-between">
    <div class="w-80px flex items-center justify-between gap-10px">
      <img w-30px src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/weapon_skill_enhance/icon_skillenhance_1.png">
      <div>{{ enhance.enhance }}%</div>
    </div>
    <div class="w-80px flex items-center justify-between gap-10px">
      <img w-30px src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/weapon_skill_enhance/icon_skillenhance_2.png">
      <div>{{ enhance.enhanceMagna }}%</div>
    </div>
    <div class="w-80px flex items-center justify-between gap-10px">
      <img w-30px src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/weapon_skill_enhance/icon_skillenhance_3.png">
      <div>{{ enhance.enhanceEvil }}%</div>
    </div>
  </div>
  <div w-300px flex flex-wrap justify-start gap-2px>
    <div
      v-for="effect, idx in effects" :key="idx"
      w-149px flex items-center justify-between text-12px
    >
      <img w-85px :src="getSkillLabelIcon(effect.iconImg)">
      <div :class="{ max: effect.isMax }">
        {{ effect.value }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.max {
  color: #ffa826;
}
</style>
