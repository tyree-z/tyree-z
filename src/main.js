import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { InlineSvgPlugin } from 'vue-inline-svg';
import VueApexCharts from 'vue3-apexcharts';

import App from './App.vue';
import router from './router';

import './styles/app.css';
import './styles/main.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(InlineSvgPlugin);

// Register ApexCharts component
app.component('ApexChart', VueApexCharts);

app.mount('#application');
