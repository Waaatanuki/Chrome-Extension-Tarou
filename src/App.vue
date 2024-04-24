<script setup lang="ts">
const data = ref({
  questId: '305381',
  questName: 'ムゲンＨＬ',
  isBlueBox: true,
  isBlueTreasure: true,
  targetItemKey: '10_215',
  questImage: '305381',
  questType: '0',
  targetItemCount: 3,
  total: 478,
  blueChest: 370,
  lastDropCount: 6,
  lastDropTake: 18,
})
</script>

<template>
  <div fc flex-wrap>
    <QuestCard :data="data" />
  </div>
</template>
