import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'
import htmlToPdf from './js/htmlToPdf.js'

const app = createApp(App)
app.use(htmlToPdf)
app.mount('#app')
