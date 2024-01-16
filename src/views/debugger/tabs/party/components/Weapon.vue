<script setup lang="ts">
import type { DamageInfo, DeckWeapon, WeaponDetail } from 'requestData'
import { weaponSkill } from '~/constants/skill'

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

function getSkillAlias(weapon: WeaponDetail) {
  const series_id = weapon?.master?.series_id
  const hit = weaponSkill.find(category => category.series_id.includes(series_id))
  if (!hit)
    return

  const description = weapon[hit.type as 'skill2' | 'skill3']?.description
  if (!description)
    return

  return hit.list.find(skill => description.includes(skill.comment) || description.includes(skill.comment_en))?.alias
}
</script>

<template>
  <div fc flex-col>
    <div h-210px fc>
      <div relative w-100px>
        <img w-full :src="getImg('weapon', weapons[1].param.image_id, 'ls')">
        <ElTag v-if="getSkillAlias (weapons[1])" type="danger" size="small" class="skill-tag">
          {{ getSkillAlias (weapons[1]) }}
        </ElTag>
      </div>
      <div w-275px fc flex-wrap gap-5px>
        <div v-for="idx in 12" :key="idx" class="party_weapon_wrapper">
          <img v-if="weapons[idx + 1]?.param?.image_id" w-full :src="getImg('weapon', weapons[idx + 1]?.param?.image_id)">
          <img v-if="weapons[idx + 1]?.param?.arousal.form" class="ico-arousal-type" :src="getArousalType(weapons[idx + 1]?.param?.arousal.form)">
          <ElTag v-if="getSkillAlias (weapons[idx + 1])" type="danger" size="small" class="skill-tag">
            {{ getSkillAlias (weapons[idx + 1]) }}
          </ElTag>
        </div>
      </div>
    </div>
    <div v-show="simpleChecked" w-full flex items-center justify-between p-10px text-base>
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
.skill-tag{
  position: absolute;
  top: -1px;
  right: 0px;
}
</style>
