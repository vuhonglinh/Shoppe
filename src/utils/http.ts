import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { AuthResponse } from 'src/types/auth.types'
import { clearLS, getAccessTokenToLS, setAccessTokenToLS, setProfileToLs } from './auth'
import path from 'src/contexts/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenToLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
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
        if (url === 'login' || url === 'register') {
          const data = response.data as AuthResponse
          //Gán accessToken == giá trị accessToken vừa lấy ra
          this.accessToken = (response.data as AuthResponse).data?.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLs(data.data.user)
        } else if (url === 'logout') {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        //Thất bại
        if (error.response?.status != HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http()

export default http.instance
