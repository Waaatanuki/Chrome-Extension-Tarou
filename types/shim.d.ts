import type { ProtocolWithReturn } from 'webext-bridge'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    getRaidName: ProtocolWithReturn<null, void | { questName?: string }>
    getBattleResult: ProtocolWithReturn<null, void | { domStr?: string }>
    getBattleHistoryResult: ProtocolWithReturn<null, void | { domStr?: string }>
    getUnclaimedList: ProtocolWithReturn<null, void | { domStr?: string }>
    getSupportSummon: ProtocolWithReturn<null, void | { domStr?: string }>
    getNpczenith: ProtocolWithReturn<null, void | { domStr?: string }>
    getMypage: ProtocolWithReturn<null, void | { domStr?: string }>
  }
}
