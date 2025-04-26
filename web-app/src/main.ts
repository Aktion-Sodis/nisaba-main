import { fetchAuthSession } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import 'primeicons/primeicons.css';
import 'material-symbols';

import config from './amplifyconfiguration.json';
import primeVuePlugin from './plugins/primevue';
import router from './router';

import App from '@/App.vue';
import i18n from '@/i18n';

import './index.css';
import '@/assets/css/tailwind.css';
import '@/assets/css/global.css';

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
      },
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(primeVuePlugin);

app.mount('#app');
