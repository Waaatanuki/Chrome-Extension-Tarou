<script setup lang="ts">
import { sandBoxBossInfo } from '~/constants/evoker'
import { materialInfo } from '~/logic'

function getTriggerNumber(id: string) {
  const hit = materialInfo.value.find(m => m.item_id === id)
  return hit?.number || 0
}
</script>

<template>
  <div class="sand-box-boss" mt-5>
    <div v-for="area, idx in sandBoxBossInfo" :key="idx">
      <ElDescriptions :column="2" mb-2 border>
        <div v-for="boss, index in area" :key="index">
          <ElDescriptionsItem label-class-name="bossLabelClass">
            <template #label>
              <div fc>
                <img w-20 :src="getQuestImg(boss.bossId, 'replicard')">
              </div>
            </template>
            <div fc>
              <div v-for="img, index2 in boss.itemList" :key="index2" mx-2 fc flex-col>
                <img w-10 :src="getAssetsItemImg('article', img)">
                <label>{{ getTriggerNumber(img) }}</label>
              </div>
            </div>
          </ElDescriptionsItem>
        </div>
      </ElDescriptions>
    </div>
  </div>
</template>

<style>
.el-descriptions__label.el-descriptions__cell.is-bordered-label.bossLabelClass {
  width: 100px;
}
</style>
