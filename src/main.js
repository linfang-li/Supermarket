// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'styles/reset.css'
import 'styles/border.css'

// 全局加载resource拦截器
import axios from 'axios'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

// http request 拦截器
axios.interceptors.request.use(
  function (config) {
    console.log(store.state.userInfo.token)
    if (store.state.userInfo.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
    }

    return config
  },
  function (err) {
    return Promise.reject(err)
  })
// http response 拦截器
axios.interceptors.response.use(
  undefined,
  error => {
    let res = error.response
    switch (res.status) {
      // 未登录 或者token过期
      case 401:
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        })
        break
      case 403:
        console.log('您没有该操作权限')
        // alert('您没有该操作权限')
        break
      case 500:
        console.log('服务器错误')
      // alert('服务器错误');
    }
    return Promise.reject(error.response.data)
    // 返回接口返回的错误信息
  })
