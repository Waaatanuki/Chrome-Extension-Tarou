<script setup lang="ts">
import type { Player } from 'extension'
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

const { playerInfo, formation } = defineProps<{ playerInfo: Player[], formation?: number[], turn: number }>()
const onlyShowMainPlayer = ref(true)

const disPlayPlayer = computed<DisplayPlayer[]>(() => {
  if (!formation)
    return []

  const sub = onlyShowMainPlayer.value
    ? []
    : playerInfo
        .map((_, index) => index)
        .filter(index => !formation.includes(index))
  const sortInfo = [...formation.map(i => ({ index: i, isMain: true })), ...sub.map(i => ({ index: i, isMain: false }))]

  return sortInfo.map(({ index, isMain }) => {
    const player = deepClone(playerInfo[index]) as DisplayPlayer
    const importantBuffs: Buff[] = []
    const commonBuffs: Buff[] = []

    for (const buff of player.condition.buff) {
      if (specPlayerBuff.value.some(specBuff => buff.status.startsWith(specBuff)))
        importantBuffs.push(buff)
      else
        commonBuffs.push(buff)
    }
    player.condition.importantBuffs = isMain ? importantBuffs : []
    player.condition.commonBuffs = isMain ? commonBuffs : []
    return player
  })
})

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}

function isOneRow(player: DisplayPlayer) {
  const impCol = player.condition.importantBuffs.length * 2
  const comCol = onlyShowSpecBuff.value ? 0 : Math.ceil(player.condition.commonBuffs.length / 2)

  if (impCol + comCol > 10)
    return false
  return true
}
</script>

<template>
  <div>
    <div mb-15px w-full flex justify-between px-10px>
      <el-switch
        v-model="onlyShowMainPlayer"
        size="small"
        active-text="前排"
        inactive-text="全部"
        inline-prompt
        style="--el-switch-off-color: #0d9488"
      >
        只显示标记状态
      </el-switch>
      <el-checkbox v-model="onlyShowSpecBuff" :border="true" size="small">
        只显示标记状态
      </el-checkbox>
    </div>

    <div flex flex-col items-start justify-center gap-5px>
      <div v-for="player in disPlayPlayer" :key="player.pid" relative w-288px rounded-5px bg-neutral-8>
        <div absolute h-48px w-48px border-5px class="border-#1D1E1F">
          <div relative fc>
            <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
              <span text-12px text-red font-bold>Dead</span>
            </div>
            <div v-if="player.condition.coating_value && !player.is_dead" class="txt-coating-value" absolute bottom-0>
              {{ player.condition.coating_value }}
            </div>
            <img w-full rounded-5px :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id, 's')">
          </div>
        </div>

        <div class="shadow-[-3px_-3px_0px_#1D1E1F]" absolute left-48px h-8px w-8px rounded-tl-5px />
        <div v-if="isOneRow(player)" class="shadow-[-3px_3px_0px_#1D1E1F]" absolute left-48px top-40px h-8px w-8px rounded-bl-5px />
        <div v-if="!isOneRow(player)" class="shadow-[3px_3px_0px_#262626]" absolute left-40px top-40px h-8px w-8px rounded-br-5px />
        <div v-if="!isOneRow(player)" class="shadow-[-3px_-3px_0px_#1D1E1F]" absolute left-0 top-48px h-8px w-8px rounded-tl-5px />

        <div flex flex-wrap>
          <div h-48px w-48px />
          <div v-for="buff, idx in player.condition.importantBuffs" :key="idx" h-48px w-48px fc>
            <img
              :src="getBuffIcon(buff, turn)"
              h-40px w-40px cursor-pointer @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
            >
          </div>
          <template v-if="!onlyShowSpecBuff">
            <div v-for="i in Math.ceil(player.condition.commonBuffs.length / 2)" :key="i" h-48px w-24px flex flex-col>
              <div v-if="player.condition.commonBuffs[(i - 1) * 2]" h-24px w-24px fc>
                <img
                  h-20px w-20px cursor-pointer
                  :src="getBuffIcon(player.condition.commonBuffs[(i - 1) * 2], turn)"
                  @click="toggleImage(specPlayerBuff, player.condition.commonBuffs[(i - 1) * 2].status.split('_')[0])"
                >
              </div>
              <div v-if="player.condition.commonBuffs[(i - 1) * 2 + 1]" h-24px w-24px fc>
                <img
                  h-20px w-20px cursor-pointer
                  :src="getBuffIcon(player.condition.commonBuffs[(i - 1) * 2 + 1], turn)"
                  @click="toggleImage(specPlayerBuff, player.condition.commonBuffs[(i - 1) * 2 + 1].status.split('_')[0])"
                >
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.txt-coating-value {
  font-size: 12px;
  color: #31fdff;
  text-shadow:
    0 0 1px #012061,
    0 0 1px #012061,
    0 0 1px #012061,
    0 0 1px #012061,
    0 0 2px #012061,
    0 0 2px #012061,
    0 0 2px #012061,
    0 0 2px #012061;
}
</style>
