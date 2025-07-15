<script setup lang="ts">
import copy from 'copy-text-to-clipboard'
import { battleInfo, battleRecord } from '~/logic'

const currentRaid = computed(() => battleRecord.value.find(record => String(record.raid_id) === battleInfo.value.bossInfo?.battleId))
const bossImgSrc = computed(() => getBossImg('enemy', battleInfo.value.bossInfo!.imgId, 's'))
const operationSecond = computed(() => currentRaid.value ? currentRaid.value.startTimer - currentRaid.value.endTimer : 0)

function handleCopy(text: string) {
  if (copy(text))
    ElMessage.success(`已复制救援码${text}`)
}
</script>

<template>
  <div v-if="battleInfo.bossInfo" relative w-300px text-15px>
    <ElProgress type="circle" :percentage="battleInfo.bossInfo.hpPercent" :stroke-width="15" status="exception" :width="300">
      <template #default="{ percentage }">
        <div flex flex-col gap-2>
          <div fc gap-5 text-20px>
            {{ `TURN ${battleInfo.bossInfo.turn}` }}
            <div v-if="battleInfo.bossInfo.hp === 0">
              {{ formatTime(battleInfo.bossInfo.timer) }}
            </div>
            <ElCountdown v-else :value="battleInfo.bossInfo.countDownTime" />
          </div>
          <div fc>
            <img w-55px :src="bossImgSrc">
            <span text-30px>{{ percentage }}%</span>
          </div>
          <div text-15px>
            {{ battleInfo.bossInfo.name }}
          </div>
          <div text-15px>
            {{ `${battleInfo.bossInfo.hp.toLocaleString()}/${battleInfo.bossInfo.hpmax.toLocaleString()}` }}
          </div>
        </div>
      </template>
    </ElProgress>
    <ElCountdown
      v-if="typeof battleInfo.bossInfo.addition?.restTime === 'number'"
      value-style="color: #b91c1c" format="mm:ss" :value="battleInfo.bossInfo.addition.restTime"
      absolute class="left-1/2 top-1/2 translate-y--100px -translate-x-1/2"
    />
    <el-tag v-if="battleInfo.bossInfo.interrupt_display_text" absolute class="left-1/2 top-1/2 translate-y-72px -translate-x-1/2">
      {{ battleInfo.bossInfo.interrupt_display_text }}
    </el-tag>
    <el-tooltip content="操作时长">
      <div absolute left-0 top-0 select-none>
        {{ formatTime(operationSecond) }}
      </div>
    </el-tooltip>
    <el-tooltip v-if="currentRaid?.point" content="贡献" placement="top">
      <div absolute bottom-0 left-0 select-none>
        {{ Math.floor(currentRaid.point).toLocaleString() }}
      </div>
    </el-tooltip>
    <el-tooltip v-if="battleInfo.bossInfo.shareId" content="救援码">
      <div absolute right-0 top-0 cursor-pointer hover:text-amber @click="handleCopy(battleInfo.bossInfo.shareId)">
        {{ battleInfo.bossInfo.shareId }}
      </div>
    </el-tooltip>
    <el-tooltip v-if="battleInfo.bossInfo.limitNum !== 1" content="人数" placement="top">
      <div absolute bottom-0 right-0>
        {{ `${battleInfo.bossInfo.fellow}/${battleInfo.bossInfo.limitNum}` }}
      </div>
    </el-tooltip>
  </div>
</template>
