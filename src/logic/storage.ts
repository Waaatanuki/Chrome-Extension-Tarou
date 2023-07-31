import dayjs from 'dayjs'
import type { MaterialInfo, RecoveryItem } from './types'
import { useStorageLocal } from '~/composables/useStorageLocal'
import { defaultTodoList } from '~/constants'
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
