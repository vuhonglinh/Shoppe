import { AuthResponse } from 'src/types/auth.types'
import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  //Đăng ký
  registerAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },

  //Đăng nhập
  loginAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },

  //Đăng xuất
  logoutAccount: () => {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
