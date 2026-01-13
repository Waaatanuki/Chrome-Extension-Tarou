<script setup lang="ts">
import type { RemovableRef } from '@vueuse/shared'
import copy from 'copy-text-to-clipboard'
import { getConfig, setConfig, updateCode } from '~/api'
import { artifactRuleIndex, artifactRuleList, buildNpcFilter, code, combatPanelSetting, gachaRecord, markedUserList, notificationItem, notificationSetting, questConfig, questSetting, recoveryItemList, saveStoneDate, specBossBuff, specPlayerBuff, userInfo, volume, widgetList } from '~/logic/storage'

const { checkCode } = useUser()

const info = ref({
  permission: {
    notifications: 'granted',
  },
  version: '',
  userAgent: '',
})

function showSupport() {
  if (!userInfo.value.imgPc) {
    ElMessage.info('还未获取友招信息')
    return
  }
  openPopupWindow('SupportSummon')
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

const configMap: Record<string, RemovableRef<any>> = {
  volume,
  notificationSetting,
  notificationItem,
  gachaRecord,
  saveStoneDate,
  recoveryItemList,
  widgetList,
  specBossBuff,
  specPlayerBuff,
  questSetting,
  questConfig,
  markedUserList,
  artifactRuleIndex,
  artifactRuleList,
  buildNpcFilter,
  combatPanelSetting,
}

function handleGetConfig() {
  getConfig().then(({ data }) => {
    for (const key in configMap) {
      configMap[key].value = data[key] ?? configMap[key].value
    }
    ElMessage.success('同步成功')
  }).catch((err) => {
    ElMessage.error(err.message)
  })
}

function handleSetConfig() {
  const config: Record<string, any> = {}
  for (const key in configMap) {
    config[key] = configMap[key].value
  }

  setConfig(config).then(() => {
    ElMessage.success('上传成功')
  }).catch((err) => {
    ElMessage.error(err.message)
  })
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
          <el-link href="https://waaatanuki.github.io/tarou-docs" target="_blank">
            太郎使用手册
          </el-link>
        </div>
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

  <div my-10px flex items-center justify-between px-4>
    <el-tooltip content="将插件配置上传到服务器">
      <TheButton class="w-1/2" @click="handleSetConfig">
        上传配置
      </TheButton>
    </el-tooltip>
    <el-tooltip content="获取服务器上的插件配置">
      <TheButton class="w-1/2" @click="handleGetConfig">
        同步配置
      </TheButton>
    </el-tooltip>
  </div>

  <el-popover placement="bottom" width="300">
    <template #reference>
      <div hover="text-teal-6" m-auto mt-20px w-150px fc cursor-pointer gap-2>
        <div i-carbon:help-filled @click="openPopupWindow('Debug')" />
        <div>常见问题处理</div>
      </div>
    </template>
    <img :src="getLocalImg('reload')">
  </el-popover>

  <div m-auto mt-10px w-150px text-12px>
    <a href="https://afdian.com/a/tarou" target="_blank" class="group">
      <div fc gap-1 rounded-lg px-4 py-2 group-hover=" text-yellow">
        <div
          i-ph-lightning-duotone group-hover="i-ph-lightning-fill"
          transition-all
        />
        <div>
          在爱发电上支持我
        </div>
      </div>
    </a>
  </div>
</template>
