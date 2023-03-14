<template>
  <el-card class="m-3 w-56 h-full" :body-style="{ padding: '3px' }">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-xl">
          {{
            `攒井第${dayjs().diff(
              dayjs.unix(dashboard.saveStoneDate),
              'day'
            )}天`
          }}</span
        >
        <el-button type="primary" link @click="reset">重置</el-button>
      </div>
    </template>
    <div fc flex-col>
      <div fc>
        <div class="w-20 flex flex-col p-3">
          <img
            src="https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/ticket/20010.jpg"
          />
          <span text-center text-sm>
            {{ dashboard.legendticket10 + '枚' }}
          </span>
        </div>
        <div class="w-20 flex flex-col p-3">
          <img
            src="https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/ticket/20011.jpg"
          />
          <span text-center text-sm>
            {{ dashboard.legendticket + '枚' }}
          </span>
        </div>
      </div>
      <div fc>
        <div class="w-20 flex flex-col p-3">
          <img
            src="https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/normal/s/gem.jpg"
          />
          <span text-center text-sm>
            {{ dashboard.stone + '個' }}
          </span>
        </div>
        <div class="w-20 font-bold text-orange-600 text-center text-base p-3">
          {{
            (dashboard.totalStone > 90000
              ? Math.floor(dashboard.totalStone / 90000) + '井'
              : '') +
            Math.floor((dashboard.totalStone % 90000) / 300) +
            '抽'
          }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useStore from '@/store'
import dayjs from 'dayjs'
const { dashboard } = useStore()

chrome.storage.onChanged.addListener((changes: object) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key == 'legendticket10' || key == 'legendticket' || key == 'stone')
      dashboard[key] = newValue
  }
})

function reset() {
  dashboard.saveStoneDate = dayjs().unix()
}
onMounted(() => {
  chrome.storage.local
    .get(['legendticket10', 'legendticket', 'stone'])
    .then(result => {
      dashboard['legendticket10'] = result['legendticket10']
      dashboard['legendticket'] = result['legendticket']
      dashboard['stone'] = result['stone']
    })
})
</script>

<style lang="scss" scoped></style>
