<script setup lang="ts">
import { sampoSetup } from '~/logic'

const imgUri = 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp'

const ParamEnum = {
  power: { key: 'power', label: '战斗', id: 1 },
  observation: { key: 'observation', label: '观察', id: 3 },
  endurance: { key: 'endurance', label: '忍耐', id: 2 },
  charm: { key: 'charm', label: '爱娇', id: 4 },
  luck: { key: 'luck', label: '幸运', id: 5 },
} as const

const conditionCount = ref(5)
const filter = ref<{
  crew: number[]
  slot1: number | undefined
  slot2: number | undefined
}>({
  crew: [],
  slot1: undefined,
  slot2: undefined,
})
const currentArea = computed(() => sampoSetup.value.area?.find(p => p.id === sampoSetup.value.currentAreaId))

const res = computed(() => {
  if (!currentArea.value || !sampoSetup.value.crew || !sampoSetup.value.captain) {
    return []
  }
  const slot1 = currentArea.value.equip.filter(item => item.slot === 1)
  const slot2 = currentArea.value.equip.filter(item => item.slot === 2)

  const crewList = []
  const crewFilterStr = filter.value.crew.toSorted((a, b) => a - b).join('')

  for (let i = 0; i < sampoSetup.value.crew.length; i++) {
    for (let j = i + 1; j < sampoSetup.value.crew.length; j++) {
      const crewStr = [sampoSetup.value.crew[i].id, sampoSetup.value.crew[j].id].toSorted((a, b) => a - b).join('')
      if (filter.value.crew.length > 0 && !crewStr.includes(crewFilterStr))
        continue

      crewList.push({
        power: 0,
        endurance: 0,
        observation: 0,
        charm: 0,
        luck: 0,
        ...sampoSetup.value.crew[i],
        ...sampoSetup.value.crew[j],
        combination: [sampoSetup.value.crew[i].id, sampoSetup.value.crew[j].id],
      })
    }
  }

  const allSet = []

  for (const item1 of slot1) {
    for (const item2 of slot2) {
      for (const crew of crewList) {
        if (filter.value.slot1 && item1.id !== filter.value.slot1)
          continue
        if (filter.value.slot2 && item2.id !== filter.value.slot2)
          continue
        const item = {
          combination: { crew: crew.combination, equip: [item1.id, item2.id] },
          power: (item1.power || 0) + (item2.power || 0) + sampoSetup.value.captain.power + crew.power,
          endurance: (item1.endurance || 0) + (item2.endurance || 0) + sampoSetup.value.captain.endurance + crew.endurance,
          observation: (item1.observation || 0) + (item2.observation || 0) + sampoSetup.value.captain.observation + crew.observation,
          charm: (item1.charm || 0) + (item2.charm || 0) + sampoSetup.value.captain.charm + crew.charm,
          luck: (item1.luck || 0) + (item2.luck || 0) + sampoSetup.value.captain.luck + crew.luck,
          conditionCount: 0,
          total: 0,
        }
        allSet.push(item)
      }
    }
  }

  for (const item of allSet) {
    item.total = item.power + item.endurance + item.observation + item.charm + item.luck
    if (item.power >= currentArea.value.power) {
      item.conditionCount++
    }
    if (item.endurance >= currentArea.value.endurance) {
      item.conditionCount++
    }
    if (item.observation >= currentArea.value.observation) {
      item.conditionCount++
    }
    if (item.charm >= currentArea.value.charm) {
      item.conditionCount++
    }
    if (item.luck >= currentArea.value.luck) {
      item.conditionCount++
    }
  }

  return allSet
})

const showRes = computed(() => res.value.filter(item => item.conditionCount === conditionCount.value).sort((a, b) => b.total - a.total).slice(0, 10))
</script>

<template>
  <div fc flex-col gap-3>
    <div mx-auto w-450px>
      <el-alert title="获取装备数据需要清空当前地图配置的队员和装备" type="warning" :center="true" :closable="false" />
    </div>
    <div flex>
      <div v-if="sampoSetup.captain" fc>
        <div w-35>
          <img :src="`${imgUri}/vyrnsampo/assets/character/index_captain/${sampoSetup.captain.id}.png`">
        </div>
        <div w-25 flex flex-col gap-1>
          <div flex items-center justify-between>
            <div w-15>
              <img :src="`${imgUri}/vyrnsampo/common_item/text_explore_level.png`">
            </div>
            <div>
              {{ sampoSetup.captain.lv }}
            </div>
          </div>
          <div v-for="param in Object.values(ParamEnum)" :key="param.key" flex items-center justify-between>
            <div w-60px>
              <img :src="`${imgUri}/vyrnsampo/assets/status_label/${param.id}.png`">
            </div>
            <div>
              {{ sampoSetup.captain[param.key] }}
            </div>
          </div>
        </div>
      </div>
      <div w-250px fc flex-wrap gap-4>
        <div v-for="crew in sampoSetup.crew" :key="crew.id" relative w-100px>
          <img :src="`${imgUri}/vyrnsampo/assets/character/thumb/${crew.id}.jpg`">
          <el-tag type="primary" size="small" class="absolute left-0 top-0">
            {{ `Lv ${crew.lv}` }}
          </el-tag>
        </div>
      </div>
    </div>

    <div v-if="currentArea" fc flex-col gap-2 rounded px-4 py-2 ring-1 ring-neutral-5>
      <div fc gap-10>
        <img w-140px :src="`${imgUri}/vyrnsampo/assets/area/thumb/${currentArea.id}.png`">
        <div w-250px fc flex-col gap-2>
          <div w-250px fc flex-wrap gap-2>
            <div v-for="i in 4" :key="i" w-120px>
              <el-button :type="conditionCount === i ? 'primary' : 'default'" size="small" plain link @click="conditionCount = i">
                {{ `满足${i}种条件(${res.filter(item => item.conditionCount >= i).length})` }}
              </el-button>
            </div>
          </div>
          <div>
            <el-button :type="conditionCount === 5 ? 'primary' : 'default'" size="small" plain link @click="conditionCount = 5">
              {{ `满足全部条件(${res.filter(item => item.conditionCount === 5).length})` }}
            </el-button>
          </div>
        </div>
      </div>
      <div fc gap-2 class="sampo-filter">
        <el-select v-model="filter.crew" placeholder="选择队员" style="width: 280px;" multiple :multiple-limit="2" clearable popper-class="sampo-filter-popper">
          <el-option
            v-for="item in sampoSetup.crew"
            :key="item.id"
            :label="item.id"
            :value="item.id"
          >
            <img h-60px :src="`${imgUri}/vyrnsampo/assets/character/thumb/${item.id}.jpg`">
          </el-option>
          <template #tag>
            <img v-for="id in filter.crew" :key="id" h-60px :src="`${imgUri}/vyrnsampo/assets/character/thumb/${id}.jpg`">
          </template>
        </el-select>

        <el-select v-model="filter.slot1" placeholder="选择头部" style="width: 110px" clearable popper-class="sampo-filter-popper">
          <el-option
            v-for="item in currentArea.equip.filter(p => p.slot === 1)"
            :key="item.id"
            :label="item.id"
            :value="item.id"
            class="sampo-filter"
          >
            <img h-60px :src="`${imgUri}/assets/item/cosmetic/s/${item.id}.jpg`">
          </el-option>
          <template #label="{ value }">
            <img h-60px :src="`${imgUri}/assets/item/cosmetic/s/${value}.jpg`">
          </template>
        </el-select>

        <el-select v-model="filter.slot2" placeholder="选择武器" style="width: 110px" clearable popper-class="sampo-filter-popper">
          <el-option
            v-for="item in currentArea.equip.filter(p => p.slot === 2)"
            :key="item.id"
            :label="item.id"
            :value="item.id"
          >
            <img h-60px :src="`${imgUri}/assets/item/cosmetic/s/${item.id}.jpg`">
          </el-option>
          <template #label="{ value }">
            <img h-60px :src="`${imgUri}/assets/item/cosmetic/s/${value}.jpg`">
          </template>
        </el-select>
      </div>
    </div>

    <div v-if="showRes.length === 0 && sampoSetup.area" mx-auto mt-10 w-450px>
      <el-alert title="没有满足条件的组合" type="info" :center="true" :closable="false" />
    </div>

    <el-scrollbar v-else px-5 max-height="400">
      <div v-if="currentArea" flex flex-col gap-4 p-2>
        <div v-for="item, idx in showRes" :key="idx" rounded px-4 py-2 ring-1 ring-neutral-5>
          <div fc gap-2>
            <div v-for="crewId in item.combination.crew" :key="crewId">
              <img h-70px :src="`${imgUri}/vyrnsampo/assets/character/thumb/${crewId}.jpg`">
            </div>
            <div v-for="equipId in item.combination.equip" :key="equipId">
              <img h-70px :src="`${imgUri}/assets/item/cosmetic/s/${equipId}.jpg`">
            </div>
          </div>
          <div mt-2 flex gap-4>
            <div v-for="param in Object.values(ParamEnum)" :key="param.key" flex items-center justify-between gap-1>
              <div w-60px>
                <img :src="`${imgUri}/vyrnsampo/assets/status_label/${param.id}.png`">
              </div>
              <div :class="item[param.key] >= currentArea[param.key] ? 'text-#67C23A' : 'text-#F56C6C'">
                {{ item[param.key] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style>
.sampo-filter-popper .el-select-dropdown__item {
  height: 80px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.sampo-filter .el-select__wrapper {
  height: 70px;
}
</style>
