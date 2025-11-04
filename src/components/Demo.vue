<script setup lang="ts">
const { position } = defineProps<{ position: { x: number, y: number } }>()

const handle = useTemplateRef<HTMLElement>('handle')

const interrupt_display_text = ref('nizaindiwndiwni')
</script>

<template>
  <UseDraggable
    v-slot="{ isDragging }"
    class="absolute rounded p-1"
    ring="3 rose"
    :initial-value="position"
    :prevent-default="true"
    :handle="handle"
  >
    <div class="flex flex-col gap-4px" :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }">
      <el-tag v-for="text in interrupt_display_text.split('|')" :key="text" style="font-size: 20px;" disable-transitions>
        {{ text }}
      </el-tag>
    </div>
  </UseDraggable>
</template>

<style scoped>

</style>
