<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { battleInfo, battleRecord, combatPanelSetting } from '~/logic'

const { position } = defineProps<{ position: { x: number, y: number } }>()

const currentRaid = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
const operationSecond = computed(() => currentRaid.value ? currentRaid.value.startTimer - currentRaid.value.endTimer : 0)

function handleCopy(text: string) {
  if (copy(text))
    ElMessage.success(`已复制救援码${text}`)
}
</script>

<template>
  <UseDraggable
    v-if="battleInfo.bossInfo"
    v-slot="{ x, y, isDragging }"
    class="absolute"
    :initial-value="position"
    :prevent-default="true"
    @end="(position) => {
      combatPanelSetting.RoomInfo.x = position.x
      combatPanelSetting.RoomInfo.y = position.y
    }"
  >
    <div :class="{ hidden: !isDragging }" class="absolute left-0 top--30px w-150px">
      {{ `X: ${parseInt(x)}, Y: ${parseInt(y)}` }}
    </div>
    <div class="w-300px" :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }">
      <el-descriptions :column="2" :border="true" direction="vertical">
        <el-descriptions-item label="房间人数" align="center" label-width="150">
          <div>
            {{ battleInfo.bossInfo.limitNum === 1 ? '-' : `${battleInfo.bossInfo.fellow}/${battleInfo.bossInfo.limitNum}` }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="救援码" align="center" label-width="150">
          <div v-if="battleInfo.bossInfo.shareId" hover:text-amber @click="handleCopy(battleInfo.bossInfo.shareId)">
            {{ battleInfo.bossInfo.shareId }}
          </div>
          <div v-else>
            -
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="操作时长" align="center">
          {{ formatTime(operationSecond) }}
        </el-descriptions-item>
        <el-descriptions-item label="造成伤害" align="center">
          <div>
            {{ currentRaid?.damage || '-' }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="获得贡献" align="center" :span="2">
          <div text-15px text-rose>
            {{ currentRaid?.point ? Math.floor(currentRaid.point).toLocaleString() : '-' }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </UseDraggable>
</template>
