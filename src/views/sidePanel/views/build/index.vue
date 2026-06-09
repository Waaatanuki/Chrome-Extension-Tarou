<script setup lang="ts">
import type { BuildItem } from 'api'
import { detailBuild, listBuild } from '~/api'
import { buildNpcFilter, buildQuestId, buildRecord } from '~/logic'

const loading = ref(false)
const buildList = ref<BuildItem[]>([])
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

function checkDetail(build: BuildItem) {
  detailBuild(build.key).then(({ data }) => {
    buildRecord.value = { ...build, ...data }
    openPopupWindow('ExportRecord')
  }).catch((error) => {
    ElMessage.error(error.message)
  })
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
    <el-card v-for="data, idx in buildList" :key="idx" w-300px body-style="padding: 5px !important">
      <el-descriptions size="small" direction="vertical" :column="3" border>
        <el-descriptions-item label="副本" label-width="60" :rowspan="2" align="center">
          <img v-if="data.bossImage" h-44px w-44px :src="getBossImg('enemy', data.bossImage, 's')">
        </el-descriptions-item>
        <el-descriptions-item label="伤害" label-width="113" align="center">
          {{ data.damage }}
        </el-descriptions-item>
        <el-descriptions-item label="操作时长/跑速" align="center">
          {{ data.realTime }} / {{ data.realSpeed }}
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
          {{ data.userName }} @ {{ useDateFormat(data.createTime, 'MM-DD HH:mm:ss').value }}
        </div>

        <TheButton @click="checkDetail(data)">
          详情
        </TheButton>
      </div>
    </el-card>
  </div>
</template>
