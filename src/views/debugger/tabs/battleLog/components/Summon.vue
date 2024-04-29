<script setup lang="ts">
import type { Summon } from 'requestData'
import { storeToRefs } from 'pinia'

const battleLogStore = useBattleLogStore()
const { summonInfo } = storeToRefs(battleLogStore)

const summonList = computed(() => {
  const res = summonInfo.value?.summon.reduce<Summon[]>((pre, cur) => {
    cur.id && pre.push(cur)
    return pre
  }, []) ?? []

  if (summonInfo.value?.supporter.id)
    res.push(summonInfo.value.supporter)

  return res
})
</script>

<template>
  <ElCard v-if="summonList.length > 0" :body-style="{ padding: '10px' }">
    <div fc gap-5px>
      <div v-for="summon, idx in summonList" :key="idx" class="party_weapon_wrapper">
        <img w-full :src="getAssetImg('summon', summon.image_id)">
        <div v-if=" Number(summon.recast) !== 0" absolute h-full w-full fc>
          <div absolute h-full w-full bg-slate-900 opacity-50 />
          <div z-999 h-30px w-30px fc border-3 border-red-700 rounded-full text-lg text-white>
            {{ Number(summon.recast) > 100 ? '∞' : summon.recast }}
          </div>
        </div>
      </div>
    </div>
  </ElCard>
</template>
