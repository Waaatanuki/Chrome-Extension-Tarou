<script setup lang="ts">
import { battleInfo, battleRecord, combatPanelSetting } from '~/logic'

const { position } = defineProps<{ position: { x: number, y: number } }>()

const playerInfo = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId)?.player)

const handle = useTemplateRef<HTMLElement>('handle')

function getRengeki(type: 'sa' | 'da' | 'ta', info: { total: number, sa: number, da: number, ta: number }) {
  return `${Math.floor(info[type] / info.total * 100)}%`
}
</script>

<template>
  <UseDraggable
    v-slot="{ isDragging }"
    class="absolute w-250px"
    border="~ neutral-7 rounded"
    :initial-value="position"
    :prevent-default="true"
    :handle="handle"
    @end="(position) => {
      combatPanelSetting.NpcCount.x = position.x
      combatPanelSetting.NpcCount.y = position.y
    }"
  >
    <div
      class="flex items-center justify-between bg-neutral-7 px-2 py-1 text-12px"
      :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
    >
      <div ref="handle" flex-1>
        其他统计
      </div>
    </div>

    <div flex flex-col items-start justify-center gap-5px p-5px>
      <div v-for="player in playerInfo" :key="player.pid" fc gap-5px>
        <div relative w-45px>
          <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
            <span text-12px text-red font-bold>Dead</span>
          </div>
          <img w-full :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id, 's')">
        </div>
        <div fc flex-col gap-5px>
          <div relative w-50px>
            <img w-full :src="getLocalImg('ability-count-bg')">
            <div absolute inset-y-0 right-7px fc text-12px>
              {{ player.use_ability_count }}
            </div>
          </div>
          <div relative w-50px>
            <img w-full :src="getLocalImg('special-count-bg')">
            <div absolute inset-y-0 right-7px fc text-12px>
              {{ player.use_special_skill_count }}
            </div>
          </div>
        </div>
        <div w-130px>
          <ElTooltip
            v-if="player.attackInfo"
            :content="`总次数: ${player.attackInfo.total} TA: ${getRengeki('ta', player.attackInfo)} DA: ${getRengeki('da', player.attackInfo)}  SA: ${getRengeki('sa', player.attackInfo)}`"
            placement="top" effect="dark" :show-after="500"
          >
            <div ml-5px w-full flex items-center gap-5px text-12px>
              <img w-30px src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/skill/ex_skill_ta.png">
              <div>
                {{ `${player.attackInfo.ta}/${player.attackInfo.total} (${getRengeki('ta', player.attackInfo)})` }}
              </div>
            </div>
          </ElTooltip>
        </div>
      </div>
    </div>
  </UseDraggable>
</template>
