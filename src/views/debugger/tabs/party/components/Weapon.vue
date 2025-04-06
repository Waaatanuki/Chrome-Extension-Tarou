<script setup lang="ts">
import type { DeckWeapon, WeaponDetail } from 'source'
import { weaponSkill } from '~/constants/skill'

defineProps<{ weapons: DeckWeapon }>()

function getSkillAlias(weapon: WeaponDetail) {
  const series_id = weapon?.master?.series_id
  if (!series_id)
    return

  const hit = weaponSkill.find(category => category.series_id.includes(series_id))
  if (!hit)
    return

  const description = weapon[hit.type as 'skill2' | 'skill3']?.description
  if (!description)
    return

  return hit.list.find(skill => description.includes(skill.comment) || description.includes(skill.comment_en))?.alias
}

// 判断是不是U武(13)
function isUW(weapon: WeaponDetail) {
  return weapon?.master?.series_id === '13'
}

// 判断是不是法武(3)
function isFW(weapon: WeaponDetail) {
  return weapon?.master?.series_id === '3'
}

// 判断是不是法武(3)或者U武(13)
function isFWorUW(weapon: WeaponDetail) {
  return isFW(weapon) || isUW(weapon)
}
</script>

<template>
  <div fc flex-col>
    <div h-210px fc>
      <div relative w-100px>
        <img w-full :src="getAssetImg('weapon', weapons[1].param.image_id, 'ls')">
        <div class="prt-ultimate-star-wrapper">
          <div class="prt-ultimate-star-on" :data-level=" weapons[1].param.level" />
        </div>
        <img v-if="weapons[1]?.param?.arousal.form" class="ico-arousal-main-type" :src="getArousalIcon(weapons[1]?.param?.arousal.form)">
        <ElTag v-if="getSkillAlias (weapons[1])" type="danger" size="small" class="skill-tag">
          {{ getSkillAlias (weapons[1]) }}
        </ElTag>
        <img v-if="weapons[1]?.skill1?.image && isUW(weapons[1])" class="skill1-icon" :src="getSkillIcon(weapons[1]?.skill1?.image)">
        <img v-if="weapons[1]?.skill2?.image && isFWorUW(weapons[1])" class="skill2-icon" :src="getSkillIcon(weapons[1]?.skill2?.image)">
      </div>
      <div w-275px fc flex-wrap gap-5px>
        <div v-for="idx in 12" :key="idx" class="party_weapon_wrapper">
          <img v-if="weapons[idx + 1]?.param?.image_id" w-full :src="getAssetImg('weapon', weapons[idx + 1]?.param?.image_id)">
          <div class="prt-ultimate-star-wrapper">
            <div class="prt-ultimate-star-on" :data-level="weapons[idx + 1]?.param?.level" />
          </div>
          <img v-if="weapons[idx + 1]?.param?.arousal.form" class="ico-arousal-type" :src="getArousalIcon(weapons[idx + 1]?.param?.arousal.form)">
          <ElTag v-if="getSkillAlias (weapons[idx + 1])" type="danger" size="small" class="skill-tag">
            {{ getSkillAlias (weapons[idx + 1]) }}
          </ElTag>
          <img v-if="weapons[idx + 1]?.skill1?.image && isUW(weapons[idx + 1])" class="skill1-icon" :src="getSkillIcon(weapons[idx + 1]?.skill1?.image)">
          <img v-if="weapons[idx + 1]?.skill2?.image && isFWorUW(weapons[idx + 1])" class="skill2-icon" :src="getSkillIcon(weapons[idx + 1]?.skill2?.image)">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ico-arousal-main-type{
  position: absolute;
  bottom: 25px;
  left: 1px;
  width: 30px;
}
.ico-arousal-type{
  position: absolute;
  bottom: 14px;
  left: -2px;
  width: 22px;
}
.skill-tag{
  position: absolute;
  top: -1px;
  right: 0px;
}
.skill1-icon{
  position: absolute;
  top: -1px;
  left: 0px;
  width: 18px;
  height: 18px;
}
.skill2-icon{
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 18px;
  height: 18px;
}
</style>
