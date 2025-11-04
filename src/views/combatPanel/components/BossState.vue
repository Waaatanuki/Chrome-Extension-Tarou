<script setup lang="ts">
import type { Buff } from 'source'
import { battleInfo, combatPanelSetting, specBossBuff } from '~/logic'

const { position } = defineProps<{ position: { x: number, y: number } }>()

const importantBossBuffs = ref<Buff[]>([])
const commonBossBuffs = ref<Buff[]>([])
const bossImgSrc = computed(() => getBossImg('enemy', battleInfo.value.bossInfo!.imgId, 's'))

watchEffect(() => {
  if (!battleInfo.value.buffInfo?.bossBuffs)
    return

  importantBossBuffs.value = []
  commonBossBuffs.value = []
  for (const buff of battleInfo.value.buffInfo?.bossBuffs) {
    if (specBossBuff.value.some(specBuff => buff.status.startsWith(specBuff)))
      importantBossBuffs.value.push(buff)
    else
      commonBossBuffs.value.push(buff)
  }
})

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}
</script>

<template>
  <UseDraggable
    v-if="battleInfo.bossInfo"
    v-slot="{ isDragging }"
    class="absolute"
    :initial-value="position"
    :prevent-default="true"
    @end="(position) => {
      combatPanelSetting.BossState.x = position.x
      combatPanelSetting.BossState.y = position.y
    }"
  >
    <div
      class="w-385px fc flex-col text-rose"
      :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
    >
      <div mb-10px fc gap-5 text-20px>
        {{ `TURN ${battleInfo.bossInfo.turn}` }}
        <div v-if="battleInfo.bossInfo.hp === 0">
          {{ formatTime(battleInfo.bossInfo.timer) }}
        </div>
        <ElCountdown v-else :value="battleInfo.bossInfo.countDownTime" />
      </div>
      <div class="w-full flex items-center justify-between">
        <div fc gap-4px>
          <el-tooltip :content="battleInfo.bossInfo.name" placement="right">
            <img w-45px :src="bossImgSrc">
          </el-tooltip>
          <ElCountdown
            v-if="typeof battleInfo.bossInfo.addition?.restTime === 'number'"
            value-style="color: #b91c1c" format="mm:ss" :value="battleInfo.bossInfo.addition.restTime"
          />
          <div v-if="battleInfo.bossInfo.addition.genesis">
            {{ battleInfo.bossInfo.addition.genesis }}
          </div>
        </div>
        <div>
          <div text-end text-18px>
            {{ battleInfo.bossInfo.hpPercent }}%
          </div>
          <div text-12px>
            {{ `${battleInfo.bossInfo.hp.toLocaleString()}/${battleInfo.bossInfo.hpmax.toLocaleString()}` }}
          </div>
        </div>
      </div>

      <div class="w-full">
        <el-progress :percentage="battleInfo.bossInfo.hpPercent" :stroke-width="10" status="exception" :show-text="false" />
      </div>

      <div v-if="battleInfo.buffInfo?.bossBuffs.length" mt-10px w-full flex flex-wrap>
        <img
          v-for="buff in importantBossBuffs"
          :key="buff.status"
          h-48px w-48px cursor-pointer
          :src="getBuffIcon(buff, battleInfo.bossInfo!.turn)"
          @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
        >
        <div v-for="i in Math.ceil(commonBossBuffs.length / 2)" :key="i" flex flex-col>
          <img
            v-if="commonBossBuffs[(i - 1) * 2]"
            h-24px w-24px cursor-pointer
            :src="getBuffIcon(commonBossBuffs[(i - 1) * 2], battleInfo.bossInfo!.turn)"
            @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2].status.split('_')[0])"
          >
          <img
            v-if="commonBossBuffs[(i - 1) * 2 + 1]"
            h-24px w-24px cursor-pointer
            :src="getBuffIcon(commonBossBuffs[(i - 1) * 2 + 1], battleInfo.bossInfo!.turn)"
            @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2 + 1].status.split('_')[0])"
          >
        </div>
      </div>
    </div>
  </UseDraggable>
</template>
