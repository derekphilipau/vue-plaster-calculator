import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

import VueI18n from 'vue-i18n'
import messages from './lang/messages.json';
const userLocale = navigator.language || navigator.browserLanguage || ( navigator.languages || [ "en" ] ) [ 0 ]
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: userLocale,
    fallbackLocale: 'en',
    messages
})


new Vue({
    render: h => h(App),
    i18n,
}).$mount('#app')