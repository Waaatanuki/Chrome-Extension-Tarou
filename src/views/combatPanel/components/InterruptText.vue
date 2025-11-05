<script setup lang="ts">
import { battleInfo, combatPanelSetting } from '~/logic'

const { position } = defineProps<{ position: { x: number, y: number } }>()
</script>

<template>
  <UseDraggable
    v-if="battleInfo.bossInfo?.interrupt_display_text"
    v-slot="{ x, y, isDragging }"
    class="absolute rounded p-1"
    ring="3 rose"
    :initial-value="position"
    :prevent-default="true"
    @end="(position) => {
      combatPanelSetting.InterruptText.x = position.x
      combatPanelSetting.InterruptText.y = position.y
    }"
  >
    <div :class="{ hidden: !isDragging }" class="absolute left-0 top--30px w-150px">
      {{ `X: ${parseInt(x)}, Y: ${parseInt(y)}` }}
    </div>
    <div class="flex flex-col gap-4px" :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }">
      <el-tag v-for="text in battleInfo.bossInfo.interrupt_display_text.split('|')" :key="text" size="large" style="font-size: 15px;" disable-transitions>
        {{ text }}
      </el-tag>
    </div>
  </UseDraggable>
</template>
