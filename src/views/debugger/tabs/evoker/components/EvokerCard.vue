<script setup lang="ts">
import type { EvokerInfo } from 'myStorage'
import { domainList, evokerList, tarotList, weaponList } from '~/constants/evoker'

const evoker = defineModel<EvokerInfo>({ required: true })
</script>

<template>
  <ElCard class="evoker-card w-130px" :body-style="{ padding: '0px' }" shadow="hover">
    <img w-130px :src="getAssetImg('npc', `${evoker.npcId}_01`)">
    <div class="h-170px flex flex-col items-center justify-evenly">
      <ElSelect
        v-model="evoker.tarotLevel"
        style="width:100px"
        :class="{ completed: evoker.tarotLevel === tarotList.at(-1)?.value }"
        size="small"
        placeholder="塔罗牌进度"
        placement="bottom"
      >
        <ElOption
          v-for="item, idx in tarotList"
          :key="idx"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>

      <ElSelect
        v-model="evoker.evokerLevel"
        style="width:100px"
        :class="{ completed: evoker.evokerLevel === evokerList.at(-1)?.value }"
        size="small"
        placeholder="贤者进度"
        placement="bottom"
      >
        <ElOption
          v-for="item, idx in evokerList"
          :key="idx"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>

      <ElSelect
        v-model="evoker.weaponLevel"
        style="width:100px"
        :class="{ completed: evoker.weaponLevel === weaponList.at(-1)?.value }"
        size="small"
        placeholder="贤武进度"
        placement="bottom"
      >
        <ElOption
          v-for="item, idx in weaponList"
          :key="idx"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>

      <ElSelect
        v-model="evoker.domainLevel"
        style="width:100px"
        :class="{ completed: evoker.domainLevel === domainList.at(-1)?.value }"
        size="small"
        placeholder="领域进度"
        placement="bottom"
      >
        <ElOption
          v-for="item, idx in domainList"
          :key="idx"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>

      <div>
        <ElCheckbox
          v-model="evoker.isAbility4Release"
          label="四技能解锁"
          size="small"
        />
      </div>

      <div>
        <ElCheckbox v-model="evoker.target" label="目标" size="small" />
      </div>
    </div>
  </ElCard>
</template>

<style lang="scss">
.evoker-card {
  .el-select.completed {
    .el-select__wrapper {
      background-color: rgba(255, 166, 0, 0.7);
    }
  }
}
</style>
