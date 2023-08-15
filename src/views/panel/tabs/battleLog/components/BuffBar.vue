<script setup lang="ts">
import type { BuffInfo } from '../types'
import type { Buff } from '~/logic/types'
import { specBossBuff, specPlayerBuff } from '~/logic'

const props = defineProps<{ buffInfo: BuffInfo }>()

const importantBossBuffs = computed(() =>
  specBossBuff.value.reduce<Buff[]>((pre, cur) => {
    props.buffInfo.bossBuffs.forEach(buff => buff.status.startsWith(cur) && pre.push(buff))
    return pre
  }, []),
)

const importantPlayerBuffs = computed(() =>
  specPlayerBuff.value.reduce<Buff[]>((pre, cur) => {
    props.buffInfo.playerBuffs.forEach(buff => buff.status.startsWith(cur) && pre.push(buff))
    return pre
  }, []),
)

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
</script>

<template>
  <div w-full>
    <el-descriptions v-if="buffInfo" direction="vertical" border :column="1">
      <el-descriptions-item label="BOSS BUFF">
        <template #default>
          <div class="buff-wrapper">
            <img
              v-for="buff, idx in buffInfo.bossBuffs" :key="idx" class="buff-icon"
              :src="getBuffIcon(buff.status)"
              @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
            >
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="主角 BUFF">
        <template #default>
          <div class="buff-wrapper">
            <img
              v-for="buff, idx in buffInfo.playerBuffs" :key="idx" class="buff-icon"
              :src="getBuffIcon(buff.status)"
              @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
            >
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="特别BOSS BUFF">
        <template #default>
          <div class="buff-wrapper">
            <img
              v-for="buff, idx in importantBossBuffs" :key="idx" class="buff-icon"
              :src="getBuffIcon(buff.status)"
              @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
            >
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="特别主角 BUFF">
        <template #default>
          <div class="buff-wrapper">
            <img
              v-for="buff, idx in importantPlayerBuffs" :key="idx" class="buff-icon"
              :src="getBuffIcon(buff.status)"
              @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
            >
          </div>
        </template>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.buff-wrapper{
  display: flex;
  flex-wrap: wrap;
}
.buff-icon{
  height: 2.5rem;
  cursor: pointer;
}
</style>
