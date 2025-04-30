<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import md5 from 'md5'
import { artifactSkillList } from '~/constants/artifact'
import { artifactList, artifactRuleIndex, artifactRuleList, language } from '~/logic'
import ArtifactRule from './components/ArtifactRule.vue'

type SkillName = 'skill1_info' | 'skill2_info' | 'skill3_info' | 'skill4_info'
const skillNameList: SkillName[] = ['skill1_info', 'skill2_info', 'skill3_info', 'skill4_info']

const dialogVisible = ref(false)
const inputVisible = ref(false)
const textarea = ref('')

const currentArtifaceRuleInfo = computed(() => artifactRuleList.value[artifactRuleIndex.value].info)
const artifactSkillFlatList = computed(() => Object.values(artifactSkillList).flat())
const ruleMd5 = computed(() => md5(JSON.stringify(currentArtifaceRuleInfo.value)).slice(-10))

function getSkillName(skill_id: number) {
  const hitSkill = artifactSkillFlatList.value.find(item => item.skill_id === Math.floor(skill_id / 10))
  return language.value === 'zh' ? hitSkill?.name_zh : hitSkill?.name
}

function getPoint(artifact: any) {
  const artifactKind = artifact.kind.padStart(2, '0')
  const artifactAttribute = String(artifact.attribute)
  let count = currentArtifaceRuleInfo.value.kind[artifactKind] + currentArtifaceRuleInfo.value.attribute[artifactAttribute]

  for (const skillName of skillNameList) {
    const skill_id = String(Math.floor(artifact[skillName].skill_id / 10))
    count += currentArtifaceRuleInfo.value.skill[skill_id] ?? 0
    const key = `${artifactAttribute}:${artifactKind}:${skill_id}`

    if (currentArtifaceRuleInfo.value.extra[key])
      count += currentArtifaceRuleInfo.value.extra[key]
  }
  return count
}

function getQuality(artifact: any) {
  let count = 0
  for (const skillName of ['skill1_info', 'skill2_info']) {
    count += (artifact[skillName].skill_id % 10)
  }
  for (const skillName of ['skill3_info']) {
    count += (artifact[skillName].skill_id % 10 * 2)
  }
  return `${count}/20`
}

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
  <main overflow-auto>
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
    <div m-auto mt-2 w-1270px flex shrink-0 flex-wrap gap-5px>
      <div v-for="artifact in artifactList" :key="artifact.id" class="border-#4C4D4F" relative w-250px border-1 rounded-lg border-solid py-2>
        <div v-if="artifact.is_locked" i-material-symbols:award-star absolute right-2 top-2 h-20px w-20px text-amber />
        <div fc gap-6>
          <div relative h-60px w-60px>
            <img w-60px :src="getAssetImg('artifact', artifact.artifact_id, 's')" width="100%" height="100%">
            <img absolute bottom-0 left-0 :src="getArtifactIcon(`icn_type_${artifact.attribute}`)" width="30%" height="30%">
            <img absolute right-0 top-0 :src="getArtifactIcon(`icn_weapon_${artifact.kind.padStart(2, '0')}`) " width="30%" height="30%">
          </div>
          <div v-if="artifact.rarity === '3'" w-100px text-base>
            <div>得分：{{ getPoint(artifact) }}</div>
            <div>品质：{{ getQuality(artifact) }}</div>
          </div>
          <div v-else w-100px text-center text-3xl>
            ∞
          </div>
        </div>
        <div mt-2 flex flex-col>
          <div v-for="skillName in skillNameList" :key="skillName" flex items-center justify-start gap-1 px-10px text-12px>
            <div self-start leading-15px>
              {{ `Lv${artifact[skillName].level}` }}
            </div>
            <img self-start width="16" height="16" :src="getBonusIcon(artifact[skillName].icon_image)">
            <div>
              {{ `${getSkillName(artifact[skillName].skill_id) ?? ''} ${artifact[skillName].effect_value}` }}
            </div>
          </div>
        </div>
      </div>
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
