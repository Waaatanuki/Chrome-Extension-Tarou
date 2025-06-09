<script setup lang="ts">
import type { BattleRecord } from 'myStorage'
import type { Buff } from 'source'
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
  <div>
    <div h-50px w-full fc>
      <el-checkbox v-model="onlyShowSpecBuff" :border="true" size="small">
        只显示标记状态
      </el-checkbox>
    </div>
    <el-scrollbar max-height="440px">
      <div my-10px flex flex-col items-start justify-center gap-5px>
        <div v-for="player in battleRecord.player" :key="player.pid" flex justify-start gap-5px>
          <div relative h-45px w-45px fc shrink-0>
            <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
              <span text-12px text-red font-bold>Dead</span>
            </div>
            <el-tag v-if="player.condition.coating_value" absolute right-0 top-0 type="primary" effect="light" size="small">
              {{ player.condition.coating_value }}
            </el-tag>
            <img w-full :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id, 's')">
          </div>
          <div w-230px flex flex-wrap rounded p-5px ring-1 ring-neutral-7>
            <img
              v-for="buff, idx in getPlayerBuffs(player.condition.buff)" :key="idx"
              :src="getBuffIcon(buff, turn)"
              h-22px w-22px cursor-pointer @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
            >
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
