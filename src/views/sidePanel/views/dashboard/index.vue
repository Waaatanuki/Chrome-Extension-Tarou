<script setup lang="ts">
import { eventList } from '~/logic'
import RecoveryItemTable from './components/RecoveryItemTable.vue'
import Status from './components/Status.vue'
import StoneCount from './components/StoneCount.vue'
import Treasureraid from './components/Treasureraid.vue'
</script>

<template>
  <div flex flex-wrap gap-3>
    <StoneCount />
    <Status />
    <Treasureraid v-if="eventList.includes('treasureraid')" />
    <!-- <RecoveryItemTable /> -->
    <!-- <Contact absolute right-15px top-15px @open="handleOpen" /> -->
  </div>
</template>
