declare module 'api' {
  import type { BuildDetail } from 'extension'
  import type { Deck } from 'party'

  interface DropInfo {
    battleId: string
    questName: string
    questImage?: string
    timestamp: number
    reward: Treasure[]
  }

  interface Treasure {
    box: string
    key: string
    count: number
  }

  interface RawDrop {
    [key: string]: {
      raidName: string
      timestamp: number
      blueChests?: string
      goldBrick?: string
    }
  }

  interface StartJsonBoss {
    battleId: string
    userId: string
    questId: string
    battleTotal: number
    battleCount: number
    boss: Boss[]
  }

  interface Boss {
    id: string
    name: string
    lv: string
    attr: string
    cjs: string
    hp: number
  }

  interface Stat {
    questId: string
    questName: string
    isBlueBox: boolean
    isBlueTreasure: boolean
    targetItemKey: string
    targetItemCount: number
    total: number
    blueChest: number
    lastDropCount: number
    lastDropTake: number
  }

  interface BuildItem {
    key: string
    isSolo: boolean
    userName: string
    bossImage: string
    damage: string
    point: number
    turn: number
    realTime: string
    realSpeed: number
    createTime: number
  }

  interface BuildResDto {
    userName: string
    questId: string
    raidId: number
    bossImage: string
    turn: number
    realTime: string
    realSpeed: number
    damage: string
    point: number
    createTime: number
    detail: BuildDetail
    noReload: boolean
    isSolo: boolean
    key?: string
    partyKey?: string
    deck?: Deck
  }
}
