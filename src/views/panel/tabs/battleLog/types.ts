import type { Buff, Summon } from '~/logic/types'

export interface Member {
  nickname: string
  userId: string
  userRank: string
  jobIcon: string
  attributeClass: string
  is_dead: boolean
}

export interface BossInfo {
  battleId?: string
  imgId: string
  name: string
  hp: number
  hpmax: number
  hpPercent: number
  turn: number
  timer: number
  remainderSecond: number
}

export interface BuffInfo {
  bossBuffs: Buff[]
  playerBuffs: Buff[]
}

export interface SummonInfo {
  summon: Summon[]
  supporter: Summon
}
