import dayjs from 'dayjs'
import type { BattleMemo, BattleRecord, GachaRecord, MarkedUser, MaterialInfo, QuestMemo, RecoveryItem } from 'myStorage'
import type { NpcAbility, NpcInfo } from 'requestData'
import { useStorageLocal } from '~/composables/useStorageLocal'
import { defaultEternitySandData, defaultGoldBrickTableData, defaultTodoList } from '~/constants'
import { defaultEvokerInfo } from '~/constants/evoker'

// Debugger
export const uid = useStorageLocal('uid', '')
export const tabId = useStorageLocal('tabId', 0)
export const windowId = useStorageLocal('windowId', 0)
export const windowSize = useStorageLocal('windowSize', { left: 300, top: 0, width: 800, height: 600 })

// Dashboard
export const stone = useStorageLocal('stone', 0)
export const legendticket10 = useStorageLocal('legendticket10', 0)
export const legendticket = useStorageLocal('legendticket', 0)
export const gachaRecord = useStorageLocal<GachaRecord[]>('gachaRecord', [])
export const saveStoneDate = useStorageLocal('saveStoneDate', dayjs().unix())
export const lastUpdateTodo = useStorageLocal('lastUpdateTodo', dayjs().unix())
export const todoList = useStorageLocal('todoList', defaultTodoList)
export const recoveryItemList = useStorageLocal<RecoveryItem[]>('recoveryItemList', [])

// Evoker
export const materialInfo = useStorageLocal<MaterialInfo[]>('materialInfo', [])
export const evokerInfo = useStorageLocal('evokerInfo', defaultEvokerInfo)

// BattleLog
export const battleRecord = useStorageLocal<BattleRecord[]>('battleRecord', [])
export const specBossBuff = useStorageLocal<string[]>('specBossBuff', [])
export const specPlayerBuff = useStorageLocal<string[]>('specPlayerBuff', [])
export const questMemo = useStorageLocal<QuestMemo[]>('questMemo', [])

// 掉落统计
export const goldBrickData = useStorageLocal<GoldBrickData[]>('goldBrickData', [])
export const goldBrickTableData = useStorageLocal('goldBrickTableData', defaultGoldBrickTableData)
export const eternitySandData = useStorageLocal('eternitySandData', defaultEternitySandData)
export const battleMemo = useStorageLocal<BattleMemo[]>('battleMemo', [])

// Party
export const jobAbilityList = useStorageLocal<NpcAbility[]>('jobAbilityList', [])
export const localNpcList = useStorageLocal<NpcInfo[]>('localNpcList', [])

// MarkedUser
export const markedUserList = useStorageLocal<MarkedUser[]>('markedUserList', [])
