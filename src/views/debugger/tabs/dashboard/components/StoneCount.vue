<script setup lang="ts">
import dayjs from 'dayjs'
import GachaInfo from './GachaInfo.vue'
import { legendticket, legendticket10, saveStoneDate, stone } from '~/logic'

const totalStone = computed(() => legendticket10.value * 3000 + legendticket.value * 300 + stone.value)
const recordVisiable = ref(false)
function reset() {
  saveStoneDate.value = dayjs().unix()
}
</script>

<template>
  <ElCard m-3 h-full w-220px>
    <template #header>
      <div flex items-center justify-between>
        <span text-xl>
          {{ `攒井第${dayjs().diff(dayjs.unix(saveStoneDate), "day")}天` }}
        </span>
        <div fc gap-10px text-lg>
          <div i-carbon:document icon-btn title="View Roll History" @click="recordVisiable = true" />
          <div i-carbon:reset icon-btn title="Days Since Reset" @click="reset" />
        </div>
      </div>
    </template>
    <div fc flex-wrap gap-10px>
      <div w-80px fc flex-col>
        <img :src="getLocalImg('20010', 'ticket')">
        <span text-center text-sm>
          {{ `${legendticket10}x` }}
        </span>
      </div>
      <div w-80px fc flex-col>
        <img :src="getLocalImg('20011', 'ticket')">
        <span text-center text-sm>
          {{ `${legendticket}x` }}
        </span>
      </div>
      <div w-80px fc flex-col>
        <img :src="getLocalImg('gem')">
        <span text-center text-sm>
          {{ `${stone}x` }}
        </span>
      </div>
      <div w-80px fc flex-col text-center text-base font-bold text-orange-600>
        <div v-if="totalStone >= 90000">
          {{ `${Math.floor(totalStone / 90000)} Sparks` }}
        </div>
        <div v-if="Math.floor((totalStone % 90000) / 300) !== 0">
          {{ `${Math.floor((totalStone % 90000) / 300)}抽` }}
        </div>
      </div>
    </div>
    <ElDialog v-model="recordVisiable" width="780" top="5vh">
      <GachaInfo />
    </ElDialog>
  </ElCard>
</template>
