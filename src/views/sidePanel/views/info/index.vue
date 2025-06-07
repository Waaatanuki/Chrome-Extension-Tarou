<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { updateCode } from '~/api'
import { code } from '~/logic/storage'

const form = reactive({
  oldValue: code.value,
  newValue: '',
})

const btnLoading = ref(false)

function handleCopy(text: string) {
  if (copy(text))
    ElMessage.success(`已复制引继码`)
}

function submit() {
  if (btnLoading.value)
    return
  btnLoading.value = true
  updateCode({ code: form.newValue }).then((data) => {
    code.value = data.code
    form.oldValue = data.code
    ElMessage.success('迁移成功')
  }).catch((err) => {
    ElMessage.error(err.message)
  }).finally(() => {
    btnLoading.value = false
  })
}

function checkPermission() {
  chrome.notifications.getPermissionLevel((level) => {
    if (level === 'granted')
      ElMessage.success('当前弹窗权限正常')
    else
      ElMessage.error('当前弹窗权限被禁止')
  })
}
</script>

<template>
  <el-form :model="form" label-position="top">
    <el-form-item label="当前引继码">
      <el-link ml-2 type="primary" @click="handleCopy(form.oldValue)">
        {{ form.oldValue }}
      </el-link>
    </el-form-item>
    <el-form-item label="迁移引继码">
      <el-input v-model="form.newValue" />
    </el-form-item>
  </el-form>

  <TheButton :loading="btnLoading" @click="submit">
    确定
  </TheButton>

  <TheButton @click="checkPermission">
    检查弹窗权限
  </TheButton>
</template>
