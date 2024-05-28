<script setup lang="ts">
import ToDoList from './components/ToDoList.vue'
import StoneCount from './components/StoneCount.vue'
import RecoveryItemTable from './components/RecoveryItemTable.vue'
import Contact from './components/Contact.vue'
import SupportSummon from './components/SupportSummon.vue'
import Setting from './components/Setting.vue'
import Debug from './components/Debug.vue'

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
