<script setup lang="ts">
import type { Player } from 'extension'
import type { Buff } from 'source'
import { battleInfo, battleRecord, combatPanelSetting, specPlayerBuff } from '~/logic'

interface DisplayPlayer extends Player {
  condition: {
    buff: Buff[]
    coating_value: number
    importantBuffs: Buff[]
    commonBuffs: Buff[]
    commonBuffGroup: Buff[][]
  }
}

const { position } = defineProps<{ position: { x: number, y: number } }>()

const currentRecord = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
const playerInfo = computed(() => currentRecord.value?.player ?? [])
const formation = computed(() => currentRecord.value?.formation)
const turn = computed(() => battleInfo.value.bossInfo!.turn)

const disPlayPlayer = computed<DisplayPlayer[]>(() => {
  if (!formation.value)
    return []

  const sortInfo = [...formation.value.map(i => ({ index: i }))]

  return sortInfo.map(({ index }) => {
    const player = deepClone(playerInfo.value[index]) as DisplayPlayer
    const importantBuffs: Buff[] = []
    const commonBuffs: Buff[] = []

    for (const buff of player.condition.buff) {
      if (specPlayerBuff.value.some(specBuff => buff.status.startsWith(specBuff)))
        importantBuffs.push(buff)
      else
        commonBuffs.push(buff)
    }
    player.condition.importantBuffs = importantBuffs
    player.condition.commonBuffs = commonBuffs
    player.condition.commonBuffGroup = groupedBuff(commonBuffs)
    return player
  })
})

function groupedBuff(buffs: Buff[]) {
  const groups = []
  const columnCount = 3

  for (let i = 0; i < buffs.length; i += columnCount) {
    groups.push(buffs.slice(i, i + columnCount))
  }

  return groups
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
  <UseDraggable
    v-slot="{ isDragging }"
    class="absolute"
    :initial-value="position"
    :prevent-default="true"
    @end="(position) => {
      combatPanelSetting.NpcCondition.x = position.x
      combatPanelSetting.NpcCondition.y = position.y
    }"
  >
    <div
      class="flex items-center justify-between text-12px"
      :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
    >
      <div flex flex-col items-start justify-center gap-5px>
        <div v-for="player in disPlayPlayer" :key="player.pid" flex gap-10px>
          <div relative h-75px w-75px fc>
            <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
              <span text-12px text-red font-bold>Dead</span>
            </div>
            <div v-if="player.condition.coating_value && !player.is_dead" class="txt-coating-value" absolute bottom-0>
              {{ player.condition.coating_value }}
            </div>
            <img w-full :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id, 's')">
          </div>

          <div flex>
            <div v-for="buff, idx in player.condition.importantBuffs" :key="idx" h-75px w-75px fc p-5px>
              <img
                :src="getBuffIcon(buff, turn)" w-full cursor-pointer
                @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
              >
            </div>

            <div v-for="(row, rowIndex) in player.condition.commonBuffGroup" :key="rowIndex" class="h-75px flex flex-col">
              <div v-for="(buff, colIndex) in row" :key="colIndex" class="h-25px w-25px flex">
                <img
                  h-25px w-25px cursor-pointer
                  :src="getBuffIcon(buff, turn)"
                  @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UseDraggable>
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
