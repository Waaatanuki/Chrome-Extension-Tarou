<template>
  <div class="flex flex-wrap">
    <ToDoList />
    <StoneCount />
  </div>
</template>

<script lang="ts">
export default { name: 'Dashboard' }
</script>

<script setup lang="ts">
import ToDoList from './components/ToDoList.vue'
import StoneCount from './components/StoneCount.vue'
</script>

<style lang="scss" scoped></style>
