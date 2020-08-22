import Vue from 'vue'
import dayjs from 'dayjs'
// import customParseFormat from 'dayjs/plugin/customParseFormat'

// dayjs.extend(customParseFormat)

Vue.prototype.$day = dayjs

Vue.filter('formatDate', function(value) {
  return dayjs(value).format('YYYY-MM-DD')
})

Vue.filter('formatDateTime', function(value) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
})
