import dayjs from 'dayjs'
import type { BattleMemo, BattleRecord, GachaRecord, MaterialInfo, QuestMemo, RecoveryItem } from 'myStorage'
import type { NpcAbility, NpcInfo } from 'requestData'
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import { defaultEternitySandData, defaultGoldBrickTableData, defaultTodoList } from '~/constants'
import { defaultEvokerInfo } from '~/constants/evoker'

// Debugger
export const code = useWebExtensionStorage('code', '')
export const uid = useWebExtensionStorage('uid', '')
export const tabId = useWebExtensionStorage('tabId', 0)
export const windowId = useWebExtensionStorage('windowId', 0)
export const windowSize = useWebExtensionStorage('windowSize', { left: 300, top: 0, width: 800, height: 600 })

// Dashboard
export const stone = useWebExtensionStorage('stone', 0)
export const legendticket10 = useWebExtensionStorage('legendticket10', 0)
export const legendticket = useWebExtensionStorage('legendticket', 0)
export const gachaRecord = useWebExtensionStorage<GachaRecord[]>('gachaRecord', [])
export const saveStoneDate = useWebExtensionStorage('saveStoneDate', dayjs().unix())
export const lastUpdateTodo = useWebExtensionStorage('lastUpdateTodo', dayjs().unix())
export const todoList = useWebExtensionStorage('todoList', defaultTodoList)
export const recoveryItemList = useWebExtensionStorage<RecoveryItem[]>('recoveryItemList', [])

// Evoker
export const materialInfo = useWebExtensionStorage<MaterialInfo[]>('materialInfo', [])
export const evokerInfo = useWebExtensionStorage('evokerInfo', defaultEvokerInfo)

// BattleLog
export const battleRecord = useWebExtensionStorage<BattleRecord[]>('battleRecord', [])
export const specBossBuff = useWebExtensionStorage<string[]>('specBossBuff', [])
export const specPlayerBuff = useWebExtensionStorage<string[]>('specPlayerBuff', [])
export const questMemo = useWebExtensionStorage<QuestMemo[]>('questMemo', [])

// 掉落统计
export const goldBrickData = useWebExtensionStorage<GoldBrickData[]>('goldBrickData', [])
export const goldBrickTableData = useWebExtensionStorage('goldBrickTableData', defaultGoldBrickTableData)
export const eternitySandData = useWebExtensionStorage('eternitySandData', defaultEternitySandData)
export const battleMemo = useWebExtensionStorage<BattleMemo[]>('battleMemo', [])

// Party
export const jobAbilityList = useWebExtensionStorage<NpcAbility[]>('jobAbilityList', [])
export const localNpcList = useWebExtensionStorage<NpcInfo[]>('localNpcList', [])
