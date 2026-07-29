export const DUNGEON_NORMAL_NODE_LIST = [
  { nodeType: 5, name: '事件' },
  { nodeType: 2, name: '战斗' },
  { nodeType: 6, name: '宝箱' },
  { nodeType: 7, name: '恢复' },
  { nodeType: 8, name: '商店' },
  { nodeType: 9, name: '传送' },
  { nodeType: 3, name: '强敌' },
  { nodeType: 11, name: '超强敌' },
  { nodeType: 4, name: '君临者' },
  { nodeType: 1, name: 'Boss' },
]

export const DUNGEON_SPECIAL_NODE_LIST = [
  { incidentId: 1, icon: '10_guru', comment: '邪教主' },
  { incidentId: 2, icon: '10_fanatic', comment: '狂信者1' },
  { incidentId: 3, icon: '10_fanatic', comment: '狂信者2' },
  { incidentId: 5, icon: '10_teleport_glow', comment: '浮游城传送' },
  { incidentId: 6, icon: '10_teleport', comment: '浮游城传送' },
  { incidentId: 7, icon: '10_teleport', comment: '浮游城传送' },
  { incidentId: 8, icon: '10_research', comment: '浮游城研究者' },
  { incidentId: 4, icon: '10_incident', comment: '浮游城', hasBackground: true },
  { incidentId: 9, icon: '10_incident', comment: '时停塔', hasBackground: true },
  { incidentId: 10, icon: '10_incident', comment: '花园', hasBackground: true },
  { incidentId: 11, icon: '10_incident', comment: '监狱', hasBackground: true },
  { incidentId: 12, icon: '10_incident', comment: '温泉', hasBackground: true },
  { incidentId: 13, icon: '10_incident', comment: '铁匠', hasBackground: true },
  { incidentId: 14, icon: '10_incident', comment: '堡垒', hasBackground: true },
  { incidentId: 15, icon: '10_incident', comment: '教堂', hasBackground: true },
  { incidentId: 16, icon: '10_incident', comment: '洞穴', hasBackground: true },
  { incidentId: 17, icon: '10_incident', comment: '石像', hasBackground: true },
  { incidentId: 18, icon: '10_incident', comment: '村落', hasBackground: true },
]

export const statusSummaryOptions = [
  {
    label: '全种族',
    status: [
      { id: 60, value: 1 },
    ],
  },
  {
    label: '全得意',
    status: [
      { id: 59, value: 1 },
    ],
  },
  {
    label: '弱点攻击',
    status: [
      { id: 31, value: 1 },
    ],
  },
  {
    label: '必中',
    status: [
      { id: 32, value: 1 },
    ],
  },
  {
    label: '不死身',
    status: [
      { id: 42, value: 1 },
    ],
  },
  {
    label: '再使用',
    status: [
      { id: 81, value: 1 },
    ],
  },
  {
    label: '召唤CD1',
    status: [
      { id: 83, value: 1 },
    ],
  },
  {
    label: 'hit减cd',
    status: [
      { id: 92, value: 1 },
    ],
  },
  {
    label: '奥义减cd',
    status: [
      { id: 75, value: 1 },
    ],
  },
  {
    label: '加护',
    status: [
      { id: 24, value: 60 },
      { id: 79, value: 180 },
    ],
  },
]

export const DUNGEON_MAP_WIDTH = 2680
export const DUNGEON_MAP_HEIGHT = 1830

export const INDEX_TAB_TYPE = {
  EXPLORE: 0,
  SHOP: 1,
}
export const EXCHANGE_ITEM_LIMIT_TYPE = {
  TOTAL: 0,
  MONTHLY: 1,
}
export const MAP_CANVAS_SIZE = {
  WIDTH: 640,
  HEIGHT: 944,
}
export const CHOICE_SCENE_CANVAS_SIZE = {
  WIDTH: 640,
  HEIGHT: 590,
}
export const MAP_BG_IMAGE_SIZE = {
  WIDTH: 2680,
  HEIGHT: 1830,
}
export const MAP_NODE_IMAGE_SIZE = {
  WIDTH: 90,
  HEIGHT: 100,
}
export const NODE_CONNECT_LINE_OFFSET = {
  X: 44,
  Y: 86,
}
export const MAP_SPECIAL_NODE_BG_OFFSET = {
  X: 310 - NODE_CONNECT_LINE_OFFSET.X,
  Y: 310 - NODE_CONNECT_LINE_OFFSET.Y,
}
export const MAP_SCALE_LIMIT = {
  MIN: MAP_CANVAS_SIZE.HEIGHT / MAP_BG_IMAGE_SIZE.HEIGHT,
  MAX: 1,
}
export const MAP_FIT_CANVAS_SIZE = {
  WIDTH: MAP_CANVAS_SIZE.WIDTH / MAP_SCALE_LIMIT.MIN,
  HEIGHT: MAP_CANVAS_SIZE.HEIGHT / MAP_SCALE_LIMIT.MIN,
}
export const DUNGEON_STATUS = {
  BEFORE_START: 1,
  NODE_WAIT_MOVE: 2,
  NODE_WAIT_ACTION: 3,
  NODE_PROGRESS_ACTION: 4,
  FINISH_EXPLORE: 5,
  FINISHED: 6,
  NODE_BEFORE_ACTION: 7,
  NODE_AFTER_ACTION: 8,
}
export const DUNGEON_ACTION_TYPE = {
  NONE: 1,
  RETREAT: 2,
  TURN_PROGRESS: 3,
  OPEN_SHOP: 4,
  TELEPORT: 5,
  TELEPORT_SELECT: 6,
  UPDATE_NODE_TO_CLEARED: 7,
  SLIDE_IN: 8,
  WHITE_OUT: 9,
  CONFIRM_BOSS: 10,
  FOCUS_NODE: 11,
  BATTLE: 100,
  RELEASE_WEAPON: 200,
  RELEASE_SUMMON: 201,
  JOIN_CHARACTER: 202,
  REPLACE_CHARACTER_POS: 203,
  RECOVERY_ABILITY_RECAST: 204,
  RECOVERY_SUMMON_RECAST: 205,
  HP_RECOVERY: 300,
  HP_LOSE: 301,
  HP_UPDATE: 302,
  BOOK_EFFECT_GAIN: 400,
  BOOK_EFFECT_GAIN_SELECT: 401,
  BOOK_EFFECT_REMOVE: 402,
  BOOK_EFFECT_REMOVE_SELECT: 403,
  BOOK_EFFECT_DUPLICATE: 404,
  BOOK_EFFECT_DUPLICATE_SELECT: 405,
  BOOK_EFFECT_CHANGE: 406,
  BOOK_EFFECT_CHANGE_SELECT: 407,
  BOOK_EFFECT_REMOVE_DEMERIT: 408,
  COIN_GAIN: 500,
  COIN_LOSE: 501,
  ITEM_GAIN: 600,
  ITEM_LOSE: 601,
}
export const DUNGEON_SCENARIO_TYPE = {
  SCENE: 1,
  CHOICE: 2,
  ACTION: 3,
}
export const DUNGEON_NODE_TYPE = {
  NONE: 0,
  ENCOUNT_BOSS: 1,
  ENCOUNT_NORMAL: 2,
  ENCOUNT_HARD: 3,
  ENCOUNT_GUARDIAN: 4,
  INCIDENT: 5,
  TREASURE_CHEST: 6,
  RECOVERY_HP: 7,
  SHOP: 8,
  TELEPORT: 9,
  SPECIAL: 10,
  ENCOUNT_VERY_HARD: 11,
}

export const DUNGEON_MIASMA_ANIMATION_TYPE = {
  NONE: 0,
  PROGRESS: 1,
  RESET: 2,
}
export const DUNGEON_MIASMA_NOTICE_TYPE = {
  START: 1,
  RESUME: 2,
  END: 3,
  BOSS_APPEAR: 4,
}
export const DUNGEON_VIEW_MODE_VALUE = '1'
export const DUNGEON_VIEW_MODE_RETURN_TYPE = {
  CHOICE_SCENE: '1',
  SHOP: '2',
  BATTLE: '3',
  EFFECT_OVER_MAP: '4',
  CONFIRM_PROCEED: '5',
}
export const DUNGEON_PROCEED_TYPE = {
  BOOK_EFFECT_REMOVE: '1',
  BOOK_EFFECT_DUPLICATE: '2',
  BOOK_EFFECT_CHANGE: '3',
}
export const DUNGEON_LOCATION_MESSAGE_PREFIX = 'arcarum3::dungeon::handleAction::location '
export const BOOK_EFFECT_RARITY = {
  NORMAL: 1,
  UNCOMMON: 2,
  RARE: 3,
}
export const DUNGEON_SHOP_CANVAS_SIZE = {
  WIDTH: 640,
  HEIGHT: 970,
}
export const SHOP_TAB_TYPE = {
  BOOK: 1,
  ITEM: 2,
}
export const DUNGEON_SHOP_COMMENT_TYPE = {
  INIT: '1',
  BUY: '3',
  RELEASE: '4',
  ALL: '5',
}
export const DUNGEON_SHOP_ITEM_TYPE = {
  RELEASE_WEAPON: 1,
  RELEASE_SUMMON: 2,
  JOIN_CHARACTER: 3,
  BOOK_EFFECT: 4,
  ITEM: 5,
  REMOVE_BOOK_EFFECT: 6,
}
