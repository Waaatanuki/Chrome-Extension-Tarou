import { createApp } from 'vue'
import Main from './main.vue'
import { createPinia } from 'pinia'
import '@/styles'

createApp(Main).use(createPinia()).mount('#app')
