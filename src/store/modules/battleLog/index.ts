import { useChromeStorage } from '@/composables/useChromeStorage'
import { defineStore } from 'pinia'
import { StartJson, AttackResult, Member } from './types'

const useEvokerStore = defineStore({
  id: 'battleLog',
  state: () => ({
    startJson: {} as StartJson,
    attackResult: {} as AttackResult,
    battleResultList: [] as any[],
    memberList: [] as Member[],
    specBossBuff: useChromeStorage('specBossBuff', [] as string[]),
    specPlayerBuff: useChromeStorage('specPlayerBuff', [] as string[]),
  }),
  getters: {
    bossInfo: state => {
      try {
        const boss = state.startJson.boss?.param[0]
        const bossBuffs = boss.condition.buff ?? []
        const bossDebuffs = boss.condition.debuff ?? []
        const totalBossBuffs = bossBuffs.concat(bossDebuffs)
        const importantBossBuffs = [] as {
          status: string
          is_unusable_harb: boolean
        }[]
        state.specBossBuff.forEach(item => {
          const hit = totalBossBuffs.find((buff: any) =>
            buff.status.startsWith(item)
          )
          if (hit) importantBossBuffs.push(hit)
        })

        const player = state.startJson.player?.param[0]
        const playerBuffs = player.condition.buff ?? []
        const playerDebuffs = player.condition.debuff ?? []
        const totalPlayerBuffs = playerBuffs.concat(playerDebuffs)
        const importantPlayerBuffs = [] as {
          status: string
          is_unusable_harb: boolean
        }[]
        state.specPlayerBuff.forEach(item => {
          const hit = totalPlayerBuffs.find((buff: any) =>
            buff.status.startsWith(item)
          )
          if (hit) importantPlayerBuffs.push(hit)
        })

        return {
          name: boss.monster,
          hp: Number(boss.hp),
          hpPercent:
            ((Number(boss.hp) / Number(boss.hpmax)) * 100).toFixed(2) + '%',
          turn: state.startJson.turn,
          bossBuffs: totalBossBuffs,
          playerBuffs: totalPlayerBuffs,
          importantPlayerBuffs,
          importantBossBuffs,
        }
      } catch (error) {
        console.log(error)

        return {
          name: '',
          hp: NaN,
          turn: '',
          bossBuffs: [],
          playerBuffs: [],
          importantPlayerBuffs: [],
          importantBossBuffs: [],
        }
      }
    },
    summonInfo: state => {
      try {
        const summon: any = state.startJson.summon ?? []
        const supporter = state.startJson.supporter ?? {}
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
