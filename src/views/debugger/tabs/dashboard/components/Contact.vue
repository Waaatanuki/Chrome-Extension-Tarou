<script setup lang="ts">
defineEmits(['open'])
</script>

<template>
  <div fc flex-col gap-4>
    <div i-carbon-sun dark:i-carbon-moon text-10 icon-btn @click="toggleDark()" />
    <div i-carbon:debug text-5 icon-btn @click="$emit('open', 'debug')" />
    <a
      i-carbon:logo-github text-5 hover:text-amber
      rel="noreferrer"
      href="https://github.com/Waaatanuki/Chrome-Extension-Tarou"
      target="_blank" title="GitHub"
    />
    <div i-carbon:settings text-5 icon-btn @click="$emit('open', 'setting')" />
  </div>
</template>
