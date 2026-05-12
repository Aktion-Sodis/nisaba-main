import { fetchAuthSession } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
// Import material-symbols CSS - must be imported before other CSS to ensure it's included in build
// Using outlined.css instead of index.css to reduce bundle size (only outlined icons are used)
import 'material-symbols/outlined.css';
// Import primeicons CSS - must be imported before other CSS to ensure it's included in build
import 'primeicons/primeicons.css';

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
