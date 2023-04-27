import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue'
import { createPinia } from 'pinia'
import { InlineSvgPlugin } from 'vue-inline-svg'

import App from './App.vue'
import router from './router'

import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.esm.min.js'

import './assets/main.css'

const app = createApp(App)

app.use(
  createAuth0({
    domain: 'tyreez.us.auth0.com',
    clientId: 'OTgjFuVKB86lggt4ZbmTOV5E7gLxitHE',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
)
app.use(createPinia())
app.use(InlineSvgPlugin)
app.use(router)

app.mount('#page')
