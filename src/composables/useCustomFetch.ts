import type { BattleStartJson } from 'requestData'
import type { BattleMemo, DropInfo, Treasure } from 'myStorage'
import { uid } from '~/logic'

export default function useCustomFetch() {
  function getUid(url: string) {
    const searchParams = new URLSearchParams(url)
    uid.value = searchParams.get('uid') || ''
    return uid.value
  }

  // todo: 处理发送失败的情况
  function sendDropInfo(memo: BattleMemo, treasureList: Treasure[]) {
    const dropInfo: DropInfo = {
      battleId: memo.battleId,
      questName: memo.questName,
      uid: uid.value,
      timestamp: memo.timestamp,
      reward: treasureList,
    }
    console.log('dropInfo=>', dropInfo)
  }

  function sendBossInfo(rawData: BattleStartJson) {
    const bossInfo = {
      questId: rawData.quest_id,
      battleTotal: Number(rawData.battle.total),
      battleCount: Number(rawData.battle.count),
      boss: rawData.boss.param.map(boss => ({
        lv: boss.Lv,
        attr: boss.attr,
        enemyId: boss.enemy_id,
        cjs: boss.cjs,
        name: boss.monster,
      })),
    }
    // todo: cjs和name会有多个
    console.log('bossInfo', bossInfo)
  }

  return {
    sendDropInfo,
    sendBossInfo,
    getUid,
  }
}
