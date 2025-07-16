import type { DropInfo } from 'api'
import type { BattleInfo } from 'battleLog'
import type { ArtifactRule, BattleMemo, BattleRecord, DailyCost, DisplayItem, EventInfo, GachaInfo, GachaRecord, MarkedUser, NotificationSetting, Quest, QuestMemo, RecoveryItem, UserInfo, Widget } from 'myStorage'
import type { BuildLeaderAbility, BuildNpc, Deck } from 'party'
import type { Artifact, CalculateSetting } from 'source'
import dayjs from 'dayjs'
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import { defaultNotificationItem, defaultNotificationSetting, defaultTodoList, defaultWidget } from '~/constants'
import { defaultArtifactRuleList } from '~/constants/artifact'

// Debugger
export const code = useWebExtensionStorage<string>('code', '')
export const obTabId = useWebExtensionStorage<number>('obTabId', 0)

// Setting
export const volume = useWebExtensionStorage<number>('volume', 0.5)
export const notificationSetting = useWebExtensionStorage<NotificationSetting>('notificationSetting', defaultNotificationSetting)
export const notificationItem = useWebExtensionStorage<string[]>('notificationItem', defaultNotificationItem)

// Dashboard
export const userInfo = useWebExtensionStorage<Partial<UserInfo>>('userInfo', {})
export const gachaRecord = useWebExtensionStorage<GachaRecord[]>('gachaRecord', [])
export const saveStoneDate = useWebExtensionStorage('saveStoneDate', dayjs().unix())
export const lastUpdateTodo = useWebExtensionStorage('lastUpdateTodo', dayjs().unix())
export const todoList = useWebExtensionStorage('todoList', defaultTodoList)
export const recoveryItemList = useWebExtensionStorage<RecoveryItem[]>('recoveryItemList', [])
export const eventList = useWebExtensionStorage<EventInfo[]>('eventList', [])
export const displayList = useWebExtensionStorage<DisplayItem[]>('displayList', [])
export const dailyCost = useWebExtensionStorage<Partial<DailyCost>>('dailyCost', {})
export const widgetList = useWebExtensionStorage<Widget[]>('widgetList', defaultWidget)

// BattleLog
export const battleInfo = useWebExtensionStorage<Partial<BattleInfo>>('battleInfo', {})
export const battleRecord = useWebExtensionStorage<BattleRecord[]>('battleRecord', [])
export const specBossBuff = useWebExtensionStorage<string[]>('specBossBuff', [])
export const specPlayerBuff = useWebExtensionStorage<string[]>('specPlayerBuff', [])
export const questMemo = useWebExtensionStorage<QuestMemo[]>('questMemo', [])
export const onlyShowSpecBuff = useWebExtensionStorage<boolean>('onlyShowSpecBuff', false)

// Drop
export const questConfig = useWebExtensionStorage<Quest[]>('questConfig', [])
export const battleMemo = useWebExtensionStorage<BattleMemo[]>('battleMemo', [])
export const failedDropInfoList = useWebExtensionStorage<DropInfo[]>('failedDropInfoList', [])

// Party
export const deckList = useWebExtensionStorage<Deck[]>('deckList', [])
export const jobAbilityList = useWebExtensionStorage<BuildLeaderAbility[]>('jobAbilityList', [])
export const localNpcList = useWebExtensionStorage<BuildNpc[]>('localNpcList', [])
export const calculateSettingList = useWebExtensionStorage<CalculateSetting[]>('calculateSettingList', [])

// MarkedUser
export const markedUserList = useWebExtensionStorage<MarkedUser[]>('markedUserList', [])

// Artifact
export const language = useWebExtensionStorage<'zh' | 'ja'>('language', 'zh')
export const artifactList = useWebExtensionStorage<Artifact[]>('artifactList', [])
export const artifactRuleIndex = useWebExtensionStorage<number>('artifactRuleIndex', 0)
export const artifactRuleList = useWebExtensionStorage<ArtifactRule[]>('artifactRuleList', defaultArtifactRuleList)

// Build
export const buildQuestId = useWebExtensionStorage('buildQuestId', '')
export const buildNpcFilter = useWebExtensionStorage<number[]>('buildNpcFilter', [])

// Gacha
export const gachaInfo = useWebExtensionStorage<GachaInfo>('gachaInfo', {})
