<script setup lang="ts">
import type { MarkedUser } from 'myStorage'
import { markedUserList } from '~/logic'

const { height } = useWindowSize()

const uploadBtnLoading = ref(false)

function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}

const { open, reset, onChange } = useFileDialog({ accept: '.json' })

onChange(async (files) => {
  if (!files)
    return

  uploadBtnLoading.value = true

  const mapData = new Map<string, MarkedUser>()
  for (const item of markedUserList.value) {
    mapData.set(item.id, item)
  }

  try {
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      if (file.type !== 'application/json')
        continue
      const data = await loadFile(file)

      for (const item of data) {
        mapData.set(item.id, item)
      }
    }
    markedUserList.value = [...mapData.values()]
    ElMessage.success('导入成功')
  }
  catch (error) {
    ElMessage.error(String(error))
  }
  finally {
    uploadBtnLoading.value = false
  }
})

function loadFile(file: File) {
  return new Promise<MarkedUser[]>((resolve) => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(JSON.parse(reader.result as string))
    }
    reader.readAsText(file)
  })
}

function handleImport() {
  reset()
  open()
}

function handleExport() {
  if (markedUserList.value.length === 0)
    return ElMessage.info('没有数据可以导出')
  const event = new Date()
  const filename = `标记玩家 ${event.toLocaleDateString()}`
  downloadJSON(JSON.stringify(markedUserList.value, null, 2), filename)
}

function downloadJSON(dataSet: string, filename: string) {
  const blob = new Blob([dataSet], { type: 'application/json' })
  const a = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(href)
}
</script>

<template>
  <el-scrollbar :height="height - 71">
    <div mb-2 flex items-center justify-between px-5>
      <div fc gap-2>
        <TheButton :loading="uploadBtnLoading" @click="handleImport">
          导入
        </TheButton>

        <TheButton @click="handleExport">
          导出
        </TheButton>
      </div>

      <el-popconfirm title="清空操作无法恢复，确认清空吗?" width="300" @confirm="markedUserList = []">
        <template #reference>
          <TheButton>
            清空
          </TheButton>
        </template>
      </el-popconfirm>
    </div>
    <div fc flex-wrap gap-20px>
      <div v-for="user, idx in markedUserList" :key="user.id">
        <el-descriptions :column="3" border direction="vertical" size="small">
          <el-descriptions-item label="ID" width="100" align="center">
            <el-link type="primary" @click="goProfilePage(user.id)">
              {{ user.id }}
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="昵称" width="150" align="center">
            {{ user.name }}
          </el-descriptions-item>
          <el-descriptions-item label="等级" width="100" align="center">
            {{ user.rank }}
          </el-descriptions-item>
          <el-descriptions-item label="备注">
            <template #label>
              <div flex items-center justify-between>
                <div fc gap-10px>
                  备注 <el-rate v-model="user.rate" clearable size="small" />
                </div>
                <div i-carbon:trash-can icon-btn @click="markedUserList.splice(idx, 1)" />
              </div>
            </template>
            <el-input v-model="user.comment" type="textarea" size="small" :rows="3" />
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </el-scrollbar>
</template>
