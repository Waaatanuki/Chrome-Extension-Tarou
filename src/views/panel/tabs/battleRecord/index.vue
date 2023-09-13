<script setup lang="ts">
import dayjs from 'dayjs'
import DamageRecord from '../battleLog/components/DamageRecord.vue'
import ActionList from '../battleLog/components/ActionList.vue'
import { battleRecord } from '~/logic'
</script>

<template>
  <div relative>
    <el-table :data="battleRecord">
      <el-table-column type="expand">
        <template #default="{ row } ">
          <div flex items-start justify-start gap-2 p-2>
            <DamageRecord :battle-record="battleRecord.find(record => record.raid_id === row.raid_id)!" />
            <ActionList :battle-record="battleRecord.find(record => record.raid_id === row.raid_id)!" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template #default="{ row }">
          {{ row.startTimestamp ? dayjs(row.startTimestamp).format('MM/DD HH:mm') : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template #default="{ row }">
          {{ row.endTimestamp ? dayjs(row.endTimestamp).format('MM/DD HH:mm') : '_' }}
        </template>
      </el-table-column>
      <el-table-column prop="raid_name" label="副本" align="center" />
      <el-table-column prop="point" label="伤害" align="center" />
      <el-table-column prop="turn" label="回合数" align="center" width="100" />
      <el-table-column prop="duration" label="讨伐时间" align="center" width="100" />
      <el-table-column prop="speed" label="跑速" align="center" width="100" />
    </el-table>
    <div absolute bottom-10px right-10px z-99999>
      <div btn @click="battleRecord.length = 0">
        清空
      </div>
    </div>
  </div>
</template>
