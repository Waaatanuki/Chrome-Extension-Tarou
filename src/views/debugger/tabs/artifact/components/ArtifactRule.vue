<script setup lang="ts">
import type { ArtifactRuleInfo, ExtraRule } from 'myStorage'
import { artifactSkillList } from '~/constants/artifact'
import { artifactRuleIndex, artifactRuleList, language } from '~/logic'

const dialogVisible = defineModel<boolean>()
const tabName = ref('skill1')
const ruleName = ref('')
const ruleInfo = ref<ArtifactRuleInfo>()
const skillTabs: ('skill1' | 'skill2' | 'skill3')[] = ['skill1', 'skill2', 'skill3']
const attrList = ['火', '水', '土', '风', '光', '暗']
const kindList = ['剑', '短', '枪', '斧', '杖', '铳', '拳', '弓', '琴', '刀']

const extraList = ref<Partial<ExtraRule>[]>([])

function handleAdd(index: number) {
  extraList.value.splice(index, 0, {})
}

function handleDelete(index: number) {
  extraList.value.splice(index, 1)
}

function onSubmit() {
  ruleInfo.value!.extra = {}
  for (const extra of extraList.value) {
    if (!extra.attribute || !extra.kind || !extra.skillId || !extra.value)
      continue
    const key = `${extra.attribute}:${extra.kind}:${extra.skillId}`
    ruleInfo.value!.extra[key] = extra.value
  }

  artifactRuleList.value[artifactRuleIndex.value] = {
    name: ruleName.value,
    info: JSON.parse(JSON.stringify(ruleInfo.value)),
  }
  dialogVisible.value = false
}

onMounted(() => {
  ruleName.value = artifactRuleList.value[artifactRuleIndex.value].name
  ruleInfo.value = JSON.parse(JSON.stringify(artifactRuleList.value[artifactRuleIndex.value].info))

  for (const [key, value] of Object.entries(ruleInfo.value!.extra)) {
    const [attribute, kind, skillId] = key.split(':')
    extraList.value.push({ attribute, kind, skillId: Number(skillId), value })
  }
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="神器权重设置" width="600" :show-close="false">
    <template #header>
      <div flex items-center gap-2>
        <div>规则名称: </div>
        <el-input v-model="ruleName" style="width: 150px;" size="small" />
      </div>
    </template>
    <div v-if="ruleInfo" m-auto h-500px w-550px border-1 class="border-#4C4D4F" rounded-lg>
      <el-tabs v-model="tabName" tab-position="left" h-full>
        <el-tab-pane v-for="tab, i in skillTabs" :key="tab" :label="`${'I'.repeat(i + 1)}类技能`" :name="tab">
          <div h-500px flex flex-col gap-2 overflow-auto>
            <div v-for="skill in artifactSkillList[tab]" :key="skill.skill_id" flex justify-between border-b-1 class="border-#4C4D4F" p-2>
              <div w-300px text-sm>
                {{ language === 'zh' ? skill.name_zh : skill.name }}
              </div>
              <div fc>
                <el-input-number
                  v-model="ruleInfo.skill[skill.skill_id]"
                  :min="1"
                  size="small"
                  style="width: 80px;"
                  controls-position="right"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="额外权重" name="extra">
          <el-scrollbar height="460" pr-1>
            <el-form :inline="true" size="small" label-width="40">
              <div flex flex-col gap-2 py-2 pr-2>
                <el-card v-for="extra, index in extraList" :key="index" body-style="padding:10px 0 0 10px" shadow="never">
                  <el-form-item label="属性">
                    <el-select v-model="extra.attribute" style="width: 55px;" placeholder="">
                      <el-option v-for="item, idx in attrList" :key="item" :value="String(idx + 1)" :label="item" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-select v-model="extra.kind" style="width: 55px;" placeholder="">
                      <el-option v-for="item, idx in kindList" :key="item" :value="String(idx + 1).padStart(2, '0')" :label="item" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="权重">
                    <el-input-number
                      v-model="extra.value"
                      :min="1"
                      size="small"
                      style="width: 80px;"
                      controls-position="right"
                    />
                  </el-form-item>

                  <el-form-item label="技能">
                    <el-select v-model="extra.skillId" style="width: 250px;" filterable placeholder="">
                      <el-option-group
                        v-for="skillType in Object.keys(artifactSkillList)"
                        :key="skillType"
                        :label="skillType"
                      >
                        <el-option
                          v-for="item in artifactSkillList[skillType as keyof typeof artifactSkillList]"
                          :key="item.skill_id"
                          class="artifact-skill-select"
                          :label="language === 'zh' ? item.name_zh : item.name"
                          :value="item.skill_id"
                        >
                          <el-tooltip placement="top-start" effect="dark" :content="language === 'zh' ? item.name_zh : item.name">
                            {{ language === 'zh' ? item.name_zh : item.name }}
                          </el-tooltip>
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <div flex gap-4 text-lg>
                      <div i-carbon:add-alt icon-btn @click="handleAdd(index + 1)" />
                      <div i-carbon:subtract-alt icon-btn @click="handleDelete(index)" />
                    </div>
                  </el-form-item>
                </el-card>
              </div>
            </el-form>
          </el-scrollbar>
          <div mb-2 pl--10px pr-10px>
            <TheButton w-full text-center size="default" @click="handleAdd(extraList.length)">
              新增额外权重
            </TheButton>
          </div>
        </el-tab-pane>

        <el-tab-pane label="基础权重" name="base">
          <div flex pl-4>
            <div class="w-50%">
              <div my-2 font-bold>
                属性
              </div>
              <div flex flex-col gap-4>
                <div v-for="value, key in ruleInfo.attribute" :key="key" flex gap-2>
                  <img w-24px :src="getArtifactIcon(`icn_type_${key}`)">
                  <el-input-number
                    v-model="ruleInfo.attribute[key]"
                    :min="1"
                    size="small"
                    style="width: 80px;"
                    controls-position="right"
                  />
                </div>
              </div>
            </div>
            <div class="w-50%">
              <div my-2 font-bold>
                类型
              </div>
              <div flex flex-col gap-4>
                <div v-for="value, key in ruleInfo.kind" :key="key" flex gap-2>
                  <img w-24px :src="getArtifactIcon(`icn_weapon_${key}`)">
                  <el-input-number
                    v-model="ruleInfo.kind[key]"
                    :min="1"
                    size="small"
                    style="width: 80px;"
                    controls-position="right"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <template #footer>
      <TheButton @click="dialogVisible = false">
        取消
      </TheButton>
      <TheButton @click="onSubmit">
        确认
      </TheButton>
    </template>
  </el-dialog>
</template>

<style>
.artifact-skill-select {
  --uno: 'w-350px!';
}
</style>
