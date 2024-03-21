<script setup lang="ts">
defineProps<{ treasureList: { src: string, number: string, boxClass: string }[] }>()
</script>

<template>
  <div class="prt-result-detail">
    <div class="prt-reward-item">
      <div class="prt-item-list">
        <div
          v-for="treasure, idx in treasureList"
          :key="idx"
          class="lis-treasure btn-treasure-item"
        >
          <div class="prt-treasure-image">
            <img class="img-treasure-item" :src="treasure.src">
            <div v-if="treasure.number" class="prt-article-count">
              <span class="txt-small">x</span>{{ treasure.number }}
            </div>
          </div>
          <div :class="treasure.boxClass" />
        </div>
      </div>
    </div>
  </div>
</template>
