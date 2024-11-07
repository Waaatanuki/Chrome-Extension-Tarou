import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Main from './main.vue'
import '~/styles'

createApp(Main).use(createPinia()).mount('#app')
