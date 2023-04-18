<template>
  <el-card
    class="evoker-card w-130px"
    :body-style="{ padding: '0px' }"
    shadow="hover"
  >
    <img
      w-130px
      :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/m/${evokerInfo.npcId}_01.jpg`"
    />
    <div class="h-170px flex flex-col items-center justify-evenly">
      <el-select
        v-model="evokerInfo.tarotLevel"
        class="w-100px"
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
        class="w-100px"
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
        class="w-100px"
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
        class="w-100px"
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
        <el-checkbox
          v-model="evokerInfo.isAbility4Release"
          label="四技能解锁"
          size="small"
        />
      </div>

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
      background-color: rgba(255, 166, 0, 0.7);
    }
  }
}
</style>
