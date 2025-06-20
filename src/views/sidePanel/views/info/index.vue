<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { updateCode } from '~/api'
import { code, userInfo } from '~/logic/storage'

const { checkCode } = useUser()

const info = ref({
  permission: {
    notifications: 'granted',
  },
  version: '',
  userAgent: '',
})

const supportVisible = ref(false)

function showSupport() {
  if (!userInfo.value.imgPc) {
    ElMessage.info('还未获取友招信息')
    return
  }
  supportVisible.value = true
}

function handleCopy() {
  if (copy(code.value))
    ElMessage.success(`已复制引继码`)
}

function changeCode() {
  if (!code.value) {
    ElMessage.info(`还未生成引继码`)
    return
  }

  ElMessageBox.prompt('请输入新的的引继码', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm' && instance.inputValue) {
        instance.confirmButtonLoading = true
        updateCode({ code: instance.inputValue }).then((data) => {
          code.value = data.code
          done()
        }).catch(() => {
          ElMessage.error('迁移失败')
        }).finally(() => {
          instance.confirmButtonLoading = false
        })
      }
      else {
        done()
      }
    },
  })
    .then(() => {
      ElMessage.success('迁移成功')
    })
    .catch(() => {})
}

onMounted(() => {
  checkCode()

  chrome.notifications.getPermissionLevel((level) => {
    info.value.permission.notifications = level
  })
  const manifest = chrome.runtime.getManifest()
  info.value.version = manifest.version
  info.value.userAgent = window.navigator.userAgent
})
</script>

<template>
  <el-descriptions :column="1" :border="true" direction="vertical" w-300px>
    <el-descriptions-item label="玩家ID">
      <template #label>
        <div flex justify-between>
          <div>玩家ID</div>
          <TheButton @click="showSupport">
            友招
          </TheButton>
        </div>
      </template>
      {{ userInfo.uid ? userInfo.uid : '未获取' }}
    </el-descriptions-item>
    <el-descriptions-item label="引继码">
      <template #label>
        <div flex justify-between>
          <div>引继码</div>
          <TheButton @click="changeCode">
            迁移
          </TheButton>
        </div>
      </template>
      <div hover="text-teal-6" cursor-pointer @click="handleCopy">
        {{ code ? code : '未生成' }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="权限">
      <div flex flex-col>
        <div flex justify-between>
          <div>通知权限</div>
          <el-tag :type="info.permission.notifications === 'granted' ? 'success' : 'danger'">
            {{ info.permission.notifications === 'granted' ? '正常' : '禁用' }}
          </el-tag>
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="插件版本">
      {{ info.version }}
    </el-descriptions-item>
    <el-descriptions-item label="UserAgent">
      {{ info.userAgent }}
    </el-descriptions-item>
    <el-descriptions-item label="相关链接">
      <div flex flex-col>
        <div>
          <el-link href="https://github.com/Waaatanuki/Chrome-Extension-Tarou" target="_blank">
            Github 插件仓库
          </el-link>
        </div>
        <div>
          <el-link href="https://gbf.pub" target="_blank">
            Granblue Master
          </el-link>
        </div>
        <div>
          <el-link href="https://bbs.nga.cn/read.php?tid=30999435" target="_blank">
            NGA主题帖
          </el-link>
        </div>
        <div>
          <el-link>QQ交流群: 194260754</el-link>
        </div>
      </div>
    </el-descriptions-item>
  </el-descriptions>

  <el-popover placement="top" width="300">
    <template #reference>
      <div hover="text-teal-6" m-auto mt-20px w-150px fc cursor-pointer gap-2>
        <div i-carbon:help-filled />
        <div>常见问题处理</div>
      </div>
    </template>
    <img :src="getLocalImg('reload')">
  </el-popover>

  <el-dialog v-model="supportVisible" :fullscreen="true">
    <SupportSummon m-auto mt-20px />
  </el-dialog>
</template>
