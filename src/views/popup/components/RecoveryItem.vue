<script setup lang="ts">
import type { ECharts, EChartsOption, SeriesOption } from 'echarts'
import dayjs from 'dayjs'
import { init } from 'echarts'
import { recoveryItemList } from '~/logic'

const inputRef = ref<HTMLTextAreaElement>()
const dialogVisible = ref(false)
const textarea = ref('')

function reset() {
  recoveryItemList.value = []
}

function handleCopy() {
  let str = ''

  for (let index = recoveryItemList.value.length - 1; index >= 0; index--) {
    const row = recoveryItemList.value[index]
    str += `${dayjs(row.timeStamp).format('YYYY-MM-DD')} ${row.fullElixir} ${
      (row.fullElixirDiff >= 0 ? '+' : '') + row.fullElixirDiff
    } ${row.halfElixir} ${
      (row.halfElixirDiff >= 0 ? '+' : '') + row.halfElixirDiff
    } ${row.soulBalm} ${
      (row.soulBalmDiff >= 0 ? '+' : '') + row.soulBalmDiff
    } ${row.soulBerry} ${
      (row.soulBerryDiff >= 0 ? '+' : '') + row.soulBerryDiff
    }`
    str += '\n'
  }
  textarea.value = str
  dialogVisible.value = true
}

function handleOpen() {
  inputRef.value?.select()
}

let myChart: ECharts

const firstTime = computed(() => recoveryItemList.value.at(-1)?.timeStamp)
const lastTime = computed(() => recoveryItemList.value.at(0)?.timeStamp)

const labels = computed(() => {
  const res = []
  const diffDays = dayjs(lastTime.value).diff(dayjs(firstTime.value), 'day')
  for (let i = 0; i <= diffDays; i++) {
    res.push(dayjs(firstTime.value).add(i, 'day').format('YYYY-MM-DD'))
  }
  return res
})

const series = computed(() => {
  const res: (SeriesOption & { data: (number | null)[] })[] = [{
    name: '大红',
    data: [],
    type: 'line',
    symbolSize: 3,
    smooth: 0.1,
    itemStyle: { color: 'rgb(185,28,28)' },
    connectNulls: true,
  }, {
    name: '小红',
    data: [],
    type: 'line',
    symbolSize: 3,
    smooth: 0.1,
    itemStyle: { color: 'rgb(248,113,113)' },
    connectNulls: true,
  }, {
    name: '粉盒',
    data: [],
    type: 'line',
    symbolSize: 3,
    smooth: 0.1,
    itemStyle: { color: 'rgb(126,34,206)' },
    connectNulls: true,
  }, {
    name: '豆子',
    data: [],
    type: 'line',
    symbolSize: 3,
    smooth: 0.1,
    itemStyle: { color: 'rgb(192,132,252)' },
    connectNulls: true,
  }]

  const diffDays = dayjs(lastTime.value).diff(dayjs(firstTime.value), 'day')
  for (let i = 0; i <= diffDays; i++) {
    const cur = dayjs(firstTime.value).add(i, 'day')
    const hitData = recoveryItemList.value.find(item => dayjs(item.timeStamp).isSame(cur, 'day'))
    res[0].data.push(hitData ? hitData.fullElixir : null)
    res[1].data.push(hitData ? hitData.halfElixir : null)
    res[2].data.push(hitData ? hitData.soulBalm : null)
    res[3].data.push(hitData ? hitData.soulBerry : null)
  }

  return res
})

const option = computed<EChartsOption>(() => ({
  legend: {
    data: ['大红', '小红', '粉盒', '豆子'],
    icon: 'roundRect',
    textStyle: {
      color: 'grey',
      fontWeight: 'bold',
    },
  },
  textStyle: {
    fontFamily: 'LXGW WenKai Screen',
  },
  tooltip: { trigger: 'axis' },

  xAxis: {
    type: 'category',
    data: labels.value,
  },
  yAxis: {
    splitLine: {
      show: false,
    },
  },
  series: series.value,
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100,
    },
    {
      start: 100,
      end: 100,
    },
  ],
}))

watch([option], () => {
  myChart.setOption(option.value, { notMerge: true })
}, { deep: true })

onMounted(() => {
  const chartDom = document.getElementById('recoveryChart')!
  myChart = init(chartDom)
  myChart.setOption(option.value)
})
</script>

<template>
  <div fc flex-col gap-3>
    <div id="recoveryChart" style="width: 800px; height:300px;" />
    <ElCard mt-10px width="750">
      <template #header>
        <div flex justify-between>
          <div text-lg>
            回复道具记录
          </div>
          <div>
            <ElButton type="danger" link @click="reset">
              重置
            </ElButton>
            <ElButton type="primary" link @click="handleCopy">
              复制
            </ElButton>
          </div>
        </div>
      </template>
      <ElTable :data="recoveryItemList" style="width: 800px" cell-class-name="cell-class-name" max-height="400">
        <ElTableColumn prop="timeStamp" label="日期" align="center" width="120">
          <template #default="{ row }">
            {{ dayjs(row.timeStamp).format("YYYY-MM-DD") }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="大红" align="center">
          <template #default="{ row }">
            <ElBadge
              :value="(row.fullElixirDiff >= 0 ? '+' : '') + row.fullElixirDiff"
              :type="row.fullElixirDiff >= 0 ? 'success' : 'danger'"
            >
              <div w-70px>
                {{ row.fullElixir }}
              </div>
            </ElBadge>
          </template>
        </ElTableColumn>
        <ElTableColumn label="半红" align="center">
          <template #default="{ row }">
            <ElBadge
              :value="(row.halfElixirDiff >= 0 ? '+' : '') + row.halfElixirDiff"
              :type="row.halfElixirDiff >= 0 ? 'success' : 'danger'"
            >
              <div w-70px>
                {{ row.halfElixir }}
              </div>
            </ElBadge>
          </template>
        </ElTableColumn>
        <ElTableColumn label="粉盒" align="center">
          <template #default="{ row }">
            <ElBadge
              :value="(row.soulBalmDiff >= 0 ? '+' : '') + row.soulBalmDiff"
              :type="row.soulBalmDiff >= 0 ? 'success' : 'danger'"
            >
              <div w-70px>
                {{ row.soulBalm }}
              </div>
            </ElBadge>
          </template>
        </ElTableColumn>
        <ElTableColumn label="豆子" align="center">
          <template #default="{ row }">
            <ElBadge
              :value="(row.soulBerryDiff >= 0 ? '+' : '') + row.soulBerryDiff"
              :type="row.soulBerryDiff >= 0 ? 'success' : 'danger'"
            >
              <div w-70px>
                {{ row.soulBerry }}
              </div>
            </ElBadge>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>

  <el-dialog v-model="dialogVisible" @opened="handleOpen">
    <el-input ref="inputRef" v-model="textarea" :rows="4" type="textarea" />
  </el-dialog>
</template>

<style>
.cell-class-name > .cell {
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
