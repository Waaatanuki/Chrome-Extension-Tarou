<script setup lang="ts">
import type { BuffInfo } from '../types'
import type { BossConditionJson, Buff } from '~/logic/types'
import { specBossBuff, specPlayerBuff } from '~/logic'

const props = defineProps<{ buffInfo: BuffInfo; bossConditionJson: BossConditionJson }>()

const importantBossBuffs = ref<Buff[]>([])
const importantPlayerBuffs = ref<Buff[]>([])
const bossTimeBuff = ref<{ status: string; remain: number; visiable: boolean }[]>([])

watch(() => props.bossConditionJson, (data) => {
  if (!data)
    return []
  const bossCondition = data.buff.concat(data.debuff)
  const timeConfition = bossCondition.filter(b => b.class === 'time' && b.remain !== 0)
  bossTimeBuff.value = timeConfition.reduce<{ status: string; remain: number; visiable: boolean }[]>((pre, cur) => {
    pre.push({
      status: cur.status,
      remain: Date.now() + 1000 * timeToSeconds(String(cur.remain)),
      visiable: true,
    })
    return pre
  }, [])
})

watchEffect(() => {
  importantBossBuffs.value = specBossBuff.value.reduce<Buff[]>((pre, cur) => {
    props.buffInfo.bossBuffs.forEach(buff => buff.status.startsWith(cur) && pre.push(buff))
    return pre
  }, [])

  importantPlayerBuffs.value = specPlayerBuff.value.reduce<Buff[]>((pre, cur) => {
    props.buffInfo.playerBuffs.forEach(buff => buff.status.startsWith(cur) && pre.push(buff))
    return pre
  }, [])
})

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}

function getBuffIcon(status: string) {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${status}.png`
}

function timeToSeconds(timeString: string) {
  const timeParts = timeString.split(':')
  const minutes = Number.parseInt(timeParts[0])
  const seconds = Number.parseInt(timeParts[1])
  return minutes * 60 + seconds
}
</script>

<template>
  <div v-if="buffInfo" min-w-450px p-10px>
    <div>
      <div flex justify-end>
        <div rounded-t-5px bg-rose-500 p-5px text-base text-white>
          Boss
        </div>
      </div>
      <div flex flex-wrap items-center justify-end border-2 border-rose-500 p-5px>
        <img
          v-for="buff, idx in buffInfo.bossBuffs" :key="idx" class="buff-icon"
          :src="getBuffIcon(buff.status)"
          @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
        >
      </div>
    </div>
    <div v-if="importantBossBuffs.length === 0 && importantPlayerBuffs.length === 0" m-8px border-t-1 border-slate-500 />
    <div v-else my-8px border-2 border-slate-500>
      <div flex flex-wrap justify-center items-start>
        <div v-for="buff in bossTimeBuff.filter(item => item.visiable && specBossBuff.some(b => item.status.startsWith(b)))" :key="buff.status" w-60px fc flex-col p-2px>
          <img w-full cursor-pointer :src="getBuffIcon(buff.status)" @click="toggleImage(specBossBuff, buff.status.split('_')[0])">
          <el-countdown
            format="mm:ss"
            :value="buff.remain"
            @finish="buff.visiable = false"
          />
        </div>
        <div v-for="buff in importantBossBuffs.filter(item => !bossTimeBuff.some(b => item.status === b.status))" :key="buff.status" w-60px fc flex-col p-2px>
          <img w-full cursor-pointer :src="getBuffIcon(buff.status)" @click="toggleImage(specBossBuff, buff.status.split('_')[0])">
        </div>
      </div>
      <div border-t-1 border-slate-500 />
      <div fc flex-wrap>
        <div v-for="buff, idx in importantPlayerBuffs" :key="idx" w-60px p-2px cursor-pointer>
          <img
            w-full :src="getBuffIcon(buff.status)"
            @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
          >
        </div>
      </div>
    </div>
    <div>
      <div flex flex-wrap items-center justify-start border-2 border-blue-500 p-5px>
        <img
          v-for="buff, idx in buffInfo.playerBuffs" :key="idx" class="buff-icon"
          :src="getBuffIcon(buff.status)"
          @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
        >
      </div>
      <div flex justify-start>
        <div rounded-b-5px bg-blue-500 p-5px text-base text-white>
          主角
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buff-icon{
  height: 2.5rem;
  cursor: pointer;
}
</style>
