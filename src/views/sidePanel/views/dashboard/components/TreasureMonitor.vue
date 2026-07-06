<script setup lang="ts">
import { displayList } from '~/logic'
</script>

<template>
  <el-card v-if="displayList.length" h-full w-300px>
    <div grid grid-cols-5 gap-7px>
      <el-tooltip
        v-for="item in displayList" :key="item.itemKey"
        :content="`目标: ${item.limit}`"
        :disabled="!item.limit"
        placement="top"
      >
        <div fc flex-col>
          <img :src="getOfficialUrl(`/sp/assets/item/article/s/${item.imageId}.jpg`)">
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
