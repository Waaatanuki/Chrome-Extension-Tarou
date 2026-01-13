<script setup lang="ts">
import { snapdom } from '@zumer/snapdom'
import { deckList } from '~/logic'
import Effect from './components/Effect.vue'
import Npc from './components/Npc.vue'
import Summon from './components/Summon.vue'
import Weapon from './components/Weapon.vue'

const deck = computed(() => deckList.value[0])

const commands = [
  { label: '复制配置', icon: 'material-symbols:content-copy', handler: copyParty },
  { label: '下载配置', icon: 'streamline-flex:screenshot', handler: downloadParty },
  { label: '配置对比', icon: 'material-symbols:compare', handler: () => openPopupWindow('BuildCompare') },
]

async function copyParty() {
  try {
    const element = document.querySelector(`.party-container`)!
    const result = await snapdom(element)
    const clipboardItem = new ClipboardItem({ 'image/png': await result.toBlob({ scale: 1.5, type: 'png', backgroundColor: '#131313' }) })
    await navigator.clipboard.write([clipboardItem])
    ElMessage.success({ offset: 100, message: '已复制到剪贴板' })
  }
  catch (error) {
    createNotification({ message: String(error) })
  }
}

async function downloadParty() {
  try {
    const element = document.querySelector(`.party-container`)!
    const result = await snapdom(element)
    await result.download({ scale: 1.5, type: 'png', filename: `配置截图${Date.now()}`, backgroundColor: '#131313' })
    ElMessage.success({ offset: 100, message: '保存成功' })
  }
  catch (error) {
    createNotification({ message: String(error) })
  }
}
</script>

<template>
  <CommandBar :commands="commands" />
  <div v-if="deck" flex flex-col gap-10px class="party-container">
    <Npc :leader="deck.leader" :npcs="deck.npcs" :priority="deck.priority" />
    <Weapon :weapons="deck.weapons" />
    <Summon :summons="deck.summons" />
  </div>
  <Effect v-if="deck" mt-10px :effects="deck.effects" :enhance="deck.enhance" />
  <el-result v-else icon="info" sub-title="进入编成界面读取队伍信息" />
</template>
