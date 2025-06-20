<script setup lang="ts">
import type { ECharts, EChartsOption, SeriesOption } from 'echarts'
import dayjs from 'dayjs'
import { init } from 'echarts'
import { recoveryItemList } from '~/logic'

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
  <div id="recoveryChart" style="width: 600px; height:400px;" />
</template>
