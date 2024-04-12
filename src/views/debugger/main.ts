import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Main from './main.vue'
import '~/styles'

createApp(Main).use(createPinia()).mount('#app')
