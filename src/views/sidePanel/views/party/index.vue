<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { snapdom } from '@zumer/snapdom'
import { deckList } from '~/logic'
import Effect from './components/Effect.vue'
import Npc from './components/Npc.vue'
import Summon from './components/Summon.vue'
import Weapon from './components/Weapon.vue'

const isScreenshotting = ref(false)
const deck = computed(() => deckList.value[0])

const commands = [
  { lable: '复制配置', icon: 'material-symbols:content-copy', handler: copyParty },
  { lable: '下载配置', icon: 'streamline-flex:screenshot', handler: downloadParty },
  { lable: '配置对比', icon: 'material-symbols:compare', handler: () => openPopupWindow('BuildCompare') },
]

async function copyParty() {
  try {
    isScreenshotting.value = true
    const element = document.querySelector(`.party-container`)!
    const result = await snapdom(element)
    const clipboardItem = new ClipboardItem({ 'image/png': await result.toBlob({ type: 'png' }) })
    await navigator.clipboard.write([clipboardItem])
    ElMessage.success('已复制到剪贴板')
  }
  catch (error) {
    createNotification({ message: String(error) })
  }
  finally {
    isScreenshotting.value = false
  }
}

async function downloadParty() {
  try {
    isScreenshotting.value = true
    const element = document.querySelector(`.party-container`)!
    const result = await snapdom(element)
    await result.download({ format: 'png', filename: `配置截图${Date.now()}` })
  }
  catch (error) {
    createNotification({ message: String(error) })
  }
  finally {
    isScreenshotting.value = false
  }
}
</script>

<template>
  <div v-if="deck" flex flex-col gap-10px class="party-container">
    <Npc :leader="deck.leader" :npcs="deck.npcs" />
    <Weapon :weapons="deck.weapons" />
    <Summon :summons="deck.summons" />
    <Effect v-if="!isScreenshotting" :effects="deck.effects" />
  </div>
  <el-result v-else icon="info" sub-title="进入编成界面读取队伍信息" />
  <div
    fixed left-0 top-50px h-30px w-30px flex items-center
    overflow-hidden rounded-r-3xl bg-teal-7 transition-all duration-300 hover:w-90px
  >
    <el-tooltip v-for="command in commands" :key="command.lable" effect="dark" :content="command.lable" :show-after="500" placement="top">
      <div mx-5px h-20px w-20px fc shrink-0 cursor-pointer rounded-full hover:bg-teal-9 @click="command.handler">
        <Icon :icon="command.icon" text-12px />
      </div>
    </el-tooltip>
  </div>
</template>
