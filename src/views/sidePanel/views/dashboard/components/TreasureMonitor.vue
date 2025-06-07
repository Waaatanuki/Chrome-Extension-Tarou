<script setup lang="ts">
import { displayList } from '~/logic'
</script>

<template>
  <el-card v-if="displayList.length" body-style="padding: 10px" h-full w-300px>
    <div flex flex-wrap gap-7px>
      <el-tooltip
        v-for="item in displayList" :key="item.itemKey"
        :content="`目标: ${item.limit}`"
        :disabled="!item.limit"
        placement="top"
      >
        <div fc flex-col>
          <img w-50px :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/article/s/${item.imageId}.jpg`" alt="" srcset="">
          <div text-12px :class="{ 'text-max': item.limit && item.number >= item.limit }">
            {{ item.number }}
          </div>
        </div>
      </el-tooltip>
    </div>
  </el-card>
</template>

<style scoped>

</style>
