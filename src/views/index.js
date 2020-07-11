const path = require('path')
const files = require.context('@/views', true, /\.vue$/)
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  modules[name] = files(key).default || files(key)
})
console.log(modules)
export default modules
