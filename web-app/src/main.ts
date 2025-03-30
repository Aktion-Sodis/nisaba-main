import './index.css';
import PrimeVue from 'primevue/config';
import primeVuePlugin from './plugins/primevue';
import '@/assets/css/tailwind.css';
import '@/assets/css/global.css';
import 'primeicons/primeicons.css'; 
import 'material-symbols';

import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import { fetchAuthSession } from '@aws-amplify/auth';

import router from './router';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';

import i18n from '@/i18n';

// Configure Amplify
Amplify.configure(config, {
  API: {
    GraphQL: {
      headers: async () => {
        try {
          const { tokens } = await fetchAuthSession();
          return { Authorization: tokens?.idToken?.toString() };
        } catch {
          return {};
        }
      }
    }
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(primeVuePlugin);

app.mount('#app');