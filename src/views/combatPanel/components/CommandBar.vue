<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { defaultCombatPanelSetting } from '~/constants'
import { combatPanelSetting } from '~/logic'

const { position } = defineProps<{
  position: { x: number, y: number }
}>()

const el = useTemplateRef<HTMLElement>('el')
const { style, isDragging } = useDraggable(el, {
  initialValue: { x: position.x, y: position.y },
  preventDefault: true,
  onEnd(position) {
    combatPanelSetting.value.CommandBar.x = position.x
    combatPanelSetting.value.CommandBar.y = position.y
  },
})

const upViewList = computed(() => [
  { key: 'reset', lable: '重置位置', icon: 'carbon:reset', handle: handleResetPosition },
  { key: 'haha', lable: '哈哈哈', icon: 'carbon:gift', handle: handleResetPosition },
])

const { width, height } = useWindowSize({ type: 'outer' })

watchEffect(() => {
  combatPanelSetting.value.Container.width = width.value
  combatPanelSetting.value.Container.height = height.value
})

function handleResetPosition() {
  chrome.windows.getCurrent((w) => {
    if (!w.id)
      return

    combatPanelSetting.value = JSON.parse(JSON.stringify(defaultCombatPanelSetting))
    chrome.windows.update(w.id, {
      width: defaultCombatPanelSetting.Container.width,
      height: defaultCombatPanelSetting.Container.height,
    }).then(() => {
      window.location.reload()
    })
  })
}
</script>

<template>
  <div
    ref="el" class="fc gap-10px rounded-md bg-#3C3C3C p-5px"
    :style="style" style="position: absolute" :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
  >
    <el-tooltip v-for="view in upViewList" :key="view.key" effect="dark" :show-after="1000" :content="view.lable" placement="bottom">
      <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 @click="view.handle">
        <Icon :icon="view.icon" text-20px />
      </div>
    </el-tooltip>
  </div>
</template>
