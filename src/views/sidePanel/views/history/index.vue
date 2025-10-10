<script setup lang="ts">
import type { BuildStorage } from 'build'
import type { BattleRecord } from 'myStorage'
import copy from 'copy-text-to-clipboard'
import { uploadBuild } from '~/api'
import { battleExportData, battleRecord, deckList } from '~/logic'
import ActionList from '../combat/components/ActionList.vue'
import BattleAnalysis from '../combat/components/BattleAnalysis.vue'
import Npc from '../party/components/Npc.vue'
import Summon from '../party/components/Summon.vue'
import Weapon from '../party/components/Weapon.vue'

const dialogVisible = ref(false)
const loading = ref(false)
const anonymous = ref(false)
const currentRecord = ref<BattleRecord>()
const currentDeck = computed(() => deckList.value[0])
const dialogType = ref<'detail' | 'upload'>('detail')

function getRealTimeSpeed(row: BattleRecord) {
  const seconds = row.startTimer - row.endTimer
  if (!seconds || !row.damage)
    return '-'
  const damage = Number(row.damage?.split(',').join(''))
  return `${formatTime(seconds)} / ${(damage / (seconds / 60) / 1000000).toFixed(0)}`
}

function getFullTimeSpeed(row: BattleRecord) {
  if (!row.duration || !row.damage)
    return '-'

  const damage = Number(row.damage?.split(',').join(''))
  let formatted_time = row.duration

  if (row.duration.split(':').length === 2)
    formatted_time = `00:${formatted_time}`

  const hour = Number(formatted_time.split(':')[0])
  const minute = Number(formatted_time.split(':')[1])
  const second = Number(formatted_time.split(':')[2])
  const seconds = hour * 3600 + minute * 60 + second

  return `${row.duration} / ${(damage / (seconds / 60) / 1000000).toFixed(0)}`
}

function handleCommand(command: 'detail' | 'upload' | 'export', data: BattleRecord) {
  currentRecord.value = data

  if (command === 'export') {
    battleExportData.value = processData()
    openPopupWindow('ExportRecord')
    return
  }

  if (command === 'upload')
    data.isFa = data.isFa ?? true

  dialogType.value = command
  dialogVisible.value = true
}

function handleCopyBuild() {
  if (!currentRecord.value)
    return

  if (!currentDeck.value)
    return ElMessage.warning('请先切换到游戏里的编成界面')

  ElMessageBox.confirm(
    '确认使用当前队伍配置进行上传?<br>(可在游戏中切换队伍)',
    '通知',
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      loading.value = true
      uploadBuild({ ...processData(), anonymous: anonymous.value }).then((data) => {
        ElMessage.success('上传成功')
        const record = battleRecord.value.find(record => record.raid_id === currentRecord.value?.raid_id)
        if (record)
          record.key = data.key

        dialogVisible.value = false
      }).finally(() => {
        loading.value = false
      })
    })
    .catch(() => { })
}

function processData(): BuildStorage {
  const uploadRecord: BattleRecord = JSON.parse(JSON.stringify(currentRecord.value))
  return {
    questId: uploadRecord.quest_id,
    raidId: uploadRecord.raid_id,
    raidName: uploadRecord.raid_name,
    bossImage: uploadRecord.imgId,
    turn: uploadRecord.turn,
    startTime: Math.floor((uploadRecord.startTimestamp ?? Date.now()) / 1000),
    realSpeed: getRealTimeSpeed(uploadRecord),
    fullSpeed: getFullTimeSpeed(uploadRecord),
    point: uploadRecord.point,
    damage: uploadRecord.damage,
    isFa: uploadRecord.isFa ?? true,
    deck: currentDeck.value,
    detail: {
      player: uploadRecord.player?.map((player) => {
        const { condition, ...rest } = player
        return rest
      }),
      actionQueue: uploadRecord.actionQueue,
    },
  }
}

function copyLink(key: string) {
  if (copy(`https://gbf.pub/build?key=${key}`))
    ElMessage.success('已复制分享链接')
}
</script>

<template>
  <div flex flex-col flex-wrap gap-10px>
    <el-card v-for="data, idx in battleRecord" :key="idx" w-300px body-style="padding: 5px">
      <el-descriptions size="small" direction="vertical" :column="3" border>
        <el-descriptions-item label="副本" label-width="60" :rowspan="2" align="center">
          <img h-44px w-44px :src="getBossImg('enemy', data.imgId!, 's')">
        </el-descriptions-item>
        <el-descriptions-item label="伤害" label-width="113" align="center">
          {{ data.damage }}
        </el-descriptions-item>
        <el-descriptions-item label="操作时长/跑速" align="center">
          {{ getRealTimeSpeed(data) }}
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
          {{ data.startTimestamp ? useDateFormat(data.startTimestamp, 'MM/DD HH:mm') : '-' }}
        </div>

        <div fc>
          <TheButton v-if="data.key" @click="copyLink(data.key)">
            分享
          </TheButton>
          <TheButton v-else @click="handleCommand('upload', data)">
            上传
          </TheButton>
          <TheButton @click="handleCommand('detail', data)">
            详情
          </TheButton>
          <TheButton @click="handleCommand('export', data)">
            导出
          </TheButton>
        </div>
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :fullscreen="true">
      <div m-auto mt-20px w-300px flex flex-col gap-10px>
        <template v-if="dialogType === 'detail' && currentRecord">
          <BattleAnalysis :player="currentRecord?.player " />
          <ActionList :action-queue="currentRecord?.actionQueue " />
        </template>
        <template v-if="dialogType === 'upload'">
          <div v-if="currentDeck" my-20px flex items-center justify-between>
            <div fc gap-4>
              <div fc gap-2>
                匿名上传
                <el-switch
                  v-model="anonymous"
                  inline-prompt
                  active-text="是"
                  inactive-text="否"
                />
              </div>
              <div fc gap-2>
                FA
                <el-switch
                  v-model="currentRecord!.isFa"
                  inline-prompt
                  active-text="是"
                  inactive-text="否"
                />
              </div>
            </div>
            <TheButton :loading="loading" @click="handleCopyBuild">
              上传配置信息
            </TheButton>
          </div>
          <el-result v-else icon="info" sub-title="切换至战斗记录所使用的的队伍" />

          <div v-if="currentDeck" m-auto w-300px flex flex-col gap-10px>
            <Npc :leader="currentDeck.leader" :npcs="currentDeck.npcs" />
            <Weapon :weapons="currentDeck.weapons" />
            <Summon :summons="currentDeck.summons" />
          </div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
