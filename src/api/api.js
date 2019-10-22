import axios from 'axios'
import store from '../store'
import cookie from '@/api/cookie'
// let local_host = 'http://124.127.178.242:8103'
let local_host = 'http://47.104.5.200:8102'
//登录
export const login = params => {
  return axios.post(`${local_host}/login/`, params)
}
//获取轮播图
export const bannerGoods = params => {
  return axios.get(`${local_host}/banners/`)
}
//获取购物车商品
export const getShopCarts = params => {
  return axios.get(`${local_host}/shopcarts/`)
}
// 添加商品到购物车
export const addShopCart = params => {
  return axios.post(`${local_host}/shopcarts/`, params)
}
//删除购物车某个商品
export const deleteShopCart = goodsId => {
  return axios.delete(`${local_host}/shopcarts/` + goodsId + '/')
}
//更新购物车商品信息
export const updateShopCart = (goodsId, params) => {
  return axios.patch(`${local_host}/shopcarts/` + goodsId + '/', params)
}
//获取商品类别信息
export const getCategory = params => {
  if ('id' in params) {
    return axios.get(`${local_host}/categories/` + params.id + '/')
  } else {
    return axios.get(`${local_host}/categories/`, params)
  }
}

//获取商品列表
export const getGoods = params => {
  return axios.get(`${local_host}/goods/`, {
    params: params,
    headers: {Authorization: cookie.getCookie('token')?`Bearer ${store.state.userInfo.token}`:'' }
  })
}

