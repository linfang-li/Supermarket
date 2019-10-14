import cookie from '@/api/cookie'

const userInfo = {
  name: cookie.getCookie('name') || '',
  token: cookie.getCookie('token') || ''
}
const goodsList = {
  totalPrice: '',
  goodsList: []
}

export default {
  userInfo,
  goodsList,
  cateGory: [],
  Goods: [],
  Sum: ''
}
