import { User } from 'src/types/user.types'

export const localStorageEventTarget = new EventTarget()

//Lưu access_token
export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

//Lưu refresh_token
export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

//Xóa localStorage
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}

//Lấy access_token
export const getAccessTokenToLS = () => {
  return localStorage.getItem('access_token') || ''
}

//Lấy refresh_token
export const getRefreshTokenToLS = () => {
  return localStorage.getItem('refresh_token') || ''
}

//Lấy prodile
export const getProfileToLs = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

//Lưu profile
export const setProfileToLs = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
