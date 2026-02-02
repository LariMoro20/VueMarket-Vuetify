import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'unfonts.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/css/variables.css'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#30445d',
          secondary: '#3eb27e',

          success: '#11A138',
          error: '#E53935',
          warning: '#FFB300',
          info: '#1E88E5',

          background: '#FFFFFF',
          surface: '#FAFAFA',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#3eb27e',
          secondary: '#CBD5E1',

          success: '#11A138',
          error: '#EF5350',
          warning: '#FFCA28',
          info: '#42A5F5',

          background: '#121212',
          surface: '#1E1E1E',
        },
      },
    },
  },
})

app.use(vuetify)
app.use(router)
app.mount('#app')
