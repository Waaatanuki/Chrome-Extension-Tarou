declare module 'myStorage' {
  export interface RaidRecord {
    raid_id: number
    imgId: string
    name: string
    turn: number
    timestamp: number
    player: Player[]
  }

  export interface Player {
    pid: string
    pos?: number
    damage: PlayerDamage
  }

  export interface PlayerDamage {
    total: PlayerDamageDetail
    attack: PlayerDamageDetail
    ability: PlayerDamageDetail
    special: PlayerDamageDetail
    other: PlayerDamageDetail
  }

  export interface PlayerDamageDetail {
    comment: string
    value: number
  }
}

declare module 'requestData'{
  export interface AttackResultJson {
    scenario: Scenario[]
    status: {
      ability: Ability
      supporter: { recast: null | number | string }
      summon: { recast: (null | number | string)[] }
      timer: number
      turn: number
    }
  }
  export interface Ability {
    [key: string]: {
      mode: string
      pos: number
      alive: number
      src: string
    }
  }

  export interface Scenario {
    cmd: string
    name?: {
      ja: string
      en: string
    }
    hp?: number
    hpmax?: number
    pos: number
    num: number
    from: string
    to: string
    condition: Condition
    damage: { value: number }[][]
    total: { split: string[] }[]
  }

  export interface Condition {
    buff: Buff[]
    debuff: Buff[]
    num?: number
  }

  export interface Buff {
    status: string
    is_unusable_harb: boolean
    detail?: string
    effect?: string
    help_flag?: string
    remain?: number
    personal_buff_user_id?: boolean | string
    personal_debuff_user_id?: boolean | string
  }
}
