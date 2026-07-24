<script setup lang="ts">
import type { DungeonNode } from 'extension'
import { DUNGEON_MAP_HEIGHT, DUNGEON_MAP_WIDTH, DUNGEON_SPECIAL_NODE_LIST } from '~/constants/dungeon'
import { dungeonInfo } from '~/logic'

const hoveredNodeType = ref<number | null>(null)
const hoveredSpecialNodeId = ref<number | null>(null)

const normalNodeSummary = computed(() => processNormalNodeSummary())

const specialNodeSummary = computed(() => processSpecialNodeSummary())

const currentNode = computed(() =>
  dungeonInfo.value.nodeList?.find(node => node.nodeId === dungeonInfo.value.currentNodeId),
)

function getSpecialNodeDefinition(incidentId: number | null) {
  return incidentId === null
    ? undefined
    : DUNGEON_SPECIAL_NODE_LIST.find(node => node.incidentId === incidentId)
}

function getNodeIconUrl(node: DungeonNode) {
  if (node.nodeType === 0)
    return null

  const iconName = node.nodeType === 10
    ? getSpecialNodeDefinition(node.specialIncidentId)?.icon.replace('.png', '')
    : String(node.nodeType)

  return iconName ? `/sp/arcarum3/assets/node_icon/${iconName}.png` : null
}

function getNodePosition(position: number, size: number) {
  return `${position / size * 100}%`
}
</script>

<template>
  <div w-full overflow-hidden p-20px>
    <div class="fc gap-20px">
      <el-badge
        v-for="item, t in normalNodeSummary"
        :key="t" :value="item.count"
        :offset="[-5, 2]"
        class="transition-transform duration-[160ms] ease"
        :class="{ 'scale-[1.2]': hoveredNodeType === item.nodeType }"
        @mouseenter="hoveredNodeType = item.nodeType"
        @mouseleave="hoveredNodeType = null"
      >
        <img block w-50px :src="getOfficialUrl(`/sp/arcarum3/assets/node_icon/${item.nodeType}.png`)">
      </el-badge>
    </div>
    <div
      class="relative m-auto max-w-1000px"
      :style="{ aspectRatio: `${DUNGEON_MAP_WIDTH} / ${DUNGEON_MAP_HEIGHT}` }"
    >
      <svg
        class="pointer-events-none absolute inset-0 h-full w-full"
        :viewBox="`0 0 ${DUNGEON_MAP_WIDTH} ${DUNGEON_MAP_HEIGHT}`"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <template v-for="node in dungeonInfo.nodeList" :key="`edges-${node.nodeId}`">
          <line
            v-for="adjacentNodeId in node.adjacentNodeIds.filter(id => id > node.nodeId)"
            :key="`${node.nodeId}-${adjacentNodeId}`"
            :x1="node.positionX"
            :y1="node.positionY"
            :x2="dungeonInfo.nodeList!.find(adjacentNode => adjacentNode.nodeId === adjacentNodeId)?.positionX"
            :y2="dungeonInfo.nodeList!.find(adjacentNode => adjacentNode.nodeId === adjacentNodeId)?.positionY"
            stroke="gray"
            stroke-width="12"
          />
        </template>
      </svg>
      <div
        v-for="node in dungeonInfo.nodeList"
        :key="node.nodeId"
        class="absolute z-1 aspect-[9/10] w-[3.5%] translate-x-[-50%] translate-y-[-86%] transform transition-[opacity,filter,transform] duration-[160ms] ease"
        :style="{
          left: getNodePosition(node.positionX, DUNGEON_MAP_WIDTH),
          top: getNodePosition(node.positionY, DUNGEON_MAP_HEIGHT),
        }"
        :class="{
          'opacity-20': (
            hoveredNodeType !== null && node.nodeType !== hoveredNodeType
            || hoveredSpecialNodeId !== null && (node.nodeType !== 10 || node.specialIncidentId !== hoveredSpecialNodeId)
          ) && node.nodeId !== dungeonInfo.currentNodeId,
          'scale-[1.2] z-2': (
            hoveredNodeType !== null && node.nodeType === hoveredNodeType
            || hoveredSpecialNodeId !== null && node.nodeType === 10 && node.specialIncidentId === hoveredSpecialNodeId
          ) && node.nodeId !== dungeonInfo.currentNodeId,
        }"
        :title="`Node ${node.nodeId}`"
      >
        <img
          class="absolute inset-0 z-1 block h-full w-full object-contain"
          :src="getOfficialUrl(`/sp/arcarum3/assets/node_icon/base.png`)"
        >
        <img
          v-if="getNodeIconUrl(node) && node.nodeId !== dungeonInfo.currentNodeId"
          class="absolute inset-0 z-1 block h-full w-full object-contain"
          :src="getOfficialUrl(getNodeIconUrl(node)!)"
        >
      </div>
      <div
        v-if="currentNode"
        class="absolute z-2 aspect-[9/10] w-[3.5%] translate-x-[-50%] translate-y-[-86%] transform transition-[left,top] duration-500 ease-out"
        :style="{
          left: getNodePosition(currentNode.positionX, DUNGEON_MAP_WIDTH),
          top: getNodePosition(currentNode.positionY, DUNGEON_MAP_HEIGHT),
        }"
      >
        <img
          class="absolute inset-0 z-2 block h-full w-full object-contain"
          :src="getOfficialUrl(`/sp/arcarum3/assets/node_icon/piece_1.png`)"
        >
        <img
          class="absolute inset-0 top--20px z-3 block h-[60%] w-[60%] w-full animate-bounce object-contain motion-reduce:animate-none"
          :src="getOfficialUrl(`/sp/arcarum3/dungeon/pointer_current_node.png`)"
        >
      </div>
    </div>
    <div v-if="specialNodeSummary.length" class="mt-20px pt-16px">
      <div class="fc flex-wrap gap-30px">
        <div
          v-for="specialNode in specialNodeSummary"
          :key="specialNode.incidentId"
          relative size-200px
          @mouseenter="hoveredSpecialNodeId = specialNode.incidentId"
          @mouseleave="hoveredSpecialNodeId = null"
        >
          <div
            class="absolute inset-0 transition-[opacity,transform] duration-[160ms] ease"
            :class="{ 'z-1 scale-[1.2]': hoveredSpecialNodeId === specialNode.incidentId }"
          >
            <img
              v-if="specialNode.hasBackground"
              class="w-full scale-150"
              :src="getOfficialUrl(`/sp/arcarum3/assets/scpecial_node_bg/${specialNode.incidentId}.png`)"
            >
            <img
              class="absolute inset-0 left-1/2 top-1/2 z-999 w-40px -translate-x-1/2 -translate-y-1/2"
              :src="getOfficialUrl(`/sp/arcarum3/assets/node_icon/${specialNode.icon}.png`)"
              :alt="`特殊事件 ${specialNode.incidentId}`"
            >
            <div class="absolute inset-x-0 bottom-25px text-center">
              {{ specialNode.comment }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
