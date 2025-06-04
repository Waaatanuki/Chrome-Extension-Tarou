<script setup lang="ts">
import dayjs from 'dayjs'
import { legendticket, legendticket10, saveStoneDate, stone } from '~/logic'
import GachaInfo from './GachaInfo.vue'

const totalStone = computed(() => legendticket10.value * 3000 + legendticket.value * 300 + stone.value)
const recordVisiable = ref(false)
function reset() {
  saveStoneDate.value = dayjs().unix()
}
</script>

<template>
  <el-card body-style="padding: 10px" header-class="my-card-header" h-full>
    <template #header>
      <div flex justify-between>
        <div fc gap-2>
          <div>{{ `攒井第${dayjs().diff(dayjs.unix(saveStoneDate), "day")}天` }}</div>
          <div i-carbon:document icon-btn title="查看抽卡记录" @click="recordVisiable = true" />
          <div i-carbon:reset icon-btn title="重置天数" @click="reset" />
        </div>
        <div fc text-orange-600 font-bold>
          <div v-if="totalStone >= 90000">
            {{ `${Math.floor(totalStone / 90000)}井` }}
          </div>
          <div v-if="Math.floor((totalStone % 90000) / 300) !== 0">
            {{ `${Math.floor((totalStone % 90000) / 300)}抽` }}
          </div>
        </div>
      </div>
    </template>
    <div flex gap-5 text-12px>
      <div w-50px fc flex-col>
        <img :src="getLocalImg('20010', 'ticket')">
        <span text-center>
          {{ legendticket10 }}
        </span>
      </div>
      <div w-50px fc flex-col>
        <img :src="getLocalImg('20011', 'ticket')">
        <span text-center>
          {{ legendticket }}
        </span>
      </div>
      <div w-50px fc flex-col>
        <img :src="getLocalImg('gem')">
        <span text-center>
          {{ stone }}
        </span>
      </div>
    </div>
    <el-dialog v-model="recordVisiable" width="780" top="5vh">
      <GachaInfo />
    </el-dialog>
  </el-card>
</template>
