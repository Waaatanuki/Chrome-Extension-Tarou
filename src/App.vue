<script setup lang="ts">
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
</script>

<template>
  <Contact absolute bottom-15px right-15px />
  <div m-auto w-100>
    <el-alert type="info" center show-icon effect="dark" :closable="false" title="进入战斗时将会读取相关信息" />
  </div>
</template>
