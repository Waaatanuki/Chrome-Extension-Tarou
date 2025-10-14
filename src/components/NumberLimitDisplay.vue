<script setup lang="ts">
import type { NumberLimitPair } from 'extension'

defineProps<{ value?: NumberLimitPair }>()
</script>

<template>
  <span v-if="value">
    <span :class="{ 'text-max': value.number >= value.limit }">
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
