<script setup lang="ts">
import EvokerCard from './components/EvokerCard.vue'
import BossTriggers from './components/BossTriggers.vue'
import { evokerInfo, materialInfo } from '~/logic'
import { evokerUncapData } from '~/constants/evoker'

const evokerPageResult = computed(() => {
  if (materialInfo.value.length === 0)
    return []
  const result: { [key: string]: number } = {}
  const loopGroup: ('tarotUncap' | 'evokerUncap' | 'weaponUncap' | 'domainUncap')[] = ['tarotUncap', 'evokerUncap', 'weaponUncap', 'domainUncap']
  for (let i = 0; i < 10; i++) {
    if (evokerInfo.value[i].target) {
      const currentNo = evokerInfo.value[i].no
      const currentTarotLevel = evokerInfo.value[i].tarotLevel || 0
      const currentEvokerLevel = evokerInfo.value[i].evokerLevel || 0
      const currentWeaponLevel = evokerInfo.value[i].weaponLevel || 0
      const currentDomainLevel = evokerInfo.value[i].domainLevel || 0
      const currentLevel = [currentTarotLevel, currentEvokerLevel, currentWeaponLevel, currentDomainLevel]

      // 塔罗、贤者、贤武、领域素材计算
      for (let m = 0; m < 4; m++) {
        const type = loopGroup[m]
        for (let j = currentLevel[m]; j < evokerUncapData[currentNo][type].length; j++) {
          const uncapData = evokerUncapData[currentNo][type][j]
          for (const [key, value] of Object.entries(uncapData)) {
            if (!(key in result))
              result[key] = 0
            result[key] += value
          }
        }
      }

      // 贤者四技能解锁
      if (!evokerInfo.value[i].isAbility4Release) {
        const releaseData = evokerUncapData[currentNo].ability4Release
        for (const [key, value] of Object.entries(releaseData)) {
          if (!(key in result))
            result[key] = 0
          result[key] += value
        }
      }
    }
  }
  const arr = []
  // 计算素材缺口
  for (const k in result) {
    const item = materialInfo.value.find(i => i.item_id === k)
    arr.push({
      id: k,
      total: result[k],
      need: item ? result[k] - item.number : result[k],
      name: item ? item.name : '',
    })
  }

  return arr
})
</script>

<template>
  <div flex flex-col text-sm>
    <div flex justify-around items-center my-2>
      <div v-for=" idx in 5" :key="idx">
        <EvokerCard v-model="evokerInfo[idx - 1]" />
      </div>
    </div>
    <div flex justify-around items-center my-2>
      <div v-for=" idx in 5" :key="idx">
        <EvokerCard v-model="evokerInfo[idx + 4]" />
      </div>
    </div>
  </div>
  <div v-if="evokerPageResult.length === 0">
    <h1 text-center>
      请先去游戏的素材界面读取素材信息
    </h1>
  </div>
  <div v-else>
    <el-scrollbar max-height="210">
      <div class="showBox">
        <div
          v-for="item in evokerPageResult.filter(item => item.need > 0)"
          :key="item.id"
          class="item"
        >
          <el-tooltip :content="`${item.name} 总需${item.total}`" placement="top">
            <img w-full :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/item/article/s/${item.id}.jpg`">
          </el-tooltip>
          <label>{{ item.need }}</label>
        </div>
      </div>
    </el-scrollbar>
  </div>
  <BossTriggers />
</template>

<style lang="scss" scoped>
.showBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin: 5px;
  }
}
</style>
