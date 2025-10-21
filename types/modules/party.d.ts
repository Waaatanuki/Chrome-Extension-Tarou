declare module 'party' {
  interface Deck {
    priority: string
    weapons: BuildWeapon[]
    summons: BuildSummon[]
    leader: BuildLeader
    npcs: BuildNpc[]
    effects: BuildEffect[]
  }

  type SkillType = 'skill1' | 'skill2' | 'skill3'

  interface BuildLeader {
    masterId: string
    imageId: string
    familiarId?: number
    normalDamage: number
    advantageDamage: number
    ability: (BuildLeaderAbility | null)[]
  }

  interface BuildLeaderAbility {
    jobParamId: number
    name: string
    actionId: string
    iconId: string
    iconType: string
    fa: boolean
  }

  interface BuildNpc {
    paramId: number
    masterId: number
    imageId: string
    attribute: number
    isAugment: boolean
    arousalForm?: number
    ability: {
      iconType: string
      fa: boolean
    }[]
    artifact?: {
      value: string
      icon: string
      level: number
      name: string
    }[]
    exlb?: Exlb[]
  }

  interface Exlb {
    type: string
    bonuse: {
      icon: string
      name: string
      value: string
    }[]
  }

  interface BuildWeapon {
    seriesId: number
    masterId: number
    imageId: string
    level: string
    arousalForm?: number
    skill: {
      type: SkillType
      description: string
      image: string
    }[]
    isMain: boolean
  }

  interface BuildSummon {
    paramId: number
    masterId: number
    rarity: number
    imageId: string
    isMain: boolean
    isQuick: boolean
  }

  interface BuildEffect {
    iconImg: string
    isMax: boolean
    value: string
  }
}
