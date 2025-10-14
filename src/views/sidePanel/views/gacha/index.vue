<script setup lang="ts">
import type { GachaNpc } from 'extension'
import { gachaInfo } from '~/logic'
import GachaAnimation from './GachaAnimation.vue'

const count = ref(0)
const result = ref<GachaNpc[]>([])
const ssrList = ref<GachaNpc[]>([])
const ssrCount = computed(() => ssrList.value.length)

const animationVisible = ref(false)
const animationResult = ref<GachaNpc[]>([])

const groupedResult = computed(() => {
  const resultValue = result.value || []
  return [
    resultValue.slice(0, 3),
    resultValue.slice(3, 7),
    resultValue.slice(7, 10),
  ]
})

function gacha(ratioType: 'ratio1' | 'ratio2') {
  const appear = gachaInfo.value[ratioType]!.appear
  const len = appear.length

  const randomValue = Math.random()
  const randomStart = Math.floor(Math.random() * len)
  let cumulativeRate = 0

  for (let i = 0; i < len; i++) {
    const index = (randomStart + i) % len
    const item = appear[index]
    cumulativeRate += item.rate
    if (cumulativeRate > randomValue) {
      return item
    }
  }

  return appear[(randomStart + len - 1) % len]
}

function gacha10() {
  const result = []
  for (let i = 0; i < 10; i++) {
    if (i === 9)
      result.push(gacha('ratio2'))
    else
      result.push(gacha('ratio1'))
  }
  return result
}

function draw(times: number) {
  if (!gachaInfo.value.id || !gachaInfo.value.ratio1 || !gachaInfo.value.ratio2) {
    ElMessage.error('卡池数据未获取')
    return
  }

  if (gachaInfo.value.id !== gachaInfo.value.ratio1.id || gachaInfo.value.id !== gachaInfo.value.ratio2.id) {
    ElMessage.error('卡池数据不一致')
    return
  }
  animationVisible.value = true
  animationResult.value.length = 0

  for (let i = 0; i < times; i++) {
    result.value = gacha10()
    count.value += 10
    animationResult.value = animationResult.value.concat([...result.value])
    for (const item of result.value) {
      if (item.type === 'ssr') {
        ssrList.value.push(item)
      }
    }
  }
}

function reset() {
  result.value = []
  ssrList.value = []
  count.value = 0
}

function closeAnimation() {
  animationVisible.value = false
  animationResult.value.length = 0
}
</script>

<template>
  <div w-300px flex flex-col gap-10px>
    <div flex items-center justify-between text-12px>
      <div fc gap-2>
        <img h-25px :src="getLocalImg('gem2')">
        <div>{{ `${(count * 300).toLocaleString()}(${count})` }}</div>
        <img h-25px :src="getLocalImg('ssr')">
        <div>{{ `${ssrCount}(${count ? ((ssrCount / count) * 100).toFixed(2) : 0}%)` }}</div>
      </div>
      <TheButton @click="reset">
        重置
      </TheButton>
    </div>
    <div class="h-140px fc flex-col gap-4px rounded p-4px ring-1 ring-neutral-7">
      <div v-for="(group, groupIdx) in groupedResult" :key="groupIdx" flex gap-4px>
        <img v-for="(item, itemIdx) in group" :key="itemIdx" w-70px :src="getAssetImg(item.cat, item.id)">
      </div>
    </div>
    <div fc>
      <div class="btn-gacha fc" @click="draw(1)">
        <img :src="getLocalImg('text_legend10')" alt="text_legend10">
      </div>
      <div class="btn-gacha fc" @click="draw(30)">
        <img :src="getLocalImg('text_legend300')" alt="text_legend300">
      </div>
    </div>
    <div ring-1 ring-neutral-7>
      <el-scrollbar height="300px">
        <div fc flex-wrap gap-7px py-10px>
          <img
            v-for="item, idx in ssrList" :key="idx"
            w-50px :class="{ target: item.incidence }"
            :src="getAssetImg(item.cat, item.id, 's')"
          >
        </div>
      </el-scrollbar>
    </div>
    <el-card header-class="my-card-header" body-style="padding: 10px">
      <template #header>
        <div v-if="gachaInfo.id" flex items-center justify-between text-12px>
          <div>
            <el-tooltip :content="`编号: ${gachaInfo.id}`" placement="top">
              <img w-100px :src="getGachaBanner(gachaInfo.randomKey!)">
            </el-tooltip>
          </div>
          <div flex flex-col items-end justify-center gap-5px>
            <div>{{ gachaInfo.serviceStart }}</div>
            <div>{{ gachaInfo.serviceEnd }}</div>
          </div>
        </div>
        <div v-else text-center>
          未获取卡池信息
        </div>
      </template>
      <div text-12px>
        <div flex items-center justify-between>
          <div>{{ `卡池概率1(${gachaInfo.ratio1?.id || '未获取'})` }}</div>
          <div>{{ gachaInfo.ratio1 ? useDateFormat(gachaInfo.ratio1.updateTime, 'MM-DD HH:mm') : '' }}</div>
        </div>
        <div flex items-center justify-between>
          <div>{{ `卡池概率2(${gachaInfo.ratio2?.id || '未获取'})` }}</div>
          <div>{{ gachaInfo.ratio2 ? useDateFormat(gachaInfo.ratio2.updateTime, 'MM-DD HH:mm') : '' }}</div>
        </div>
      </div>
    </el-card>

    <GachaAnimation v-if="animationVisible" :result-list="animationResult" @click="closeAnimation" @close="closeAnimation" />
  </div>
</template>

<style  scoped>
.target {
  box-shadow: 0 0 3px 3px rgb(0, 255, 0);
}

.btn-gacha {
  background: url('~/assets/image/common/parts_common.png') no-repeat 0 -232px;
  background-size: 320px 5559px;
  width: 148px;
  height: 65px;
  img {
    width: 112px;
    height: 38px;
  }
  transform: scale(0.7);
}

.btn-gacha:active {
  background: url('~/assets/image/common/parts_common.png') no-repeat 0 -776px;
  background-size: 320px 5559px;
  transform: scale(0.6);
}
</style>
