<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import md5 from 'md5'
import { artifactList, artifactRuleIndex, artifactRuleList, language } from '~/logic'

const dialogVisible = ref(false)
const inputVisible = ref(false)
const textarea = ref('')

const currentArtifaceRuleInfo = computed(() => artifactRuleList.value[artifactRuleIndex.value].info)
const ruleMd5 = computed(() => md5(JSON.stringify(currentArtifaceRuleInfo.value)).slice(-10))

function handleCopy() {
  if (copy(JSON.stringify(currentArtifaceRuleInfo.value)))
    ElMessage.success(`已复制当前权重规则`)
}

function handlePaste() {
  textarea.value = ''
  inputVisible.value = true
}

function onPasteSubmit() {
  try {
    artifactRuleList.value[artifactRuleIndex.value].info = JSON.parse(textarea.value)
    inputVisible.value = false
    ElMessage.success('导入成功')
  }
  catch (error: any) {
    console.log(error)
    ElMessage.error('数据异常，复制失败')
  }
}
</script>

<template>
  <main>
    <div sticky inset-x-0 top-0 z-999 h-10 flex items-center justify-between rounded class="bg-violet dark:bg-#2d1e3a" px-4 text-base>
      <div flex items-center gap-4>
        <el-select v-model="artifactRuleIndex" size="small" style="width: 150px;">
          <el-option v-for="rule, idx in artifactRuleList" :key="idx" :value="idx" :label="rule.name" />
        </el-select>
        <TheButton @click="dialogVisible = true">
          配置权重
        </TheButton>
        <div text-sm>
          当前规则Key: {{ ruleMd5 }}
        </div>
      </div>
      <div fc gap-2>
        <el-switch
          v-model="language"
          mr-2
          active-value="zh"
          inactive-value="ja"
          style="--el-switch-on-color: #0D9488; --el-switch-off-color: #32C0B3"
        >
          <template #active-action>
            <div i-emojione:flag-for-china />
          </template>
          <template #inactive-action>
            <div i-emojione:flag-for-japan />
          </template>
        </el-switch>

        <TheButton icon="carbon:copy" @click="handleCopy">
          复制规则
        </TheButton>
        <TheButton icon="carbon:paste" @click="handlePaste">
          导入规则
        </TheButton>
        <el-link ml-2 href="https://bbs.nga.cn/read.php?tid=43964410" target="_blank">
          NGA规则分享楼
        </el-link>
      </div>
    </div>
    <div my-10px flex flex-wrap gap-10px>
      <ArtifactCard
        v-for="artifact, idx in artifactList" :key="artifact.id"
        :artifact="artifact"
        :position="`${Math.floor(idx / 5 + 1)}-${idx % 5 + 1}`"
      />
    </div>
    <ArtifactRule v-if="dialogVisible" v-model="dialogVisible" />

    <el-dialog v-model="inputVisible">
      <el-input v-model="textarea" :rows="6" type="textarea" />
      <template #footer>
        <TheButton @click="inputVisible = false">
          取消
        </TheButton>
        <TheButton @click="onPasteSubmit">
          确认
        </TheButton>
      </template>
    </el-dialog>
  </main>
</template>
