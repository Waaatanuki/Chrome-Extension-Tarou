<script setup lang="ts">
import type { Artifact } from 'source'
import { artifactSkillList } from '~/constants/artifact'
import { artifactRuleIndex, artifactRuleList, language } from '~/logic'

const { artifact, filter } = defineProps<{ artifact: Artifact, position: string, filter?: { strictMode: boolean, types: string[], ids: number[] } }>()

type SkillName = 'skill1_info' | 'skill2_info' | 'skill3_info' | 'skill4_info'
const skillNameList: SkillName[] = ['skill1_info', 'skill2_info', 'skill3_info', 'skill4_info']

const currentArtifactRuleInfo = computed(() => artifactRuleList.value[artifactRuleIndex.value].info)
const artifactSkillFlatList = computed(() => Object.values(artifactSkillList).flat())

const isTarget = computed(() => {
  if (!filter)
    return true

  const { types, ids, strictMode } = filter

  if (types.length > 0 && !types.includes(getPointType(artifact)))
    return false

  if (ids.length > 0) {
    if (strictMode) {
      // 严格模式：ids的技能集合必须是神器的技能集合的子集
      const artifactSkillIds = new Set<number>()
      for (const skillName of skillNameList) {
        const skill_id = Math.floor(artifact[skillName].skill_id / 10)
        artifactSkillIds.add(skill_id)
      }

      // 检查 ids 中的每个技能是否都在神器的技能集合中
      for (const skillId of ids) {
        if (!artifactSkillIds.has(skillId))
          return false
      }
      return true
    }
    else {
      // 普通模式：只要任何一个技能在 ids 中即可
      for (const skillName of skillNameList) {
        const skill_id = String(Math.floor(artifact[skillName].skill_id / 10))
        if (ids.includes(Number(skill_id)))
          return true
      }
      return false
    }
  }

  return true
})

function getSkillName(skill_id: number) {
  const hitSkill = artifactSkillFlatList.value.find(item => item.skill_id === Math.floor(skill_id / 10))
  if (!hitSkill)
    return ''

  return language.value === 'zh' ? hitSkill.name_zh : hitSkill.name
}

function getPoint(artifact: Artifact) {
  const artifactKind = artifact.kind.padStart(2, '0')
  const artifactAttribute = String(artifact.attribute)
  let count = currentArtifactRuleInfo.value.kind[artifactKind] + currentArtifactRuleInfo.value.attribute[artifactAttribute]

  for (const skillName of skillNameList) {
    const skill_id = String(Math.floor(artifact[skillName].skill_id / 10))
    count += currentArtifactRuleInfo.value.skill[skill_id] ?? 0
    const key = `${artifactAttribute}:${artifactKind}:${skill_id}`

    if (currentArtifactRuleInfo.value.extra[key])
      count += currentArtifactRuleInfo.value.extra[key]
  }
  return count
}

function getPointType(artifact: Artifact) {
  if (artifact.rarity !== '3')
    return 'success'

  if (!currentArtifactRuleInfo.value.highlight)
    return 'warning'

  const { high, low } = currentArtifactRuleInfo.value.highlight
  if (high && getPoint(artifact) >= high)
    return 'success'
  if (low && getPoint(artifact) <= low)
    return 'danger'
  return 'warning'
}
</script>

<template>
  <el-card v-if="isTarget" body-style="padding: 10px" relative h-full w-300px>
    <div flex flex-col>
      <el-tag absolute left-0 top-0 type="info" size="large">
        {{ position }}
      </el-tag>

      <el-tag absolute right-0 top-0 size="large" :type="getPointType(artifact)">
        得分: {{ artifact.rarity === '3' ? getPoint(artifact) : '∞' }}
      </el-tag>

      <div flex items-center gap-6 pl-55px>
        <div relative h-50px w-50px shrink-0>
          <img :src="getAssetImg('artifact', artifact.artifact_id, 's')">
          <img absolute bottom-0 left-0 :src="getArtifactIcon(`icn_type_${artifact.attribute}`)" width="30%" height="30%">
          <img absolute right-0 top-0 :src="getArtifactIcon(`icn_weapon_${artifact.kind.padStart(2, '0')}`) " width="30%" height="30%">
        </div>

        <div h-50px>
          <img v-if="artifact.equip_npc_info?.image" h-full :src="getAssetImg('npc', artifact.equip_npc_info.image, 's')">
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
