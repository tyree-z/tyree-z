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

app.use(router)
app.use(createPinia())
app.use(InlineSvgPlugin)
app.use(
  createAuth0({
    domain: 'tyreeapi.us.auth0.com',
    clientId: 'ceKocopv5OI9XdsDt1Zqqvj4WOeqLNLL',
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://api.dev.tyree.ca/',
      scope: 'openid profile email offline_access schedules'
    }
  })
)

app.mount('#page')
