<script setup lang="ts">
import type { Buff } from 'source'
import { battleInfo, specBossBuff } from '~/logic'

const importantBossBuffs = ref<Buff[]>([])
const commonBossBuffs = ref<Buff[]>([])

watchEffect(() => {
  if (!battleInfo.value.buffInfo?.bossBuffs)
    return

  importantBossBuffs.value = []
  commonBossBuffs.value = []
  for (const buff of battleInfo.value.buffInfo?.bossBuffs) {
    if (specBossBuff.value.some(specBuff => buff.status.startsWith(specBuff)))
      importantBossBuffs.value.push(buff)
    else
      commonBossBuffs.value.push(buff)
  }
})

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}
</script>

<template>
  <div w-300px flex flex-wrap rounded-md p-6px ring-1 ring-neutral-7>
    <img
      v-for="buff in importantBossBuffs"
      :key="buff.status"
      h-48px w-48px cursor-pointer
      :src="getBuffIcon(buff, battleInfo.bossInfo!.turn)"
      @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
    >
    <div v-for="i in commonBossBuffs.length" :key="i" flex flex-col>
      <img
        v-if="commonBossBuffs[(i - 1) * 2]"
        h-24px w-24px cursor-pointer
        :src="getBuffIcon(commonBossBuffs[(i - 1) * 2], battleInfo.bossInfo!.turn)"
        @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2].status.split('_')[0])"
      >
      <img
        v-if="commonBossBuffs[(i - 1) * 2 + 1]"
        h-24px w-24px cursor-pointer
        :src="getBuffIcon(commonBossBuffs[(i - 1) * 2 + 1], battleInfo.bossInfo!.turn)"
        @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2 + 1].status.split('_')[0])"
      >
    </div>
  </div>
</template>
