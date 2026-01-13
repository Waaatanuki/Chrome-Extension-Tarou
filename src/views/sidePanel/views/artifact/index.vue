<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { artifactSkillList } from '~/constants/artifact'
import { artifactList, artifactRuleIndex, artifactRuleList, language } from '~/logic'

const inputVisible = ref(false)
const textarea = ref('')
const strictMode = ref(false)
const types = ref(new Set<string>())
const ids = ref(new Set<number>())
const filter = computed(() => ({
  strictMode: strictMode.value,
  types: [...types.value],
  ids: [...ids.value],
}))
const currentArtifactRuleInfo = computed(() => artifactRuleList.value[artifactRuleIndex.value].info)

const romanNumeral = ['I', 'II', 'III']

const typeList = [
  { value: 'danger', label: '低分' },
  { value: 'warning', label: '普通' },
  { value: 'success', label: '高分' },
]

function handleCheckFilter(list: Set<any>, value: any) {
  if (list.has(value)) {
    list.delete(value)
  }
  else {
    list.add(value)
  }
}

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
      if (copy(JSON.stringify(currentArtifactRuleInfo.value)))
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

        <el-popover trigger="click" effect="dark" placement="bottom" width="320" popper-style="padding: 0px;">
          <template #reference>
            <TheButton title="筛选神器技能">
              筛选
            </TheButton>
          </template>

          <div flex items-center justify-between p-10px>
            <div flex gap-10px>
              <div
                v-for="item in typeList" :key="item.value"
                cursor-pointer select-none rounded-md p-5px text-12px ring-1 ring-neutral-4
                :class="{ 'ring-blue-5! ring-2! text-blue-5!': types.has(item.value) }"
                @click="handleCheckFilter(types, item.value)"
              >
                {{ item.label }}
              </div>
            </div>
            <div fc gap-10px>
              <el-checkbox v-model="strictMode" label="严格模式" size="small" />
              <TheButton title="重置选项" color="#303133" @click="types.clear(); ids.clear(); strictMode = false">
                重置
              </TheButton>
            </div>
          </div>
          <el-scrollbar height="500">
            <div flex flex-col p-10px>
              <div
                v-for="skill, index in Object.values(artifactSkillList)" :key="index"
                flex flex-wrap gap-10px
              >
                <el-divider>
                  {{ romanNumeral[index] }}
                </el-divider>
                <div
                  v-for="item in skill" :key="item.skill_id"
                  cursor-pointer select-none rounded-md p-5px text-12px ring-1 ring-neutral-4
                  :class="{ 'ring-blue-5! ring-2! text-blue-5!': ids.has(item.skill_id) }"
                  @click="handleCheckFilter(ids, item.skill_id)"
                >
                  {{ language === 'zh' ? item.name_zh : item.name }}
                </div>
              </div>
            </div>
          </el-scrollbar>
        </el-popover>
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
