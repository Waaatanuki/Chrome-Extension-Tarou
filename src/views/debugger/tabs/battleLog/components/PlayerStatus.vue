<script setup lang="ts">
import type { BattleRecord } from 'myStorage'
import type { Buff } from 'requestData'
import { onlyShowSpecBuff, specPlayerBuff } from '~/logic'

defineProps<{ battleRecord: BattleRecord, turn: number }>()

function getPlayerBuffs(buffs: Buff[]) {
  if (onlyShowSpecBuff.value) {
    return specPlayerBuff.value.reduce<Buff[]>((pre, cur) => {
      buffs.forEach(buff => buff.status.startsWith(cur) && pre.push(buff))
      return pre
    }, [])
  }
  else {
    return buffs
  }
}

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}
</script>

<template>
  <div h-500px>
    <div h-60px w-full fc>
      <el-checkbox v-model="onlyShowSpecBuff" border>
        只显示标记状态
      </el-checkbox>
    </div>
    <div flex flex-col items-start justify-center gap-10px>
      <div v-for="player in battleRecord.player" :key="player.pid" flex justify-start gap-10px>
        <div relative w-100px shrink-0>
          <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
            <span text-base text-red font-bold>Dead</span>
          </div>
          <el-tag v-if="player.condition.coating_value" absolute right--1 top--1 type="primary" effect="light" size="small">
            {{ player.condition.coating_value }}
          </el-tag>
          <img w-full :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id)">
        </div>
        <div w-260px flex flex-wrap border-1 border-blue-500 rounded p-5px>
          <img
            v-for="buff, idx in getPlayerBuffs(player.condition.buff)" :key="idx"
            :src="getBuffIcon(buff, turn)"
            h-22px w-22px cursor-pointer @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
          >
        </div>
        <!-- <div fc flex-col gap-5px>
          <div w-200px>
            <ElProgress :percentage="player.status.hp / player.status.hpmax * 100" :status="(player.status.hp / player.status.hpmax * 100) > 25 ? 'success' : 'exception'">
              <div>{{ player.status.hp.toLocaleString() }}</div>
            </ElProgress>
          </div>
          <div w-200px>
            <ElProgress
              :percentage="player.status.recast > 100 ? player.status.recast - 100 : player.status.recast"
              :color="player.status.recast > 100 ? '#dc2626' : '#e6a23c'"
              :class="{ 'over-recast': player.status.recast > 100 }"
            >
              <div>{{ `${player.status.recast}%` }}</div>
            </ElProgress>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>
.over-recast .el-progress-bar .el-progress-bar__outer{
    background: #e6a23c;
}
</style>
