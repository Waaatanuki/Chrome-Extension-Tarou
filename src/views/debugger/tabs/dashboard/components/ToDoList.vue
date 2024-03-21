<script setup lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { lastUpdateTodo, todoList } from '~/logic'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

const InputRef = ref()
const state = reactive({
  inputValue: '',
  inputVisible: false,
  delBtnVisible: false,
})

const { inputValue, inputVisible, delBtnVisible } = toRefs(state)

watch(
  () => todoList,
  () => {
    lastUpdateTodo.value = dayjs().unix()
  },
)

function addTask() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
function delTask(index: number) {
  todoList.value.splice(index, 1)
}

function handleInputConfirm() {
  if (inputValue.value)
    todoList.value.push({ done: false, content: inputValue.value })
  inputVisible.value = false
  inputValue.value = ''
}

onMounted(() => {
  if (dayjs().tz().isAfter(dayjs().tz().hour(4).minute(0).second(0))
    && dayjs.unix(lastUpdateTodo.value).tz().isBefore(dayjs().tz().hour(4).minute(0).second(0))
  ) {
    lastUpdateTodo.value = dayjs().unix()
    todoList.value.forEach(task => (task.done = false))
  }
})
</script>

<template>
  <ElCard m-3 min-w-200px>
    <template #header>
      <div flex items-center justify-between>
        <span text-xl>日常</span>
        <div>
          <ElButton type="primary" link @click="addTask">
            增加
          </ElButton>
          <ElButton
            type="primary" link
            @click="delBtnVisible = !delBtnVisible"
          >
            {{ delBtnVisible ? "确认" : "编辑" }}
          </ElButton>
        </div>
      </div>
    </template>
    <div flex flex-col>
      <ElCheckbox
        v-for="task, idx in todoList" :key="idx"
        v-model="task.done" :label="task.content"
      >
        <template #default>
          <div flex items-center justify-between>
            <div v-if="delBtnVisible">
              <ElInput v-model="task.content" size="small" mr-10px />
              <ElButton type="danger" link @click="delTask(idx)">
                删除
              </ElButton>
            </div>
            <div v-else>
              {{ task.content }}
            </div>
          </div>
        </template>
      </ElCheckbox>
      <ElInput
        v-if="inputVisible"
        ref="InputRef" v-model="inputValue" size="small"
        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"
      />
    </div>
  </ElCard>
</template>
