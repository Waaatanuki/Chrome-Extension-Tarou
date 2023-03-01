<template>
  <div class="flex flex-col text-sm">
    <div class="flex justify-around items-center my-2">
      <template v-for="npc in evoker.evokerInfo.slice(0, 5)">
        <EvokerCard :evokerInfo="npc" />
      </template>
    </div>
    <div class="flex justify-around items-center my-2">
      <template v-for="npc in evoker.evokerInfo.slice(5, 10)">
        <EvokerCard :evokerInfo="npc" />
      </template>
    </div>
  </div>
  <div v-if="evoker.evokerPageResult.length == 0">
    <h1 style="text-align: center">请先去游戏的素材界面读取素材信息</h1>
  </div>
  <div v-else>
    <el-scrollbar max-height="210">
      <div class="showBox">
        <div
          class="item"
          v-for="item in evoker.evokerPageResult.filter((item:any)=>item.need>0)"
          :key="item.id"
        >
          <el-tooltip
            :content="`${item.name} 总需${item.total}`"
            placement="top"
          >
            <img
              style="width: 100%"
              :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/article/s/${item.id}.jpg`"
            />
          </el-tooltip>
          <label class="itemNum">{{ item.need }}</label>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import EvokerCard from './components/EvokerCard.vue'
import useStore from '@/store'
const { evoker } = useStore()
</script>

<style lang="scss" scoped>
.completed {
  background-color: orange;
}

.showBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin: 5px;
  }
}
</style>
