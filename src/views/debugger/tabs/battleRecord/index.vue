<script setup lang="ts">
import dayjs from 'dayjs'
import type { BattleRecord } from 'myStorage'
import DamageRecord from '../battleLog/components/DamageRecord.vue'
import ActionList from '../battleLog/components/ActionList.vue'
import { battleRecord } from '~/logic'

const props = defineProps<{ battleRecordLimit: number }>()
const { height } = useWindowSize()

function triggerLock(row: BattleRecord) {
  const lockedNum = battleRecord.value.filter(record => record.reserve).length
  if (lockedNum + 1 >= props.battleRecordLimit && !row.reserve)
    ElMessage.info('已达锁定上限')
  else
    row.reserve = !row.reserve
}

function getRealTimeSpeed(row: BattleRecord) {
  const seconds = row.startTimer - row.endTimer
  if (!seconds)
    return '-'
  const point = Number(row.point?.split(',').join(''))

  return `${formatTime(seconds)} / ${(point / (seconds / 60) / 1000000).toFixed(0)}`
}

function getFullTimeSpeed(row: BattleRecord) {
  if (!row.duration)
    return '-'

  const point = Number(row.point?.split(',').join(''))

  let formatted_time = row.duration

  if (row.duration.split(':').length === 2)
    formatted_time = `00:${formatted_time}`

  const hour = Number(formatted_time.split(':')[0])
  const minute = Number(formatted_time.split(':')[1])
  const second = Number(formatted_time.split(':')[2])
  const seconds = hour * 3600 + minute * 60 + second

  return `${row.duration} / ${(point / (seconds / 60) / 1000000).toFixed(0)}`
}

function clear() {
  battleRecord.value = battleRecord.value.filter(record => record.reserve)
}
</script>

<template>
  <ElTable :data="battleRecord" :height="height - 71 - 52">
    <ElTableColumn type="expand">
      <template #default="{ row } ">
        <div flex items-start justify-start gap-2 p-2>
          <DamageRecord :battle-record="battleRecord.find(record => record.raid_id === row.raid_id)!" />
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
    <ElTableColumn prop="point" label="伤害" align="center" />
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
    <ElTableColumn label="操作" align="center" width="100">
      <template #default="{ row, $index }">
        <div w-76px flex items-center justify-start gap-20px p-10px text-xl>
          <div v-if="row.reserve" i-carbon:locked icon-btn @click="triggerLock(row)" />
          <div v-else i-carbon:unlocked icon-btn @click="triggerLock(row)" />
          <div v-show="!row.reserve" i-carbon:trash-can icon-btn @click="battleRecord.splice($index, 1)" />
        </div>
      </template>
    </ElTableColumn>
  </ElTable>
  <div flex items-center justify-end gap-10px p-10px text-base>
    <div>
      {{ `数量 : ${battleRecord.length}/${battleRecordLimit}` }}
    </div>
    <div btn @click="clear">
      清空列表
    </div>
  </div>
</template>
