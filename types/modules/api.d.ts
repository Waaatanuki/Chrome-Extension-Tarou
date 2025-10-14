declare module 'api' {
  import type { BuildDetail } from 'extension'
  import type { Deck } from 'party'

  interface DropInfo {
    battleId: string
    questName: string
    questImage?: string
    questType?: string
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

  interface BuildResponse {
    key: string
    questId: string
    questName: string
    questImage: string
    account: string
    createTime: number
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
