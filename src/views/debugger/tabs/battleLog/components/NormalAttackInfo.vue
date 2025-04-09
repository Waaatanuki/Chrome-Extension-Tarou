<script setup lang="ts">
import type { NormalAttackInfo } from 'battleLog'

defineProps<{ border?: boolean, normalAttackInfo: NormalAttackInfo }>()
</script>

<template>
  <div my-2 fc flex-wrap gap-2>
    <el-tag type="primary" effect="dark">
      {{ `hit: ${normalAttackInfo.hit}` }}
    </el-tag>
    <el-tag type="success" effect="dark">
      {{ `技伤: ${normalAttackInfo.ability.toLocaleString()}` }}
    </el-tag>
    <el-tag type="warning" effect="dark">
      {{ `奥伤: ${normalAttackInfo.special.toLocaleString()}` }}
    </el-tag>
    <el-tag type="danger" effect="dark">
      {{ `总伤害: ${normalAttackInfo.total.toLocaleString()}` }}
    </el-tag>
  </div>
</template>
