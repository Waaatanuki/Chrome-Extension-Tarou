import { defineStore } from 'pinia'
import { Log, AttackResult } from './types'

const importantPlayerBuffsList = ['6255']
const importantBossBuffsList = ['7038']
const useEvokerStore = defineStore({
  id: 'battleLog',
  state: () => ({
    rawData: {} as Log,
    attackResult: {} as AttackResult,
    battleResultList: [] as any[],
  }),
  getters: {
    bossInfo: state => {
      try {
        const boss = state.rawData.boss?.param[0]
        const bossBuffs = boss.condition.buff ?? []
        const bossDebuffs = boss.condition.debuff ?? []
        const totalBossBuffs = bossBuffs.concat(bossDebuffs)
        const importantBossBuffs = [] as {
          status: string
          is_unusable_harb: boolean
        }[]
        importantBossBuffsList.forEach(item => {
          const hit = totalBossBuffs.find((buff: any) =>
            buff.status.startsWith(item)
          )
          if (hit) importantBossBuffs.push(hit)
        })

        const player = state.rawData.player?.param[0]
        const playerBuffs = player.condition.buff ?? []
        const playerDebuffs = player.condition.debuff ?? []
        const totalPlayerBuffs = playerBuffs.concat(playerDebuffs)
        const importantPlayerBuffs = [] as {
          status: string
          is_unusable_harb: boolean
        }[]
        importantPlayerBuffsList.forEach(item => {
          const hit = totalPlayerBuffs.find((buff: any) =>
            buff.status.startsWith(item)
          )
          if (hit) importantPlayerBuffs.push(hit)
        })

        return {
          name: boss.monster,
          hp: ((Number(boss.hp) / Number(boss.hpmax)) * 100).toFixed(2) + '%',
          turn: state.rawData.turn,
          buffs: boss.condition.buff,
          debuffs: boss.condition.debuff,
          importantPlayerBuffs,
          importantBossBuffs,
        }
      } catch (error) {
        console.log(error)

        return {
          name: '',
          hp: '',
          turn: '',
          buffs: [],
          debuffs: [],
          importantPlayerBuffs: [],
          importantBossBuffs: [],
        }
      }
    },
    summonInfo: state => {
      try {
        const summon: any = state.rawData.summon ?? []
        const supporter = state.rawData.supporter ?? {}
        summon.push(supporter)
        return summon
      } catch (error) {
        console.log(error)
        return []
      }
    },
    attackInfo: state => {
      try {
        const attackList = state.attackResult.scenario.filter(
          (item: any) => item.cmd == 'attack' && item.from == 'player'
        )
        if (attackList.length == 0) return { hit: 0, damage: 0 }
        let damageList = [] as any[]
        attackList.forEach((item: any) => {
          damageList = damageList.concat(item.damage)
        })

        const data = [] as any[]
        damageList.forEach((damage: any) => {
          for (const key in damage) {
            data.push(damage[key])
          }
        })

        const damage = data.reduce((pre, cur) => pre + Number(cur.value), 0)
        return { hit: data.length, damage }
      } catch (error) {
        console.log(error)
        return { hit: 0, damage: 0 }
      }
    },
  },
  actions: {},
})

export default useEvokerStore
