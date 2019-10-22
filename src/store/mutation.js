import * as types from './mutation-type'
import cookie from '@/api/cookie'
import {getShopCarts, getCategory, getGoods} from '@/api/api'

// 类似于事件 每个mutation都有字符类型的事件类型和回调函数

export default {
  // 获取cookie个人信息
  [types.SET_INFO] (state) {
    state.userInfo = {
      name: cookie.getCookie('name'),
      token: cookie.getCookie('token')
    }
  },
  // 获取商品类别
  [types.SET_CATEGORY] (state) {
    getCategory({
      params: {}
    }).then((response) => {
      // 更新store数据
      state.cateGory = response.data
      // console.log(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  // 获取商品列表
  [types.SET_GOODS] (state) {
    getGoods().then((response) => {
      // debugger
      // 更新store数据
      state.Goods = response.data.results
      // console.log(response.data.results)
    }).catch(function (error) {
      console.log(error)
    })
  },
  // 获取购物车数据updateShopList
  [types.SET_SHOPLIST] (state) {
    getShopCarts().then((response) => {
      // 更新store数据
      state.goodsList = response.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  // 更新购物车数据updateShopList
  [types.UPDATE_SHOPLIST] (state, goodInfo) {
    // 更新store数据
    state.goodsList[goodInfo.index].nums = goodInfo.goodnum
    console.log(state.goodsList)
    debugger
  }
}
