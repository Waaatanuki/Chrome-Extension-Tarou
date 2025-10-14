<script setup lang="ts">
import type { GachaNpc } from 'extension'

const { resultList } = defineProps<{ resultList: GachaNpc[] }>()
const emits = defineEmits(['close'])

const playground = ref<HTMLDivElement>()

const num = ref(0)
const cssIndex = ref<number[]>([])

function getLocalStyleSheet() {
  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets[i]
    if (!sheet.href?.includes('lxgw-wenkai')) {
      return sheet
    }
  }
}

function start() {
  const styleSheets = getLocalStyleSheet()
  if (!styleSheets)
    return
  for (let i = 0; i < resultList.length; i++) {
    const angle = (i * 36 * Math.PI) / 180
    const cosAngle = Math.cos(angle)
    const sinAngle = Math.sin(angle)

    const top = 270 - cosAngle * 100
    const left = 180 + sinAngle * 100
    cssIndex.value.push(styleSheets.cssRules.length)
    styleSheets.insertRule(
      `@keyframes move${
        i
      }{`
      + '0% {top: 50%;left: 50%;}'
      + `90% {top: ${top}px;left: ${left}px;opacity: 1;}`
      + `100% {top: ${top}px;left: ${left}px;opacity: 0;}`
      + '}',
      styleSheets.cssRules.length,
    )
    cssIndex.value.push(styleSheets.cssRules.length)
    const speed = resultList.length > 10
      ? `animation: move${i} 0.5s ${0.1 * i}s;`
      : `animation: move${i} 2s ${0.5 * i}s;`
    styleSheets.insertRule(`.result${i}{${speed} animation-fill-mode: forwards;` + '}', styleSheets.cssRules.length)
  }
}

onMounted(() => {
  playground.value?.addEventListener('animationend', () => {
    num.value++
    if (num.value === resultList.length) {
      emits('close')
    }
  })
  start()
})
</script>

<template>
  <div ref="playground" fixed inset-0 z-99999 fc bg-black>
    <div relative h-full w-full overflow-hidden>
      <img :src="getLocalImg('gacha_bg')" absolute h-540px w-360px object-cover>
      <img
        v-for="result, index in resultList"
        :key="index"
        class="absolute left-1/2 top-1/2 h-80px transform-origin-b"
        :class="`result${index}`"
        :src="getLocalImg(`${result.type}-type`)"
        :style="`transform:translate(-50%, -150%) rotateZ(${36 * index}deg );opacity: 0;`"
      >
    </div>
  </div>
</template>
