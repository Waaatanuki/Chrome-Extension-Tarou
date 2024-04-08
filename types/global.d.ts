declare module 'myStorage' {
  interface BattleMemo {
    battleId: string
    questName: string
    questImage?: string
    questType?: string
    timestamp: number
  }

  interface QuestMemo {
    questId: string
    questName: string
    memo: string
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
    actionQueue: {
      turn: number
      bossHpPercent: number
      special_skill_flag: number
      guard_status: { is_guard_status: number, num: number }[]
      acitonList: Action[]
    }[]
    hasResult?: boolean
    point?: string
    duration?: string
    speed?: string
    treasureList?: { src: string, number: string, boxClass: string }[]
    abilityList: Action[]
    reserve: boolean
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
    aim_num?: string
    aim_is_npc?: boolean
    isSub?: boolean
    subAbility?: {
      icon: string
      id: string
      index: string
    }[]
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
}

declare module 'requestData'{

  interface GachaResult {
    stone_num: string
    random_key: string
    result: {
      reward_type_val?: string
      reward_type: string
      reward_rare_val: string
      reward_rare: string
      reward_name: string
      reward_id: string
      is_new: boolean
    }[]
    type: string
    count: number
    gacha: {
      id: string
      text_btn_image: string
      service_start: string
      service_end: string
    }[]
    ceiling: {
      start: string
      end: string
      use_count: string
    }
  }

  interface BattleStartJson {
    boss: Boss
    player: Player
    turn: number
    timer: number
    quest_id: string
    raid_id: number
    battle: {
      total: number
      count: string
    }
    multi_raid_member_info?: MultiRaidMemberInfo[]
    twitter: { battle_id: string }
    summon: Summon[]
    supporter: Summon
    user_id: string
    ability: Ability
    special_skill_flag: string
    special_skill_indicate?: { interrupt_display_text: string }[]
    scenario?: ScenarioType[]
    status?: StatusInfo
    unique_gauge_time_limit?: {
      default_time_limit: string
      limit_reduce_second: number
      rest_time: number
    }
  }

  interface Boss {
    type: string
    number: number
    modechange: string
    modegauge: number
    star: number
    param: BossParam[]
  }

  interface BossParam {
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

  interface Name {
    ja: string
    en: string
  }

  interface Condition {
    buff?: Buff[]
    debuff?: Buff[]
    num?: number
  }

  interface Buff {
    status: string
    detail?: string
    effect?: string
    help_flag?: string
    remain?: number
    personal_buff_user_id?: boolean | string
    personal_debuff_user_id?: boolean | string
    personal_status?: string
    personal_buff_end_turn?: number | string
    personal_debuff_end_turn?: number | string
  }

  interface Timing {
    effect: string
    damage: string
  }

  interface Player {
    type: string
    number: number
    param: PlayerParam[]
    job_is_formchange: string
  }

  interface PlayerParam {
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

  interface Summon {
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

  interface MultiRaidMemberInfo {
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

  interface AttackResultJson {
    scenario: ScenarioType[]
    status: StatusInfo
  }

  interface StatusInfo {
    ability: Ability
    formation: string[]
    supporter: { recast: null | number | string }
    summon: {
      skill: string
      comment: string
      protection_name: string
      protection: string
      recast: string | number
      is_full_auto_quick_summon: boolean
      start_recast: string | number
      require: string | number
    }[]
    timer: number
    turn: number
    is_guard_status: { is_guard_status: number }[]
    special_skill_indicate?: { interrupt_display_text: string }[]
    unique_gauge_time_limit?: {
      default_time_limit: string
      limit_reduce_second: number
      rest_time: number
    }
  }

  interface Ability {
    [key: string]: {
      mode: string
      pos: number
      alive: number
      src: string
      list: {
        [key: string]: {
          'class': string
          'ability-id': string
        }[]
      }
    }
  }

   type ScenarioType = SummonScenario | DamageScenario | LoopDamageScenario

   interface Scenario {
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
     damage: { value: number, hp: number, pos: number }[][]
     total?: { split: string[] }[]
     is_damage_sync_effect: boolean | string
     effect?: string
     index?: number | string
     target?: string
     comment?: string
     mode?: string
   }

   interface SpecialScenario extends Scenario {
     list: { damage: { value: number }[] }[]
   }

   interface SummonScenario extends Scenario {
     list: { damage: { value: number }[] }[]
   }

   interface DamageScenario extends Scenario {
     list: { num: number, value?: number, damage?: { value: number }[] }[]
   }

   interface LoopDamageScenario extends Scenario {
     list: { value?: number, damage?: { value: number }[] }[][]
   }

   interface SuperScenario extends Scenario {
     list: { damage: { pos: number, value: number }[] }[]
   }

   interface ResultJsonPayload {
     ability_id: string
     summon_id: string
     character_num?: string
     ability_aim_num?: string
     ability_character_num: string
     ability_sub_param: number[]
   }

   interface GuardSettingJson {
     raid_id: number
     guard_status: {
       [key: string]: {
         target_num: number
         is_guard_status: number
       }
     }
   }

   interface BossConditionJson {
     buff?: BossCondition[]
     debuff?: BossCondition[]
   }

   interface BossCondition {
     status: string
     class: string
     remain: string | number
     name: string
     detail: string
   }

   interface DeckJson {
     group_name: string
     combination_group_id: number
     combination_id: number
     name: string
     order_no: number
     priority: number
     pc: Pc
     npc: DeckNpc
   }

   interface DeckNpc {
     [key: string]: {
       param: NpcParam
       master: NpcMaster
     }
   }

   interface NpcParam {
     image_id_3: string
     id: number
   }

   interface NpcMaster {
     id: string
     name: string
   }

   interface Pc {
     param: { image: string, id: number }
     summons: DeckSummon
     sub_summons: DeckSummon
     weapons: DeckWeapon
     damage_info: DamageInfo
     after_damage_info: DamageInfo
     set_action: { name: string, set_action_id: string }[]
     quick_user_summon_id: number
     job: {
       param: {
         id: string
       }
     }
   }

   interface DeckSummon {
     [key: string]: {
       param: SummonParam
     }
   }

   interface SummonParam {
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

   interface DeckWeapon {
     [key: string]: WeaponDetail
   }

   interface WeaponDetail {
     master: WeaponMaster
     param: WeaponParam
     skill1: WeaponSkill
     skill2: WeaponSkill
     skill3: WeaponSkill
   }

   interface WeaponMaster {
     id: string
     name: string
     attribute: string
     series_id: string
   }

   interface WeaponParam {
     image_id: string
     level: string
     arousal: {
       is_arousal_weapon: boolean
       form: number
     }
   }
   interface WeaponSkill {
     id: string
     description: string
     image: string
     attribute: string
     name: string
   }

   interface DamageInfo {
     assumed_advantage_damage_attribute: number
     assumed_normal_damage_attribute: number
     assumed_advantage_damage: number
     assumed_normal_damage: number
     hp: number
     effect_value_info: EffectValueInfo[]
   }

   interface EffectValueInfo {
     icon_img: string
     value: string
     is_max: boolean
   }

   interface CalculateSetting {
     priority: string
     setting: {
       image_id: string
       group_priority?: string
       priority?: string
     }
   }

   interface NpcInfo {
     id: number
     image_id_3: string
     master: {
       id: string
       name: string
     }
     action_ability: NpcAbility[]
   }

   interface NpcAbility {
     action_id: string
     icon_id: string
     name: string
     icon_type: string
     user_full_auto_setting_flag: number
     job_param_id?: string
   }

   interface BattleResult {
     raid_id: number
     endTimestr: string
     name: string
     point: string
     turn: string
     duration: string
     speed: string
     treasureList: { src: string, number: string, boxClass: string }[]
   }

   interface SpecialSkillSetting {
     value: number
     raid_id: number
   }

   interface AssistRaidsData {
     'chapter_name': string
     'cjs_id': string
     'raid': Raid
     'boss_hp_width': number
     'remaining_time': string
     'member_count': number
     'assist_user_limit': number
     'called_user_name': string
     'data-raid-type': number
     'used_battle_point': number
     'is_same_guild': boolean
     'is_friend': boolean
     'is_semi': any
     'is_special_battle': boolean
     'owner_job_id': string
     'is_complete_perfection_proof': boolean
     'is_lottery_rare_enemy': boolean
     'is_trial_multi': boolean
     'boss_image': string
     'is_adddrop': boolean
     'exskill_cp_type': number
     'is_half': boolean
     'boss_count_alive': number
     'boss_count': number
     'used_battle_point_max': string
     'is_unpopular': boolean
     'bp_select_type': number
     'buff_name': string
     'is_defendorder': boolean
     'is_restrict_assist': boolean
     'is_beginner': boolean
   }

   interface Raid {
     multi_raid_id: string
     multi_raid_timeline_id: string
     quest_id: string
     quest_detail_id: string
     quest_type: string
     action_type: string
     is_trial: string
     user_id: string
     guild_id: string
     member_num: string
     battle_key: string
     cleared_at: any
     created_at: string
     updated_at: string
     deleted_at: string
     location_id: string
   }

   interface WsPayloadData {
     bossUpdate?: {
       param: {
         boss1_hp: numebr
         boss1_condition: Condition
       }
     }
     mvpUpdate?: {
       mvpList: {
         point: string
         user_id: string
         rank: number
       }[]
     }
     memberJoin?: {
       member: {
         nickname: string
         user_id: string
         level: number
         job_id: number
         pc_attribute: number
       }
       mvpList: {
         point: string
         user_id: string
         rank: number
       }[]
     }
     battleFinish?: {
       timestamp: string
       user_id: string
     }
   }
}

declare module 'battleLog'{
  import type { Buff, Summon } from 'requestData'

  interface BossInfo {
    questId: string
    battleId?: string
    imgId: string
    name: string
    hp: number
    hpmax: number
    hpPercent: number
    turn: number
    timer: number
    interrupt_display_text?: string
    addition?: {
      unique_gauge_time_limit?: {
        default_time_limit: string
        limit_reduce_second: number
        rest_time: number
      }
    }
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
  }
}

declare module 'party'{
  import type { CalculateSetting, DamageInfo, DeckSummon, DeckWeapon, NpcAbility, NpcInfo } from 'requestData'

  interface Deck {
    priority: string
    leader: { image: string }
    leaderAbilityList: NpcAbility[]
    npcs: NpcInfo[]
    setAction: { name: string, set_action_id: string }[]
    weapons: DeckWeapon
    summons: DeckSummon
    quickSummoniId: string
    subSummons: DeckSummon
    damageInfo: DamageInfo
    calculateSetting?: CalculateSetting
  }
}

declare module 'api'{
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
}
