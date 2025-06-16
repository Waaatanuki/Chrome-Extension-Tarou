<script setup lang="ts">
import Contact from './components/Contact.vue'
import Debug from './components/Debug.vue'
import RecoveryItemTable from './components/RecoveryItemTable.vue'
import Setting from './components/Setting.vue'
import StoneCount from './components/StoneCount.vue'
import ToDoList from './components/ToDoList.vue'

const settingVisible = ref(false)
const debugVisible = ref(false)

function handleOpen(name: string) {
  switch (name) {
    case 'setting':
      settingVisible.value = true
      break
    case 'debug':
      debugVisible.value = true
      break
  }
}
</script>

<template>
  <div flex flex-wrap gap-3>
    <ToDoList />
    <StoneCount />
    <SupportSummon />
    <RecoveryItemTable />
    <Contact absolute right-15px top-15px @open="handleOpen" />
  </div>
  <Setting v-model="settingVisible" />
  <Debug v-model="debugVisible" />
</template>
