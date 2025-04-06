<script setup lang="ts">
import type { BuildEffect } from 'party'

defineProps<{
  effects: BuildEffect[]
}>()
</script>

<template>
  <div flex flex-wrap justify-start gap-1 px-8 py-2>
    <div
      v-for="effect, idx in effects" :key="idx"
      w-190px flex items-center justify-between text-base
    >
      <img w-100px :src="getSkillLabelIcon(effect.iconImg)">
      <div :class="{ max: effect.isMax }">
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
