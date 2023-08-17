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

export interface BattleStartJson {
  boss: Boss
  player: Player
  turn: number
  timer: number
  is_boss: string
  multi_raid_member_info?: MultiRaidMemberInfo[]
  twitter: { battle_id: string }
  summon: Summon[]
  supporter: Summon
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
  scenario: any[]
  duplicate_key: number
  lyria_pos: number
  status: {
    supporter: { recast: null | number | string }
    summon: { recast: (null | number | string)[] }
    timer: number
    turn: number
  }
}

// export interface Scenario {
//   cmd: string
//   pos: number
//   to: string
//   condition: Condition
// }

export interface BattleResult {
  battleId: string
  raidTime: string
  raidName: string
  point: string
  turn: string
  time: string
  speed: string
  treasureList: { src: string; number: string; boxClass: string }[]
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
}

export interface GoldBrickData {
  timestamp: number
  raidName: string
  battleId: string
  blueChests?: string
  goldBrick?: string
}

export interface BattleMemo {
  battle_id: string
  quest_id: string
  quest_name: string
  timestamp: number
}
