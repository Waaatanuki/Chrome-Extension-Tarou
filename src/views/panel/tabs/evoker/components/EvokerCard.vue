<script setup lang="ts">
import type { EvokerInfo } from 'myStorage'
import { domainList, evokerList, tarotList, weaponList } from '~/constants/evoker'

const evoker = defineModel<EvokerInfo>({ required: true })
</script>

<template>
  <el-card class="evoker-card w-130px" :body-style="{ padding: '0px' }" shadow="hover">
    <img w-130px :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/m/${evoker.npcId}_01.jpg`">
    <div class="h-170px flex flex-col items-center justify-evenly">
      <el-select
        v-model="evoker.tarotLevel"
        class="w-100px"
        :class="{ completed: evoker.tarotLevel === tarotList.at(-1)?.value }"
        size="small"
        placeholder="塔罗牌进度"
        placement="bottom"
      >
        <el-option
          v-for="item, idx in tarotList"
          :key="idx"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="evoker.evokerLevel"
        class="w-100px"
        :class="{ completed: evoker.evokerLevel === evokerList.at(-1)?.value }"
        size="small"
        placeholder="贤者进度"
        placement="bottom"
      >
        <el-option
          v-for="item, idx in evokerList"
          :key="idx"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="evoker.weaponLevel"
        class="w-100px"
        :class="{
          completed: evoker.weaponLevel === weaponList.at(-1)?.value,
        }"
        size="small"
        placeholder="贤武进度"
        placement="bottom"
      >
        <el-option
          v-for="item, idx in weaponList"
          :key="idx"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="evoker.domainLevel"
        class="w-100px"
        :class="{
          completed: evoker.domainLevel === domainList.at(-1)?.value,
        }"
        size="small"
        placeholder="领域进度"
        placement="bottom"
      >
        <el-option
          v-for="item, idx in domainList"
          :key="idx"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <div>
        <el-checkbox
          v-model="evoker.isAbility4Release"
          label="四技能解锁"
          size="small"
        />
      </div>

      <div>
        <el-checkbox v-model="evoker.target" label="目标" size="small" />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss">
.evoker-card {
  .el-select.completed {
    .el-input__wrapper {
      background-color: rgba(255, 166, 0, 0.7);
    }
  }
}
</style>
