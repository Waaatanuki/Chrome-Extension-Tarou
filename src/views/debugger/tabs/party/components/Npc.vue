<script setup lang="ts">
import type { DamageInfo, NpcAbility, NpcInfo } from 'source'

defineProps<{
  leader: any
  leaderAbilityList: NpcAbility[]
  npcs: NpcInfo[]
  setAction: { name: string, set_action_id: string, icon_id?: string }[]
  damageInfo: DamageInfo
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
      <div h-122px w-60px>
        <img w-full :src="getAssetImg('leader', leader.image, 'quest')">
        <div mt-1px h-12px flex items-center justify-start>
          <div v-for=" i in 4" :key="i" relative w-15px fc>
            <div v-if="leaderAbilityList[i - 1]" :class="`ability_icon_type_${leaderAbilityList[i - 1].icon_type}`" h-12px w-12px border-1 rounded-sm />
            <div
              v-if="leaderAbilityList[i - 1] && !leaderAbilityList[i - 1].user_full_auto_setting_flag"
              i-carbon:close absolute text-13px text-black
            />
          </div>
        </div>
      </div>
      <div v-for="npc in npcs" :key="npc.id" relative h-122px w-60px>
        <img h-109px w-full :src="getAssetImg('npc', npc.image_id_3, 'quest')">
        <img v-if="npc.has_npcaugment_constant" absolute left-0 top-0 w-20px :src="getLocalImg('icon_augment')">
        <div v-if="npc.npc_arousal_form" :class="`txt-form-color-${npc.npc_arousal_form}`" absolute bottom-13px right-0 rounded bg-slate px-1 text-14px>
          {{ NPC_AROUSAL_FORM[npc.npc_arousal_form] }}
        </div>
        <div mt-1px h-12px flex items-center justify-start>
          <div v-for="ability in npc.action_ability" :key="ability.action_id" relative w-15px fc>
            <div
              :class="`ability_icon_type_${ability.icon_type}`"
              h-12px w-12px border-1 rounded-sm
            />
            <div
              v-if="!ability.user_full_auto_setting_flag"
              i-carbon:close absolute text-13px text-black
            />
          </div>
        </div>
      </div>
    </div>
    <div h-full w-full flex items-center justify-between>
      <div flex flex-col items-start px-2 text-base>
        <div>预测伤害：{{ damageInfo.assumed_normal_damage.toLocaleString() }}</div>
        <div>克属伤害：{{ damageInfo.assumed_advantage_damage.toLocaleString() }}</div>
      </div>
      <div flex flex-col gap-5px px-2 text-sm>
        <ElTag v-for="action in setAction " :key="action.name" type="info" effect="plain">
          <div fc gap-4px>
            <img v-if="action.icon_id" w-20px :src="getAbilityIcon(action.icon_id)">
            <span>{{ action.name }}</span>
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
