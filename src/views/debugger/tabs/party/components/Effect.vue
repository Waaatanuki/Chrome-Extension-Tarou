<script setup lang="ts">
import type { EffectValueInfo } from 'source'

defineProps<{
  effectValueInfo: EffectValueInfo[]
}>()
</script>

<template>
  <div flex flex-wrap justify-start gap-1 px-8 py-2>
    <div
      v-for="effect in effectValueInfo" :key="effect.icon_img"
      w-190px flex items-center justify-between text-base
    >
      <img w-100px :src="getSkillLabelIcon(effect.icon_img)">
      <div :class="{ max: effect.is_max }">
        {{ effect.value }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.max{
  color: #ffa826;
}
</style>
