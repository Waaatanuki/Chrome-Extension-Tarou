<script setup lang="ts">
import type { BuildWeapon } from 'party'
import { weaponSkill } from '~/constants/skill'

const { weapons } = defineProps<{ weapons: BuildWeapon[] }>()

const mainWeapon = computed(() => weapons.find(weapon => weapon.isMain)!)
const subWeapon = computed(() => weapons.filter(weapon => !weapon.isMain))

function getSkillAlias(weapon: BuildWeapon) {
  const seriesId = String(weapon.seriesId)
  if (!seriesId)
    return

  const hitWeaponSkill = weaponSkill.find(category => category.series_id.includes(seriesId))
  if (!hitWeaponSkill)
    return

  const hitSkilll = weapon.skill.find(skill => hitWeaponSkill.type === skill.type)
  const description = hitSkilll?.description
  if (!description)
    return

  return hitWeaponSkill.list.find(skill => description.includes(skill.comment) || description.includes(skill.comment_en))?.alias
}

// 判断是不是U武(13)
function isUW(weapon: BuildWeapon) {
  return weapon.seriesId === 13
}

// 判断是不是法武(3)
function isFW(weapon: BuildWeapon) {
  return weapon.seriesId === 3
}

// 判断是不是法武(3)或者U武(13)
function isFWorUW(weapon: BuildWeapon) {
  return isFW(weapon) || isUW(weapon)
}
</script>

<template>
  <div w-300px fc flex-col>
    <div fc gap-2px>
      <div relative w-80px shrink-0>
        <img w-full :src="getAssetImg('weapon', mainWeapon.imageId, 'ls')">
        <div class="prt-ultimate-star-wrapper">
          <div class="prt-ultimate-star-on" :data-level="mainWeapon.level" />
        </div>
        <img v-if="mainWeapon.arousalForm" class="ico-arousal-main-type" :src="getArousalIcon(mainWeapon.arousalForm)">
        <div v-if="getSkillAlias(mainWeapon)" class="skill-tag rounded bg-black/90 px-4px py-1px text-12px text-rose">
          {{ getSkillAlias(mainWeapon) }}
        </div>
        <img v-if="mainWeapon.skill.find(s => s.type === 'skill1')?.image && isUW(mainWeapon)" class="skill1-icon" :src="getSkillIcon(mainWeapon, 'skill1')">
        <img v-if="mainWeapon.skill.find(s => s.type === 'skill2')?.image && isFWorUW(mainWeapon)" class="skill2-icon" :src="getSkillIcon(mainWeapon, 'skill2')">
      </div>
      <div fc flex-wrap gap-3px>
        <div v-for="w, idx in subWeapon" :key="idx" class="side_weapon_wrapper">
          <img v-if="w.imageId" h-full :src="getAssetImg('weapon', w.imageId)">
          <div class="prt-ultimate-star-wrapper">
            <div class="prt-ultimate-star-on" :data-level="w.level" />
          </div>
          <img v-if="w.arousalForm" class="ico-arousal-type" :src="getArousalIcon(w.arousalForm)">
          <div v-if="getSkillAlias(w)" class="skill-tag rounded bg-black/90 px-4px py-1px text-12px text-rose">
            {{ getSkillAlias(w) }}
          </div>
          <img v-if="w.skill.find(s => s.type === 'skill1')?.image && isUW(w)" class="skill1-icon" :src="getSkillIcon(w, 'skill1')">
          <img v-if="w.skill.find(s => s.type === 'skill2')?.image && isFWorUW(w)" class="skill2-icon" :src="getSkillIcon(w, 'skill2')">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ico-arousal-main-type {
  position: absolute;
  bottom: 25px;
  left: 1px;
  width: 30px;
}
.ico-arousal-type {
  position: absolute;
  bottom: 14px;
  left: -2px;
  width: 22px;
}
.skill-tag {
  position: absolute;
  top: -1px;
  right: 0px;
}
.skill1-icon {
  position: absolute;
  top: -1px;
  left: 0px;
  width: 18px;
  height: 18px;
}
.skill2-icon {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 18px;
  height: 18px;
}
</style>
