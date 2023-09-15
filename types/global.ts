declare module 'myStorage' {
  export interface BattleMemo {
    battle_id: string
    quest_id: string
    quest_name: string
    timestamp: number
  }

  export interface RecoveryItem {
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

  export interface MaterialInfo {
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

  export interface EvokerInfo {
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

  export interface BattleRecord {
    raid_id: number
    raid_name: string
    special_skill_flag?: number
    imgId?: string
    turn: number
    startTimestamp?: number
    endTimestamp?: number
    player: Player[]
    actionQueue: {
      turn: number
      bossHpPercent: number
      special_skill_flag: number
      guard_status: { is_guard_status: number; num: number }[]
      acitonList: Action[]
    }[]
    hasResult?: boolean
    point?: string
    duration?: string
    speed?: string
    treasureList?: { src: string; number: string; boxClass: string }[]
    abilityList: Action[]
    reserve: boolean
  }

  export interface Player {
    pid: string
    image_id: string
    pos?: number
    use_ability_count: number
    use_special_skill_count: number
    damage: PlayerDamage
    is_npc: boolean
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

  export interface Action {
    type: string
    icon?: string
    id?: string
    aim_num?: string
    aim_is_npc?: boolean
  }

  export interface RaidInfo {
    quest_id: string
    level: string
    element: string
    tweet_name_en: string
    tweet_name_jp: string
    quest_name_en: string
    quest_name_jp: string
    impossible: number
    difficulty: string
    stage_id: string
    thumbnail_image: string
    is_blue_treasure: boolean
    visiable?: boolean
    is_blue_eternitySand?: boolean
    total?: number
    blueChest?: number
    eternitySand?: number
    lastDropCount?: number
    lastDropTake?: number
  }

  export interface GoldBrickTableData {
    quest_id: string
    total: number
    blueChest: number
    goldBrick: number
    ring1: number
    ring2: number
    ring3: number
    lastBlueChestCount: number
    lastBlueChestTake?: number
  }

  export interface GoldBrickData {
    timestamp: number
    raidName: string
    battleId: string
    blueChests?: string
    goldBrick?: string
  }
}

declare module 'requestData'{
  export interface BattleStartJson {
    boss: Boss
    player: Player
    turn: number
    timer: number
    raid_id: number
    multi_raid_member_info?: MultiRaidMemberInfo[]
    twitter: { battle_id: string }
    summon: Summon[]
    supporter: Summon
    user_id: string
    ability: Ability
    special_skill_flag: string
  }

  export interface Boss {
    type: string
    number: number
    modechange: string
    modegauge: number
    star: number
    param: BossParam[]
  }

  export interface BossParam {
    type: string
    name: Name
    cjs: string
    number: number
    hpmax: number
    hp: string
    recast: string
    recastmax: string
    attr: string
    split: string[]
    effect: string
    alive: number
    modechange: string
    modegauge: number
    modeflag: number
    rare_flag: string
    no_attack_flag: string
    no_special_flag: number
    enemy_id: string
    form: number
    gauge_group: number
    is_key_enemy: number
    is_hostage: number
    cjs_index: string
    force_setin: string
    runaway_motion_flg: string
    fatigue_motion_flg: string
    effect_all: string
    setin_voice?: any
    monster: string
    Lv: string
    attribute: string
    tribe: string
    spec: string
    visible_after_dead: string
    condition: Condition
    timing: Timing
    dropped: any[]
    cutin_flag: string
    no_attribute_flag: string
    motion_link_list: any[]
  }

  export interface Name {
    ja: string
    en: string
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

  export interface Timing {
    effect: string
    damage: string
  }

  export interface Player {
    type: string
    number: number
    param: PlayerParam[]
    job_is_formchange: string
  }

  export interface PlayerParam {
    name: string
    cjs: string
    pid: string
    pid_image: string
    pid_image_cutin: string
    hpmax: number
    hp: number
    recast: number
    leader: number
    recastmax: string
    attr: string
    special_skill: string
    special_comment: string
    split: string[]
    effect: string[]
    alive: number
    condition: Condition
    setting_id: any
    skip_flag: boolean
    formchange_type?: any
    extra_attr: number
    form: number
    type: string
    motion_conf?: any
    resurrection_availble_flag: boolean
    special_skill_recast: string
    special_skill_activate_flag: boolean
    is_guard_status: string
    is_guard_unavailable: string
    no_result_thumbnail: boolean
  }

  export interface Summon {
    id: string
    image_id: string
    name: string
    attribute: string
    skill: string
    comment: string
    recast: string | number | null
    start_recast: string
    require: string
    protection_name: string
    protection: string
    evolution_flag: string
    level: string
    quality: string
    evolution: string
    sub_skill_flag: boolean
    special_once_flag: boolean
    summon_skin_flag: boolean
    summon_skin_id: string
    is_quick_summon: boolean
    skill_color_type: number
    detail?: string
    friend?: boolean
    available_skill?: boolean
  }

  export interface MultiRaidMemberInfo {
    max_hp: number[]
    total_max_hp: number
    pc_image: string
    pc_image_original: string
    pc_attribute: string
    nickname: string
    job_id: string
    viewer_id: string
    user_id: string
    level: string
    is_complete_perfection_proof: boolean
    retired_flag: boolean
    is_dead: boolean
    is_host: boolean
    hp_ratio: number
  }

  export interface AttackResultJson {
    scenario: Scenario[]
    status: {
      ability: Ability
      supporter: { recast: null | number | string }
      summon: { recast: (null | number | string)[] }
      timer: number
      turn: number
      is_guard_status: { is_guard_status: number }[]
    }
  }
  export interface Ability {
    [key: string]: {
      mode: string
      pos: number
      alive: number
      src: string
      list: {
        [key: string]: {
          class: string
          'ability-id': string
        }[]
      }
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
    list: { value?: number; damage?: { value: number }[] }[]
    is_damage_sync_effect: boolean | string
  }

  export interface ResultJsonPayload {
    ability_id: string
    summon_id: string
    character_num?: string
    ability_aim_num?: string
    ability_character_num: string
  }

  export interface GuardSettingJson {
    raid_id: number
    guard_status: {
      [key: string]: {
        target_num: number
        is_guard_status: number
      }
    }
  }

  export interface BossConditionJson {
    buff: BossCondition[]
    debuff: BossCondition[]
  }

  export interface BossCondition {
    status: string
    class: string
    remain: string | number
    name: string
    detail: string
  }

  export interface DeckJson {
    group_name: string
    combination_group_id: number
    combination_id: number
    name: string
    order_no: number
    priority: number
    pc: Pc
    npc: DeckNpc
  }

  export interface DeckNpc {
    [key: string]: {
      param: NpcParam
      master: NpcMaster
    }
  }

  export interface NpcParam {
    image_id_3: string
    id: number
  }

  export interface NpcMaster {
    id: string
    name: string
  }

  export interface Pc {
    param: { image: string; id: number }
    summons: DeckSummon
    sub_summons: DeckSummon
    weapons: DeckWeapon
    damage_info: DamageInfo
    after_damage_info: DamageInfo
    set_action: { name: string; set_action_id: string }[]
    quick_user_summon_id: number
    job: {
      param: {
        id: string
      }
    }
  }

  export interface DeckSummon {
    [key: string]: {
      param: SummonParam
    }
  }

  export interface SummonParam {
    id: string
    image_id: string
    level: string
    attack: string
    hp: string
    quality: string
    evolution_flag: string
    evolution: string
    is_mypage: boolean
  }

  export interface DeckWeapon {
    [key: string]: {
      master: WeaponMaster
      param: WeaponParam
      skill1: WeaponSkill
      skill2: WeaponSkill
      skill3: WeaponSkill
    }
  }

  export interface WeaponMaster {
    id: string
    name: string
    attribute: string
    series_id: string
  }

  export interface WeaponParam {
    arousal: {
      is_arousal_weapon: boolean
      form: number
    }
  }
  export interface WeaponSkill {
    id: string
    description: string
    image: string
    attribute: string
    name: string
  }

  export interface DamageInfo {
    assumed_advantage_damage_attribute: number
    assumed_normal_damage_attribute: number
    assumed_advantage_damage: number
    assumed_normal_damage: number
    hp: number
    effect_value_info: EffectValueInfo[]
  }

  export interface EffectValueInfo {
    icon_img: string
    value: string
    is_max: boolean
  }

  export interface CalculateSetting {
    image_id: string
    group_priority?: string
    priority?: string
  }

  export interface NpcInfo {
    id: number
    image_id_3: string
    master: {
      id: string
      name: string
    }
    action_ability: NpcAbility[]
  }

  export interface NpcAbility {
    action_id: string
    name: string
    icon_type: string
    user_full_auto_setting_flag: number
    job_param_id?: string
  }

  export interface BattleResult {
    raid_id: number
    endTimestr: string
    name: string
    point: string
    turn: string
    duration: string
    speed: string
    treasureList: { src: string; number: string; boxClass: string }[]
  }

  export interface SpecialSkillSetting {
    value: number
    raid_id: number
  }

}

declare module 'battleLog'{
  import type { Buff, Summon } from 'requestData'

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

}
