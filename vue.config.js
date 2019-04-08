const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: true,
  /* 服务配置 */
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    /* 修改文件引入自定义路径 */
    config.resolve.alias
      .set('@', resolve('src'))
      .set('style', resolve('src/assets/style'))
      .set('images', resolve('src/assets/images'))
  }
}
