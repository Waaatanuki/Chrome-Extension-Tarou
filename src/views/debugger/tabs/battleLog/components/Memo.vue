<script setup lang="ts">
import type { QuestMemo } from 'myStorage'
import { questMemo } from '~/logic'

const props = defineProps<{ questId: string; questName: string }>()

const dialogVisiable = ref(false)
const textarea = ref('')
const currentQuest = ref<QuestMemo>()
const trigger = ref<'hover' | 'click'>('hover')

function toggleTrigger(type: 'hover' | 'click') {
  trigger.value = type
}

watch(() => props.questId, (id) => {
  currentQuest.value = questMemo.value.find(m => m.questId === id)
}, { immediate: true })

function handleEdit() {
  textarea.value = currentQuest.value!.memo
  dialogVisiable.value = true
}

function submit() {
  if (currentQuest.value) {
    currentQuest.value.memo = textarea.value
  }
  else {
    questMemo.value.push({
      questId: props.questId,
      questName: props.questName,
      memo: textarea.value,
    })
    currentQuest.value = questMemo.value.find(m => m.questId === props.questId)
  }
  dialogVisiable.value = false
}
</script>

<template>
  <ElPopover placement="bottom-start" :width="currentQuest ? 422 : 200" :trigger="trigger" @after-leave="toggleTrigger('hover')">
    <template #reference>
      <div i-carbon:information text-lg />
    </template>

    <div text-base>
      <div v-if="currentQuest">
        <ElScrollbar :max-height="500">
          <div relative whitespace-pre-wrap text-start>
            {{ currentQuest.memo }}
            <div v-if="trigger === 'hover'" i-carbon:pin absolute right-10 top-1 text-lg icon-btn @click="toggleTrigger('click')" />
            <div v-else i-carbon:pin-filled absolute right-10 top-1 text-lg icon-btn @click="toggleTrigger('hover')" />
            <div i-carbon:edit absolute right-1 top-1 text-lg icon-btn @click="handleEdit" />
          </div>
        </ElScrollbar>
      </div>
      <div v-else h-200px fc flex-col gap-10px>
        <div>当前副本没有笔记</div>
        <div btn @click="dialogVisiable = true">
          创建
        </div>
      </div>
    </div>
  </ElPopover>

  <ElDialog v-model="dialogVisiable" width="440">
    <div w-400px>
      <ElInput v-model="textarea" type="textarea" :autosize="{ minRows: 10 }" resize="none" maxlength="1000" show-word-limit />
    </div>
    <template #footer>
      <div btn @click="submit">
        确认
      </div>
    </template>
  </ElDialog>
</template>
