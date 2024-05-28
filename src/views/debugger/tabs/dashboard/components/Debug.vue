<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { battleMemo } from '~/logic'

const visible = defineModel<boolean>({ required: true })

const info = ref({
  version: '',
  userAgent: '',
  battleMemo: [],
})

function copyInfo() {
  const data = {
    ...info.value,
    battleMemo: battleMemo.value,
  }
  if (copy(JSON.stringify(data)))
    ElMessage.success(`已复制调试信息`)
}

function handleOpen() {
  const manifest = chrome.runtime.getManifest()
  info.value.version = manifest.version
  info.value.userAgent = window.navigator.userAgent
}
</script>

<template>
  <el-dialog v-model="visible" width="400" :show-close="false" @open="handleOpen">
    <el-descriptions :column="1" border>
      <template #extra>
        <TheButton @click="copyInfo">
          复制调试信息
        </TheButton>
      </template>
      <el-descriptions-item label="插件版本">
        {{ info.version }}
      </el-descriptions-item>
      <el-descriptions-item label="userAgent">
        {{ info.userAgent }}
      </el-descriptions-item>
    </el-descriptions>

    <div flex justify-between px-2 pt-2>
      <el-link href="https://bbs.nga.cn/read.php?tid=30999435" target="_blank">
        NGA主题帖
      </el-link>
      <el-link>QQ交流群: 194260754</el-link>
    </div>
  </el-dialog>
</template>
