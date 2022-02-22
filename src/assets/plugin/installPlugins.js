import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'

import SvgIcon from '@/components/svgIcon/index.vue' // svg组件
import errorPlugin from '@/utils/errorPlugin.js' //全局异常捕获
// import localeEN from 'element-plus/lib/locale/lang/en'
// import messages from '../utils/i18n'

// const i18n = createI18n({
//   locale: localeZH.name,
//   fallbackLocale: localeEN.name,
//   messages
// })

export default (app) => {
  app.use(ElementPlus, { locale: localeZH, size: 'small' })
  app.component('errorPlugin', errorPlugin)
  app.component('svg-icon', SvgIcon)
  //   app.use(i18n)
}
