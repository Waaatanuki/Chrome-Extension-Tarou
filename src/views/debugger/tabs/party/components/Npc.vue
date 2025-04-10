<script setup lang="ts">
import type { BuildLeader, BuildNpc } from 'party'

defineProps<{
  leader: BuildLeader
  npcs: BuildNpc[]
}>()

const NPC_AROUSAL_FORM: Record<string, string> = {
  1: '平衡',
  2: '攻击',
  3: '防御',
  4: '连击',
}
</script>

<template>
  <div h-210px w-380px fc flex-col justify-start>
    <div w-full flex items-start justify-start gap-4px>
      <div relative h-122px w-60px>
        <img w-full :src="getAssetImg('leader', leader.imageId, 'quest')">
        <img absolute left-1 top-1 w-20px :src="getJobIcon(leader.masterId)">
        <img v-if="leader.familiarId" absolute bottom-14px right-0 w-40px :src="getAssetImg('familiar', leader.familiarId, 's')">
        <div mt-1px h-12px flex items-center justify-start>
          <div v-for="ability, idx in leader.ability" :key="idx" relative w-15px fc>
            <div v-if="ability?.iconType" :class="`ability_icon_type_${ability.iconType}`" h-12px w-12px border-1 rounded-sm />
            <div v-if="ability && !ability.fa" i-carbon:close absolute text-13px text-black />
          </div>
        </div>
      </div>
      <template v-for="npc in npcs" :key="npc.paramId">
        <el-popover placement="top-start" width="274">
          <template #reference>
            <div relative h-122px w-60px>
              <img h-109px w-full :src="getAssetImg('npc', npc.imageId, 'quest')">
              <img v-if="npc.isAugment" absolute left-0 top-0 w-20px :src="getLocalImg('icon_augment')">
              <div v-if="npc.arousalForm" :class="`txt-form-color-${npc.arousalForm}`" absolute bottom-13px right-0 rounded bg-slate px-1 text-14px>
                {{ NPC_AROUSAL_FORM[npc.arousalForm] }}
              </div>
              <div mt-1px h-12px flex items-center justify-start>
                <div v-for="ability, i in npc.ability" :key="i" relative w-15px fc>
                  <div
                    :class="`ability_icon_type_${ability.iconType}`"
                    h-12px w-12px border-1 rounded-sm
                  />
                  <div v-if="!ability.fa" i-carbon:close absolute text-13px text-black />
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
    <div h-full w-full flex items-center justify-between>
      <div flex flex-col items-start px-2 text-base>
        <div>预测伤害：{{ leader.normalDamage.toLocaleString() }}</div>
        <div>克属伤害：{{ leader.advantageDamage.toLocaleString() }}</div>
      </div>
      <div flex flex-col gap-5px px-2 text-sm>
        <ElTag v-for="ability, idx in leader.ability.slice(1)" :key="idx" type="info" effect="plain">
          <div fc gap-4px>
            <img v-if="ability?.iconId" w-20px :src="getAbilityIcon(ability.iconId)">
            <span>{{ ability?.name }}</span>
          </div>
        </ElTag>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ability_icon_type_1{
  background-color: rgb(251, 113, 133);
}
.ability_icon_type_2{
  background-color: rgb(74, 222, 128);
}
.ability_icon_type_3{
  background-color: rgb(250, 204, 21);
}
.ability_icon_type_4{
  background-color: rgb(96, 165, 250);
}
.ability_icon_type_5{
  background-color: rgb(192, 132, 252);
}
.txt-form-color-1 {
    color: #d3c194;
    text-shadow: 0 0 1px #150f0f,0 0 1px #150f0f,0 0 1px #150f0f,0 0 2px #150f0f,0 0 2px #150f0f,0 0 2px #150f0f;
}
.txt-form-color-2 {
    color: #ff795a;
    text-shadow: 0 0 1px #150f0f,0 0 1px #150f0f,0 0 1px #150f0f,0 0 2px #150f0f,0 0 2px #150f0f,0 0 2px #150f0f;
}
.txt-form-color-3 {
    color: #85e9f5;
    text-shadow: 0 0 1px #150f0f,0 0 1px #150f0f,0 0 1px #150f0f,0 0 2px #150f0f,0 0 2px #150f0f,0 0 2px #150f0f;
}
.txt-form-color-4 {
    color: #ffff5f;
    text-shadow: 0 0 1px #150f0f,0 0 1px #150f0f,0 0 1px #150f0f,0 0 2px #150f0f,0 0 2px #150f0f,0 0 2px #150f0f;
}
</style>
