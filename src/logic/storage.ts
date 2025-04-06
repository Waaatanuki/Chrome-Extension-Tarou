import type { DropInfo } from 'api'
import type { BattleMemo, BattleRecord, GachaRecord, MarkedUser, MaterialInfo, MySupportSummon, NotificationSetting, Profile, Quest, QuestMemo, RecoveryItem } from 'myStorage'
import type { BuildLeaderAbility, BuildNpc } from 'party'
import type { CalculateSetting } from 'source'
import dayjs from 'dayjs'
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import { defaultNotificationItem, defaultNotificationSetting, defaultTodoList } from '~/constants'
import { defaultEvokerInfo, defaultXenoGauge } from '~/constants/evoker'

// Debugger
export const code = useWebExtensionStorage<string>('code', '')
export const uid = useWebExtensionStorage<string>('uid', '')
export const obTabId = useWebExtensionStorage<number>('obTabId', 0)
export const obWindowId = useWebExtensionStorage<number>('obWindowId', 0)
export const windowSize = useWebExtensionStorage('windowSize', { left: 300, top: 0, width: 800, height: 600 })

// Setting
export const notificationSetting = useWebExtensionStorage<NotificationSetting>('notificationSetting', defaultNotificationSetting)
export const notificationItem = useWebExtensionStorage<string[]>('notificationItem', defaultNotificationItem)

// Dashboard
export const profile = useWebExtensionStorage<Profile>('profile', { uid: '', name: '', imgPc: '' })
export const mySupportSummon = useWebExtensionStorage<MySupportSummon>('mySupportSummon', {})
export const stone = useWebExtensionStorage<number>('stone', 0)
export const legendticket10 = useWebExtensionStorage<number>('legendticket10', 0)
export const legendticket = useWebExtensionStorage<number>('legendticket', 0)
export const gachaRecord = useWebExtensionStorage<GachaRecord[]>('gachaRecord', [])
export const saveStoneDate = useWebExtensionStorage('saveStoneDate', dayjs().unix())
export const lastUpdateTodo = useWebExtensionStorage('lastUpdateTodo', dayjs().unix())
export const todoList = useWebExtensionStorage('todoList', defaultTodoList)
export const recoveryItemList = useWebExtensionStorage<RecoveryItem[]>('recoveryItemList', [])

// Evoker
export const materialInfo = useWebExtensionStorage<MaterialInfo[]>('materialInfo', [])
export const evokerInfo = useWebExtensionStorage('evokerInfo', defaultEvokerInfo)
export const xenoGauge = useWebExtensionStorage('xenoGauge', defaultXenoGauge)

// BattleLog
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
export const jobAbilityList = useWebExtensionStorage<BuildLeaderAbility[]>('jobAbilityList', [])
export const localNpcList = useWebExtensionStorage<BuildNpc[]>('localNpcList', [])
export const calculateSettingList = useWebExtensionStorage<CalculateSetting[]>('calculateSettingList', [])

// MarkedUser
export const markedUserList = useWebExtensionStorage<MarkedUser[]>('markedUserList', [])
