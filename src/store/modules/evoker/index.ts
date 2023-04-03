import { defineStore } from 'pinia'
import { useChromeStorage } from '@/composables/useChromeStorage'
import { evokerInfoDefault } from '@/settings/evoker.setting'
import evokerData from '@/assets/data/uncapData.json'
import { MaterialInfo } from './types'

const useEvokerStore = defineStore({
  id: 'evoker',
  state: () => ({
    materialInfo: useChromeStorage('materialInfo', [] as MaterialInfo[]),
    evokerInfo: useChromeStorage('evokerInfo', evokerInfoDefault),
  }),
  getters: {
    evokerPageResult: state => {
      if (state.materialInfo.length == 0) return []
      const result: any = {}
      const loopGroup = [
        'tarotUncap',
        'evokerUncap',
        'weaponUncap',
        'domainUncap',
      ]
      for (let i = 0; i < 10; i++) {
        if (state.evokerInfo[i].target) {
          const currentNo = state.evokerInfo[i].no
          const currentTarotLevel = state.evokerInfo[i].tarotLevel || 0
          const currentEvokerLevel = state.evokerInfo[i].evokerLevel || 0
          const currentWeaponLevel = state.evokerInfo[i].weaponLevel || 0
          const currentDomainLevel = state.evokerInfo[i].domainLevel || 0
          const currentLevel = [
            currentTarotLevel,
            currentEvokerLevel,
            currentWeaponLevel,
            currentDomainLevel,
          ]

          // 塔罗、贤者、贤武、领域素材计算
          for (let m = 0; m < 4; m++) {
            const type = loopGroup[m] as
              | 'tarotUncap'
              | 'evokerUncap'
              | 'weaponUncap'
              | 'domainUncap'
            for (
              let j = currentLevel[m];
              j < evokerData[currentNo][type].length;
              j++
            ) {
              const uncapData = evokerData[currentNo][type][j]
              for (const [key, value] of Object.entries(uncapData)) {
                if (isNaN(result[key])) {
                  result[key] = 0
                }
                result[key] += value
              }
            }
          }

          // 贤者四技能解锁
          if (!state.evokerInfo[i].isAbility4Release) {
            const releaseData = evokerData[currentNo].ability4Release
            for (const [key, value] of Object.entries(releaseData)) {
              if (isNaN(result[key])) {
                result[key] = 0
              }
              result[key] += value
            }
          }
        }
      }
      const arr = []
      // 计算素材缺口
      for (const k in result) {
        const item = state.materialInfo.find((i: any) => i.item_id == k)
        arr.push({
          id: k,
          total: result[k],
          need: item ? result[k] - Number(item.number) : result[k],
          name: item ? item.name : '',
        })
      }

      return arr
    },
  },
  actions: {},
})

export default useEvokerStore
