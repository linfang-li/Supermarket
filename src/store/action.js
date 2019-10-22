import * as types from './mutation-type'
// 提交mutation
function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args)
}

export const setInfo = makeAction(types.SET_INFO)
export const setCategory = makeAction(types.SET_CATEGORY)
export const setShopList = makeAction(types.SET_SHOPLIST)
export const updateShopList = makeAction(types.UPDATE_SHOPLIST)
export const setGoods = makeAction(types.SET_GOODS)
