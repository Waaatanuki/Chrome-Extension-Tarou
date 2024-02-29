import type { BattleStartJson } from 'requestData'
import type { BattleMemo, DropInfo, Treasure } from 'myStorage'
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid'
import { code, uid } from '~/logic'

export default function useCustomFetch() {
  function getUid(url: string) {
    const searchParams = new URLSearchParams(url)
    uid.value = searchParams.get('uid') || ''
    return uid.value
  }

  function checkCode() {
    if (!uuidValidate(code.value))
      code.value = uuidv4()
  }

  function request(api: string, method: string, data: any) {
    const baseUrl = 'http://localhost:4000'
    fetch(baseUrl + api, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log(error)
    })
  }

  function sendDropInfo(memo: BattleMemo, treasureList: Treasure[]) {
    const dropInfo: DropInfo = {
      battleId: memo.battleId,
      questName: memo.questName,
      uid: uid.value,
      timestamp: memo.timestamp,
      reward: treasureList,
    }
    request('/drop', 'post', dropInfo)
  }

  function sendBossInfo(rawData: BattleStartJson) {
    const bossInfo = {
      battleId: String(rawData.raid_id),
      userId: rawData.user_id,
      questId: rawData.quest_id,
      battleTotal: Number(rawData.battle.total),
      battleCount: Number(rawData.battle.count),
      boss: rawData.boss.param.map(boss => ({
        id: boss.enemy_id,
        name: boss.monster,
        lv: boss.Lv,
        attr: boss.attr,
        cjs: boss.cjs,
        hp: Number(boss.hpmax),
      })),
    }
    request('/startJson', 'post', bossInfo)
  }

  return {
    checkCode,
    sendDropInfo,
    sendBossInfo,
    getUid,
  }
}
