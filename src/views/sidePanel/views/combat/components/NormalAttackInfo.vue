<script setup lang="ts">
import type { NormalAttackInfo } from 'battleLog'

defineProps<{ normalAttackInfo: NormalAttackInfo }>()
</script>

<template>
  <div m-2 fc flex-wrap gap-2>
    <el-tag type="primary" effect="dark" size="small">
      {{ `hit: ${normalAttackInfo.hit}` }}
    </el-tag>
    <el-tag type="success" effect="dark" size="small">
      {{ `技伤: ${normalAttackInfo.ability.toLocaleString()}` }}
    </el-tag>
    <el-tag type="warning" effect="dark" size="small">
      {{ `奥伤: ${normalAttackInfo.special.toLocaleString()}` }}
    </el-tag>
    <el-tag type="danger" effect="dark" size="small">
      {{ `总伤害: ${normalAttackInfo.total.toLocaleString()}` }}
    </el-tag>
  </div>
</template>
