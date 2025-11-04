<script setup lang="ts">
const handle = useTemplateRef<HTMLElement>('handle')

type DamageType = 'total' | 'attack' | 'ability' | 'special' | 'other'

const damageTypeOptions = [
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'ability', label: '技能伤害' },
  { value: 'special', label: '奥义伤害' },
  { value: 'other', label: '其他' },
  { value: 'total', label: '总计' },
]

const damageType = ref<DamageType>('total')
const damageTypeDesc = computed(() => damageTypeOptions.find(item => item.value === damageType.value)?.label || '总计')

function handleCommand(command: DamageType) {
  damageType.value = command
}
</script>

<template>
  <UseDraggable
    v-slot="{ isDragging }"
    class="fixed w-300px"
    border="~ neutral-7 rounded"
    :initial-value="{ x: 30, y: 240 }"
    :prevent-default="true"
    :handle="handle"
  >
    <div
      class="flex items-center justify-between bg-neutral-7 px-2 py-1 text-12px"
      :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
    >
      <div ref="handle" flex-1>
        伤害: {{ damageTypeDesc }}
      </div>

      <el-dropdown placement="top" size="small" @command="handleCommand">
        <div i-carbon:settings icon-btn />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in damageTypeOptions"
              :key="item.value"
              :command="item.value"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </div>
  </UseDraggable>
</template>

<style scoped>

</style>
