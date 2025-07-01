<script setup lang="ts">
import { dailyCost } from '~/logic'

const order = ref(true)

const showList = computed(() => order.value ? dailyCost.value.rewardList : dailyCost.value.rewardList?.toSorted((a, b) => b.count - a.count))
</script>

<template>
  <el-card w-717px header="掉落统计" :body-style="{ padding: '20px 5px 20px 5px' }">
    <template #header>
      <div flex items-center justify-between>
        <div text-lg>
          掉落统计
        </div>
        <div>
          <el-switch
            v-model="order"
            inline-prompt
            style="--el-switch-on-color: #3c3c3c; --el-switch-off-color: #6c6c6c"
            active-text="获取顺序"
            inactive-text="数量顺序"
          />
        </div>
      </div>
    </template>
    <el-scrollbar :height="600" px-15px>
      <div flex flex-wrap gap-7px text-14px>
        <div v-for="reward in showList" :key="reward.key" w-80px fc flex-col>
          <img :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/${reward.imgId}.jpg`">
          <div>{{ reward.count }}</div>
        </div>
      </div>
    </el-scrollbar>
  </el-card>
</template>
