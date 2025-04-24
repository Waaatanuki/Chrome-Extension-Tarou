<script setup lang="ts">
import type { ArtifactRule } from 'myStorage'
import { artifactSkillList } from '~/constants/artifact'
import { artifactRule } from '~/logic'

const emits = defineEmits(['close'])
const dialogVisible = defineModel<boolean>()
const tabName = ref('skill1')
const skillTabs: ('skill1' | 'skill2' | 'skill3')[] = ['skill1', 'skill2', 'skill3']
const rule = ref<ArtifactRule>()

function onSubmit() {
  artifactRule.value = JSON.parse(JSON.stringify(rule.value))
  emits('close')
  dialogVisible.value = false
}

onMounted(() => {
  rule.value = JSON.parse(JSON.stringify(artifactRule.value))
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="神器权重设置" width="600" :show-close="false">
    <div v-if="rule" m-auto h-500px w-550px border-1 class="border-#4C4D4F" rounded-lg>
      <el-tabs v-model="tabName" tab-position="left" h-full>
        <el-tab-pane v-for="tab, i in skillTabs" :key="tab" :label="`${'I'.repeat(i + 1)}类技能`" :name="tab">
          <div h-500px flex flex-col gap-2 overflow-auto>
            <div v-for="skill in artifactSkillList[tab]" :key="skill.skill_id" flex justify-between border-b-1 class="border-#4C4D4F" p-2>
              <div w-300px text-sm>
                {{ skill.name }}
              </div>
              <div fc>
                <el-input-number
                  v-model="rule.skill[skill.skill_id]"
                  :min="1"
                  size="small"
                  style="width: 80px;"
                  controls-position="right"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="基础权重" name="base">
          <div flex pl-4>
            <div class="w-50%">
              <div my-2 font-bold>
                属性
              </div>
              <div flex flex-col gap-4>
                <div v-for="value, key in rule.attribute" :key="key" flex gap-2>
                  <img w-24px :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/artifact/ui/icon/icn_type_${key}.png`">
                  <el-input-number
                    v-model="rule.attribute[key]"
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
                <div v-for="value, key in rule.kind" :key="key" flex gap-2>
                  <img w-24px :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/artifact/ui/icon/icn_weapon_${key}.png`">
                  <el-input-number
                    v-model="rule.kind[key]"
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
