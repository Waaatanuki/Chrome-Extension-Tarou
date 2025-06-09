<script setup lang="ts">
import { battleInfo, battleRecord, specBossBuff } from '~/logic'

type DamageType = 'total' | 'attack' | 'ability' | 'special' | 'other'
const currentRaid = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
const remainderSecond = ref<number>(0)
const timerValue = computed(() => Date.now() + battleInfo.value.bossInfo!.timer * 1000)
const bossImgSrc = computed(() => getBossImg('enemy', battleInfo.value.bossInfo!.imgId, 's'))

function handleTimeChange(millisecond: number) {
  remainderSecond.value = Math.round(millisecond / 1000)
}

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}

const damageTypeOptions = ref<{ value: DamageType, label: string }[]>([
  { value: 'total', label: '总计' },
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'ability', label: '技能伤害' },
  { value: 'special', label: '奥义伤害' },
  { value: 'other', label: '其他' },
])

const totalDamage = computed(() =>
  damageTypeOptions.value.reduce<{ value: string, label: string, total: number }[]>((p, c) => {
    p.push({
      value: c.value,
      label: c.label,
      total: currentRaid.value?.player.reduce((pre, cur) => {
        pre += cur.damage[c.value].value
        return pre
      }, 0) || 0,
    })

    return p
  }, []),
)
</script>

<template>
  <div v-if="battleInfo.bossInfo" relative w-300px>
    <el-descriptions direction="vertical" :border="true" :column="2" size="small">
      <el-descriptions-item :rowspan="2" :width="70" :label="`TURN ${battleInfo.bossInfo.turn}`" align="center">
        <div fc flex-col>
          <img :src="bossImgSrc">
          <div>{{ `${battleInfo.bossInfo.hpPercent}%` }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item align="center">
        <template #label>
          <div v-if="battleInfo.bossInfo.hp === 0" text-rose>
            {{ formatTime(remainderSecond) }}
          </div>
          <ElCountdown v-else :value="timerValue" value-style="font-size: 15px" @change="handleTimeChange" />
        </template>
        {{ battleInfo.bossInfo.name }}
      </el-descriptions-item>

      <el-descriptions-item align="center">
        <template #label>
          {{ `${battleInfo.bossInfo.hp.toLocaleString()}/${battleInfo.bossInfo.hpmax.toLocaleString()}` }}
        </template>
        <div v-if="currentRaid" flex justify-between :style="{ 'justify-content': currentRaid.point ? 'space-between' : 'center' }">
          <el-tag v-if="currentRaid.point" type="success" effect="light">
            {{ Math.floor(currentRaid.point).toLocaleString() }}
          </el-tag>
          <el-tag type="danger">
            {{ totalDamage[0].total.toLocaleString() }}
          </el-tag>
        </div>
      </el-descriptions-item>
      <el-descriptions-item :span="2" align="center">
        <template #label>
          <el-tag v-if="battleInfo.bossInfo.interrupt_display_text">
            {{ battleInfo.bossInfo.interrupt_display_text }}
          </el-tag>
        </template>

        <div flex flex-wrap>
          <img
            v-for="buff, idx in battleInfo.buffInfo?.bossBuffs" :key="idx"
            h-45px w-45px cursor-pointer
            :src="getBuffIcon(buff, battleInfo.bossInfo!.turn)"
            @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
          >
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
