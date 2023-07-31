<script setup lang="ts">
import ToDoList from './components/ToDoList.vue'
import StoneCount from './components/StoneCount.vue'
import RecoveryItemTable from './components/RecoveryItemTable.vue'
import Contact from './components/Contact.vue'
</script>

<template>
  <div flex flex-wrap>
    <ToDoList />
    <StoneCount />
    <RecoveryItemTable />
    <Contact absolute right-15px top-15px />
  </div>
</template>
