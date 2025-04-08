/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
// import pinia from '../store'

// Router
import router from '../router'

// i18n
import i18n from '../i18n'

// Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Amplify
import { Amplify, Auth } from 'aws-amplify'
import awsExports from '../aws-exports'
import AmplifyVue from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue'

// ApexCharts
import VueApexCharts from "vue3-apexcharts";

// Leaflet
import { Map, TileLayer, Marker, Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'



// Amplify
awsExports.graphql_headers = async () => {
  try {
    const token = (await Auth.currentSession()).idToken.jwtToken;
    return { Authorization: token }
  }
  catch (e) {
      console.error(e);
      return {};
  }
}

Amplify.configure(awsExports)


// Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(i18n)
    .use(AmplifyVue)
    .use(VueApexCharts)

    app.component('LMap', Map)
    app.component('LTileLayer', TileLayer)
    app.component('LMarker', Marker)
    app.component('LIcon', Icon)
}
