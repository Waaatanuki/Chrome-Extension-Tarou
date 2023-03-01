import { defineStore } from 'pinia'
import { useChromeStorage } from '@/composables/useChromeStorage'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
    stone: useChromeStorage('stone', 0),
    legendticket10: useChromeStorage('legendticket10', 0),
    legendticket: useChromeStorage('legendticket', 0),
    saveStoneDate: useChromeStorage('saveStoneDate', dayjs().unix()),
    todoList: useChromeStorage('todoList', [
      { done: false, content: '巡岛' },
      { done: false, content: '大巴' },
      { done: false, content: '超巴' },
      { done: false, content: '活动日常' },
      { done: false, content: '沙盒' },
      { done: false, content: '抽卢比' },
    ]),
    lastUpdateTodo: useChromeStorage('lastUpdateTodo', dayjs().tz().unix()),
  }),
  getters: {
    totalStone: state =>
      Number(state.legendticket10) * 3000 +
      Number(state.legendticket) * 300 +
      Number(state.stone),
  },
  actions: {},
})

export default useDashboardStore
