import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'normalize.css'
import './style/common.less'
import './plugins/dayjs'

import rTable from '@/components/RTable'

Vue.config.productionTip = false

Vue.component('r-table', rTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
