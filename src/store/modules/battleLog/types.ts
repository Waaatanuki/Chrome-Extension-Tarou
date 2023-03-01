export interface Battle {
  total: number
  count: string
}

export interface Buff {
  status: string
  is_unusable_harb: boolean
}

export interface Condition {
  buff: Buff[]
  debuff: any[]
  num?: number
}

export interface Param {
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

export interface Player {
  type: string
  number: number
  param: Param[]
  job_is_formchange: string
}

export interface Name {
  ja: string
  en: string
}

export interface Debuff {
  status: string
  is_unusable_harb: boolean
}

export interface Buff2 {
  status: string
  is_unusable_harb: boolean
}

export interface Condition2 {
  debuff: Debuff[]
  buff: Buff2[]
}

export interface Timing {
  effect: string
  damage: string
}

export interface MessagePosition {
  x: string
  y: string
}

export interface EffectPosition {
  x: string
  y: string
}

export interface DamagePositionPlus {
  x: string
  y: string
}

export interface Param2 {
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
  condition: Condition2
  timing: Timing
  message_position: MessagePosition
  effect_position: EffectPosition
  damage_position_plus: DamagePositionPlus
  dropped: any[]
  cutin_flag: string
  no_attribute_flag: string
  motion_link_list: any[]
}

export interface Boss {
  type: string
  number: number
  modechange: string
  modegauge: number
  star: number
  param: Param2[]
}

export interface Balloon {
  boss: any[]
}

export interface Treasure {
  treasure_type_1: number
  treasure_type_2: number
  treasure_type_3: number
  treasure_type_4: number
  treasure_type_5: number
  treasure_type_11: number
  treasure_type_13: number
}

export interface Supporter {
  recast: string
  start_recast: string
  name: string
  attribute: string
  level: string
  quality: string
  detail: string
  require: string
  id: string
  image_id: string
  skill: string
  comment: string
  protection_name: string
  protection: string
  friend: boolean
  evolution_flag: number
  available_skill: boolean
  evolution: string
  special_once_flag: boolean
  skill_color_type: number
}

export interface Temporary {
  cmd: string
  small: string
  large: string
  temporary_potion_one_battle_icon_type: string
  temporary_potion_all_battle_icon_type: string
}

export interface Buff3 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail {
  buff: Buff3[]
}

export interface List {
  1: 13[]
  2: 22[]
  3: 32[]
}

export interface Buff4 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface Debuff2 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail2 {
  buff: Buff4[]
  debuff: Debuff2[]
}

export interface Buff5 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail3 {
  buff: Buff5[]
}

export interface Buff6 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail4 {
  buff: Buff6[]
}

export interface List2 {
  1: 14[]
  2: 24[]
  3: 33[]
}

export interface Buff7 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail5 {
  buff: Buff7[]
}

export interface Buff8 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail6 {
  buff: Buff8[]
}

export interface List3 {
  1: 15[]
  2: 25[]
  3: 35[]
}

export interface Debuff3 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail7 {
  debuff: Debuff3[]
}

export interface Buff9 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail8 {
  buff: Buff9[]
}

export interface Buff10 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail9 {
  buff: Buff10[]
}

export interface List4 {
  1: 16[]
  2: 26[]
  3: 36[]
}

export interface Ability {
  1: 12
  2: 23
  3: 34
  4: 42
}

export interface Summon {
  id: string
  image_id: string
  name: string
  attribute: string
  skill: string
  comment: string
  recast: string
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
}

export interface Potion {
  count: string
  item_name: string
  limit_remain: number
  limit_number: number
  limit_flg: boolean
  is_trialbattle: boolean
  battle_icon_type: string
}

export interface Weapon {
  weapon: string
}

export interface WeaponKind {
  weapon: string
}

export interface SkipSpecialMotionSetting {
  pos: number
  setting_id: any
  skip_flag: boolean
}

export interface HpTriggerActionList {
  1: any[]
}

export interface BgmSetting {
  is_change_bgm: boolean
  bgm?: any
}

export interface Log {
  0: string
  raid_id: number
  quest_id: string
  base_fps: number
  special_skill_flag: string
  fellow: number
  timer: number
  guild: number
  turn: number
  multi: number
  is_dungeon: boolean
  is_arcade: boolean
  is_survival: boolean
  is_trialbattle: boolean
  is_arcarum: boolean
  is_board: boolean
  is_sequence: boolean
  is_ascendant: boolean
  is_replicard: boolean
  is_tower: boolean
  participant_type: number
  battle: Battle
  formation: string[]
  background_image_object: any[]
  bgm: string
  fix_bgm: boolean
  is_riddle: number
  player: Player
  boss: Boss
  is_rare: boolean
  balloon: Balloon
  treasure: Treasure
  lupi: number
  stone: string
  next: string
  supporter: Supporter
  nickname: string
  temporary: Temporary
  temporary_potion_one_name: string
  temporary_potion_all_name: string
  ability: Ability
  summon: Summon[]
  chain_burst_gauge: string
  unique_gauge?: any
  potion: Potion
  shop_lowest_price: string
  shop_potion_id: number
  weapon: Weapon
  weapon_kind: WeaponKind
  shield_id?: any
  familiar_id?: any
  diagram_flag: number
  chat_button_flag: number
  chat_receive_flag: number
  chat_stamp_flag: number
  mini_chat_stamp: number
  effect_mode: number
  summon_speed: number
  is_skip_to_request_assistance: number
  is_guests_allowed_to_request_assistance: number
  ability_popup_flag: number
  others_effect_display_flag: number
  auto_attack_display_flag: number
  disp_hp_percent_disp: number
  ability_rail_use: number
  ability_rail_disp: number
  skin_node: number
  skin_multi_member_info: number
  skin_coop: number
  voice_stamp: number
  is_multi_ability_notification: number
  is_show_autoattack_setting_text: number
  is_show_coating_value: number
  is_show_assist_popup_auto: number
  is_show_assist_time_mode_gauge: number
  is_show_quick_summon: number
  is_show_battle_navi: number
  is_show_trial_battle_caution: number
  battle_auto_type: number
  is_auto_guard: number
  serif: number
  is_escorted_character_dead: number
  skip_special_motion_setting: SkipSpecialMotionSetting[]
  hp_trigger_action_list: HpTriggerActionList
  background: string
  move_background: string
  location_id: string
  field_effect: any[]
  is_start_battle_navi_first_priority: boolean
  collabo_type?: any
  bgm_setting: BgmSetting
  event_code?: any
  event_status?: any
  key_enemy_mode: number
  duplicate_key: number
  suddenly_attack_flag: boolean
  summon_enable: number
  lyria_num: number
  lyria_pos: number
  use_ap: boolean
  without_pc: string
  without_summon: boolean
  no_skill_battle: string
  no_disp_turn: string
  disabled_auto: boolean
  avm: string
  turn_waiting: number
}

export interface Buff {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface List {
  1: 13[]
  2: 22[]
  3: 32[]
  4: 42[]
}

export interface Debuff {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface Debuff2 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface Buff2 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface Buff3 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail4 {
  buff: Buff3[]
}

export interface List2 {
  1: 14[]
  2: 24[]
  3: 33[]
}

export interface Buff4 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail5 {
  buff: Buff4[]
}

export interface Buff5 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail6 {
  buff: Buff5[]
}

export interface List3 {
  1: 15[]
  2: 25[]
  3: 35[]
}

export interface Buff6 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail7 {
  buff: Buff6[]
}

export interface Buff7 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface Debuff3 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail8 {
  buff: Buff7[]
  debuff: Debuff3[]
}

export interface Buff8 {
  status: string
  detail: string
  effect: string
  help_flag: string
}

export interface AbilityDetail9 {
  buff: Buff8[]
}

export interface List4 {
  1: 16[]
  2: 26[]
  3: 36[]
}

export interface Supporter {
  recast: string
}

export interface Balloon {
  boss: any[]
}

export interface Treasure {
  treasure_type_1: number
  treasure_type_2: number
  treasure_type_3: number
  treasure_type_4: number
  treasure_type_5: number
  treasure_type_11: number
  treasure_type_13: number
}

export interface Voice {
  special_skill_gauge_voice?: any
  dying_voice?: any
  enemy_debuff_voice?: any
  turnend_voice: string
}

export interface SkipSpecialMotionSetting {
  pos: number
  setting_id: any
  skip_flag: boolean
}

export interface SpecialSkillActivate {
  pos: number
  special_skill_activate_flag: boolean
}

export interface IsGuardStatu {
  pos: number
  is_guard_status: number
  is_guard_unavailable: number
}

export interface AvailableHpTriggerActionList {
  1: any[]
}

export interface Status {
  ability: Ability
  supporter: Supporter
  summon: Summon
  summon_enable: number
  balloon: Balloon
  fellow: number
  timer: number
  turn: number
  treasure: Treasure
  lupi: number
  voice: Voice
  is_escorted_character_dead: number
  skip_special_motion_setting: SkipSpecialMotionSetting[]
  special_skill_activate: SpecialSkillActivate[]
  is_guard_status: IsGuardStatu[]
  chain_burst_gauge: string
  special_skill_indicate: any[]
  available_hp_trigger_action_list: AvailableHpTriggerActionList
}

export interface NaviInformation {
  navi: string
  text: string
  nozzle_off: boolean
}

export interface AttackResult {
  scenario: any[]
  status: Status
  navi_information: NaviInformation[]
  duplicate_key: number
  lyria_pos: number
}
