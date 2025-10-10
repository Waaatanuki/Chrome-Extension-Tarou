<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { snapdom } from '@zumer/snapdom'
import { battleExportData, deckList, userInfo } from '~/logic'
import ActionList from '../../sidePanel/views/combat/components/ActionList.vue'
import DamageRecord from '../../sidePanel/views/combat/components/DamageRecord.vue'
import Npc from '../../sidePanel/views/party/components/Npc.vue'
import Summon from '../../sidePanel/views/party/components/Summon.vue'
import Weapon from '../../sidePanel/views/party/components/Weapon.vue'

const deck = computed(() => deckList.value[0])

async function exportToImg() {
  try {
    const element = document.querySelector(`#record-container`)!
    const result = await snapdom(element)
    await result.download({ format: 'png', filename: `战斗记录${Date.now()}` })
  }
  catch (error) {
    createNotification({ message: String(error) })
  }
}
</script>

<template>
  <div fixed right-20px top-300px h-40px w-40px fc cursor-pointer rounded-full hover:bg-teal-9 @click="exportToImg">
    <Icon icon="streamline-flex:screenshot" text-25px text-teal-6 />
  </div>
  <div id="record-container" p-4>
    <div v-if="battleExportData" m-auto w-620px fc gap-10px rounded p-10px ring-1 ring-neutral-7>
      <div flex flex-col gap-10px>
        <el-card w-300px body-style="padding: 5px">
          <el-descriptions size="small" direction="vertical" :column="3" border>
            <el-descriptions-item label="副本" label-width="60" :rowspan="2" align="center">
              <img h-44px w-44px :src="getBossImg('enemy', battleExportData.bossImage!, 's')">
            </el-descriptions-item>
            <el-descriptions-item label="伤害" label-width="113" align="center">
              {{ battleExportData.damage }}
            </el-descriptions-item>
            <el-descriptions-item label="操作时长/跑速" align="center">
              {{ battleExportData.realSpeed }}
            </el-descriptions-item>
            <el-descriptions-item label="贡献" align="center">
              {{ battleExportData.point ? Math.floor(battleExportData.point).toLocaleString() : '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="回合数" align="center">
              {{ battleExportData.turn }}
            </el-descriptions-item>
          </el-descriptions>
          <div mt-5px text-end text-xs>
            {{ `${userInfo.name} @ ${useDateFormat(battleExportData.startTime! * 1000, 'MM-DD HH:mm:ss').value}` }}
          </div>
        </el-card>
        <DamageRecord v-if="battleExportData.detail" :player-info="battleExportData.detail.player" :is-export="true" />
      </div>
      <div v-if="deck" flex flex-col gap-10px>
        <Npc :leader="deck.leader" :npcs="deck.npcs" />
        <Weapon :weapons="deck.weapons" />
        <Summon :summons="deck.summons" />
      </div>
    </div>
    <div v-if="battleExportData.detail" m-auto mt-20px w-610px>
      <ActionList :action-queue="battleExportData.detail.actionQueue" mode="horizontal" />
    </div>
  </div>
</template>
