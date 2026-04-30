<script setup lang="ts">
import { userInfo } from '~/logic'
</script>

<template>
  <div v-if="userInfo.imgPc" relative h-300px w-650px>
    <img absolute h-full w-full :src="getLocalImg('frame')">
    <div relative z-10 flex gap-10px px-25px py-20px>
      <div>
        <img w-65px :src="getAssetImg('leader', userInfo.imgPc, 'raid_chain')">
      </div>
      <div v-if="userInfo.support" flex flex-col justify-between>
        <div flex gap-10px>
          <div grid grid-cols-6 gap-10px>
            <div v-for="i in 6" :key="i" grid gap-10px>
              <div v-for="j in 3" :key="`${i}${j}`" relative h-70px w-70px>
                <template v-if="userInfo.support[`${i}${j - 1}`]?.name">
                  <img :src="getAssetImg('summon', userInfo.support[`${i}${j - 1}`].imgId, 's') ">
                  <div absolute bottom-0 right-0 select-none rounded bg-slate px-1 text-10px :class="`bless-${userInfo.support[`${i}${j - 1}`].rank}-style`">
                    {{ `Lv${userInfo.support[`${i}${j - 1}`].name.match(/\d+/)![0]}` }}
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div grid gap-4px>
            <div v-for="i in 4" :key="i" relative h-53px w-53px>
              <template v-if="userInfo.support[`0${i - 1}`]?.name">
                <img :src="getAssetImg('summon', userInfo.support[`0${i - 1}`].imgId, 's') ">
                <div absolute bottom-0 right-0 select-none rounded bg-slate px-1 text-10px :class="`bless-${userInfo.support[`0${i - 1}`].rank}-style`">
                  {{ `Lv${userInfo.support[`0${i - 1}`].name.match(/\d+/)![0]}` }}
                </div>
              </template>
            </div>
          </div>
        </div>
        <div flex items-center justify-between text-15px text-white font-700>
          <div>
            ID: {{ userInfo.uid }}
          </div>
          <div>
            Nickname: {{ userInfo.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
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
