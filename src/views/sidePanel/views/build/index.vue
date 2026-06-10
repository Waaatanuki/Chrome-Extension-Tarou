<script setup lang="ts">
import type { BuildItem } from 'api'
import { detailBuild, listBuild } from '~/api'
import { buildNpcFilter, buildQuestId, buildRecord } from '~/logic'

const loading = ref(false)
const queryParams = ref({
  attrs: [] as number[],
  noReload: false,
})

const buildList = ref<BuildItem[]>([])
const msg = ref('进入副本前自动获取副本ID')

const ATTR_OPTIONS = [1, 2, 3, 4, 5, 6]

function checkAttr(attr: number) {
  if (queryParams.value.attrs.includes(attr)) {
    queryParams.value.attrs = queryParams.value.attrs.filter(a => a !== attr)
  }
  else {
    queryParams.value.attrs.push(attr)
  }
}

function handleQuery() {
  loading.value = true
  listBuild({ questId: buildQuestId.value, npcFilter: buildNpcFilter.value, ...queryParams.value }).then(({ data }) => {
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
  <div sticky inset-x-0 top-0 z-999 grid rounded bg-neutral-8 p-2 text-base>
    <div flex items-center justify-between>
      <div fc gap-2 text-12px>
        <div>
          副本ID
        </div>
        <el-input v-model="buildQuestId" size="small" style="width: 60px;">
          管理副本
        </el-input>
      </div>
      <div fc gap-2>
        <button
          class="rounded-lg px-2 text-12px"
          :class="queryParams.noReload
            ? 'shadow-[0_0_3px_3px_#059669]'
            : 'ring-1 ring-neutral-6'"
          @click="queryParams.noReload = !queryParams.noReload"
        >
          无刷新
        </button>

        <TheButton icon="carbon:search" :loading="loading" @click="handleQuery">
          查询
        </TheButton>
      </div>
    </div>

    <div class="grid grid-cols-6 mt-4 gap-2">
      <button
        v-for="item in ATTR_OPTIONS"
        :key="item"
        type="button"
        class="fc gap-2 rounded-lg p-1"
        :class="queryParams.attrs.includes(item)
          ? 'shadow-[0_0_3px_3px_#059669]'
          : 'ring-1 ring-neutral-6'"
        @click="checkAttr(item)"
      >
        <img :src="getOfficialUrl(`/sp/artifact/ui/icon/icn_type_${item}.png`)" alt="属性图标" class="size-25px">
      </button>
    </div>
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
