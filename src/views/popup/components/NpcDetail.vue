<script setup lang="ts">
import type { BuildNpc } from 'party'
import { Icon } from '@iconify/vue'
import { NPC_AROUSAL_FORM } from '~/constants'
import { artifactSkillList } from '~/constants/artifact'
import { deckList, language, localNpcList } from '~/logic'

const artifactSkillFlatList = computed(() => Object.values(artifactSkillList).flat())
const npcParamIds = computed(() => deckList.value[0] ? deckList.value[0].npcs.map(npc => npc.paramId) : [])
const npcList = computed(() => npcParamIds.value
  .map(id => localNpcList.value.find(n => n.paramId === id)!)
  .filter(Boolean),
)

function getExlbBonus(npc: BuildNpc, key: string) {
  return npc.exlb?.find(e => e.type === key)?.bonus || []
}

function getSkillName(skill_id: number) {
  const hitSkill = artifactSkillFlatList.value.find(item => item.skillId === Math.floor(skill_id / 10))
  if (!hitSkill)
    return ''

  return language.value === 'zh' ? hitSkill.nameZh : hitSkill.name
}

async function exportToImg() {
  try {
    const element = document.querySelector(`#npc-container`)!
    const result = await useSnapdom(element)
    await result.download({ scale: 1.5, type: 'png', filename: `角色详情${Date.now()}`, backgroundColor: '#131313' })
    ElMessage.success('保存成功')
  }
  catch (error) {
    createNotification({ message: String(error) })
  }
}
</script>

<template>
  <div fixed right-20px top-300px h-40px w-40px fc cursor-pointer rounded-full hover:bg-teal-9 @click="exportToImg">
    <Icon icon="streamline-flex:screenshot" text-25px text-teal-6 />
  </div>
  <div id="npc-container" grid m-auto w-800px gap-10px p-4>
    <el-descriptions v-for="npc in npcList" :key="npc.paramId" direction="vertical" :column="3" :border="true" size="small">
      <el-descriptions-item label="角色" align="center" label-width="100" :rowspan="2">
        <div v-if="npc.imageId" relative mx-auto my-5px w-80px>
          <img w-full :src="getAssetImg('npc', npc.imageId, 'f')">
          <img v-if="npc.isAugment" absolute left-0 top-0 w-30px :src="getLocalImg('icon_augment')">
          <div
            v-if="npc.arousalForm" :class="`txt-form-color-${npc.arousalForm}`"
            class="bg-black/60" absolute bottom-0 right-0 rounded-lt px-4px text-12px
          >
            {{ NPC_AROUSAL_FORM[npc.arousalForm] }}
          </div>
        </div>
        <div v-else text-neutral>
          未获取
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="戒指" align="center" label-width="250">
        <div flex flex-col gap-1>
          <div v-for="bonus, i in getExlbBonus(npc, 'EXリミットボーナス')" :key="i" flex items-center justify-start gap-1 px-20px>
            <div :class="bonus.icon" />
            <div>
              {{ bonus.name }}
            </div>
            <div>
              {{ bonus.value }}
            </div>
          </div>
          <div v-if="!getExlbBonus(npc, 'EXリミットボーナス').length" fc flex-1 text-neutral>
            未获取
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="创造物" :rowspan="2" align="center" label-width="380">
        <div flex flex-col gap-2>
          <div v-for="skill, idx in npc.artifact" :key="idx" flex items-center justify-start gap-4px px-20px>
            <div flex shrink-0 self-start gap-2px>
              <div>{{ `Lv${skill.level}` }}</div>
              <img width="16" height="16" :src="getBonusIcon(skill.icon)">
            </div>

            <div break-all text-start>
              {{ `${getSkillName(skill.id)} ${skill.value}` }}
            </div>
          </div>
          <div v-if="!npc.artifact?.length" fc flex-1 text-neutral>
            未获取
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="耳环" align="center">
        <div flex flex-1 flex-col gap-1>
          <div v-for="bonus, i in getExlbBonus(npc, 'エーテリアルプラス')" :key="i" flex items-center justify-start gap-1 px-20px>
            <div :class="bonus.icon" />
            <div>
              {{ bonus.name }}
            </div>
            <div>
              {{ bonus.value }}
            </div>
          </div>
          <div v-if="!getExlbBonus(npc, 'エーテリアルプラス').length" fc flex-1 text-neutral>
            未获取
          </div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.txt-form-color-1 {
  color: #d3c194;
  text-shadow:
    0 0 1px #150f0f,
    0 0 1px #150f0f,
    0 0 1px #150f0f,
    0 0 2px #150f0f,
    0 0 2px #150f0f,
    0 0 2px #150f0f;
}
.txt-form-color-2 {
  color: #ff795a;
  text-shadow:
    0 0 1px #150f0f,
    0 0 1px #150f0f,
    0 0 1px #150f0f,
    0 0 2px #150f0f,
    0 0 2px #150f0f,
    0 0 2px #150f0f;
}
.txt-form-color-3 {
  color: #85e9f5;
  text-shadow:
    0 0 1px #150f0f,
    0 0 1px #150f0f,
    0 0 1px #150f0f,
    0 0 2px #150f0f,
    0 0 2px #150f0f,
    0 0 2px #150f0f;
}
.txt-form-color-4 {
  color: #ffff5f;
  text-shadow:
    0 0 1px #150f0f,
    0 0 1px #150f0f,
    0 0 1px #150f0f,
    0 0 2px #150f0f,
    0 0 2px #150f0f,
    0 0 2px #150f0f;
}
.txt-hp-value {
  color: #f2eee2;
  text-shadow:
    0 0 1px #0c320d,
    0 0 1px #0c320d,
    0 0 1px #0c320d,
    0 0 1px #0c320d,
    0 0 2px #0c320d,
    0 0 2px #0c320d,
    0 0 2px #0c320d,
    0 0 2px #0c320d;
}
</style>
