<script setup lang="ts">
import type { EventInfo, TeamraidAdditional } from 'myStorage'
import { eventList } from '~/logic'

type TeamraidInfo = EventInfo & { additional: TeamraidAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'teamraid') as TeamraidInfo)
const eventLog = computed(() => eventInfo.value.additional.log)
const pointLog = computed(() => eventLog.value.point)
const labels = computed(() => pointLog.value.map(d => useDateFormat(d[0], 'HH:mm').value))
const { height } = useWindowSize()

const series = computed(() =>
  pointLog.value.reduce<any[]>((pre, cur) => {
    pre[0].data.push(cur[1])
    pre[1].data.push(cur[2])
    return pre
  }, [{
    data: [],
    type: 'line',
    symbolSize: 3,
    smooth: 0.1,
    itemStyle: { color: '#409EFF' },
  }, {
    data: [],
    type: 'line',
    symbolSize: 3,
    smooth: 0.1,
    itemStyle: { color: '#F56C6C' },
  }]),
)

const tableData = computed(() => {
  if (pointLog.value.length === 0)
    return []

  const result = []
  result.unshift({
    time: useDateFormat(pointLog.value[0][0], 'HH:mm').value,
    s1: Number.NaN,
    s2: Number.NaN,
  })

  for (let i = 1; i < pointLog.value.length; i++) {
    const currentData = pointLog.value[i]

    let s1 = Number.NaN
    let s2 = Number.NaN

    for (let j = i - 1; j >= 0; j--) {
      const preData = pointLog.value[j]
      const minDiff = (currentData[0] - preData[0]) / 1000 / 60
      if (minDiff >= 5) {
        s1 = ((currentData[1] - preData[1]) / 100000000 / minDiff * 60)
        s2 = ((currentData[2] - preData[2]) / 100000000 / minDiff * 60)
        break
      }
    }

    result.unshift({ time: useDateFormat(currentData[0], 'HH:mm').value, s1, s2 })
  }

  return result
})

const msg = computed<{ title: string, type: 'error' | 'success' | 'warning' } | undefined>(() => {
  if (pointLog.value.length === 0)
    return undefined

  const lastPoint = pointLog.value.at(-1)!
  const lastSpeed = tableData.value[0]

  const s1 = Number.isNaN(lastSpeed.s1) ? 0 : Number(lastSpeed.s1)
  const s2 = Number.isNaN(lastSpeed.s2) ? 0 : Number(lastSpeed.s2)
  const diffPoint = (lastPoint[1] - lastPoint[2]) / 100000000
  const showPoint = Math.abs(diffPoint).toFixed(2)

  if (diffPoint > 0 && s1 >= s2)
    return { type: 'success', title: `领先${showPoint}亿, 稳住!!!` }

  if (diffPoint < 0 && s1 <= s2)
    return { type: 'error', title: `落后${showPoint}亿, 加油!!!` }

  if (diffPoint > 0 && s1 < s2) {
    const time = (diffPoint / (s2 - s1)).toFixed(2)
    return { type: 'error', title: `领先${showPoint}亿, ${time}小时后被反超` }
  }
  if (diffPoint < 0 && s1 > s2) {
    const time = (-diffPoint / (s1 - s2)).toFixed(2)
    return { type: 'success', title: `落后${showPoint}亿, ${time}小时后反超` }
  }
  if (diffPoint === 0)
    return { type: 'warning', title: '持平!!!' }

  return undefined
})
</script>

<template>
  <div v-if="eventLog?.key">
    <div v-if="msg" my-10px>
      <el-alert :title="msg.title" :type="msg.type" :closable="false" center />
    </div>
    <div relative h-32px fc>
      <div>{{ eventLog.guild1 }}</div>
      <span i-game-icons:sword-clash mx-5 text-xl />
      <div>{{ eventLog.guild2 }}</div>
    </div>
    <LineChart id="lineChart" :labels="labels" :series="series" />
    <el-table :data="tableData" :border="true" mt-10px w-300px :max-height="height - 400">
      <el-table-column prop="time" label="" align="center" width="65" />
      <el-table-column prop="s1" label="我速" align="center" :formatter="(row, col, value) => Number.isNaN(value) ? '-' : value.toFixed(1) " />
      <el-table-column prop="s2" label="敌速" align="center" :formatter="(row, col, value) => Number.isNaN(value) ? '-' : value.toFixed(1) " />
    </el-table>
  </div>
  <el-result v-else icon="info" sub-title="还未获取数据" />
</template>
