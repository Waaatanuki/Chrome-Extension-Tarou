<script setup lang="ts">
import type { Action, BattleRecord } from 'myStorage'

defineProps<{ battleRecord: BattleRecord }>()

function getImg(action: Action) {
  if (action.type === 'ability')
    return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/ability/m/${action.icon}.png`
  if (action.type === 'summon')
    return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/summon/m/${action.icon}.jpg`
  if (action.type === 'temporary')
    return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/item/temporary/m/${action.icon}.jpg`
  if (action.type === 'recovery')
    return 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/item/normal/s/1.jpg'
  if (action.type === 'attack')
    return getLocalImg('attackBtn')
}

function getNpcImg(action: Action) {
  const type = action.aim_cjs?.startsWith('npc') ? 'npc' : 'leader'
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/m/${action.aim_num}_01.jpg`
}
</script>

<template>
  <el-card v-if="battleRecord" min-w-400px>
    <el-scrollbar height="520px">
      <el-descriptions :column="1" border>
        <el-descriptions-item v-for="list, idx in battleRecord.actionQueue" :key="idx" label-class-name="action-list-label">
          <template #label>
            <div relative p-10px h-full>
              <div mb-5px>
                {{ `第${idx + 1}回合` }}
              </div>
              <div fc gap-2px>
                <el-check-tag v-for="index in 4" :key="index" label="G" :checked="!!list.guard_status[index - 1]?.is_guard_status">
                  G
                </el-check-tag>
              </div>
              <div absolute left-5px top-5px>
                <el-tag :type="list.special_skill_flag ? 'danger' : 'success'" effect="dark" size="small">
                  {{ list.special_skill_flag ? 'OFF' : 'ON' }}
                </el-tag>
              </div>
              <div absolute right-5px top-5px text-sm>
                {{ list.bossHpPercent.toString().split('.')[0] }}
              </div>
            </div>
          </template>

          <div flex flex-wrap items-center justify-start gap-10px>
            <div v-for="action, i in list.acitonList" :key="i" fc>
              <img h-50px :src="getImg(action)">
              <template v-if="action.aim_num">
                <div i-carbon:arrow-right text-xl />
                <img h-50px :src="getNpcImg(action)">
              </template>
            </div>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-scrollbar>
  </el-card>
</template>

<style>
.el-descriptions__label.el-descriptions__cell.is-bordered-label.action-list-label {
  width: 200px;
  font-size: large;
  text-align: center;
  padding: 0px;
  font-weight: 500;
}
</style>
