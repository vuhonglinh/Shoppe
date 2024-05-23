import { User } from 'src/types/user.types'
//Lưu access_token
export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

//Xóa localStorage
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

//Lấy access_token
export const getAccessTokenToLS = () => {
  return localStorage.getItem('access_token') || ''
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
