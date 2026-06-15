<script setup lang="ts">
import type { OdiantWeapon } from 'extension'
import { weaponList } from '~/logic'

const selectedId = ref('')
const selectedSkill = ref('')
const idList = computed(() => [...new Set(weaponList.value.filter(w => w.isOdiantWeapon).map(i => i.masterId))])
const skillList = computed(() => {
  const list = weaponList.value.filter(w => idList.value.includes(w.masterId))
  const targetList = !selectedId.value
    ? list
    : list.filter(weapon => weapon.masterId === selectedId.value)

  return [...new Set(targetList.map(item => item.skillImage))]
})

watch(weaponList, () => {
  selectedId.value = ''
  selectedSkill.value = ''
})

watch(skillList, (value) => {
  if (selectedSkill.value && !value.includes(selectedSkill.value))
    selectedSkill.value = ''
}, { immediate: true })

function handleToggleId(value: string) {
  selectedId.value = selectedId.value === value ? '' : value
}

function handleToggleSkill(value: string) {
  selectedSkill.value = selectedSkill.value === value ? '' : value
}

function isWeaponMatch(weapon: OdiantWeapon) {
  return !selectedId.value || weapon.masterId === selectedId.value
}

function isSkillMatch(weapon: OdiantWeapon) {
  return !selectedSkill.value || weapon.skillImage === selectedSkill.value
}

function isWeaponVisible(weapon: OdiantWeapon) {
  return isWeaponMatch(weapon) && isSkillMatch(weapon) && weapon.isOdiantWeapon
}
</script>

<template>
  <div v-if="idList.length" sticky inset-x-0 top-0 z-999 class="bg-#141414" pb-10px text-base>
    <div rounded bg-neutral-8 p-8px>
      <div class="grid grid-cols-5 gap-2">
        <div v-for="id in idList" :key="id" class="fc cursor-pointer rounded-md p-3px transition-all" :class="selectedId === id ? 'ring-2 ring-teal-6' : 'opacity-70 hover:opacity-100'">
          <img
            :src="getAssetImg('weapon', id, 's')"
            @click="handleToggleId(id)"
          >
        </div>
      </div>
      <div class="grid grid-cols-8 mt-8px gap-8px">
        <div v-for="skill in skillList" :key="skill" class="fc">
          <img
            class="cursor-pointer rounded-md transition-all"
            :class="selectedSkill === skill ? 'ring-2 ring-teal-6' : 'opacity-70 hover:opacity-100'"
            :src="getAugmentSkillIcon(skill)"
            @click="handleToggleSkill(skill)"
          >
        </div>
      </div>
    </div>
  </div>

  <div v-if="idList.length" class="grid grid-cols-4 mt-10px gap-15px">
    <div v-for="weapon in weaponList" :key="weapon.position" class="relative fc flex-col">
      <template v-if="isWeaponVisible(weapon) ">
        <img :src="getAssetImg('weapon', weapon.masterId, 's')">
        <img class="absolute bottom-17px right--2px size-30px" :src="getAugmentSkillIcon(weapon.skillImage)">
        <div
          class="absolute left-0px top-0px size-20px fc rounded-rb-3px text-12px"
          :class="weapon.skillDepth === 1 ? 'bg-teal-6' : 'bg-black/72 text-#f5f5f5'"
        >
          {{ weapon.skillDepth }}
        </div>
        <div class="w-full rounded-b-5px bg-neutral-6 text-center text-12px">
          {{ weapon.position }}
        </div>
      </template>

      <template v-else>
        <img invisible :src="getAssetImg('weapon', weapon.masterId, 's')">
        <div class="invisible w-full rounded-b-5px bg-neutral-6 text-center text-12px">
          {{ weapon.position }}
        </div>
        <div class="absolute inset-0 rounded-md bg-neutral-6/50" />
      </template>
    </div>
  </div>

  <el-result v-if="idList.length === 0" icon="info" sub-title="当前界面不含有禁祸武器" />
</template>
