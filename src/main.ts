import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { mock, mockEnv } from './appConfig'
import enableMock from './mock'
import '@/styles/index.postcss' // 全局样式
import 'virtual:svg-icons-register'
import './permission'
import 'element-plus/theme-chalk/el-message.css' // message样式

mockEnv.includes(import.meta.env.MODE as envType) && mock === 'on' && enableMock()

createApp(App).use(createPinia()).use(router).mount('#app')
