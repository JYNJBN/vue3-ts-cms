const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        //需要代理的请求标识
        target: `http://152.136.185.210:5000`, //请求后台接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 重写请求 替换请求当中的api这个字符串
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      //解决elloading样式缺失问题
      require('unplugin-element-plus/webpack')({
        // options
      })
    ]
  }
})
