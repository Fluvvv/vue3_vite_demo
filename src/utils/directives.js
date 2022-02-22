import print from 'vue3-print-nb'
import store from '@/store'

export default (app) => {
  app.directive('print', print)
  //按钮权限指令  v-hasRole="['DEC']"
  app.directive('hasRole', {
    mounted(el, binding) {
      // roles的值，应为string数组，存放角色列表  例子：['user','proxy']
      // 也可以根据自己的逻辑修改
      const roles = store.getters.btnPermissionList() // 使用插件时，绑定的值
      console.log(roles)

      const value = binding.value
      let flag = value.filter((v) => roles.includes(v)).length > 0
      if (!flag) {
        if (!el.parentNode) {
          el.style.display = 'none'
        } else {
          el.parentNode.removeChild(el)
        }
      }
    }
  })
}
