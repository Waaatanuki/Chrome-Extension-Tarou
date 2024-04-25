<script setup lang="ts">
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
</script>

<template>
  <Contact absolute right-15px top-15px />
  <div w-full flex items-start justify-start gap-4px>
    <div v-for="i in 6" :key="i" relative h-122px w-60px border-1>
      123
      <img absolute left-0 top-0 w-20px :src="getLocalImg('icon_augment')">
    </div>
  </div>
</template>
