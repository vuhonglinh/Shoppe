import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { AuthResponse, RefreshTokenReponse } from 'src/types/auth.types'
import { clearLS, getAccessTokenToLS, getRefreshTokenToLS, setAccessTokenToLS, setProfileToLs, setRefreshTokenToLS } from './auth'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpriredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponseApi } from 'src/types/utils.types'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenToLS()
    this.refreshToken = getRefreshTokenToLS()
    this.refreshTokenRequest = null

    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10,
        'expire-refresh-token': 60 * 60
      }
    })
    //Gửi lên server
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    //Trả về từ server
    this.instance.interceptors.response.use(
      (response) => {
        //Thành công
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          //Gán accessToken == giá trị accessToken vừa lấy ra
          this.accessToken = (response.data as AuthResponse).data?.access_token
          this.refreshToken = (response.data as AuthResponse).data?.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLs(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        //Thất bại
        if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
          //Chỉ thông báo không phải lỗi 422 và 401
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }

        //Lỗi Unauthorized (402) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn

        //Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponseApi<{ name: string, password: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          // Trường hợp Token hết hạn và request đó không phải là request refresh token
          // Thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpriredTokenError(error) && url != URL_REFRESH_TOKEN) {//Không cho gọi lại khi đang goi refresh token
            //Không phải token hết hạn
            //Hạn chế gọi 2 lần
            this.refreshTokenRequest = this.refreshTokenRequest ? this.refreshTokenRequest : this.handleRefreshToken().finally(() => {
              //Giữ refresh token trong 10s của những lần request tiếp theo nết nó có 401 thì dùng
              setTimeout(() => {
                this.refreshTokenRequest = null
              }, 10000)
            });

            return this.refreshTokenRequest.then((access_token) => {
              if (config.headers) {
                config.headers.Authorization = access_token
                //Tiếp tục request cũ vừa bị lỗi gọi lại request cũ
                return this.instance({
                  ...config,
                  headers: { ...config.headers }
                })
              }
            })
          }


          //Trường hợp token không đúng 
          //Không truyền token
          //Token hết hạn nhưng gọi refresh token bị fail
          //Thi hành xóa local storage và toast message
          clearLS()
          this.accessToken = ""
          this.refreshToken = ""
          console.log(error);
          toast.error(error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance.post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
      refresh_token: this.refreshToken
    }).then(res => {
      const { access_token } = res.data.data
      setAccessTokenToLS(access_token)
      this.accessToken = access_token
      return access_token
    }).catch(err => {
      clearLS()
      this.accessToken = ""
      this.refreshToken = ""
      throw err
    })
  }
}

const http = new Http().instance

export default http
