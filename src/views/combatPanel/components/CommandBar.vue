<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { defaultCombatPanelSetting } from '~/constants'
import { combatPanelSetting } from '~/logic'

const { position } = defineProps<{ position: { x: number, y: number } }>()

const panelList = [
  { key: 'RoomInfo', label: '综合信息' },
  { key: 'BossState', label: '怪物信息' },
  { key: 'NpcCondition', label: '角色状态' },
  { key: 'InterruptText', label: '试炼条件' },
  { key: 'ActionList', label: '操作记录' },
  { key: 'MemberList', label: '玩家列表' },
  { key: 'DamageRecord', label: '伤害统计' },
  { key: 'DamageTaken', label: '承受统计' },
  { key: 'NpcCount', label: '其他统计' },
] as const

const switchDialogVisible = ref(false)

const commandList = [
  { key: 'switch', lable: '开关面板', icon: 'carbon:switcher', handle: handleSwitchPanel },
  { key: 'reset', lable: '重置位置', icon: 'carbon:reset', handle: handleResetPosition },
]

const { width, height } = useWindowSize({ type: 'outer' })

watchEffect(() => {
  combatPanelSetting.value.Container.width = width.value
  combatPanelSetting.value.Container.height = height.value
})

function handleSwitchPanel() {
  switchDialogVisible.value = true
}

function handleResetPosition() {
  chrome.windows.getCurrent((w) => {
    if (!w.id)
      return

    combatPanelSetting.value = deepClone(defaultCombatPanelSetting)
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
  <UseDraggable
    v-slot="{ x, y, isDragging }"
    class="absolute"
    :initial-value="position"
    :prevent-default="true"
    @end="(position) => {
      combatPanelSetting.CommandBar.x = position.x
      combatPanelSetting.CommandBar.y = position.y
    }"
  >
    <div :class="{ hidden: !isDragging }" class="absolute left-0 top--30px w-150px">
      {{ `X: ${parseInt(x)}, Y: ${parseInt(y)}` }}
    </div>
    <div
      class="fc gap-10px rounded-md bg-#3C3C3C p-5px"
      :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
    >
      <el-tooltip v-for="view in commandList" :key="view.key" effect="dark" :show-after="1000" :content="view.lable" placement="bottom">
        <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 @click="view.handle">
          <Icon :icon="view.icon" text-20px />
        </div>
      </el-tooltip>
    </div>
  </UseDraggable>

  <el-dialog v-model="switchDialogVisible" title="开关面板" :center="true" width="200">
    <div class="flex flex-col gap-4px">
      <el-checkbox v-for="panel in panelList" :key="panel.key" v-model="combatPanelSetting[panel.key].visible" :label="panel.label" />
    </div>
  </el-dialog>
</template>
