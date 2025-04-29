# Chrome-Extension-Tarou

Extension for Granblue Fantasy

<template>
  <VolumeControl @volume-change="handleVolumeChange" />
</template>

<script setup>
import VolumeControl from '@/components/VolumeControl.vue'

const handleVolumeChange = (volume) => {
  // 保存到状态管理或本地存储
  localStorage.setItem('audioVolume', volume)
  // 更新当前音频实例
  if (currentAudio.value) {
    currentAudio.value.volume = volume
  }
}
</script>
