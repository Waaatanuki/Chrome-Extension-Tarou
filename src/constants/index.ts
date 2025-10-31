import type { CombatPanelSetting } from 'extension'

export const defaultTodoList = [
  { done: false, content: '巡岛' },
  { done: false, content: '大巴' },
  { done: false, content: '超巴' },
  { done: false, content: '活动日常' },
  { done: false, content: '沙盒' },
  { done: false, content: '抽卢比' },
]

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
    width: 800,
    height: 800,
  },
  CommandBar: {
    x: 40,
    y: 80,
  },
  BossState: {
    x: 40,
    y: 40,
  },
}
