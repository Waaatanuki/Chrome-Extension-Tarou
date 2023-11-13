<script setup lang="ts">
import type { QuestMemo } from 'myStorage'
import { questMemo } from '~/logic'

const props = defineProps<{ questId: string; questName: string }>()

const dialogVisiable = ref(false)
const textarea = ref('')
const currentQuest = ref<QuestMemo>()

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
  <ElTooltip effect="light" placement="bottom-start">
    <div i-carbon:information text-lg />
    <template #content>
      <div text-base>
        <div v-if="currentQuest">
          <ElScrollbar :max-height="500">
            <div relative max-w-422px min-w-150px whitespace-pre-wrap text-start>
              {{ currentQuest.memo }}
              <div i-carbon:edit absolute right-1 top-1 text-lg icon-btn @click="handleEdit" />
            </div>
          </ElScrollbar>
        </div>
        <div v-else h-200px w-200px fc flex-col gap-10px>
          <div>当前副本没有笔记</div>
          <div btn @click="dialogVisiable = true">
            创建
          </div>
        </div>
      </div>
    </template>
  </ElTooltip>

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
