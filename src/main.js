import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import '@/router/permission.js'
import '@/style/index.scss'

import installPlugins from '@/assets/plugin/installPlugins.js'

const app = createApp(App)
installPlugins(app)
app.use(router).use(store).mount('#app')
