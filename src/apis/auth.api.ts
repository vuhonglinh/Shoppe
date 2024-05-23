import { AuthResponse } from 'src/types/auth.types'
import http from 'src/utils/http'

const authApi = {
  //Đăng ký
  registerAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('register', body)
  },

  //Đăng nhập
  loginAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('login', body)
  },

  //Đăng xuất
  logoutAccount: () => {
    return http.post('logout')
  }
}

export default authApi
