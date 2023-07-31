<script setup lang="ts">
import dayjs from 'dayjs'
import { legendticket, legendticket10, saveStoneDate, stone } from '~/logic'

const totalStone = computed(() => legendticket10.value * 3000 + legendticket.value * 300 + stone.value)

function reset() {
  saveStoneDate.value = dayjs().unix()
}
</script>

<template>
  <el-card m-3 w-56 h-full :body-style="{ padding: '3px' }">
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
    <div fc flex-col>
      <div fc>
        <div class="w-20 flex flex-col p-3">
          <img :src="getImgSrc('20010', 'ticket')">
          <span text-center text-sm>
            {{ `${legendticket10}枚` }}
          </span>
        </div>
        <div class="w-20 flex flex-col p-3">
          <img :src="getImgSrc('20011', 'ticket')">
          <span text-center text-sm>
            {{ `${legendticket}枚` }}
          </span>
        </div>
      </div>
      <div fc>
        <div class="w-20 flex flex-col p-3">
          <img :src="getImgSrc('gem')">
          <span text-center text-sm>
            {{ `${stone}個` }}
          </span>
        </div>
        <div class="w-20 font-bold text-orange-600 text-center text-base p-3">
          {{ `${(totalStone > 90000 ? `${Math.floor(totalStone / 90000)}井` : "") + Math.floor((totalStone % 90000) / 300)}抽` }}
        </div>
      </div>
    </div>
  </el-card>
</template>
