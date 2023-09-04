<script setup lang="ts">
import type { DamageInfo, NpcAbility, NpcInfo } from '~/logic/types'

defineProps<{
  leader: any
  jobActionList: { [key: number]: NpcAbility }
  npcs: { [key: string]: NpcInfo }
  setAction: { name: string; set_action_id: string }[]
  damageInfo: DamageInfo
}>()

function getImg(id: string, type = 'npc') {
  return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/quest/${id}.jpg`
}
</script>

<template>
  <div h-210px w-380px fc flex-col justify-start>
    <div w-full flex justify-evenly>
      <div h-122px w-60px>
        <img v-if="leader?.image" w-full :src="getImg(leader?.image, 'leader')">
        <div mt-1px h-12px flex items-center justify-start>
          <div v-for=" i in 4" :key="i" relative w-15px fc>
            <img v-if="jobActionList[i - 1]" w-12px :src="getImgSrc(`ability_icon_type_${jobActionList[i - 1].icon_type}`, 'npc')">
            <CarbonClose
              v-if="jobActionList[i - 1] && !jobActionList[i - 1].user_full_auto_setting_flag"
              absolute left-2px top-0 bottom-0 text-10px text-black
            />
          </div>
        </div>
      </div>
      <div v-for="idx in 5" :key="idx" h-122px w-60px>
        <div v-if="npcs[idx]?.image_id_3">
          <img h-109px w-full :src="getImg(npcs[idx]?.image_id_3)">
          <div mt-1px h-12px flex items-center justify-start>
            <div v-for=" i in 4" :key="i" relative w-15px fc>
              <img v-if="npcs[idx].action_ability[i]" w-12px :src="getImgSrc(`ability_icon_type_${npcs[idx].action_ability[i].icon_type}`, 'npc')">
              <CarbonClose
                v-if="npcs[idx].action_ability[i] && !npcs[idx].action_ability[i].user_full_auto_setting_flag"
                absolute left-2px top-0 bottom-0 text-10px text-black
              />
            </div>
          </div>
        </div>
        <div v-else h-109px w-60px bg-slate-300 />
      </div>
    </div>
    <div h-full w-full flex items-center justify-between>
      <div flex flex-col items-start px-2 text-lg>
        <div>预测伤害：{{ damageInfo.assumed_normal_damage.toLocaleString() }}</div>
        <div>克属伤害：{{ damageInfo.assumed_advantage_damage.toLocaleString() }}</div>
      </div>
      <div flex flex-col gap-5px px-2 text-sm>
        <el-tag v-for="action in setAction " :key="action.name" type="info" effect="plain">
          {{ action.name }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ico-summon-quick{
  display: block;
  background: url(https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/summon-sdb20d1475e.png) no-repeat 0 -85px;
  -webkit-background-size: 28px 124px;
  background-size: 28px 124px;
  width: 20px;
  height: 20px;
  display: inline-block;

}
</style>
