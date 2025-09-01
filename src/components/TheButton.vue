<script setup lang="ts">
import type { ButtonProps } from 'element-plus'
import { Icon } from '@iconify/vue'

type MyButtonProps = Partial<ButtonProps> & {
  icon?: string
}

const { size = 'small', type = 'primary', color = 'rgb(13 148 136)', icon, loading = false } = defineProps<MyButtonProps>()
</script>

<template>
  <el-button v-bind="{ ...$attrs, ...$props }">
    <div fc gap-4px>
      <Icon v-if="icon && !loading" :icon="icon" />
      <slot />
    </div>
  </el-button>
</template>
