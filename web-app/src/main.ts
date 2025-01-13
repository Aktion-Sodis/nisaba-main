import './index.css';
import PrimeVue from 'primevue/config';
import primeVuePlugin from './plugins/primevue';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';  // PrimeVue theme


import { Amplify } from 'aws-amplify';
// @ts-ignore
import awsconfig from './aws-exports';

import router from './router';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';

import i18n from '@/i18n';

// Configure Amplify
Amplify.configure(awsconfig);

const app = createApp(App);
app.use(router);  

// Use Pinia and PrimeVue
app.use(createPinia());
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(primeVuePlugin);

app.use(i18n)

// Mount the app
app.mount('#app');