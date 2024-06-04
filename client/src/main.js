import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-green/theme.css'
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css'
import 'ant-design-vue/dist/reset.css';
import 'vue-loading-overlay/dist/css/index.css';
import ToastService from 'primevue/toastservice';
import store from './store';
import VTooltip from 'v-tooltip'
import { Button, message,Rate } from 'ant-design-vue';
import {LoadingPlugin} from 'vue-loading-overlay';

const app = createApp(App)
app.use(LoadingPlugin);
app.use(store)

app.use(router)
app.use(PrimeVue);
app.use(Button)
app.use(Rate)
app.use(ToastService); // Updated usage of ToastService
app.use(VTooltip)

app.mount('#app')

app.config.globalProperties.$message = message;
