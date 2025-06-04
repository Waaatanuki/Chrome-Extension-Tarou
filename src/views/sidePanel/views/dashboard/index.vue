<script setup lang="ts">
import Debug from './components/Debug.vue'
import RecoveryItemTable from './components/RecoveryItemTable.vue'
import Status from './components/Status.vue'
import StoneCount from './components/StoneCount.vue'

const debugVisible = ref(false)
</script>

<template>
  <div flex flex-wrap gap-3>
    <StoneCount />
    <Status />
    <!-- <RecoveryItemTable /> -->
    <!-- <Contact absolute right-15px top-15px @open="handleOpen" /> -->
  </div>
  <Debug v-model="debugVisible" />
</template>
