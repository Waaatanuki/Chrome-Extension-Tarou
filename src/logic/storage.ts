import dayjs from 'dayjs'
import type { BattleMemo, GoldBrickTableData, MaterialInfo, RaidInfo, RecoveryItem } from './types'
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
export const recoveryItemList = useStorageLocal('recoveryItemList', [] as RecoveryItem[])

// Evoker
export const materialInfo = useStorageLocal('materialInfo', [] as MaterialInfo[])
export const evokerInfo = useStorageLocal('evokerInfo', defaultEvokerInfo)

// BattleLog
export const specBossBuff = useStorageLocal('specBossBuff', [] as string[])
export const specPlayerBuff = useStorageLocal('specPlayerBuff', [] as string[])

// 掉落统计
export const goldBrickData = useStorageLocal('goldBrickData', [] as GoldBrickData[])
export const goldBrickTableData = useStorageLocal('goldBrickTableData', defaultGoldBrickTableData as GoldBrickTableData[])
export const eternitySandData = useStorageLocal('eternitySandData', defaultEternitySandData as RaidInfo[])
export const battleMemo = useStorageLocal('battleMemo', [] as BattleMemo[])
