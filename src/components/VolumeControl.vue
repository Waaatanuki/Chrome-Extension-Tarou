<script setup>
import { volume } from '~/logic'

function updateVolume() {
  const audio = new Audio('https://prd-game-a5-granbluefantasy.akamaized.net/assets/sound/se/chat_se_1.mp3')
  audio.volume = volume.value
  audio.play()
}

function toggleMute() {
  volume.value = volume.value === 0 ? 0.5 : 0
  updateVolume()
}
</script>

<template>
  <div w-150px fc gap-2>
    <button @click="toggleMute">
      <span v-if="volume === 0">🔇</span>
      <span v-else-if="volume < 0.5">🔉</span>
      <span v-else>🔊</span>
    </button>
    <input
      v-model.number="volume"
      type="range"
      min="0"
      max="1"
      step="0.01"
      w-100px
      @change="updateVolume"
    >
  </div>
</template>
