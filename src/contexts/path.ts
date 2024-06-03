const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  ChangePassword: '/user/password',
  HistoryPurchase: '/user/purchases',
  login: '/login',
  register: '/register',
  logout: '/logout',
  cart: '/cart',
  productDetail: ':nameId'
} as const

export default path
