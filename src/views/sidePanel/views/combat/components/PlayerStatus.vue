<script setup lang="ts">
import type { BattleRecord, Player } from 'myStorage'
import type { Buff } from 'source'
import { onlyShowSpecBuff, specPlayerBuff } from '~/logic'

interface DisplayPlayer extends Player {
  condition: {
    buff: Buff[]
    coating_value: number
    importantBuffs: Buff[]
    commonBuffs: Buff[]
  }
}

const { battleRecord } = defineProps<{ battleRecord: BattleRecord, turn: number }>()

const playerInfo = computed<DisplayPlayer[]>(() => {
  const copyRecord = JSON.parse(JSON.stringify(battleRecord))

  for (const player of copyRecord.player) {
    const importantBuffs = []
    const commonBuffs = []
    for (const buff of player.condition.buff) {
      if (specPlayerBuff.value.some(specBuff => buff.status.startsWith(specBuff)))
        importantBuffs.push(buff)
      else
        commonBuffs.push(buff)
    }
    player.condition.importantBuffs = importantBuffs
    player.condition.commonBuffs = commonBuffs
  }

  return copyRecord.player
})

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
        <div v-for="player in playerInfo" :key="player.pid" flex items-center justify-start gap-5px>
          <div relative h-45px w-45px fc shrink-0>
            <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
              <span text-12px text-red font-bold>Dead</span>
            </div>
            <el-tag v-if="player.condition.coating_value" absolute right-0 top-0 type="primary" effect="light" size="small">
              {{ player.condition.coating_value }}
            </el-tag>
            <img w-full :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id, 's')">
          </div>
          <div min-h-44px w-230px flex flex-wrap rounded p-2px ring-1 ring-neutral-7>
            <img
              v-for="buff, idx in player.condition.importantBuffs" :key="idx"
              :src="getBuffIcon(buff, turn)"
              h-40px w-40px cursor-pointer @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
            >
            <template v-if="!onlyShowSpecBuff">
              <div v-for="i in Math.ceil(player.condition.commonBuffs.length / 2)" :key="i" flex flex-col>
                <img
                  v-if="player.condition.commonBuffs[(i - 1) * 2]"
                  h-20px w-20px cursor-pointer
                  :src="getBuffIcon(player.condition.commonBuffs[(i - 1) * 2], turn)"
                  @click="toggleImage(specPlayerBuff, player.condition.commonBuffs[(i - 1) * 2].status.split('_')[0])"
                >
                <img
                  v-if="player.condition.commonBuffs[(i - 1) * 2 + 1]"
                  h-20px w-20px cursor-pointer
                  :src="getBuffIcon(player.condition.commonBuffs[(i - 1) * 2 + 1], turn)"
                  @click="toggleImage(specPlayerBuff, player.condition.commonBuffs[(i - 1) * 2 + 1].status.split('_')[0])"
                >
              </div>
            </template>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
