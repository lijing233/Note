const path = require('path')

// __dirname 当前文件所在的目录
// __dirname =>  F:\lijing_github\mynote\study\Vue\Vue源码学习\Vue官方源码\scripts
// p => src/platforms/web
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  entries: resolve('src/entries'),
  sfc: resolve('src/sfc')
}
