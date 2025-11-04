<script setup lang="ts">
import { battleInfo, combatPanelSetting } from '~/logic'

const { position } = defineProps<{ position: { x: number, y: number } }>()

function handleDragEnd(position: { x: number, y: number }) {
  combatPanelSetting.value.InterruptText.x = position.x
  combatPanelSetting.value.InterruptText.y = position.y
}
</script>

<template>
  <UseDraggable
    v-slot="{ isDragging }"
    class="absolute rounded p-1"
    ring="3 rose"
    :initial-value="position"
    :prevent-default="true"
    @end="handleDragEnd"
  >
    <div
      v-if="battleInfo.bossInfo?.interrupt_display_text"
      class="flex flex-col gap-4px"
      :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
    >
      <el-tag v-for="text in battleInfo.bossInfo.interrupt_display_text.split('|')" :key="text" size="large" style="font-size: 15px;" disable-transitions>
        {{ text }}
      </el-tag>
    </div>
  </UseDraggable>
</template>
