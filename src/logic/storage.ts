import dayjs from 'dayjs'
import type { BattleMemo, MaterialInfo, NpcInfo, RecoveryItem } from './types'
import { useStorageLocal } from '~/composables/useStorageLocal'
import { defaultEternitySandData, defaultGoldBrickTableData, defaultTodoList } from '~/constants'
import { defaultEvokerInfo } from '~/constants/evoker'

// Dashboard
export const stone = useStorageLocal('stone', 0)
export const legendticket10 = useStorageLocal('legendticket10', 0)
export const legendticket = useStorageLocal('legendticket', 0)
export const saveStoneDate = useStorageLocal('saveStoneDate', dayjs().unix())
export const lastUpdateTodo = useStorageLocal('lastUpdateTodo', dayjs().unix())
export const todoList = useStorageLocal('todoList', defaultTodoList)
export const recoveryItemList = useStorageLocal<RecoveryItem[]>('recoveryItemList', [])

// Evoker
export const materialInfo = useStorageLocal<MaterialInfo[]>('materialInfo', [])
export const evokerInfo = useStorageLocal('evokerInfo', defaultEvokerInfo)

// BattleLog
export const specBossBuff = useStorageLocal<string[]>('specBossBuff', [])
export const specPlayerBuff = useStorageLocal<string[]>('specPlayerBuff', [])

// 掉落统计
export const goldBrickData = useStorageLocal<GoldBrickData[]>('goldBrickData', [])
export const goldBrickTableData = useStorageLocal('goldBrickTableData', defaultGoldBrickTableData)
export const eternitySandData = useStorageLocal('eternitySandData', defaultEternitySandData)
export const battleMemo = useStorageLocal<BattleMemo[]>('battleMemo', [])

// Party
export const localNpcList = useStorageLocal<NpcInfo[]>('localNpcList', [])
