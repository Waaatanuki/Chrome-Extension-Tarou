<script setup lang="ts">
import copy from 'copy-text-to-clipboard'

const key = ref('')
const keyList = ref<string[]>([])
const text = ref('')

function handleCommand(command: 'get' | 'set' | 'copy' | 'reset') {
  switch (command) {
    case 'get':
      chrome.storage.local.get([key.value]).then((result) => {
        text.value = JSON.stringify(JSON.parse(result[key.value]), null, 2)
        ElMessage.success('获取成功')
      })
      break
    case 'set':
      try {
        console.log(JSON.parse(text.value))
        chrome.storage.local.set({ [key.value]: text.value }).then(() => {
          ElMessage.success('更新成功')
        })
      }
      catch (error) {
        ElMessage.error('数据不合法')
      }
      break
    case 'copy':
      if (copy(text.value))
        ElMessage.success(`复制成功`)
      break
    case 'reset':
      chrome.storage.local.remove(key.value).then(() => {
        ElMessage.success('重置成功')
        handleCommand('get')
      })
      break
  }
}

onMounted(() => {
  chrome.storage.local.getKeys((keys) => {
    keyList.value = keys
  })
})
</script>

<template>
  <div fc flex-wrap gap-3 p-10>
    <div h-600px w-500px>
      <div fc gap-2 p-2>
        <el-select v-model="key" style="width: 200px" placeholder="" size="small" filterable @change="handleCommand('get')">
          <el-option v-for="item in keyList" :key="item" :label="item" :value="item" />
        </el-select>

        <TheButton @click="handleCommand('set')">
          更新
        </TheButton>
        <TheButton @click="handleCommand('copy')">
          复制
        </TheButton>
        <TheButton @click="handleCommand('reset')">
          重置
        </TheButton>
      </div>

      <el-input v-model="text" type="textarea" :rows="25" />
    </div>
  </div>
</template>
