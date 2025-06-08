<script setup lang="ts">
import type { BuildEffect } from 'party'

defineProps<{
  effects: BuildEffect[]
}>()
</script>

<template>
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
