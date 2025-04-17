import './assets/main.css'
import './assets/tabler/tabler.css'

import { createApp } from 'vue'
import App from './App.vue'

import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import toastPlugin from './plugins/toast.js'

// اول اپ رو بساز
const app = createApp(App)

// بعد کامپوننت رو ثبت کن
app.component('DatePicker', Vue3PersianDatetimePicker)
app.use(toastPlugin)

// حالا اپ رو مانت کن
app.mount('#app')
