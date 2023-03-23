// 路由权限管理
import router from '@/router'// 引入router实例
import store from '@/store'// 引入router实例
import Nprogress from 'nprogress'// 引入进度条组件
import 'nprogress/nprogress.css'// 引入进度条样式
const whiteList = ['/login', '/404']// 创建一个白名单数组
router.beforeEach(async(to, from, next) => {
  Nprogress.start()
  if (store.getters.token) { // 判断cookie中是否有token 如果有 再进入下一个判断
    if (to.path === '/login') { // 判断有token的情况下 当前是否处于登录页面 如果在 跳转主页
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()// 如果不在 则直接放行
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  Nprogress.done()
})// 创建路由前置守卫
router.afterEach(route => {
  Nprogress.done()
})// 创建路由后置守卫
