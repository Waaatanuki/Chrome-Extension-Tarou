<script setup lang="ts">
import type { BattleExport } from 'battle'
import type { BattleRecord } from 'extension'
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
    return ElMessage.warning('Please switch to the party setup screen first')

  ElMessageBox.confirm(
    'Use the current party setup for upload?<br>(You can switch party setup in-game)',
    'Notice',
    {
      dangerouslyUseHTMLString: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(() => {
      loading.value = true
      uploadBuild({ ...processData(), anonymous: anonymous.value }).then((data) => {
        ElMessage.success('Upload Successful')
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

function processData(): BattleExport {
  const uploadRecord: BattleRecord = deepClone(currentRecord.value)!
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
    ElMessage.success('Share link copied')
}
</script>

<template>
  <div flex flex-col flex-wrap gap-10px>
    <el-card v-for="data, idx in battleRecord" :key="idx" w-300px body-style="padding: 5px !important">
      <el-descriptions size="small" direction="vertical" :column="3" border>
        <el-descriptions-item label="Quest" label-width="60" :rowspan="2" align="center">
          <img h-44px w-44px :src="getBossImg('enemy', data.imgId!, 's')">
        </el-descriptions-item>
        <el-descriptions-item label="Damage" label-width="113" align="center">
          {{ data.damage }}
        </el-descriptions-item>
        <el-descriptions-item label="Action Duration / Speed" align="center">
          {{ getRealTimeSpeed(data) }}
        </el-descriptions-item>
        <el-descriptions-item label="Contribution" align="center">
          {{ data.point ? Math.floor(data.point).toLocaleString() : '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Turn Count" align="center">
          {{ data.turn }}
        </el-descriptions-item>
      </el-descriptions>
      <div mt-5px flex items-center justify-between>
        <div text-xs>
          {{ data.startTimestamp ? useDateFormat(data.startTimestamp, 'MM/DD HH:mm') : '' }}
        </div>

        <div fc>
          <TheButton v-if="data.key" @click="copyLink(data.key)">
            Share
          </TheButton>
          <TheButton v-else @click="handleCommand('upload', data)">
            Upload
          </TheButton>
          <TheButton @click="handleCommand('detail', data)">
            Details
          </TheButton>
          <TheButton @click="handleCommand('export', data)">
            Export
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
                Anonymous Upload
                <el-switch
                  v-model="anonymous"
                  inline-prompt
                    active-text="Yes"
                    inactive-text="No"
                />
              </div>
              <div fc gap-2>
                FA
                <el-switch
                  v-model="currentRecord!.isFa"
                  inline-prompt
                    active-text="Yes"
                    inactive-text="No"
                />
              </div>
            </div>
            <TheButton :loading="loading" @click="handleCopyBuild">
              Upload Setup info
            </TheButton>
          </div>
          <el-result v-else icon="info" sub-title="Switch to Party used in this Battle Record" />

          <div v-if="currentDeck" m-auto w-300px flex flex-col gap-10px>
            <Npc :leader="currentDeck.leader" :npcs="currentDeck.npcs" :priority="currentDeck.priority" />
            <Weapon :weapons="currentDeck.weapons" />
            <Summon :summons="currentDeck.summons" />
          </div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
