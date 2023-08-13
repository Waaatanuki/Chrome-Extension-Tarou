<script setup lang="ts">
import MemberList from './components/MemberList.vue'
import BattleResultTable from './components/BattleResult.vue'
import BossDashboard from './components/BossDashboard.vue'
import BuffBar from './components/BuffBar.vue'
import type { BossInfo, BuffInfo, Member, SummonInfo } from './types'
import type { AttackResultJson, BattleResult, BattleStartJson, BossParam, PlayerParam } from '~/logic/types'

const props = defineProps<{
  battleStartJson: BattleStartJson
  normalAttackResultJson: AttackResultJson
  summonResultJson: AttackResultJson
  abilityResultJson: AttackResultJson
  lobbyMemberList: Member[]
  battleResultList: BattleResult[]
}>()

const bossInfo = ref<BossInfo>()
const summonInfo = ref<SummonInfo>()
const buffInfo = ref<BuffInfo>()

watch(() => props.battleStartJson, (data) => {
  if (!data)
    return

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

  handleConditionInfo(boss, player)
})

function handleConditionInfo(boss: BossParam, player: PlayerParam) {
  if (!boss || !player)
    return
  const bossBuffs = boss.condition.buff || []
  const bossDebuffs = boss.condition.debuff || []
  const totalBossBuffs = bossBuffs.concat(bossDebuffs).filter((item, index, self) => {
    return index === self.findIndex(t => t.status === item.status)
  })

  const playerBuffs = player.condition.buff || []
  const playerDebuffs = player.condition.debuff || []
  const totalPlayerBuffs = playerBuffs.concat(playerDebuffs).filter((item, index, self) => {
    return index === self.findIndex(t => t.status === item.status)
  })

  buffInfo.value = {
    bossBuffs: totalBossBuffs,
    playerBuffs: totalPlayerBuffs,
  }
}

function handleAttackRusult(data: AttackResultJson) {
  const bossGauge = data.scenario.find(item => item.cmd === 'boss_gauge')
  const status = data.status

  if (bossGauge && bossInfo.value) {
    bossInfo.value.name = bossGauge.name.ja
    bossInfo.value.hp = bossGauge.hp
    bossInfo.value.hpmax = bossGauge.hpmax
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
  handleConditionInfo(bossBuffs, playerBuffs)
}

watch(() => props.normalAttackResultJson, (data) => {
  if (!data)
    return
  handleAttackRusult(data)
})

watch(() => props.summonResultJson, (data) => {
  if (!data)
    return
  handleAttackRusult(data)
})

watch(() => props.abilityResultJson, (data) => {
  if (!data)
    return
  handleAttackRusult(data)
})

const normalAttackInfo = computed(() => {
  if (!props.normalAttackResultJson)
    return { hit: 0, damage: 0 }

  const attackList = props.normalAttackResultJson.scenario.filter((item: any) => item.cmd === 'attack' && item.from === 'player')
  if (attackList.length === 0)
    return { hit: 0, damage: 0 }
  let damageList = [] as any[]
  attackList.forEach((item: any) => {
    damageList = damageList.concat(item.damage)
  })

  const data = [] as any[]
  damageList.forEach((damage: any) => {
    for (const key in damage)
      data.push(damage[key])
  })

  const damage = data.reduce((pre, cur) => pre + Number(cur.value), 0)
  return { hit: data.length, damage }
})

const memberList = computed(() => {
  if (!props.battleStartJson?.multi_raid_member_info)
    return props.lobbyMemberList || []

  return props.battleStartJson.multi_raid_member_info.reduce((pre: Member[], cur) => {
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
      <BuffBar :buff-info="buffInfo" />
    </div>
    <el-descriptions v-if="battleStartJson && bossInfo && buffInfo" border :column="1">
      <el-descriptions-item label="平A结果">
        {{ `hit: ${normalAttackInfo.hit} 总伤害：${normalAttackInfo.damage}` }}
      </el-descriptions-item>
      <el-descriptions-item v-if="summonInfo" label="召唤">
        <template #default>
          <div flex>
            <div v-for="summon, idx in summonInfo.summon" :key="idx" m-1>
              <div relative>
                <div v-if="Number(summon.recast) !== 0" class="absolute w-full h-full bg-black/40" />
                <img block :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/summon/raid_normal/${summon.image_id ? summon.image_id : 'empty'}.jpg`">
              </div>
              <div v-if="Number(summon.recast) !== 0" text-center>
                <span>还差{{ summon.recast }}回合</span>
              </div>
            </div>
            <div v-if="summonInfo.supporter.id" m-1>
              <div relative>
                <div v-if="Number(summonInfo.supporter.recast) !== 0" class="absolute w-full h-full bg-black/40" />
                <img block :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/summon/raid_normal/${summonInfo.supporter.image_id}.jpg`">
              </div>
              <div v-if="Number(summonInfo.supporter.recast) !== 0" text-center>
                <span>还差{{ summonInfo.supporter.recast }}回合</span>
              </div>
            </div>
          </div>
        </template>
      </el-descriptions-item>
    </el-descriptions>

    <MemberList :data="memberList" />
    <BattleResultTable :table-data="battleResultList" />
  </div>
</template>

<style scoped>
.buff-wrapper{
  display: flex;
  flex-wrap: wrap;
}
.buff-icon{
  height: 2.5rem;
  cursor: pointer;
}
</style>
