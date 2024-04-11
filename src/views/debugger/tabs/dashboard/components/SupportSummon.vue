<script setup lang="ts">
import { mySupportSummon, profile } from '~/logic'

const order = [1, 2, 3, 4, 5, 6, 0]
</script>

<template>
  <el-card v-if="profile.uid" h-full shrink-0 :body-style="{ padding: '10px' }">
    <div flex gap-10px>
      <div>
        <img w-60px :src="getAssetImg('leader', profile.imgPc, 'raid_chain')">
      </div>
      <div flex flex-col items-stretch justify-between>
        <div flex gap-10px>
          <div v-for="i in order" :key="i" space-y-10px>
            <div v-for="j in 2" :key="`${i}${j}`" relative cursor-pointer @click="mySupportSummon[`${i}${j - 1}`].necessary = !mySupportSummon[`${i}${j - 1}`]?.necessary">
              <template v-if="mySupportSummon[`${i}${j - 1}`]">
                <img w-50px :src="getAssetImg('summon', mySupportSummon[`${i}${j - 1}`].imgId, 'raid_normal') ">
                <div absolute bottom-0 right-0 rounded bg-slate px-1 text-10px :class="`bless-${mySupportSummon[`${i}${j - 1}`].rank}-style`">
                  {{ mySupportSummon[`${i}${j - 1}`].name.split(' ')[0] }}
                </div>
                <div v-if="mySupportSummon[`${i}${j - 1}`].necessary" i-twemoji:pushpin absolute right--8px top--8px />
              </template>
            </div>
          </div>
        </div>
        <div flex items-center justify-between text-15px font-700>
          <div>
            ID: {{ profile.uid }}
          </div>
          <div>
            昵称: {{ profile.name }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
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
