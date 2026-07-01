<script setup lang="ts">
import type { Artifact } from 'source'
import { artifactSkillList } from '~/constants/artifact'
import { artifactRule, artifactUsage, language } from '~/logic'

const { artifact, filter } = defineProps<{ artifact: Artifact, position: string, filter?: { strictMode: boolean, onlyUnnecessary: boolean, ids: number[] } }>()

type SkillName = 'skill1_info' | 'skill2_info' | 'skill3_info' | 'skill4_info'
const skillNameList: SkillName[] = ['skill1_info', 'skill2_info', 'skill3_info', 'skill4_info']

const artifactSkillFlatList = computed(() => Object.values(artifactSkillList).flat())

const isUnnecessary = computed(() => {
  let unnecessaryCount = 0
  const { limit } = artifactRule.value
  const skillIds = skillNameList.map(skillName => Math.floor(artifact[skillName].skill_id / 10))

  for (const skillId of skillIds) {
    const level = artifactRule.value[skillId]

    if (level === 2)
      return false

    if (level === 0 && ++unnecessaryCount > limit)
      return true
  }

  return false
})

const isTarget = computed(() => {
  if (!filter)
    return true

  const { onlyUnnecessary, ids, strictMode } = filter

  if (onlyUnnecessary && !isUnnecessary.value)
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
  const hitSkill = artifactSkillFlatList.value.find(item => item.skillId === Math.floor(skill_id / 10))
  if (!hitSkill)
    return ''

  return language.value === 'zh' ? hitSkill.nameZh : hitSkill.name
}

function getSkillQuality(skillName: SkillName) {
  const max = skillName === 'skill4_info' ? 1 : 5
  const isMax = artifact[skillName].is_max_quality
  const quality = artifact[skillName].skill_quality

  return `${isMax ? max : quality}/${max}`
}

function getArtifactStatusIcon(artifact: Artifact) {
  if (artifact.is_locked)
    return getOfficialUrl('/sp/artifact/ui/icn_favorite.png')
  if (artifact.is_unnecessary)
    return getOfficialUrl('/sp/artifact/ui/icn_unnecessary.png')
  return undefined
}

function isRecommendSkill(skill_id: number) {
  return artifactUsage.value.filterList?.some(item => item.skillId === Math.floor(skill_id / 10))
}
</script>

<template>
  <el-card v-if="isTarget" relative h-full w-300px>
    <div flex flex-col>
      <el-tag absolute left-0 top-0 type="info" size="large">
        {{ position }}
      </el-tag>

      <div relative flex items-center gap-6 pl-55px>
        <div relative h-50px w-50px shrink-0>
          <img :src="getAssetImg('artifact', artifact.artifact_id, 's')">
          <img absolute bottom-0 left-0 :src="getArtifactIcon(`icn_type_${artifact.attribute}`)" width="30%" height="30%">
          <img absolute right-0 top-0 :src="getArtifactIcon(`icn_weapon_${artifact.kind.padStart(2, '0')}`) " width="30%" height="30%">
          <img
            v-if="artifact.is_locked || artifact.is_unnecessary"
            absolute left--8px top--8px h-20px w-20px
            :src="getArtifactStatusIcon(artifact) "
          >
        </div>

        <div h-50px>
          <img v-if="artifact.equip_npc_info?.image" h-full :src="getAssetImg('npc', artifact.equip_npc_info.image, 's')">
          <div v-else h-50px w-50px fc text-10px ring-1 ring-neutral-7>
            EMPTY
          </div>
        </div>

        <div v-if="isUnnecessary" absolute right-0 top-0>
          <div class="relative size-52px fc rotate-[-14deg] select-none border-2 border-red-6 rounded-full bg-red-5/6 text-14px text-red-7 tracking-[0.18em] shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset,0_3px_10px_rgba(127,29,29,0.18)]">
            <div class="absolute inset-3px border border-red-5/75 rounded-full" />
            <span class="translate-x-[2px]">
              无用
            </span>
          </div>
        </div>
      </div>

      <div v-if="!artifact.is_quirk" mt-2 flex flex-col gap-5px>
        <div v-for="skillName in skillNameList" :key="skillName" flex items-center justify-start gap-5px text-12px>
          <el-tag self-start size="small" :type="artifact[skillName].level === 5 ? 'success' : 'info'">
            {{ `Lv${artifact[skillName].level}` }}
          </el-tag>
          <el-tag self-start size="small" :type="artifact[skillName].is_max_quality && skillName !== 'skill4_info' ? 'success' : 'info'">
            {{ getSkillQuality(skillName) }}
          </el-tag>
          <div :class="{ 'text-#67C23A': isRecommendSkill(artifact[skillName].skill_id) }">
            {{ `${getSkillName(artifact[skillName].skill_id)} ${artifact[skillName].effect_value}` }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
