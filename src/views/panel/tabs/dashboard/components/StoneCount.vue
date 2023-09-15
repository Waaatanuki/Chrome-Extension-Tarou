<script setup lang="ts">
import dayjs from 'dayjs'
import { legendticket, legendticket10, saveStoneDate, stone } from '~/logic'

const totalStone = computed(() => legendticket10.value * 3000 + legendticket.value * 300 + stone.value)

function reset() {
  saveStoneDate.value = dayjs().unix()
}
</script>

<template>
  <el-card m-3 w-220px h-full>
    <template #header>
      <div flex justify-between items-center>
        <span text-xl>
          {{ `攒井第${dayjs().diff(dayjs.unix(saveStoneDate), "day")}天` }}
        </span>
        <el-button type="danger" link @click="reset">
          重置
        </el-button>
      </div>
    </template>
    <div fc flex-wrap gap-10px>
      <div w-80px fc flex-col>
        <img :src="getLocalImg('20010', 'ticket')">
        <span text-center text-sm>
          {{ `${legendticket10}枚` }}
        </span>
      </div>
      <div w-80px fc flex-col>
        <img :src="getLocalImg('20011', 'ticket')">
        <span text-center text-sm>
          {{ `${legendticket}枚` }}
        </span>
      </div>
      <div w-80px fc flex-col>
        <img :src="getLocalImg('gem')">
        <span text-center text-sm>
          {{ `${stone}個` }}
        </span>
      </div>
      <div w-80px fc flex-col text-center text-base font-bold text-orange-600>
        <div v-if="totalStone >= 90000">
          {{ `${Math.floor(totalStone / 90000)}井` }}
        </div>
        <div v-if="Math.floor((totalStone % 90000) / 300) !== 0">
          {{ `${Math.floor((totalStone % 90000) / 300)}抽` }}
        </div>
      </div>
    </div>
  </el-card>
</template>
