<script setup lang="ts">
import MemberList from './components/MemberList.vue'
import BattleResultTable from './components/BattleResult.vue'
import { specBossBuff, specPlayerBuff } from '~/logic'
import type { AttackResultJson, BattleResult, BattleStartJson, Buff } from '~/logic/types'

interface Member {
  nickname: string
  userId: string
  userRank: string
  jobIcon: string
  attributeClass: string
  is_dead: boolean
}

const props = defineProps<{ battleStartJson: BattleStartJson; attackResultJson: AttackResultJson; lobbyMemberList: Member[];battleResultList: BattleResult[] }>()

const bossInfo = computed(() => {
  if (!props.battleStartJson)
    return

  const boss = props.battleStartJson.boss.param[0]
  const bossBuffs = boss.condition.buff || []
  const bossDebuffs = boss.condition.debuff || []
  const totalBossBuffs = bossBuffs.concat(bossDebuffs)
  const importantBossBuffs: Buff[] = []

  specBossBuff.value.forEach((item) => {
    totalBossBuffs.forEach(buff => buff.status.startsWith(item) && importantBossBuffs.push(buff))
  })

  const player = props.battleStartJson?.player.param[0]
  const playerBuffs = player.condition.buff || []
  const playerDebuffs = player.condition.debuff || []
  const totalPlayerBuffs = playerBuffs.concat(playerDebuffs)
  const importantPlayerBuffs: Buff[] = []

  specPlayerBuff.value.forEach((item) => {
    totalPlayerBuffs.forEach(buff => buff.status.startsWith(item) && importantPlayerBuffs.push(buff))
  })

  return {
    battleId: props.battleStartJson.twitter.battle_id,
    name: boss.monster,
    hp: Number(boss.hp),
    hpmax: Number(boss.hpmax),
    hpPercent: `${((Number(boss.hp) / Number(boss.hpmax)) * 100).toFixed(2)}%`,
    turn: props.battleStartJson.turn,
    bossBuffs: totalBossBuffs,
    playerBuffs: totalPlayerBuffs,
    importantPlayerBuffs,
    importantBossBuffs,
  }
})

const attackInfo = computed(() => {
  if (!props.attackResultJson)
    return { hit: 0, damage: 0 }

  const attackList = props.attackResultJson.scenario.filter((item: any) => item.cmd === 'attack' && item.from === 'player')
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

const summonInfo = computed(() => {
  if (!props.battleStartJson)
    return []

  const summon = [...props.battleStartJson.summon]
  const supporter = props.battleStartJson.supporter
  supporter?.id && summon.push(supporter)
  return summon
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

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}
</script>

<template>
  <el-descriptions v-if="battleStartJson && bossInfo" border :column="1">
    <el-descriptions-item label="BOSS信息">
      {{ `${bossInfo.name}—— ${bossInfo.hp.toLocaleString()}/${bossInfo.hpmax.toLocaleString()} —— ${bossInfo.hpPercent}  第${bossInfo.turn}回合` + `—— ${bossInfo.battleId}` }}
    </el-descriptions-item>
    <el-descriptions-item label="BOSS BUFF">
      <template #default>
        <div class="buff-wrapper">
          <img
            v-for="buff, idx in bossInfo.bossBuffs" :key="idx" class="buff-icon"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
            @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
          >
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="主角 BUFF">
      <template #default>
        <div class="buff-wrapper">
          <img
            v-for="buff, idx in bossInfo.playerBuffs" :key="idx" class="buff-icon"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
            @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
          >
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="特别BOSS BUFF">
      <template #default>
        <div class="buff-wrapper">
          <img
            v-for="buff, idx in bossInfo.importantBossBuffs" :key="idx" class="buff-icon"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
            @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
          >
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="特别主角 BUFF">
      <template #default>
        <div class="buff-wrapper">
          <img
            v-for="buff, idx in bossInfo.importantPlayerBuffs" :key="idx" class="buff-icon"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
            @click="toggleImage(specPlayerBuff, buff.status.split('_')[0])"
          >
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="平A结果">
      {{ `hit: ${attackInfo.hit} 总伤害：${attackInfo.damage}` }}
    </el-descriptions-item>
    <el-descriptions-item v-if="summonInfo.length > 0" label="召唤">
      <template #default>
        <div flex>
          <div v-for="summon, idx in summonInfo" :key="idx" m-1>
            <div relative>
              <div v-if="Number(summon.recast) !== 0" class="absolute w-full h-full bg-black/40" />
              <img block :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/summon/raid_normal/${summon.image_id}.jpg`">
            </div>
            <div v-if="Number(summon.recast) !== 0" text-center>
              <span>还差{{ summon.recast }}回合</span>
            </div>
          </div>
        </div>
      </template>
    </el-descriptions-item>
  </el-descriptions>

  <MemberList :data="memberList" />
  <BattleResultTable :table-data="battleResultList" />
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
