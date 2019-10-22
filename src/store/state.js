import cookie from '@/api/cookie'

const userInfo = {
  name: cookie.getCookie('name') || '',
  token: cookie.getCookie('token') || ''
}

export default {
  userInfo,
  goodsList: [],
  cateGory: [],
  Goods: []
}
