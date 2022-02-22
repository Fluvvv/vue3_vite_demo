import { defineConfig } from 'vite'
import { resolve } from 'path' // 主要用于alias文件路径别名
import vue from '@vitejs/plugin-vue'
// import WindiCSS from 'vite-plugin-windicss'

import { svgBuilder } from './src/assets/plugin/svgBuilder'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // WindiCSS(),
    svgBuilder('./src/assets/svg/') // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
  ],
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  server: {
    //  cors: true, // 默认启用并允许任何源
    host: '0.0.0.0',
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    port: 8080,
    strictPort: false, //如果端口占用，是退出，还是尝试其他端口
    https: false, // 是否开启 https
    //反向代理配置，注意rewrite写法
    proxy: {
      '/api': {
        target: process.env.VITE_VUE_APP_ENV, //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
