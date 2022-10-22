
import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import i18n from './i18n'
import VueApexCharts from "vue3-apexcharts";

import '@fortawesome/fontawesome-free/js/all';
import 'element-plus/dist/index.css';

// import 'bootstrap/dist/css/bootstrap.css'

// import AmplifyVue from '@aws-amplify/ui-vue';
// import '@aws-amplify/ui-vue'

// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

const app = createApp(App);

// app.use(AmplifyVue);

app.use(router);
app.use(store);

app.use(i18n)
app.use(VueApexCharts)

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app');
