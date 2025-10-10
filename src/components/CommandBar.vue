<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Command {
  lable: string
  icon: string
  handler: () => void
}

defineProps<{
  commands: Command[]
}>()
</script>

<template>
  <div
    fixed left-60px top-3px z-9999 h-4px w-200px
    overflow-hidden rounded-xl bg-teal-7 transition-all duration-300 hover:h-30px
  >
    <div h-30px fc gap-8px>
      <el-tooltip v-for="command in commands" :key="command.lable" effect="dark" :content="command.lable" placement="bottom" :show-after="500">
        <div h-25px w-25px fc shrink-0 cursor-pointer rounded-full hover:bg-teal-9 @click="command.handler">
          <Icon :icon="command.icon" text-12px />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
