<script setup lang="ts">
import type { Player } from 'myStorage'
import type { AttackResultJson, Condition } from 'requestData'
import BattleResultTable from './components/BattleResult.vue'
import BossDashboard from './components/BossDashboard.vue'
import BuffBar from './components/BuffBar.vue'
import MemberList from './components/MemberList.vue'
import Summon from './components/Summon.vue'
import RaidRecord from './components/RaidRecord.vue'
import type { BossInfo, BuffInfo, Member, SummonInfo } from './types'
import { raidRecord } from '~/logic'
import type { BattleResult, BattleStartJson, BossConditionJson } from '~/logic/types'

const props = defineProps<{
  userId: string
  battleStartJson: BattleStartJson
  normalAttackResultJson: AttackResultJson
  summonResultJson: AttackResultJson
  abilityResultJson: AttackResultJson
  bossConditionJson: BossConditionJson
  lobbyMemberList: Member[]
  battleResultList: BattleResult[]
}>()

const bossInfo = ref<BossInfo>()
const summonInfo = ref<SummonInfo>()
const buffInfo = ref<BuffInfo>()
const raidId = ref<number>()
watch(() => props.battleStartJson, (data) => {
  if (!data)
    return

  raidId.value = data.raid_id
  const boss = data.boss.param[0]
  const player = data.player.param[0]

  bossInfo.value = {
    battleId: data.twitter?.battle_id,
    imgId: boss.cjs.split('_').at(-1)!,
    name: boss.monster,
    hp: Number(boss.hp),
    hpmax: Number(boss.hpmax),
    hpPercent: Number.parseFloat((Number(boss.hp) / Number(boss.hpmax) * 100).toFixed(2)),
    timer: data.timer,
    turn: data.turn,
    remainderSecond: data.timer,
  }

  summonInfo.value = {
    summon: [...data.summon],
    supporter: data.supporter,
  }

  handleConditionInfo(boss.condition, player.condition)
  recordRaidInfo(data)
})

function handleConditionInfo(bossCondition?: Condition, playerCondition?: Condition) {
  if (!bossCondition || !playerCondition)
    return

  const bossBuffs = bossCondition.buff || []
  const bossDebuffs = bossCondition.debuff || []
  const totalBossBuffs = bossBuffs.concat(bossDebuffs).filter((item, index, self) => {
    return index === self.findIndex(t => t.status === item.status)
     && (!item.personal_debuff_user_id || item.personal_debuff_user_id === props.userId)
     && (!item.personal_buff_user_id || item.personal_buff_user_id === props.userId)
  })

  const playerBuffs = playerCondition.buff || []
  const playerDebuffs = playerCondition.debuff || []
  const totalPlayerBuffs = playerBuffs.concat(playerDebuffs).filter((item, index, self) => {
    return index === self.findIndex(t => t.status === item.status)
  })

  buffInfo.value = {
    bossBuffs: totalBossBuffs,
    playerBuffs: totalPlayerBuffs,
  }
}

function recordRaidInfo(data: BattleStartJson) {
  const hit = raidRecord.value.find(record => record.raid_id === raidId.value)
  if (!hit) {
    const boss = data.boss.param[0]

    const player = data.player.param.reduce<Player[]>((pre, cur) => {
      pre.push({
        pid: cur.pid,
        damage: {
          total: { comment: '总计', value: 0 },
          attack: { comment: '通常攻击&反击', value: 0 },
          ability: { comment: '技能伤害', value: 0 },
          special: { comment: '奥义伤害', value: 0 },
          other: { comment: '其他', value: 0 },
        },
      })
      return pre
    }, [])

    raidRecord.value.unshift({
      raid_id: raidId.value!,
      imgId: boss.cjs.split('_').at(-1)!,
      name: boss.monster,
      turn: data.turn,
      timestamp: Date.now(),
      player,
    })

    if (raidRecord.value.length > 10)
      raidRecord.value.pop()
  }
}

function handleDamageStatistic(data: AttackResultJson) {
  const playerPosInfo: { pid: string; pos: number }[] = []
  Object.values(data.status.ability).forEach((npc) => {
    playerPosInfo.push({
      pid: npc.src.split('/').at(-1)!.split('.')[0],
      pos: npc.pos,
    })
  })
  const currentRaid = raidRecord.value.find(raid => raid.raid_id === raidId.value)
  if (!currentRaid)
    return

  data.scenario.forEach((action) => {
    if (action.cmd === 'special' || action.cmd === 'special_npc') {
      const hitPlayer = currentRaid.player[action.pos]
      if (hitPlayer) {
        hitPlayer.damage.special.value += action.total!.reduce((pre, cur) => {
          pre += Number(cur.split.join(''))
          return pre
        }, 0)
      }
    }
    if (action.cmd === 'attack' && action.from === 'player') {
      const hitPlayer = currentRaid.player[action.num]
      if (hitPlayer) {
        hitPlayer.damage.attack.value += action.damage!.reduce((pre, cur) => {
          pre += cur.reduce((p, c) => {
            p += c.value
            return p
          }, 0)
          return pre
        }, 0)
      }
    }
  })
  currentRaid.player.forEach((player) => {
    player.damage.total.value = player.damage.ability.value + player.damage.attack.value + player.damage.other.value + player.damage.special.value
  })
}

function handleAttackRusult(data: AttackResultJson) {
  if (!data)
    return
  const bossGauge = data.scenario.filter(item => item.cmd === 'boss_gauge').at(-1)
  const status = data.status

  if (bossGauge && bossInfo.value) {
    bossInfo.value.name = bossGauge.name!.ja
    bossInfo.value.hp = bossGauge.hp!
    bossInfo.value.hpmax = bossGauge.hpmax!
    bossInfo.value.hpPercent = Number.parseFloat((Number(bossGauge.hp) / Number(bossGauge.hpmax) * 100).toFixed(2))
    bossInfo.value.timer = status.timer
    bossInfo.value.turn = status.turn
  }
  const isBossDie = data.scenario.find((item: any) => item.cmd === 'die' && item.to === 'boss')

  if (isBossDie && bossInfo.value) {
    bossInfo.value.hp = 0
    bossInfo.value.hpPercent = 0
    bossInfo.value.remainderSecond = status.timer
  }

  if (summonInfo.value) {
    status.summon.recast.forEach((value, idx) => {
      summonInfo.value!.summon[idx].recast = value
    })
    summonInfo.value.supporter.recast = status.supporter.recast
  }

  const bossBuffs = data.scenario.filter(item => item.cmd === 'condition' && item.to === 'boss').at(-1)
  const playerBuffs = data.scenario.filter(item => item.cmd === 'condition' && item.to === 'player' && item.pos === 0).at(-1)
  handleConditionInfo(bossBuffs?.condition, playerBuffs?.condition)
  handleDamageStatistic(data)
}

function watchMultiple(watchExpressions: (() => AttackResultJson)[], callback: (data: AttackResultJson) => void): void {
  watchExpressions.forEach((expression) => {
    watch(expression, callback)
  })
}

watchMultiple(
  [
    () => props.normalAttackResultJson,
    () => props.summonResultJson,
    () => props.abilityResultJson,
  ],
  (data) => {
    handleAttackRusult(data)
  },
)

const normalAttackInfo = computed(() => {
  if (!props.normalAttackResultJson)
    return { hit: 0, damage: 0 }

  const attackList = props.normalAttackResultJson.scenario.filter((item: any) => item.cmd === 'attack' && item.from === 'player')
  if (attackList.length === 0)
    return { hit: 0, damage: 0 }
  let damageList: any[] = []
  attackList.forEach((item: any) => {
    damageList = damageList.concat(item.damage)
  })

  const data: any[] = []
  damageList.forEach((damage: any) => {
    for (const key in damage)
      data.push(damage[key])
  })

  const damage = data.reduce<number>((pre, cur) => pre + Number(cur.value), 0)
  return { hit: data.length, damage }
})

const memberList = computed(() => {
  if (!props.battleStartJson?.multi_raid_member_info)
    return props.lobbyMemberList || []

  return props.battleStartJson.multi_raid_member_info.reduce<Member[]>((pre, cur) => {
    pre.push({
      nickname: cur.nickname,
      userId: cur.user_id,
      userRank: cur.level,
      jobIcon: `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/${cur.job_id}.png`,
      attributeClass: `ico-attribute ico-attribute-${cur.pc_attribute}`,
      is_dead: cur.is_dead,
    })
    return pre
  }, [])
})
</script>

<template>
  <div v-if="bossInfo && buffInfo">
    <div fc gap-2 p-2>
      <BossDashboard :boss-info="bossInfo" />
      <BuffBar :buff-info="buffInfo" :boss-condition-json="bossConditionJson" />
    </div>
    <RaidRecord :raid-record="raidRecord.find(record => record.raid_id === raidId)!" />
    <el-descriptions v-if="battleStartJson && bossInfo && buffInfo" border :column="1">
      <el-descriptions-item label="平A结果">
        {{ `hit: ${normalAttackInfo.hit} 总伤害：${normalAttackInfo.damage}` }}
      </el-descriptions-item>
      <el-descriptions-item v-if="summonInfo" label="召唤">
        <Summon :summon-info="summonInfo" />
      </el-descriptions-item>
    </el-descriptions>

    <MemberList :data="memberList" />
    <BattleResultTable :table-data="battleResultList" />
  </div>
  <div v-else fc>
    <el-tag type="info" effect="dark" size="large" round>
      进入战斗时将会读取相关信息
    </el-tag>
  </div>
</template>
