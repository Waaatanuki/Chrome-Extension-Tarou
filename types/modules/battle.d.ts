declare module 'battle' {
  import type { BuildDetail } from 'extension'
  import type { Deck } from 'party'
  import type { Buff, Summon } from 'source'

  interface BattleInfo {
    inLobby: boolean
    lobbyMemberList: MemberInfo[]
    bossInfo: BossInfo
    memberInfo: MemberInfo[]
    mvpInfo: { userId: string, rank: number, point: number }[]
    summonInfo: SummonInfo
    buffInfo: BuffInfo
    leaderAttr: string
    normalAttackInfo: NormalAttackInfo
    chatList: {
      userId: string
      timestamp: number
      nickname: string
      isStamp: boolean
      content: string
    }[]
  }

  interface BossInfo {
    questId: string
    battleId: string
    shareId?: string
    imgId: string
    name: string
    hp: number
    hpmax: number
    hpPercent: number
    turn: number
    timer: number
    countDownTime: number
    interrupt_display_text?: string
    lv: string
    attribute: string
    addition: {
      restTime?: number
      genesis?: number
    }
    limitNum: number
    fellow: number
  }

  interface BuffInfo {
    bossBuffs: Buff[]
    playerBuffs: Buff[]
  }

  interface SummonInfo {
    summon: Summon[]
    supporter: Summon
  }

  interface MemberInfo {
    nickname: string
    userId: string
    userRank: string
    jobIcon: string
    attributeClass: string
    is_dead: boolean
    is_host?: boolean
    point?: number
    rank?: number
    stamp?: string
  }

  interface NormalAttackInfo {
    hit: number
    ability: number
    special: number
    total: number
  }

  interface BattleExport {
    questId: string
    raidId: number
    raidName: string
    bossImage?: string
    turn: number
    startTime?: number
    realSpeed: string
    fullSpeed: string
    damage?: string
    point?: number
    isFa: boolean
    deck: Deck
    detail: BuildDetail
  }
}
