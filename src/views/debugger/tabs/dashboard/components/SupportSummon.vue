<script setup lang="ts">
import { mySupportSummon, uid, userImgPc } from '~/logic'

const order = [1, 2, 3, 4, 5, 6, 0]
</script>

<template>
  <div v-if="userImgPc" w-full fc>
    <el-card w-850px shrink-0 :body-style="{ padding: '10px' }">
      <div relative h-111px>
        <div absolute left-0 top-0>
          <img w-200px :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/raid_log/${userImgPc}.png`">
          <div mt-10px pl-20px text-15px font-700>
            ID: {{ uid }}
          </div>
        </div>
        <div ml-150px flex gap-15px>
          <div v-for="i in order" :key="i" space-y-15px>
            <div v-for="j in 2" :key="`${i}${j}`" relative cursor-pointer @click="mySupportSummon[`${i}${j - 1}`].necessary = !mySupportSummon[`${i}${j - 1}`]?.necessary">
              <template v-if="mySupportSummon[`${i}${j - 1}`]">
                <img :class="{ necessary: mySupportSummon[`${i}${j - 1}`].necessary }" w-85px :src="getAssetImg('summon', mySupportSummon[`${i}${j - 1}`].imgId) ">
                <div absolute bottom-0 right-0 rounded bg-slate px-1 text-12px :class="`bless-${mySupportSummon[`${i}${j - 1}`].rank}-style`">
                  {{ mySupportSummon[`${i}${j - 1}`].name.split(' ')[0] }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.necessary {
  box-shadow: 0 0 5px 5px #dc2626;
}

.bless-rank1-style {
    color: #ffa826;
    text-shadow: 0px 0px 1px #694429,0px 0px 1px #694429,0px 0px 1px #694429,0px 0px 2px #694429,0px 0px 2px #694429,0px 0px 2px #694429
}

.bless-rank2-style {
    color: #e3b7ff;
    text-shadow: 0px 0px 1px #7f12b7,0px 0px 1px #7f12b7,0px 0px 1px #7f12b7,0px 0px 2px #7f12b7,0px 0px 2px #7f12b7,0px 0px 2px #7f12b7
}

.bless-rank3-style {
    color: #a1e3ff;
    text-shadow: 0px 0px 1px #371eb4,0px 0px 1px #371eb4,0px 0px 1px #371eb4,0px 0px 2px #371eb4,0px 0px 2px #371eb4,0px 0px 2px #371eb4,0px 0px 3px #371eb4,0px 0px 3px #371eb4,0px 0px 3px #371eb4
}

.bless-rank4-style {
    color: #ffcac3;
    text-shadow: 0 0 1px #a12a00, 0 0 1px #a12a00, 0 0 1px #a12a00, 0 0 2px #a12a00, 0 0 2px #a12a00, 0 0 2px #a12a00, 0 0 3px #a12a00, 0 0 3px #a12a00, 0 0 3px #a12a00
}
</style>
