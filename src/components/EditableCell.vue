<script setup lang="ts">
const { value, placeholder = '点击设置' } = defineProps<{
  value?: number
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'save', point: string): void
}>()

const isEditing = ref(false)
const inputValue = ref(value !== undefined ? String(value) : '')
const inputRef = ref<InputInstance>()

async function startEdit() {
  isEditing.value = true
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

function handleInput(value: string) {
  inputValue.value = value.replace(/\D/g, '')
}

function saveEdit() {
  isEditing.value = false
  emit('save', inputValue.value)
}
</script>

<template>
  <div>
    <div
      v-if="!isEditing"
      class="cursor-pointer hover:text-neutral"
      @click="startEdit"
    >
      {{ value !== undefined ? Number(value).toLocaleString() : placeholder }}
    </div>
    <el-input
      v-else
      ref="inputRef"
      v-model="inputValue"
      type="text"
      placeholder="请输入数字"
      size="small"
      @input="handleInput"
      @blur="saveEdit"
      @keydown.enter="saveEdit"
    />
  </div>
</template>
