<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { snapdom } from '@zumer/snapdom'
import { buildRecord, userInfo } from '~/logic'
import ActionList from '../../sidePanel/views/combat/components/ActionList.vue'
import DamageRecord from '../../sidePanel/views/combat/components/DamageRecord.vue'
import Npc from '../../sidePanel/views/party/components/Npc.vue'
import Summon from '../../sidePanel/views/party/components/Summon.vue'
import Weapon from '../../sidePanel/views/party/components/Weapon.vue'

const userName = computed(() => buildRecord.value.key ? buildRecord.value.userName : userInfo.value.name)
const deck = computed(() => buildRecord.value.deck)

async function exportToImg() {
  try {
    const element = document.querySelector(`#record-container`)!
    const result = await snapdom(element)
    await result.download({ scale: 1.5, type: 'png', filename: `战斗记录${Date.now()}`, backgroundColor: '#131313' })
    ElMessage.success('保存成功')
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
    <div v-if="buildRecord" m-auto w-620px flex items-start justify-center gap-10px rounded p-10px ring-1 ring-neutral-7>
      <div flex flex-col gap-10px>
        <el-card w-300px body-style="padding: 5px !important">
          <el-descriptions size="small" direction="vertical" :column="3" border>
            <el-descriptions-item label="副本" label-width="60" :rowspan="2" align="center">
              <img h-44px w-44px :src="getBossImg('enemy', buildRecord.bossImage!, 's')">
            </el-descriptions-item>
            <el-descriptions-item label="伤害" label-width="113" align="center">
              {{ buildRecord.damage }}
            </el-descriptions-item>
            <el-descriptions-item label="操作时长/跑速" align="center">
              {{ buildRecord.realTime }} / {{ buildRecord.realSpeed }}
            </el-descriptions-item>
            <el-descriptions-item label="贡献" align="center">
              {{ buildRecord.point ? Math.floor(buildRecord.point).toLocaleString() : '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="回合数" align="center">
              {{ buildRecord.turn }}
            </el-descriptions-item>
          </el-descriptions>
          <div mt-5px text-end text-xs>
            {{ `${userName} @ ${useDateFormat(buildRecord.createTime, 'MM-DD HH:mm:ss').value}` }}
          </div>
        </el-card>
        <DamageRecord v-if="buildRecord.detail" m-auto :player-info="buildRecord.detail.player" :is-export="true" />
      </div>
      <div v-if="deck" flex flex-col gap-10px>
        <Npc :leader="deck.leader" :npcs="deck.npcs" :priority="deck.priority" :is-remote="!!buildRecord.key" />
        <Weapon :weapons="deck.weapons" />
        <Summon :summons="deck.summons" />
      </div>
      <div v-else w-300px fc self-stretch text-15px>
        未获取队伍信息
      </div>
    </div>
    <div v-if="buildRecord.detail" m-auto mt-20px w-610px>
      <ActionList :action-queue="buildRecord.detail.actionQueue" :is-export="true" mode="horizontal" />
    </div>
  </div>
</template>
