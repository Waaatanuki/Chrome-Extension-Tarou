<script setup lang="ts">
defineEmits(['open'])

function jumpTo(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div fc flex-col gap-4>
    <div i-carbon-home text-10 icon-btn @click="jumpTo('https://gbf.pub')" />
    <div i-carbon-sun dark:i-carbon-moon text-5 icon-btn @click="toggleDark()" />
    <div i-carbon:debug text-5 icon-btn @click="$emit('open', 'debug')" />
    <div i-carbon:logo-github text-5 icon-btn @click="jumpTo('https://github.com/Waaatanuki/Chrome-Extension-Tarou')" />
    <div i-carbon:settings text-5 icon-btn @click="$emit('open', 'setting')" />
  </div>
</template>
