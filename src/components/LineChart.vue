<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'

const { id, labels, series } = defineProps<{
  id: string
  labels: string[]
  series: any
}>()

let myChart: ECharts

const option = computed<EChartsOption>(() => ({
  legend: {
    show: false,
  },
  textStyle: {
    fontFamily: 'LXGW WenKai Screen',
  },
  tooltip: { trigger: 'axis' },
  grid: {
    left: 0,
    bottom: 25,
    right: 0,
    top: 10,
  },
  xAxis: {
    type: 'category',
    data: labels,

  },
  yAxis: {
    show: false,
  },
  series,
}))

onMounted(() => {
  const chartDom = document.getElementById(id)!
  myChart = init(chartDom)
  myChart.setOption(option.value)
})

watch([option], () => {
  myChart.setOption(option.value, { notMerge: true })
}, { deep: true })
</script>

<template>
  <div :id="id" style="width: 300px; height:200px;" />
</template>
