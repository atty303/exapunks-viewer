import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/quasar.styl'
import lang from 'quasar-framework/i18n/ja'
import 'quasar-extras/material-icons'
import Quasar from 'quasar'

import 'prismjs'
import 'prismjs/components/prism-markdown'
import 'prismjs/themes/prism-twilight.css'

Vue.use(Quasar, {
  config: {},
  i18n: lang,
 })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
