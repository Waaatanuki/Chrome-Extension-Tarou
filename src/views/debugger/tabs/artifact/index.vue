<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import md5 from 'md5'
import { artifactList, artifactRule } from '~/logic'
import ArtifactRule from './components/ArtifactRule.vue'

type SkillName = 'skill1_info' | 'skill2_info' | 'skill3_info' | 'skill4_info'
const skillNameList: SkillName[] = ['skill1_info', 'skill2_info', 'skill3_info', 'skill4_info']

const dialogVisible = ref(false)
const inputVisible = ref(false)
const textarea = ref('')
const ruleMd5 = ref('')

function getPoint(artifact: any) {
  const artifactKind = artifact.kind.padStart(2, '0')
  const artifactAttribute = String(artifact.attribute)
  let count = artifactRule.value.kind[artifactKind] + artifactRule.value.attribute[artifactAttribute]

  for (const skillName of skillNameList) {
    const skill_id = String(Math.floor(artifact[skillName].skill_id / 10))
    count += artifactRule.value.skill[skill_id] ?? 0
  }
  return count
}

function getQuality(artifact: any) {
  let count = 0
  for (const skillName of skillNameList) {
    count += (artifact[skillName].skill_id % 10)
  }
  return `${count}/16`
}

function handleCopy() {
  if (copy(JSON.stringify(artifactRule.value)))
    ElMessage.success(`已复制当前权重规则`)
}

function handlePaste() {
  textarea.value = ''
  inputVisible.value = true
}

function onPasteSubmit() {
  try {
    artifactRule.value = JSON.parse(textarea.value)
    generateMd5()
    inputVisible.value = false
    ElMessage.success('导入成功')
  }
  catch (error: any) {
    console.log(error)
    ElMessage.error('数据异常，复制失败')
  }
}

function generateMd5() {
  ruleMd5.value = md5(JSON.stringify(artifactRule.value))
}

onMounted(() => {
  generateMd5()
})
</script>

<template>
  <main overflow-auto>
    <div sticky inset-x-0 top-0 z-999 h-10 flex items-center justify-between rounded bg-violet px-4 text-base>
      <div flex items-center gap-4>
        <TheButton @click="dialogVisible = true">
          配置权重
        </TheButton>
        <div text-base>
          当前规则Key: {{ ruleMd5.slice(-10) }}
        </div>
      </div>
      <div fc gap-2>
        <TheButton icon="carbon:copy" @click="handleCopy">
          复制规则
        </TheButton>
        <TheButton icon="carbon:paste" @click="handlePaste">
          导入规则
        </TheButton>
      </div>
    </div>
    <div m-auto mt-2 w-1020px flex shrink-0 flex-wrap gap-5px>
      <div v-for="artifact in artifactList" :key="artifact.id" class="border-#4C4D4F" relative w-200px border-1 rounded-lg border-solid py-2>
        <div fc gap-4>
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
          <div v-for="skillName in skillNameList" :key="skillName" flex items-center justify-start gap-1 px-10px text-10px>
            <div self-start leading-15px>
              {{ `Lv${artifact[skillName].level}` }}
            </div>
            <img self-start width="16" height="16" :src="getBonusIcon(artifact[skillName].icon_image)">
            <div>
              {{ `${artifact[skillName].name} ${artifact[skillName].effect_value}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <ArtifactRule v-if="dialogVisible" v-model="dialogVisible" @close="generateMd5" />

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
