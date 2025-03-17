import './assets/main.css'
import 'sit-onyx/style.css'
import 'sit-onyx/themes/lidl-light.css'
import 'sit-onyx/themes/lidl-dark.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Amplify } from 'aws-amplify'
import { appConfigs } from './config'
import { createOnyx } from 'sit-onyx'

Amplify.configure(appConfigs.AWS_CONFIG)

const onyx = createOnyx({ router })
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(onyx)

app.mount('#app')
