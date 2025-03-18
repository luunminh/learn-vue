import './assets/main.css'
import 'sit-onyx/style.css'
import 'sit-onyx/themes/lidl-light.css'
import 'sit-onyx/themes/lidl-dark.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createOnyx } from 'sit-onyx'
import { VueQueryPlugin } from '@tanstack/vue-query'

const onyx = createOnyx({ router })
const app = createApp(App)

app.use(VueQueryPlugin, { enableDevtoolsV6Plugin: true })
app.use(createPinia())
app.use(router)
app.use(onyx)

app.mount('#app')
