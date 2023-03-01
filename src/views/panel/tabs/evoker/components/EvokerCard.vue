<template>
  <el-card
    class="evoker-card w-32"
    :body-style="{ padding: '0px' }"
    shadow="hover"
  >
    <img
      w-32
      :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/m/${evokerInfo.npcId}_01.jpg`"
    />
    <div class="h-40 flex flex-col items-center justify-evenly">
      <el-select
        v-model="evokerInfo.tarotLevel"
        class="w-24"
        :class="{ completed: evokerInfo.tarotLevel == tarotList.at(-1)?.value }"
        size="small"
        placeholder="塔罗牌进度"
        placement="bottom"
      >
        <el-option
          v-for="item in tarotList"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="evokerInfo.evokerLevel"
        class="w-24"
        :class="{
          completed: evokerInfo.evokerLevel == evokerList.at(-1)?.value,
        }"
        size="small"
        placeholder="贤者进度"
        placement="bottom"
      >
        <el-option
          v-for="item in evokerList"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="evokerInfo.weaponLevel"
        class="w-24"
        :class="{
          completed: evokerInfo.weaponLevel == weaponList.at(-1)?.value,
        }"
        size="small"
        placeholder="贤武进度"
        placement="bottom"
      >
        <el-option
          v-for="item in weaponList"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="evokerInfo.domainLevel"
        class="w-24"
        :class="{
          completed: evokerInfo.domainLevel == domainList.at(-1)?.value,
        }"
        size="small"
        placeholder="领域进度"
        placement="bottom"
      >
        <el-option
          v-for="item in domainList"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <div>
        <el-checkbox v-model="evokerInfo.target" label="目标" size="small" />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {
  tarotList,
  evokerList,
  weaponList,
  domainList,
} from '@/settings/evoker.setting'
defineProps(['evokerInfo'])
</script>

<style lang="scss">
.evoker-card {
  .el-select.completed {
    .el-input__wrapper {
      background-color: orange;
    }
  }
}
</style>
