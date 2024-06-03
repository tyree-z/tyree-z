import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { InlineSvgPlugin } from 'vue-inline-svg';

import App from './App.vue';
import router from './router';

import './styles/app.css';
import './styles/main.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(InlineSvgPlugin);

app.mount('#application');
