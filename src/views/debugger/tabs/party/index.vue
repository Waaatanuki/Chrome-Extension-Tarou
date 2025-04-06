<script setup lang="ts">
import type { CardInstance, CheckboxValueType } from 'element-plus'
import { VueDraggableNext } from 'vue-draggable-next'
import BuildCompare from './components/BuildCompare.vue'
import Effect from './components/Effect.vue'
import Npc from './components/Npc.vue'
import Summon from './components/Summon.vue'
import Weapon from './components/Weapon.vue'

const partyStore = usePartyStore()
const { deckList } = storeToRefs(partyStore)
const simpleChecked = ref(false)
const weaponChecked = ref(true)
const summonChecked = ref(true)
const npcChecked = ref(true)
const effectChecked = ref(true)
const dialogVisiable = ref(false)
const cardEl = ref<CardInstance[]>()

function triggerSimpleModel(value: CheckboxValueType) {
  weaponChecked.value = !value
  summonChecked.value = !value
  npcChecked.value = !value
  effectChecked.value = !value
}

async function capture() {
  if (deckList.value.length === 0)
    return ElMessage.info('请先读取队伍信息')
  const el = cardEl.value![0].$el

  const options = {
    video: true,
    preferCurrentTab: true,
  }
  const stream = await navigator.mediaDevices.getDisplayMedia(options)
  const track = stream.getVideoTracks()[0]
  const capture = new ImageCapture(track)
  const frame = await capture.grabFrame()
  track.stop()
  const canvas = document.createElement('canvas')
  canvas.width = el.offsetWidth
  canvas.height = el.offsetHeight
  canvas.getContext('2d')?.drawImage(frame, el.offsetLeft - 1, el.offsetTop + 40, el.offsetWidth - 1, el.offsetHeight - 1, 0, 0, el.offsetWidth, el.offsetHeight)
  canvas.toBlob((blob) => {
    const imgUrl = URL.createObjectURL(blob!)
    const a = document.createElement('a')
    a.href = imgUrl
    a.download = '队伍截图'
    document.body.append(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(imgUrl)
  })
}
</script>

<template>
  <div mb-2 flex items-center justify-between px-5>
    <div fc>
      <ElCheckboxButton v-model="simpleChecked" @change="triggerSimpleModel">
        简略模式
      </ElCheckboxButton>

      <ElCheckboxButton v-model="weaponChecked" :disabled="simpleChecked">
        武器
      </ElCheckboxButton>

      <ElCheckboxButton v-model="summonChecked" :disabled="simpleChecked">
        召唤
      </ElCheckboxButton>

      <ElCheckboxButton v-model="npcChecked" :disabled="simpleChecked">
        队伍
      </ElCheckboxButton>

      <ElCheckboxButton v-model="effectChecked" :disabled="simpleChecked">
        效果量
      </ElCheckboxButton>

      <TheButton ml-30px @click="dialogVisiable = true">
        队伍比较
      </TheButton>

      <el-tooltip content="实验性功能，截图最新的队伍信息" placement="right">
        <TheButton icon="material-symbols:android-camera-outline" @click="capture">
          队伍截图
        </TheButton>
      </el-tooltip>
    </div>
    <TheButton @click="deckList = []">
      清空队伍
    </TheButton>
  </div>
  <div fc flex-col gap-2 :class="{ simpleMode: simpleChecked }">
    <div v-if="deckList.length === 0" m-auto w-100>
      <el-alert type="info" effect="dark" show-icon center :closable="false" title="进入编成界面读取队伍信息" />
    </div>
    <VueDraggableNext v-model="deckList" flex flex-wrap gap-10px>
      <transition-group name="list">
        <ElCard v-for="deck, idx in deckList" ref="cardEl" :key="idx" :body-style="{ padding: '10px' }" max-w-1300px cursor-pointer select-none>
          <div relative fc flex-col gap-2>
            <div fc flex-wrap gap-2>
              <Weapon v-show="weaponChecked || simpleChecked" :weapons="deck.weapons" :simple-checked="simpleChecked" :damage-info="deck.damageInfo" />
              <Summon v-show="summonChecked" :summon="deck.summon" />
              <Npc v-show="npcChecked" :npcs="deck.npcs" :leader-ability-list="deck.leaderAbilityList" :leader="deck.leader" :set-action="deck.setAction" :damage-info="deck.damageInfo" />
            </div>
            <div fc>
              <Effect v-show="effectChecked" :effect-value-info="deck.damageInfo.effect_value_info" />
            </div>
            <div i-carbon:close-outline absolute bottom--8px right--8px text-sm icon-btn @click="deckList.splice(idx, 1)" />
          </div>
        </ElCard>
      </transition-group>
    </VueDraggableNext>
  </div>

  <ElDialog v-model="dialogVisiable" width="1300">
    <BuildCompare :last-deck="deckList[0]" />
  </ElDialog>
</template>

<style scoped>
.simpleMode{
  flex-wrap: wrap;
  flex-direction: row !important
}
</style>
