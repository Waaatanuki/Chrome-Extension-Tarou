<template>
  <el-descriptions border :column="1" v-if="battleLog.bossInfo.name">
    <el-descriptions-item label="BOSS信息">{{
      battleLog.bossInfo.name +
      '——' +
      battleLog.bossInfo.hp +
      `  第${battleLog.bossInfo.turn}回合`
    }}</el-descriptions-item>
    <el-descriptions-item label="BUFF">
      <template #default>
        <div class="flex flex-wrap">
          <img
            class="h-10"
            v-for="buff in battleLog.bossInfo.buffs"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
          />
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="DEBUFF">
      <template #default>
        <div class="flex flex-wrap">
          <img
            class="h-10"
            v-for="db in battleLog.bossInfo.debuffs"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${db.status}.png`"
          />
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="特别玩家 BUFF">
      <template #default>
        <div class="flex flex-wrap">
          <img
            class="h-10"
            v-for="buff in battleLog.bossInfo.importantPlayerBuffs"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
          />
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="特别BOSS BUFF">
      <template #default>
        <div class="flex flex-wrap">
          <img
            class="h-10"
            v-for="buff in battleLog.bossInfo.importantBossBuffs"
            :src="`https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/status/x64/status_${buff.status}.png`"
          />
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="攻击结果">
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
  <div class="member-list" border="2 black solid" flex flex-wrap>
    <div
      relative
      w-40
      h-14
      m-2
      p-1
      flex
      border="2 black solid"
      bg-slate
      hover:scale-110
      transition
      duration-450
      ease-in-out
      cursor-pointer
      select-none
      v-for="member in battleLog.memberList"
      @click="jump(member.userId)"
    >
      <img :src="member.jobIcon" mr-2 />
      <div flex flex-col justify-center>
        <span text-start text-base text-ellipsis font-500 overflow-hidden>
          {{ member.nickname }}
        </span>
        <span text-start text-base font-500>
          {{ member.userRank }}
        </span>
      </div>

      <div :class="member.attributeClass" scale-200></div>
    </div>
  </div>
  <el-table :data="battleLog.battleResultList">
    <el-table-column type="expand">
      <template #default="{ row }">
        <div class="prt-result-detail">
          <div class="prt-reward-item">
            <div class="prt-item-list">
              <div
                class="lis-treasure btn-treasure-item"
                v-for="treasure in row.treasureList"
              >
                <div class="prt-treasure-image">
                  <img class="img-treasure-item" :src="treasure.src" />
                  <div class="prt-article-count" v-if="treasure.number">
                    <span class="txt-small">x</span>{{ treasure.number }}
                  </div>
                </div>
                <div :class="treasure.boxClass"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="raidTime" label="结束时间" align="center" />
    <el-table-column prop="raidName" label="副本" align="center" />
    <el-table-column prop="point" label="伤害" align="center" />
    <el-table-column prop="turn" label="回合数" align="center" width="100" />
    <el-table-column prop="time" label="讨伐时间" align="center" width="100" />
    <el-table-column prop="speed" label="跑速" align="center" width="100" />
  </el-table>
</template>

<script setup lang="ts">
import useStore from '@/store'
const { battleLog } = useStore()

function jump(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}
</script>

<style lang="scss" scoped></style>
