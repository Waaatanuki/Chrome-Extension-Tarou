<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { artifactSkillList } from '~/constants/artifact'
import { artifactList, artifactRuleIndex, artifactRuleList, artifactUsage, language } from '~/logic'

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

watch(artifactUsage, () => {
  ids.value.clear()
})

const romanNumeral = ['I', 'II', 'III']

const typeList = [
  { value: 'danger', label: 'Low Score' },
  { value: 'warning', label: 'Normal' },
  { value: 'success', label: 'High Score' },
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
      language.value = language.value === 'en' ? 'ja' : 'en'
      break
    case 'copy':
      if (copy(JSON.stringify(currentArtifactRuleInfo.value)))
        ElMessage.success('Current weight rule copied')
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

function getSkillName(filterId: number) {
  const hitSkill = Object.values(artifactSkillList).flat().find(item => item.filterId === filterId)
  if (!hitSkill)
    return ''

  return language.value === 'en' ? hitSkill.nameEn : hitSkill.name
}

function onPasteSubmit() {
  try {
    artifactRuleList.value[artifactRuleIndex.value].info = JSON.parse(textarea.value)
    inputVisible.value = false
    ElMessage.success('Import successful')
  }
  catch (error: any) {
    console.log(error)
    ElMessage.error('Invalid data, copy failed')
  }
}
</script>

<template>
  <main>
    <div sticky inset-x-0 top-0 z-999 class="bg-#141414" pb-10px text-base>
      <div rounded bg-neutral-8 p-8px>
        <div flex items-center justify-between bg-neutral-8>
          <div fc gap-2>
            <el-select v-model="artifactRuleIndex" size="small" style="width: 100px;">
              <el-option v-for="rule, idx in artifactRuleList" :key="idx" :value="idx" :label="rule.name" />
            </el-select>

            <el-popover trigger="click" effect="dark" placement="bottom" width="320" popper-style="padding: 0px;">
              <template #reference>
                <TheButton title="Filter Artifact Skills">
                  Filter
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
                  <el-checkbox v-model="strictMode" label="Strict Mode" size="small" />
                  <TheButton title="Reset options" color="#303133" @click="types.clear(); ids.clear(); strictMode = false">
                    Reset
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
                      v-for="item in skill" :key="item.skillId"
                      cursor-pointer select-none rounded-md p-5px text-12px ring-1 ring-neutral-4
                      :class="{ 'ring-blue-5! ring-2! text-blue-5!': ids.has(item.skillId) }"
                      @click="handleCheckFilter(ids, item.skillId)"
                    >
                      {{ language === 'en' ? item.nameEn : item.name }}
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </el-popover>
          </div>

          <el-dropdown @command="handleCommand">
            <TheButton>
              Actions
            </TheButton>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="box">
                  Popup View
                </el-dropdown-item>
                <el-dropdown-item command="rule">
                  Rule Weights
                </el-dropdown-item>
                <el-dropdown-item command="lang">
                  Switch Language
                </el-dropdown-item>
                <el-dropdown-item command="copy">
                  Copy Rule
                </el-dropdown-item>
                <el-dropdown-item command="paste">
                  Import Rule
                </el-dropdown-item>
                <el-dropdown-item command="share">
                  Share
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div v-if="artifactUsage.filterList" relative mt-2 fc gap-2 bg-neutral-8>
          <div i-carbon:close-outline absolute right-1 top-1 icon-btn text-20px @click="artifactUsage = {}" />
          <img h-100px :src="getAssetImg('npc', artifactUsage.image!, 'quest')">
          <div flex flex-col gap-2px text-12px line-height-18px>
            <div v-for="skill in artifactUsage.filterList" :key="skill.filterId" flex items-center gap-5px>
              <img w-20px :src="getBonusIcon(skill.iconType)">
              <div cursor-pointer select-none :class="{ 'text-blue-5': ids.has(skill.skillId) }" @click="handleCheckFilter(ids, skill.skillId)">
                {{ getSkillName(skill.filterId) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div mb-10px flex flex-wrap gap-10px>
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
          Cancel
        </TheButton>
        <TheButton @click="onPasteSubmit">
          Confirm
        </TheButton>
      </template>
    </el-dialog>
  </main>
</template>
