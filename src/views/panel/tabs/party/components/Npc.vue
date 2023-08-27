<script setup lang="ts">
import type { DamageInfo, DeckNpc } from '~/logic/types'

defineProps<{
  leader: any
  npcs: DeckNpc
  setAction: { name: string }[]
  damageInfo: DamageInfo
}>()

function getImg(id: string, type = 'npc') {
  return `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/quest/${id}.jpg`
}
</script>

<template>
  <div h-210px w-380px fc flex-col justify-start>
    <div w-full flex justify-evenly>
      <div h-109px w-60px bg-slate-300>
        <img v-if="leader?.image" w-full :src="getImg(leader?.image, 'leader')">
      </div>
      <div v-for="idx in 5" :key="idx" h-109px w-60px fc bg-slate-300>
        <img v-if="npcs[idx ]?.param?.image_id_3" w-full :src="getImg(npcs[idx ]?.param?.image_id_3)">
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
