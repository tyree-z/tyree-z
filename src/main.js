import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { InlineSvgPlugin } from 'vue-inline-svg'

import App from './App.vue'
import router from './router'

import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(InlineSvgPlugin)
app.use(router)

app.mount('#page')
