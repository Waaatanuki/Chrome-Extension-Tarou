<script setup lang="ts">
import { dailyCost } from '~/logic'

const { height } = useWindowSize()
</script>

<template>
  <ElCard w-740px>
    <ElScrollbar :max-height="height - 100">
      <div flex flex-wrap gap-7px text-12px>
        <div v-for="reward in dailyCost.rewardList" :key="reward.key" w-100px fc flex-col>
          <img :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/${reward.imgId}.jpg`">
          <div>{{ reward.count }}</div>
        </div>
      </div>
    </ElScrollbar>
  </ElCard>
</template>
