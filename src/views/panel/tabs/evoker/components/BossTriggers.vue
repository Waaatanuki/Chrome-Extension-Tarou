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
      <el-descriptions :column="2" border mb-2>
        <div v-for="boss, index in area" :key="index">
          <el-descriptions-item label-class-name="bossLabelClass">
            <template #label>
              <div fc>
                <img w-20 :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/replicard/${boss.bossId}.png`">
              </div>
            </template>
            <div fc>
              <div v-for="img, index2 in boss.itemList" :key="index2" fc flex-col mx-2>
                <img w-10 :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/article/s/${img}.jpg`">
                <label>{{ getTriggerNumber(img) }}</label>
              </div>
            </div>
          </el-descriptions-item>
        </div>
      </el-descriptions>
    </div>
  </div>
</template>

<style>
.el-descriptions__label.el-descriptions__cell.is-bordered-label.bossLabelClass {
  width: 100px;
}
</style>
