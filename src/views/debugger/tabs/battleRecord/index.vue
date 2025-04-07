<script setup lang="ts">
import type { BattleRecord, UploadRecord } from 'myStorage'
import dayjs from 'dayjs'
import { uploadBuild } from '~/api'
import { battleRecord } from '~/logic'
import ActionList from '../battleLog/components/ActionList.vue'
import BattleAnalysis from '../battleLog/components/BattleAnalysis.vue'
import Npc from '../party/components/Npc.vue'
import Summon from '../party/components/Summon.vue'
import Weapon from '../party/components/Weapon.vue'

const { height } = useWindowSize()
const battleLogStore = useBattleLogStore()
const partyStore = usePartyStore()
const dialogVisible = ref(false)
const loading = ref(false)

const currentRecord = ref<BattleRecord>()
const currentDeck = computed(() => partyStore.deckList[0])

function triggerLock(row: BattleRecord) {
  const lockedNum = battleRecord.value.filter(record => record.reserve).length
  if (lockedNum + 1 >= battleLogStore.battleRecordLimit && !row.reserve)
    ElMessage.info('已达锁定上限')
  else
    row.reserve = !row.reserve
}

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

function clear() {
  battleRecord.value = battleRecord.value.filter(record => record.reserve)
}

function handleShare(row: BattleRecord) {
  row.isFa = row.isFa ?? true
  dialogVisible.value = true
  currentRecord.value = row
}

function handleCopyBuild() {
  if (!currentRecord.value)
    return

  if (!currentDeck.value)
    return ElMessage.warning('请先切换到游戏里的编成界面')

  ElMessageBox.confirm(
    '确认使用该队伍配置进行上传?',
    '通知',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      loading.value = true
      uploadBuild(processData()).then(() => {
        ElMessage.success('上传成功')
        const record = battleRecord.value.find(record => record.raid_id === currentRecord.value?.raid_id)
        if (record)
          record.isUploaded = true

        dialogVisible.value = false
      }).finally(() => {
        loading.value = false
      })
    })
    .catch(() => { })
}

function processData(): { deck: any, record: UploadRecord } {
  const uploadRecord: BattleRecord = JSON.parse(JSON.stringify(currentRecord.value))
  return {
    deck: currentDeck.value,
    record: {
      questId: uploadRecord.quest_id,
      raidId: uploadRecord.raid_id,
      raidName: uploadRecord.raid_name,
      bossImage: uploadRecord.imgId,
      turn: uploadRecord.turn,
      startTime: Math.floor((uploadRecord.startTimestamp ?? Date.now()) / 1000),
      realSpeed: getRealTimeSpeed(uploadRecord),
      fullSpeed: getFullTimeSpeed(uploadRecord),
      player: uploadRecord.player?.map((player) => {
        const { condition, ...rest } = player // 解构排除 image_id
        return rest
      }),
      actionQueue: uploadRecord.actionQueue,
      point: uploadRecord.point,
      damage: uploadRecord.damage,
      isFa: uploadRecord.isFa ?? true,
    },
  }
}
</script>

<template>
  <ElTable :data="battleRecord" :height="height - 71 - 52">
    <ElTableColumn type="expand">
      <template #default="{ row } ">
        <div flex items-start justify-start gap-2 p-2>
          <BattleAnalysis :battle-record="battleRecord.find(record => record.raid_id === row.raid_id)!" />
          <ActionList :battle-record="battleRecord.find(record => record.raid_id === row.raid_id)!" />
        </div>
      </template>
    </ElTableColumn>
    <ElTableColumn label="开始时间" align="center" width="120">
      <template #default="{ row }">
        {{ row.startTimestamp ? dayjs(row.startTimestamp).format('MM/DD HH:mm') : '-' }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="结束时间" align="center" width="120">
      <template #default="{ row }">
        {{ row.endTimestamp ? dayjs(row.endTimestamp).format('MM/DD HH:mm') : '-' }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="raid_name" label="副本" align="center" />
    <ElTableColumn prop="damage" label="伤害" align="center" />
    <ElTableColumn prop="point" label="贡献" align="center">
      <template #default="{ row }">
        {{ row.point ? Math.floor(row.point).toLocaleString() : '-' }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="turn" label="回合数" align="center" width="100" />
    <ElTableColumn label="操作时长/跑速" align="center" width="120">
      <template #default="{ row }">
        {{ getRealTimeSpeed(row) }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="讨伐时间/跑速" align="center" width="120">
      <template #default="{ row }">
        {{ getFullTimeSpeed(row) }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="操作" align="center" width="150">
      <template #default="{ row, $index }">
        <div fc gap-20px p-10px text-base>
          <div v-if="!row.isUploaded" i-carbon:share icon-btn @click="handleShare(row)" />
          <div v-if="row.reserve" i-carbon:locked icon-btn @click="triggerLock(row)" />
          <div v-else i-carbon:unlocked icon-btn @click="triggerLock(row)" />
          <div v-show="!row.reserve" i-carbon:trash-can icon-btn @click="battleRecord.splice($index, 1)" />
        </div>
      </template>
    </ElTableColumn>
  </ElTable>
  <div flex items-center justify-end gap-10px p-10px text-base>
    <div>
      {{ `数量 : ${battleRecord.length}/${battleLogStore.battleRecordLimit}` }}
    </div>
    <TheButton @click="clear">
      清空列表
    </TheButton>
  </div>

  <el-dialog v-model="dialogVisible" width="510" :show-close="false" top="5vh">
    <div mb-4 flex items-center justify-between>
      <div>
        <el-alert title="切换至战斗记录所使用的的队伍" type="info" show-icon :closable="false" />
      </div>

      <div fc gap-6>
        <div fc gap-2>
          FA
          <el-switch
            v-model="currentRecord!.isFa"
            inline-prompt
            active-text="是"
            inactive-text="否"
          />
        </div>
        <TheButton :loading="loading" @click="handleCopyBuild">
          上传配置信息
        </TheButton>
      </div>
    </div>

    <el-card v-if="currentDeck" :body-style="{ padding: '10px' }" m-auto w-480px>
      <div relative fc flex-col gap-2>
        <div fc flex-wrap gap-2>
          <Weapon :weapons="currentDeck.weapons" />
          <Summon :summons="currentDeck.summons" />
          <Npc :leader="currentDeck.leader" :npcs="currentDeck.npcs" />
        </div>
      </div>
    </el-card>
  </el-dialog>
</template>
