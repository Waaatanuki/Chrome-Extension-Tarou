<script setup lang="ts">
const { position } = defineProps<{ position: { x: number, y: number } }>()

const handle = useTemplateRef<HTMLElement>('handle')

const interrupt_display_text = ref('nizaindiwndiwni')
</script>

<template>
  <UseDraggable
    v-slot="{ x, y, isDragging }"
    class="absolute rounded p-1"
    ring="3 rose"
    :initial-value="position"
    :prevent-default="true"
    :handle="handle"
  >
    <div :class="{ hidden: !isDragging }" class="absolute left-0 top--30px w-150px">
      {{ `X: ${parseInt(x)}, Y: ${parseInt(y)}` }}
    </div>
    <div class="flex flex-col gap-4px" :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }">
      123
    </div>
  </UseDraggable>
</template>

<style scoped>

</style>
