<template>
  <div class="sand-box-boss" mt-5>
    <template v-for="area in sandBoxBossInfo">
      <el-descriptions :column="2" border mb-2>
        <template v-for="boss in area">
          <el-descriptions-item label-class-name="bossLabelClass">
            <template #label>
              <div fc>
                <img
                  w-20
                  :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/replicard/${boss.bossId}.png`"
                />
              </div>
            </template>
            <div fc>
              <div v-for="img in boss.itemList" fc flex-col mx-2>
                <img
                  w-10
                  :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/article/s/${img}.jpg`"
                />
                <label class="itemNum">{{ getTriggerNumber(img) }}</label>
              </div>
            </div>
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </template>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store'
import { sandBoxBossInfo } from '@/settings/evoker.setting'
const { evoker } = useStore()

function getTriggerNumber(id: string) {
  const hit = evoker.materialInfo.find(m => m.item_id == id)
  return hit?.number || 0
}
</script>

<style>
.el-descriptions__label.el-descriptions__cell.is-bordered-label.bossLabelClass {
  width: 100px;
}
</style>
