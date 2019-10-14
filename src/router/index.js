import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import home from '@/pages/home/home'
import login from '@/pages/login/login'
import cart from '@/pages/cart/cart'
import category from '@/pages/category/category'
import myinfo from '@/pages/myinfo/myinfo'

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: '首页',
      need_log: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart,
    meta: {
      title: '购物车',
      need_log: true
    }
  },
  {
    path: '/myinfo',
    name: 'myinfo',
    component: myinfo,
    meta: {
      title: '我的',
      need_log: true
    }
  },
  {
    path: '/category',
    name: 'category',
    component: category,
    meta: {
      title: '分类',
      need_log: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录',
      need_log: false
    }
  }]
})

// 进行路由判断
router.beforeEach((to, from, next) => {
  // debugger
  if (to !== undefined) {
    if (to.meta.need_log) {
      if (!store.state.userInfo.token) {
        next({
          name: 'login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
// 修改网页标题
router.afterEach((to, from, next) => {
  document.title = to.matched[to.matched.length - 1].meta.title
})

// 抛出路由
export default router
