<script setup lang="ts">
import type { DamageInfo, DeckWeapon } from '~/logic/types'

defineProps<{
  weapons: DeckWeapon
  simpleChecked: boolean
  damageInfo: DamageInfo
}>()

function getImg(type: string, id: string, size = 'm') {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${type}/${size}/${id}.jpg`
}

function getArousalType(form: number) {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/arousal_type/type_${form}.png`
}
</script>

<template>
  <div fc flex-col>
    <div h-210px fc>
      <div w-100px relative>
        <img w-full :src="getImg('weapon', weapons[1].master.id, 'ls')">
        <div v-if="weapons[1].master.series_id === '3'" class="skill-name" text-xs>
          {{ weapons[1].skill3?.name.split('の')[1] }}
        </div>
      </div>
      <div w-275px fc flex-wrap gap-5px>
        <div v-for="idx in 12" :key="idx" h-48px w-85px fc bg-slate-300 relative>
          <img v-if="weapons[idx + 1]?.master?.id" w-full :src="getImg('weapon', weapons[idx + 1]?.master?.id)">
          <img v-if="weapons[idx + 1]?.param?.arousal.is_arousal_weapon" class="ico-arousal-type" :src="getArousalType(weapons[idx + 1]?.param?.arousal.form)">
          <div v-if="weapons[idx + 1]?.master.series_id === '3'" class="skill-name" text-xs>
            {{ weapons[idx + 1]?.skill3?.name.split('の')[1] }}
          </div>
        </div>
      </div>
    </div>
    <div v-show="simpleChecked" w-full flex items-center justify-between p-10px text-lg>
      <div>预测伤害：{{ damageInfo.assumed_normal_damage.toLocaleString() }}</div>
      <div>克属伤害：{{ damageInfo.assumed_advantage_damage.toLocaleString() }}</div>
    </div>
  </div>
</template>

<style scoped>
.ico-arousal-type{
  position: absolute;
  top: 9px;
  left: -2px;
  width: 22px;
}
.skill-name{
  background-color: white;
  position: absolute;
  bottom: 1px;
  right: 1px;
  color: red;
  font-weight: bolder;
}
</style>
