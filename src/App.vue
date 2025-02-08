<script setup lang="ts">
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'

const visible = ref(false)
</script>

<template>
  <div flex flex-wrap gap-3>
    <Contact absolute right-15px top-15px />
    <div>
      <TheButton @click="visible = true">
        ceshi
      </TheButton>
    </div>
  </div>
</template>
