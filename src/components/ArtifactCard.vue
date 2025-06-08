<script setup lang="ts">
import type { Artifact } from 'source'
import { artifactSkillList } from '~/constants/artifact'
import { artifactRuleIndex, artifactRuleList, language } from '~/logic'

defineProps<{ artifact: Artifact, position: string }>()

type SkillName = 'skill1_info' | 'skill2_info' | 'skill3_info' | 'skill4_info'
const skillNameList: SkillName[] = ['skill1_info', 'skill2_info', 'skill3_info', 'skill4_info']

const currentArtifaceRuleInfo = computed(() => artifactRuleList.value[artifactRuleIndex.value].info)
const artifactSkillFlatList = computed(() => Object.values(artifactSkillList).flat())

function getSkillName(skill_id: number) {
  const hitSkill = artifactSkillFlatList.value.find(item => item.skill_id === Math.floor(skill_id / 10))
  if (!hitSkill)
    return ''

  return language.value === 'zh' ? hitSkill.name_zh : hitSkill.name
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
</script>

<template>
  <el-card body-style="padding: 10px" relative h-full w-300px>
    <div flex flex-col>
      <el-tag absolute left-0 top-0 type="info" size="large">
        {{ position }}
      </el-tag>

      <el-tag absolute right-0 top-0 size="large" type="warning">
        得分: {{ artifact.rarity === '3' ? getPoint(artifact) : '∞' }}
      </el-tag>

      <div flex items-center gap-6 pl-55px>
        <div relative h-50px w-50px shrink-0>
          <img :src="getAssetImg('artifact', artifact.artifact_id, 's')">
          <img absolute bottom-0 left-0 :src="getArtifactIcon(`icn_type_${artifact.attribute}`)" width="30%" height="30%">
          <img absolute right-0 top-0 :src="getArtifactIcon(`icn_weapon_${artifact.kind.padStart(2, '0')}`) " width="30%" height="30%">
        </div>

        <div h-50px>
          <img v-if="artifact.equip_npc_info.image" h-full :src="getAssetImg('npc', artifact.equip_npc_info.image, 's')">
          <div v-else h-50px w-50px fc text-10px ring-1 ring-neutral-7>
            EMPTY
          </div>
        </div>
      </div>

      <div v-if="artifact.rarity === '3'" mt-2 flex flex-col gap-5px>
        <div v-for="skillName in skillNameList" :key="skillName" flex items-center justify-start gap-5px text-12px>
          <el-tag self-start size="small" :type="artifact[skillName].level === 5 ? 'success' : 'info'">
            {{ `Lv${artifact[skillName].level}` }}
          </el-tag>
          <el-tag self-start size="small" :type="artifact[skillName].skill_id % 10 === 5 ? 'success' : 'info'">
            {{ `${artifact[skillName].skill_id % 10}/${skillName === 'skill4_info' ? 1 : 5}` }}
          </el-tag>
          <div>
            {{ `${getSkillName(artifact[skillName].skill_id)} ${artifact[skillName].effect_value}` }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>

</style>
