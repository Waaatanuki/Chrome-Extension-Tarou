declare module 'source' {

  interface GachaRatioAppear {
    rarity: number
    rarity_name: string
    category: number
    category_name: string
    item: GachaRatioAppearItem[]
  }

  interface GachaRatioAppearItem {
    name: string
    drop_rate: string
    attribute: string
    kind?: string
    incidence?: string
    reward_id: number
    character_name?: string
    is_season: boolean
    season_message: string
  }

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
    limit_number?: string
    multi_raid_member_info?: MultiRaidMemberInfo[]
    twitter: { battle_id: string }
    summon: Summon[]
    supporter: Summon
    user_id: string
    ability: Ability
    special_skill_flag: string
    special_skill_indicate?: { interrupt_display_text: string[] }[]
    scenario?: ScenarioType[]
    status?: StatusInfo
    unique_gauge_time_limit?: {
      default_time_limit: string
      limit_reduce_second: number
      rest_time: number
    }
    unique_gauge?: {
      id: string
      value: number
      description: string
    }
    group_gauge?: {
      id: string
      value: number
      ability_list: {
        ability_id: number
        image: string
        name: string
        comment: string
      }[]
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
    coating_value?: number
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
    group_num: number | null
  }

  interface AttackResultJson {
    scenario: ScenarioType[]
    status?: StatusInfo
  }

  interface StatusInfo {
    ability: Ability
    formation?: string[]
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
    fellow: number
    is_guard_status: { is_guard_status: number }[]
    special_skill_indicate?: { interrupt_display_text: string[] }[]
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
    kind?: string
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
    amount?: number
    is_last_raid?: boolean
    value?: number
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
    type?: string
    item_id?: string
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
    has_npcaugment_constant: boolean
    npc_arousal_form: number
  }

  interface NpcMaster {
    id: string
    name: string
    attribute: number
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
    familiar_id?: number
    job: {
      param: {
        id: number
      }
      master: {
        id: string
      }
    }
  }

  interface DeckSummon {
    [key: string]: {
      param?: SummonParam
      master?: {
        attribute: string
        id: string
        name: string
        rarity: string
      }
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
    master?: WeaponMaster
    param?: WeaponParam
    skill1?: WeaponSkill
    skill2?: WeaponSkill
    skill3?: WeaponSkill
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
    weapon_skill_enhance_param: {
      weapon_skill_enhance: number
      weapon_skill_enhance_magna: number
      weapon_skill_enhance_evil: number
    }
  }

  interface EffectValueInfo {
    icon_img: string
    value: string
    is_max: boolean
  }

  interface CalculateSetting {
    priority: string
    setting: {
      image_id: string | null
      summon_id: number | null
      group_priority?: string
      priority?: string
    }
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
        boss1_hp: number
        boss1_condition: Condition
      }
    }
    uniqueGaugeUp?: {
      param: {
        before_gauge: number
        after_gauge: number
        up_value: number
      }
      timestamp: string
      user_id: string
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
        group_num: number | null
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
    chatAdd?: ChatInfoJP
    raidPost?: ChatInfoEN
    raidGet?: (ChatInfoJP | ChatInfoEN)[]
  }

  interface ChatInfoJP {
    viewerId: string
    chatId: string
    categoryId: string
    userId: string
    timestamp: number
    nickname: string
    userImage: string
    commentData: {
      isStamp: boolean
      content: string
    }
  }

  interface ChatInfoEN {
    user_id: string
    user_name: string
    user_comment: {
      is_stamp: boolean
      text: string
      stamp_id: number
    }
    timestamp: string
  }

  interface Artifact {
    artifact_id: number
    max_level: number
    name: string
    comment: string
    rarity: string
    skill1_info: ArtifactSkillInfo
    skill2_info: ArtifactSkillInfo
    skill3_info: ArtifactSkillInfo
    skill4_info: ArtifactSkillInfo
    id: number
    level: string
    kind: string
    attribute: string
    next_exp: number
    remain_next_exp: number
    exp_width: number
    is_used: boolean
    is_locked: boolean
    is_unnecessary: boolean
    equip_npc_info?: {
      user_npc_id?: number
      image?: string
      name?: Name
    }
  }

  interface ArtifactSkillInfo {
    skill_id: number
    level: number
    name: string
    is_max_quality: boolean
    effect_value: string
    icon_image: string
  }
}
