<script setup lang="ts">
import { userInfo } from '~/logic'

const order = [1, 2, 3, 4, 5, 6]
</script>

<template>
  <div v-if="userInfo.imgPc" relative h-285px w-530px>
    <img absolute h-full w-full :src="getLocalImg('frame')">
    <div relative z-10 flex gap-10px px-25px py-20px>
      <div>
        <img w-60px :src="getAssetImg('leader', userInfo.imgPc, 'raid_chain')">
      </div>
      <div v-if="userInfo.support" flex flex-col items-stretch justify-between>
        <div flex gap-10px>
          <div v-for="i in order" :key="i" space-y-10px>
            <div v-for="j in 2" :key="`${i}${j}`" relative cursor-pointer @click="userInfo.support[`${i}${j - 1}`].necessary = !userInfo.support[`${i}${j - 1}`]?.necessary">
              <template v-if="userInfo.support[`${i}${j - 1}`]">
                <img w-50px :src="getAssetImg('summon', userInfo.support[`${i}${j - 1}`].imgId, 'raid_normal') ">
                <div v-if="userInfo.support[`${i}${j - 1}`].name" absolute bottom-0 right-0 rounded bg-slate px-1 text-10px :class="`bless-${userInfo.support[`${i}${j - 1}`].rank}-style`">
                  {{ `Lv${userInfo.support[`${i}${j - 1}`].name.match(/\d+/)![0]}` }}
                </div>
                <div v-if="userInfo.support[`${i}${j - 1}`].necessary" i-twemoji:pushpin absolute right--8px top--8px />
              </template>
            </div>
          </div>
          <div space-y-10px>
            <div v-for="i in 2" :key="i" space-y-2px>
              <div v-for="j in 2" :key="`0${2 * i + j - 3}`" relative cursor-pointer @click="userInfo.support[`0${2 * i + j - 3}`].necessary = !userInfo.support[`0${2 * i + j - 3}`]?.necessary">
                <template v-if="userInfo.support[`0${2 * i + j - 3}`]">
                  <img v-if="userInfo.support[`0${2 * i + j - 3}`].imgId !== 'empty'" w-50px :src="getAssetImg('summon', userInfo.support[`0${2 * i + j - 3}`].imgId, 's') ">
                  <div v-else h-50px w-50px />
                  <div v-if="userInfo.support[`0${2 * i + j - 3}`].name" absolute bottom-0 right-0 rounded bg-slate px-1 text-10px :class="`bless-${userInfo.support[`0${2 * i + j - 3}`].rank}-style`">
                    {{ `Lv${userInfo.support[`0${2 * i + j - 3}`].name.match(/\d+/)![0]}` }}
                  </div>
                  <div v-if="userInfo.support[`0${2 * i + j - 3}`].necessary" i-twemoji:pushpin absolute right--8px top--8px />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div flex items-center justify-between text-15px text-white font-700>
          <div>
            ID: {{ userInfo.uid }}
          </div>
          <div>
            昵称: {{ userInfo.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-result v-else icon="info" sub-title="还未获取友招信息" />
</template>

<style scoped>
.bless-rank1-style {
  color: #ffa826;
  text-shadow:
    0px 0px 1px #694429,
    0px 0px 1px #694429,
    0px 0px 1px #694429,
    0px 0px 2px #694429,
    0px 0px 2px #694429,
    0px 0px 2px #694429;
}

.bless-rank2-style {
  color: #e3b7ff;
  text-shadow:
    0px 0px 1px #7f12b7,
    0px 0px 1px #7f12b7,
    0px 0px 1px #7f12b7,
    0px 0px 2px #7f12b7,
    0px 0px 2px #7f12b7,
    0px 0px 2px #7f12b7;
}

.bless-rank3-style {
  color: #a1e3ff;
  text-shadow:
    0px 0px 1px #371eb4,
    0px 0px 1px #371eb4,
    0px 0px 1px #371eb4,
    0px 0px 2px #371eb4,
    0px 0px 2px #371eb4,
    0px 0px 2px #371eb4,
    0px 0px 3px #371eb4,
    0px 0px 3px #371eb4,
    0px 0px 3px #371eb4;
}

.bless-rank4-style {
  color: #ffcac3;
  text-shadow:
    0 0 1px #a12a00,
    0 0 1px #a12a00,
    0 0 1px #a12a00,
    0 0 2px #a12a00,
    0 0 2px #a12a00,
    0 0 2px #a12a00,
    0 0 3px #a12a00,
    0 0 3px #a12a00,
    0 0 3px #a12a00;
}
</style>
