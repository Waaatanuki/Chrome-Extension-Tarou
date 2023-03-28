<template>
  <div class="flex flex-wrap">
    <ToDoList />
    <StoneCount />
    <Contact class="absolute right-15px top-15px" />
  </div>
</template>

<script lang="ts">
export default { name: 'Dashboard' }
</script>

<script setup lang="ts">
import ToDoList from './components/ToDoList.vue'
import StoneCount from './components/StoneCount.vue'
import Contact from './components/Contact.vue'
</script>

<style lang="scss" scoped></style>
