<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { artifactList, artifactRuleIndex, artifactRuleList, language } from '~/logic'

const inputVisible = ref(false)
const textarea = ref('')
const filter = ref('')
const currentArtifaceRuleInfo = computed(() => artifactRuleList.value[artifactRuleIndex.value].info)

function handleCommand(command: string | number | object) {
  switch (command) {
    case 'box':
      openPopupWindow('ArtifactBox')
      break
    case 'rule':
      openPopupWindow('ArtifactRule')
      break
    case 'lang':
      language.value = language.value === 'zh' ? 'ja' : 'zh'
      break
    case 'copy':
      if (copy(JSON.stringify(currentArtifaceRuleInfo.value)))
        ElMessage.success(`已复制当前权重规则`)
      break
    case 'paste':
      textarea.value = ''
      inputVisible.value = true
      break
    case 'share':
      window.open('https://bbs.nga.cn/read.php?tid=43964410', '_blank')
      break
  }
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
    <div sticky inset-x-0 top-0 z-999 h-10 flex items-center justify-between rounded bg-neutral-8 px-2 text-base>
      <div fc gap-2>
        <el-select v-model="artifactRuleIndex" size="small" style="width: 100px;">
          <el-option v-for="rule, idx in artifactRuleList" :key="idx" :value="idx" :label="rule.name" />
        </el-select>

        <el-select v-model="filter" size="small" style="width: 70px;" placeholder="全部" clearable>
          <el-option value="danger" label="低分" />
          <el-option value="warning" label="普通" />
          <el-option value="success" label="高分" />
        </el-select>
      </div>

      <el-dropdown @command="handleCommand">
        <TheButton>
          操作
        </TheButton>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="box">
              弹窗展示
            </el-dropdown-item>
            <el-dropdown-item command="rule">
              配置权重
            </el-dropdown-item>
            <el-dropdown-item command="lang">
              切换语言
            </el-dropdown-item>
            <el-dropdown-item command="copy">
              复制规则
            </el-dropdown-item>
            <el-dropdown-item command="paste">
              导入规则
            </el-dropdown-item>
            <el-dropdown-item command="share">
              分享
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div my-10px flex flex-wrap gap-10px>
      <ArtifactCard
        v-for="artifact, idx in artifactList" :key="artifact.id"
        :artifact="artifact"
        :position="`${Math.floor(idx / 5 + 1)}-${idx % 5 + 1}`"
        :filter="filter"
      />
    </div>

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
