<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(defineProps<{
  size?: '' | 'default' | 'small' | 'large'
  type?: '' | 'default' | 'text' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
  color?: string
  icon?: string
  loading?: boolean
}>(), {
  size: 'small',
  type: 'primary',
  color: 'rgb(13 148 136)',
  loading: false,
})
</script>

<template>
  <el-button :type="type" :color="color" :size="size" :loading="loading">
    <div fc gap-4px>
      <Icon v-if="icon && !loading" :icon="icon" />
      <slot />
    </div>
  </el-button>
</template>
