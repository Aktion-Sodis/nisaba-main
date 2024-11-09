import './assets/tailwind.css';
import 'primevue/resources/themes/saga-blue/theme.css';  // Or another theme
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import { createPinia } from 'pinia';

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(createPinia());
app.use(PrimeVue);
app.mount('#app');