declare module 'extension' {
  import type { NormalAttackInfo } from 'battle'
  import type { Buff } from 'source'

  interface UserInfo {
    uid: string
    name: string
    imgPc: string
    stone: number
    legendticket10: number
    legendticket: number
    support: MySupportSummon
    mbp: {
      daily: NumberLimitPair
      weekly: NumberLimitPair
      bonus: {
        r: NumberLimitPair
        sr: NumberLimitPair
      }
      total: NumberLimitPair
    }
    hmbp: {
      weekly: NumberLimitPair
      bonus: {
        crew: NumberLimitPair
      }
      total: NumberLimitPair
    }
    arcarum: {
      passport: NumberLimitPair
      point: {
        weekly: NumberLimitPair
        total: NumberLimitPair
      }
    }
    artifact: NumberLimitPair
    followPoint: {
      weekly: NumberLimitPair
      total: NumberLimitPair
    }
  }

  interface NumberLimitPair {
    number: number
    limit: number
  }

  interface EventInfo {
    type: string
    count: number
    isActive: boolean
    updateTime: number
    mission: Mission[]
    additional?: Record<string, any>
  }

  interface Mission {
    reward: string
    desc: string
    number: number
    limit: number
    isAllComplete: boolean
    isDailyMission: boolean
  }

  interface AdventAdditional {
    isOverflowed: boolean
    defeatReward: { id: string, label: string, key: string, value: number }[]
  }

  interface TeamraidAdditional {
    gachaPoint: number
    drawnBox: number
    lottery: NumberLimitPair
    honor: number
    targetHonor: number
    log: { guild1: string, guild2: string, key: string, point: number[][] }
  }

  interface TeamforceAdditional {
    gachaPoint: number
    drawnBox: number
  }

  interface InterludeAdditional {
    dailyList: Mission[]
  }

  interface BattleMemo {
    battleId: string
    questName: string
    questImage?: string
    questType?: string
    timestamp: number
    date: string
  }

  interface QuestMemo {
    questId: string
    questName: string
    memo: string
  }

  interface GachaInfo {
    id?: string
    serviceStart?: string
    serviceEnd?: string
    randomKey?: string
    ratio1?: {
      id: string
      updateTime: number
      appear: GachaNpc[]
    }
    ratio2?: {
      id: string
      updateTime: number
      appear: GachaNpc[]
    }
    npc?: {
      id: string
      updateTime: number
      list: string[]
    }
  }

  interface GachaNpc {
    id: number
    rate: number
    cat: string
    type: string
    incidence: boolean
  }

  interface GachaRecord {
    random_key: string
    service_start: string
    service_end: string
    count: number
    use_count: number
    ssrList: {
      id: string
      type: string
      is_new: boolean
    }[]
  }

  interface RecoveryItem {
    timeStamp: number
    fullElixir: number
    fullElixirDiff: number
    halfElixir: number
    halfElixirDiff: number
    soulBalm: number
    soulBalmDiff: number
    soulBerry: number
    soulBerryDiff: number
  }

  interface MaterialInfo {
    item_id: string
    image: string
    name: string
    number: number
    comment: string
    seq_id: string
    disable: string
    category_type: string[]
    is_display_select_item: boolean
  }

  interface EvokerInfo {
    npcId: number
    no: number
    name: string
    target: boolean
    tarotLevel: number
    evokerLevel: number
    weaponId: number
    weaponLevel: number
    domainLevel: number
    isAbility4Release: boolean
  }

  interface BattleRecord {
    quest_id: string
    raid_id: number
    raid_name: string
    special_skill_flag?: number
    imgId?: string
    turn: number
    startTimestamp?: number
    endTimestamp?: number
    startTimer: number
    endTimer: number
    formation: number[]
    player: Player[]
    actionQueue: ActionQueue[]
    hasResult?: boolean
    damage?: string
    point?: number
    duration?: string
    treasureList?: { src: string, number: string, boxClass: string }[]
    abilityList: Action[]
    isFa?: boolean
    key?: string
  }

  interface BuildDetail {
    player: Omit<Player, 'condition'>[]
    actionQueue: ActionQueue[]
  }

  interface ActionQueue {
    turn: number
    bossHpPercent: number
    special_skill_flag: number
    guard_status: { is_guard_status: number, num: number }[]
    acitonList: Action[]
    interrupt_display_text?: string
    normalAttackInfo?: NormalAttackInfo
  }

  interface Player {
    pid: string
    image_id: string
    pos?: number
    use_ability_count: number
    use_special_skill_count: number
    damage: PlayerDamage
    damageTaken: PlayerDamageTaken
    is_npc: boolean
    is_dead: boolean
    attackInfo?: {
      total: number
      sa: number
      da: number
      ta: number
    }
    condition?: {
      buff: Buff[]
      coating_value: number
    }
  }

  interface PartyCondition {
    pos: number
    buff: Buff[]
    coating_value: number
  }

  interface PlayerDamage {
    total: PlayerDamageDetail
    attack: PlayerDamageDetail
    ability: PlayerDamageDetail
    special: PlayerDamageDetail
    other: PlayerDamageDetail
  }

  interface PlayerDamageTaken {
    total: PlayerDamageDetail
    attack: PlayerDamageDetail
    super: PlayerDamageDetail
    other: PlayerDamageDetail
  }

  interface PlayerDamageDetail {
    comment: string
    value: number
  }

  interface Action {
    type: string
    icon?: string
    id?: string
    subAbility?: {
      icon: string
      id: string
      index: string
    }[]
    aim?: string[]
  }

  interface MarkedUser {
    name: string
    id: string
    rank: string
    rate: number
    comment: string
  }

  interface Quest {
    questId: string
    questName: string
    isBlueBox: boolean
    isBlueTreasure: boolean
    targetItemKey: string
    visible: boolean
  }

  interface MySupportSummon {
    [key: string]: {
      imgId: string
      name: string
      rank: string
      necessary: boolean
    }
  }

  interface NotificationSetting {
    silent: boolean
    battleWin: boolean
    battleLose: boolean
    targetItemDrop: boolean
    replicardEvent: boolean
    appearanceQuest: boolean
    itemGoal: boolean
    isPointOverLimit: boolean
    checkUpdate: boolean
    sampoFinish: boolean
  }

  interface ArtifactRule {
    name: string
    info: ArtifactRuleInfo
  }

  interface ArtifactRuleInfo {
    kind: Record<string, number>
    attribute: Record<string, number>
    skill: Record<string, number>
    extra: Record<string, number>
    highlight: {
      low?: number
      high?: number
    }
  }

  interface ExtraRule {
    attribute: string
    kind: string
    skillId: number
    value: number
  }

  interface DisplayItem {
    itemKey: string
    imageId: string
    number: number
    limit: number
  }

  interface DailyCost {
    dateTime: number
    ap: number
    aap: number
    bp: number
    quest: { questId: string, ap?: number, isReplicard?: boolean, pinned?: boolean, bossImgId: string, bossName: string, count: number }[]
    raidIds: number[]
    rewardList: { key: string, imgId: string, count: number }[]
  }

  interface Widget {
    key: string
    name: string
    visible: boolean
  }

  interface SkipQuest {
    updateTime: number
    list: {
      chapterId: string
      questId: string
      thumbnailImage: string
      useItemId?: string
      limitedCount: number
    }[]
  }

  interface SampoInfo {
    areaName: string
    remainTime: number
    recoveryRemainTime: number
    currentStamina: number
    endStamina: number
    maxStamina: number
    isFinished: boolean
    level: number
  }

  interface SampoSetup {
    captain: SampoCaptain
    crew: SampoCrew[]
    currentAreaId: number
    area: SapmoArea[]
  }

  interface SampoParam {
    power: number
    endurance: number
    observation: number
    charm: number
    luck: number
  }

  interface SampoCaptain extends SampoParam {
    id: number
    lv: number
  }

  interface SampoCrew extends Partial<SampoParam> {
    id: number
    lv: number
  }

  interface SapmoArea extends SampoParam {
    id: number
    isEmpty: boolean
    equip: SampoEquip[]
  }

  interface SampoEquip extends Partial<SampoParam> {
    id: number
    slot: number
  }

  interface CombatPanelSetting {
    Container: {
      width: number
      height: number
    } & Position
    CommandBar: Position
  }

  interface Position {
    x: number
    y: number
  }
}
