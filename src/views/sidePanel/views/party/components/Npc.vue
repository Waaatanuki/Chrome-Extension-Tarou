<script setup lang="ts">
import type { BuildLeader, BuildNpc } from 'party'
import { buildNpcFilter } from '~/logic'

const { isBuild = false } = defineProps<{
  leader: BuildLeader
  npcs: BuildNpc[]
  isBuild?: boolean
}>()

const NPC_AROUSAL_FORM: Record<string, string> = {
  1: '平衡',
  2: '攻击',
  3: '防御',
  4: '连击',
}

function updateNpcFilter(masterId: number) {
  if (buildNpcFilter.value.includes(masterId)) {
    ElMessage.success('已标记')
  }
  else {
    buildNpcFilter.value.push(masterId)
    ElMessage.success('标记成功')
  }
}

function goWiki(masterId: number) {
  window.open(`https://gbf.huijiwiki.com/wiki/Char/${masterId}`, '_blank')
}
</script>

<template>
  <div w-300px flex flex-col gap-10px>
    <div relative>
      <img w-full :src="getAssetImg('leader', leader.imageId, 'result_ml')">
      <img absolute left-1 top-1 w-20px :src="getJobIcon(leader.masterId)">
      <img v-if="leader.familiarId" absolute bottom-0px left-0px w-40px :src="getAssetImg('familiar', leader.familiarId, 's')">
      <div absolute inset-y-0 right-1px flex flex-1 flex-col items-end justify-center gap-2px>
        <ElTag v-for="ability, idx in leader.ability" :key="idx" :type="ability?.fa ? 'warning' : 'info'" effect="light">
          <div fc gap-4px>
            <span>{{ ability?.name }}</span>
            <img v-if="ability?.iconId" w-20px :src="getAbilityIcon(ability.iconId)">
          </div>
        </ElTag>
      </div>
    </div>
    <div flex gap-5px>
      <template v-for="npc in npcs" :key="npc.paramId">
        <el-popover placement="top-start" width="274">
          <template #reference>
            <div relative w-56px class="group">
              <img w-full :src="getAssetImg('npc', npc.imageId, 'quest')">
              <div absolute inset-0 hidden fc bg-black opacity-70 class="group-hover:flex">
                <div v-if="isBuild" class="i-carbon:close-filled" absolute icon-btn @click="updateNpcFilter(npc.masterId)" />
                <div v-else class="i-mdi:wikipedia" absolute icon-btn @click="goWiki(npc.masterId)" />
              </div>
              <img v-if="npc.isAugment" absolute left-0 top-0 w-20px :src="getLocalImg('icon_augment')">
              <div
                v-if="npc.arousalForm" :class="`txt-form-color-${npc.arousalForm}`"
                absolute bottom-13px right-0 rounded bg-neutral px-1 text-12px
              >
                {{ NPC_AROUSAL_FORM[npc.arousalForm] }}
              </div>
              <div mt-1px h-12px flex items-center justify-start gap-4px>
                <div v-for="ability, i in npc.ability" :key="i" relative fc>
                  <div
                    :class="`ability_icon_type_${ability.iconType}`"
                    h-11px w-11px rounded-sm ring-1
                  />
                  <div v-if="!ability.fa" class="i-carbon:close" absolute text-13px text-black />
                </div>
              </div>
            </div>
          </template>

          <div class="text-12px text-#f2eee2" w-250px bg-black pb-2 pt-1 leading-none>
            <div v-if="(!npc.exlb || npc.exlb.length === 0) && (!npc.artifact || npc.artifact.length === 0) " text-center>
              未读取该角色信息
            </div>
            <template v-for="exlb, idx in npc.exlb" :key="idx">
              <div class="prt-extra-lb-title" my-1>
                {{ exlb.type }}
              </div>
              <div class="text-#ffff5f" flex flex-col gap-1>
                <div v-for="bonus, i in exlb.bonuse" :key="i" flex items-center justify-start gap-1 px-20px>
                  <div :class="bonus.icon" />
                  <div>
                    {{ bonus.name }}
                  </div>
                  <div>
                    {{ bonus.value }}
                  </div>
                </div>
              </div>
            </template>

            <template v-if="npc.artifact && npc.artifact?.length !== 0">
              <div class="prt-extra-lb-title" my-1>
                アーティファクト
              </div>
              <div flex flex-col gap-2>
                <div v-for="skill, idx in npc.artifact" :key="idx" flex items-center justify-start gap-1 px-20px>
                  <div>{{ `Lv${skill.level}` }}</div>
                  <img width="16" height="16" :src="getBonusIcon(skill.icon)">
                  <div>
                    {{ `${skill.name} ${skill.value}` }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </el-popover>
      </template>
    </div>
  </div>
</template>

<style scoped>
.ability_icon_type_1 {
  background-color: rgb(251, 113, 133);
}
.ability_icon_type_2 {
  background-color: rgb(74, 222, 128);
}
.ability_icon_type_3 {
  background-color: rgb(250, 204, 21);
}
.ability_icon_type_4 {
  background-color: rgb(96, 165, 250);
}
.ability_icon_type_5 {
  background-color: rgb(192, 132, 252);
}
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
</style>
