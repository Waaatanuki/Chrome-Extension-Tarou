<template>
  <el-descriptions border :column="1" v-if="battleLog.bossInfo.name">
    <el-descriptions-item label="BOSS信息">{{
      battleLog.bossInfo.name +
      '——' +
      useNumberFormat(battleLog.bossInfo.hp) +
      '——' +
      battleLog.bossInfo.hpPercent +
      `  第${battleLog.bossInfo.turn}回合`
    }}</el-descriptions-item>
    <el-descriptions-item label="BOSS BUFF">
      <template #default>
        <div class="flex flex-wrap">
          <img
            class="h-10 cursor-pointer"
            v-for="buff in battleLog.bossInfo.bossBuffs"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
            @click="toggleImage('specBossBuff', buff.status.split('_')[0])"
          />
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="PLAYER BUFF">
      <template #default>
        <div class="flex flex-wrap">
          <img
            class="h-10 cursor-pointer"
            v-for="buff in battleLog.bossInfo.playerBuffs"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
            @click="toggleImage('specPlayerBuff', buff.status.split('_')[0])"
          />
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="特别BOSS BUFF">
      <template #default>
        <div class="flex flex-wrap">
          <img
            class="h-10"
            v-for="(buff, index) in battleLog.bossInfo.importantBossBuffs"
            @click="battleLog.bossInfo.importantBossBuffs.splice(index, 1)"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
          />
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="特别玩家 BUFF">
      <template #default>
        <div class="flex flex-wrap">
          <img
            class="h-10"
            v-for="(buff, index) in battleLog.bossInfo.importantPlayerBuffs"
            @click="battleLog.bossInfo.importantPlayerBuffs.splice(index, 1)"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
          />
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="平A结果">
      {{
        `hit: ${battleLog.attackInfo.hit} 总伤害：${battleLog.attackInfo.damage}`
      }}
    </el-descriptions-item>
    <el-descriptions-item label="召唤" v-if="battleLog.summonInfo.length > 2">
      <template #default>
        <div class="flex">
          <div m-1 v-for="summon in battleLog.summonInfo">
            <div class="relative">
              <div
                v-if="summon.recast != 0"
                class="absolute w-full h-full bg-black/40"
              ></div>
              <img
                block
                :src="`https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/summon/raid_normal/${summon.image_id}.jpg`"
              />
            </div>
            <div v-if="summon.recast != 0" class="text-center">
              <span>还差{{ summon.recast }}回合</span>
            </div>
          </div>
        </div>
      </template>
    </el-descriptions-item>
  </el-descriptions>

  <MemberList :data="battleLog.memberList" />
  <BattleResult :tableData="battleLog.battleResultList" />
</template>

<script setup lang="ts">
import useStore from '@/store'
import MemberList from './components/MemberList.vue'
import BattleResult from './components/BattleResult.vue'
const { battleLog } = useStore()

function toggleImage(type: 'specBossBuff' | 'specPlayerBuff', buffId: string) {
  const index = battleLog[type].indexOf(buffId)
  if (index >= 0) {
    battleLog[type].splice(index, 1)
  } else {
    battleLog[type].push(buffId)
  }
}
</script>
