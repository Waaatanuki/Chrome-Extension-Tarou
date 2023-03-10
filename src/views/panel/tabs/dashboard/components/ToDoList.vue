<template>
  <el-card class="m-3 w-52">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-xl">日常</span>
        <div>
          <el-button type="primary" link @click="addTask">增加</el-button>
          <el-button
            type="primary"
            link
            @click="delBtnVisible = !delBtnVisible"
            >{{ delBtnVisible ? '确认' : '编辑' }}</el-button
          >
        </div>
      </div>
    </template>
    <div class="flex flex-col">
      <el-checkbox
        v-for="(task, index) in dashboard.todoList"
        v-model="task.done"
        :label="task.content"
      >
        <template #default>
          <div class="flex justify-between items-center min-w-150">
            <div v-if="delBtnVisible">
              <el-input
                v-model="task.content"
                size="small"
                style="width: 120px; margin-right: 10px"
              />
              <el-button type="danger" link @click="delTask(index)"
                >删除</el-button
              >
            </div>
            <div v-else>{{ task.content }}</div>
          </div>
        </template>
      </el-checkbox>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch, nextTick, onMounted } from 'vue'
import useStore from '@/store'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

const { dashboard } = useStore()
const InputRef = ref()
const state = reactive({
  inputValue: '',
  inputVisible: false,
  delBtnVisible: false,
})

const { inputValue, inputVisible, delBtnVisible } = toRefs(state)

watch(
  () => dashboard.todoList,
  () => {
    dashboard.lastUpdateTodo = dayjs().tz().unix()
  }
)

function addTask() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
function delTask(index: number) {
  dashboard.todoList.splice(index, 1)
}

function handleInputConfirm() {
  if (inputValue.value) {
    dashboard.todoList.push({
      done: false,
      content: inputValue.value,
    })
  }
  inputVisible.value = false
  inputValue.value = ''
}

onMounted(() => {
  if (
    dayjs().tz().isAfter(dayjs().tz().hour(4).minute(0).second(0)) &&
    dayjs
      .unix(dashboard.lastUpdateTodo)
      .tz()
      .isBefore(dayjs().tz().hour(4).minute(0).second(0))
  ) {
    dashboard.lastUpdateTodo = dayjs().tz().unix()
    dashboard.todoList.forEach(task => (task.done = false))
  }
})
</script>

<style lang="scss" scoped></style>
