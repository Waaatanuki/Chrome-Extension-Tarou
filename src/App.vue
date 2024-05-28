<script setup lang="ts">
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
import Debug from '~/views/debugger/tabs/dashboard/components/Debug.vue'

const visible = ref(false)
</script>

<template>
  <div flex flex-wrap gap-3>
    <Contact absolute right-15px top-15px />
    <div>
      <TheButton @click="visible = true">
        ceshi
      </TheButton>
      <Debug v-model="visible" />
    </div>
  </div>
</template>
