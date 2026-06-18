declare module 'party' {
  interface Deck {
    priority: string
    attr: number
    weapons: BuildWeapon[]
    summons: BuildSummon[]
    leader: BuildLeader
    npcs: BuildNpc[]
    effects: BuildEffect[]
    enhance: BuildEnhance
    createTime: number
    supporter?: BuildSupporter
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
    bonus: {
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
    augmentSkill?: string
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

  interface BuildEnhance {
    enhance: number
    enhanceMagna: number
    enhanceEvil: number
  }

  interface BuildSupporter {
    summonId: string
    imageId: string
  }
}
