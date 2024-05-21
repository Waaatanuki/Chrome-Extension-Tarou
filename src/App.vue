<script setup lang="ts">
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
import Setting from '~/views/debugger/tabs/dashboard/components/Setting.vue'

const settingVisible = ref(false)
</script>

<template>
  <div flex flex-wrap gap-3>
    <Contact absolute right-15px top-15px @open-setting="settingVisible = true" />
  </div>
  <Setting v-model="settingVisible" />
</template>
