<script setup lang="ts">
import { dungeonInfo, dungeonStatusList } from '~/logic'

type StatusType = 'unique' | 'rare' | 'normal' | 'cursed'

const type: StatusType[] = ['unique', 'rare', 'normal', 'cursed']
const activeType = shallowRef<StatusType>()
const rarityByType: Record<StatusType, number> = {
  unique: 3,
  rare: 2,
  normal: 1,
  cursed: 99,
}

const { height } = useWindowSize()
const statusSummary = computed(() => processStatusSummary())
const nodeSummary = computed(() => processNodeSummary())

const filteredList = computed(() => (dungeonInfo.value.statusList ?? [])
  .filter(status => !activeType.value || status.rarity === rarityByType[activeType.value])
  .filter(status => status.num > 0)
  .map(status => ({
    ...status,
    isFavorited: dungeonStatusList.value.some(s => s.statusId === status.statusId && s.isFavorited),
  }))
  .sort((a, b) => Number(b.isFavorited) - Number(a.isFavorited) || b.rarity - a.rarity))

const cursedList = computed(() => (dungeonInfo.value.statusList ?? [])
  .filter(status => status.rarity === rarityByType.cursed)
  .filter(status => status.num > 0)
  .map(status => ({
    ...status,
    isFavorited: dungeonStatusList.value.some(s => s.statusId === status.statusId && s.isFavorited),
  }))
  .sort((a, b) => Number(b.isFavorited) - Number(a.isFavorited)))

function toggleType(statusType: StatusType) {
  activeType.value = activeType.value === statusType ? undefined : statusType
}

function changeStatus(statusId: number) {
  const hitStatus = dungeonStatusList.value.find(s => s.statusId === statusId)
  if (hitStatus)
    hitStatus.isFavorited = !hitStatus.isFavorited
}
</script>

<template>
  <div grid gap-10px>
    <div class="grid grid-cols-6 ml--5px mr-5px mt-10px gap-10px">
      <el-tooltip
        v-for="node, idx in nodeSummary" :key="idx"
        :content="node.comment" placement="bottom"
      >
        <el-badge :value="node.count" :offset="[-5, 2]">
          <img :src="getOfficialUrl(`/sp/arcarum3/assets/node_icon/${node.icon}.png`)">
        </el-badge>
      </el-tooltip>
    </div>

    <div v-if="dungeonInfo.bossInfo?.some(b => b.hp !== 0)" grid>
      <div
        v-for="boss, idx in dungeonInfo.bossInfo" :key="idx"
        class="ml--4px flex items-center text-12px"
      >
        <img size-50px :src="getBossImg('enemy', boss.imageId, 's')">
        <div class="relative h-40px w-full rounded bg-neutral-5 text-12px">
          <div
            class="hp-bar h-full rounded bg-green-6"
            :style="{ width: `${boss.hp / boss.maxHp * 100}%` }"
          />
          <span class="normal-hp-text absolute inset-0 text-center leading-40px">
            {{ boss.hp.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-6 gap-5px">
      <div v-for="npc, key in dungeonInfo.party" :key="key" relative>
        <img :src="getOfficialUrl(`/sp/assets/${key === 0 ? 'leader' : 'npc'}/raid_normal/${npc.imageId}.jpg`)">
        <div class="absolute bottom-0 h-18px w-full bg-neutral-5 text-10px">
          <div
            class="hp-bar h-full bg-green-6"
            :style="{ width: `${npc.hp / npc.maxHp * 100}%` }"
          />

          <div class="normal-hp-text absolute bottom-18px right-2px" :class="{ 'danger-hp-text': npc.hp / npc.maxHp < 0.25 }">
            {{ Math.ceil(npc.hp / npc.maxHp * 100) }}%
          </div>
          <span class="normal-hp-text absolute inset-0 text-center leading-18px" :class="{ 'danger-hp-text': npc.hp / npc.maxHp < 0.25 }">
            {{ npc.hp }}
          </span>
        </div>
      </div>
    </div>

    <template v-if="dungeonInfo.showStatusList">
      <div v-if="dungeonInfo.statusList?.length" grid grid-cols-4 mt-10px gap-10px>
        <div v-for="t in type" :key="t" @click="toggleType(t)">
          <img :src="getOfficialUrl(`/sp/arcarum3/book/tab/btn_${t}_${activeType === t ? 'on' : 'off'}.png`)">
        </div>
      </div>

      <el-scrollbar :max-height="`${height - 500}px`">
        <div grid gap-10px p-2px>
          <div
            v-for="status in filteredList"
            :key="status.statusId"
            class="relative cursor-pointer select-none rounded p-8px text-center"
            :class="[
              status.isFavorited ? 'bless-rank1-style' : '',
              status.rarity === 99 ? 'shadow-[0_0_3px_3px_#dc2626]' : 'ring-1 ring-neutral-6',
            ]"
            @click="changeStatus(status.statusId)"
          >
            {{ status.name }}
            <span v-if="status.num > 1" class="absolute bottom-2px right-4px text-10px text-neutral-4">
              x{{ status.num }}
            </span>
          </div>
        </div>
      </el-scrollbar>
    </template>

    <template v-else>
      <div class="status-grid overflow-hidden rounded" grid grid-cols-3 border-l border-t border-neutral-7>
        <div v-for="s in statusSummary" :key="s.label" fc border-b border-r border-neutral-7 py-2>
          <el-tag :type="s.value > 0 ? 'success' : 'info'">
            {{ s.label + (s.value > 1 ? `(${s.value})` : '') }}
          </el-tag>
        </div>
      </div>

      <div grid gap-10px p-2px>
        <div
          v-for="status in cursedList"
          :key="status.statusId"
          class="relative cursor-pointer select-none rounded p-8px text-center"
          :class="[
            status.isFavorited ? 'bless-rank1-style' : '',
            status.rarity === 99 ? 'shadow-[0_0_3px_3px_#dc2626]' : 'ring-1 ring-neutral-6',
          ]"
          @click="changeStatus(status.statusId)"
        >
          {{ status.name }}
          <span v-if="status.num > 1" class="absolute bottom-2px right-4px text-10px text-neutral-4">
            x{{ status.num }}
          </span>
        </div>
      </div>
    </template>

    <div fc>
      <TheButton style="height: 30px" w-full @click="dungeonInfo.showStatusList = !dungeonInfo.showStatusList">
        切换显示
      </TheButton>
      <TheButton style="height: 30px" w-full @click="openPopupWindow('DungeonMap')">
        地图信息
      </TheButton>
    </div>
  </div>
</template>

<style scoped>
.hp-bar {
  transition: width 300ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .hp-bar {
    transition: none;
  }
}

.status-grid > :last-child:nth-child(3n + 1) {
  grid-column: 1 / -1;
  border-bottom-right-radius: 0.25rem;
}

.status-grid > :last-child:nth-child(3n + 2) {
  grid-column: span 2;
  border-bottom-right-radius: 0.25rem;
}

.normal-hp-text {
  text-shadow:
    0 0 1px #0b3300,
    0 0 2px #0b3300,
    0 0 1px #0b3300,
    0 0 2px #0b3300,
    0 0 1px #0b3300,
    0 0 2px #0b3300,
    0 0 1px #0b3300,
    0 0 2px #0b3300;
}

.danger-hp-text {
  text-shadow:
    0 0 1px #ff4d00,
    0 0 2px #ff4d00,
    0 0 1px #ff4d00,
    0 0 2px #ff4d00,
    0 0 1px #ff4d00,
    0 0 2px #ff4d00,
    0 0 1px #ff4d00,
    0 0 2px #ff4d00;
}

.bless-rank1-style {
  color: #ffa826;
  text-shadow:
    0px 0px 1px #694429,
    0px 0px 1px #694429,
    0px 0px 1px #694429,
    0px 0px 2px #694429,
    0px 0px 2px #694429,
    0px 0px 2px #694429;
}
</style>
