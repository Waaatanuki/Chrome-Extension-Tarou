<script setup lang="ts">
import type { NumberLimitPair } from 'myStorage'

defineProps<{ value?: NumberLimitPair }>()
</script>

<template>
  <span v-if="value">
    <span :class="{ max: value.number >= value.limit }">
      {{ value.number }}
    </span>
    <span>
      {{ `/${value.limit}` }}
    </span>
  </span>
  <span v-else>
    0/0
  </span>
</template>

<style scoped>
.max {
  color: #f0cb4f;
}
</style>
