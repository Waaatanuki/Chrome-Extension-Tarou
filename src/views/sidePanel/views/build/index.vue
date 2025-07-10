<script setup lang="ts">
import type { BuildResponse } from 'build'
import { listBuild } from '~/api'
import { buildNpcFilter, buildQuestId } from '~/logic'
import ActionList from '../combat/components/ActionList.vue'
import BattleAnalysis from '../combat/components/BattleAnalysis.vue'
import Npc from '../party/components/Npc.vue'
import Summon from '../party/components/Summon.vue'
import Weapon from '../party/components/Weapon.vue'

type DetailType = 'party' | 'action'

const loading = ref(false)
const buildList = ref<BuildResponse[]>([])
const dialogVisible = ref(false)
const currentBuild = ref<BuildResponse>()
const detailType = ref<DetailType>('party')
const msg = ref('进入副本前自动获取副本ID')

function handleQuery() {
  loading.value = true
  listBuild({ questId: buildQuestId.value, npcFilter: buildNpcFilter.value }).then(({ data }) => {
    buildList.value = data.list
    msg.value = buildList.value.length === 0 ? '未找到匹配的数据' : ''
  }).finally(() => {
    loading.value = false
  })
}

function handleCommand(command: DetailType, data: BuildResponse) {
  detailType.value = command
  dialogVisible.value = true
  currentBuild.value = data
}
</script>

<template>
  <div sticky inset-x-0 top-0 z-999 h-10 flex items-center justify-between rounded bg-neutral-8 px-4 text-base>
    <div fc gap-2 text-14px>
      <div>
        副本ID
      </div>
      <el-input v-model="buildQuestId" clearable size="small" style="width: 100px;">
        管理副本
      </el-input>
    </div>
    <TheButton icon="carbon:search" :loading="loading" @click="handleQuery">
      查询
    </TheButton>
  </div>
  <div mt-10px flex flex-col flex-wrap gap-10px>
    <el-result v-if="msg" icon="info" :sub-title="msg" />
    <el-card v-for="data, idx in buildList" :key="idx" w-300px body-style="padding: 5px">
      <el-descriptions size="small" direction="vertical" :column="3" border>
        <el-descriptions-item label="副本" label-width="60" :rowspan="2" align="center">
          <img v-if="data.bossImage" h-44px w-44px :src="getBossImg('enemy', data.bossImage, 's')">
        </el-descriptions-item>
        <el-descriptions-item label="伤害" label-width="113" align="center">
          {{ data.damage }}
        </el-descriptions-item>
        <el-descriptions-item label="操作时长/跑速" align="center">
          {{ data.realSpeed }}
        </el-descriptions-item>
        <el-descriptions-item label="贡献" align="center">
          {{ data.point ? Math.floor(data.point).toLocaleString() : '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="回合数" align="center">
          {{ data.turn }}
        </el-descriptions-item>
      </el-descriptions>
      <div mt-5px flex items-center justify-between>
        <div text-xs>
          {{ useDateFormat(data.createTime! * 1000, 'MM/DD HH:mm') }}{{ ` @ ${data.account}` }}
        </div>

        <div fc>
          <TheButton icon="material-symbols:sticky-note-2-outline" title="配置" @click="handleCommand('party', data)" />
          <TheButton icon="material-symbols:follow-the-signs" title="操作流程" @click="handleCommand('action', data)" />
        </div>
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :fullscreen="true">
      <div v-if="currentBuild" m-auto mt-20px w-300px flex flex-col gap-10px>
        <template v-if="detailType === 'party'">
          <Npc :leader="currentBuild.deck.leader" :npcs="currentBuild.deck.npcs" :is-build="true" />
          <Weapon :weapons="currentBuild.deck.weapons" />
          <Summon :summons="currentBuild.deck.summons" />
          <BattleAnalysis :player="currentBuild.detail.player" />
        </template>
        <template v-if="detailType === 'action'">
          <ActionList :action-queue="currentBuild.detail.actionQueue" />
        </template>
      </div>
    </el-dialog>
  </div>
</template>
