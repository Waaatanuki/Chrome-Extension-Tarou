import type { CombatPanelSetting } from 'extension'

// export const noticeItem = [
//   { key: '10_215', comment: '沙漏' },
//   { key: '17_20004', comment: 'ffj' },
// ]

export const defaultNotificationSetting = {
  silent: false,
  battleWin: true,
  battleLose: true,
  targetItemDrop: true,
  replicardEvent: true,
  appearanceQuest: true,
  itemGoal: true,
  isPointOverLimit: true,
  checkUpdate: true,
  sampoFinish: true,
}

export const defaultNotificationItem = [
  '/item/evolution/s/20004.jpg',
  '/item/article/s/215.jpg',
]

export const notificationSound = {
  drop: 'treasure_se_6',
  win: 'win_se_1',
  lose: 'gameover_se_1',
  tip: 'chat_se_1',
  hell: 'raid_appear_highlevel_se_1',
  warning: 'help_se_2',
}

export const defaultWidget = [
  { key: 'StoneCount', name: '抽卡资源', visible: true },
  { key: 'Status', name: '点数资源', visible: true },
  { key: 'Event', name: '活动信息', visible: true },
  { key: 'TreasureMonitor', name: '素材监控', visible: true },
  { key: 'DailyCost', name: '每日统计', visible: true },
  { key: 'SkipQuest', name: '扫荡副本', visible: true },
  { key: 'Sampo', name: '探险队', visible: true },
]

export const defaultCombatPanelSetting: CombatPanelSetting = {
  Container: {
    x: 0,
    y: 0,
    visible: true,
    width: 1500,
    height: 1000,
  },
  CommandBar: {
    visible: true,
    x: 15,
    y: 15,
  },
  BossState: {
    visible: true,
    x: 360,
    y: 15,
  },
  RoomInfo: {
    visible: true,
    x: 15,
    y: 90,
  },
  DamageRecord: {
    visible: true,
    x: 710,
    y: 630,
  },
  DamageTaken: {
    visible: true,
    x: 970,
    y: 630,
  },
  NpcCount: {
    visible: true,
    x: 1230,
    y: 630,
  },
  InterruptText: {
    visible: true,
    x: 500,
    y: 200,
  },
  MemberList: {
    visible: true,
    x: 100,
    y: 700,
  },
  NpcCondition: {
    visible: true,
    x: 360,
    y: 300,
  },
  ActionList: {
    visible: true,
    x: 860,
    y: 15,
  },
}
