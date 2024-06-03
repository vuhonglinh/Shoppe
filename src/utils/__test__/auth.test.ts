import { describe, expect, it } from "vitest"
import { clearLS, getAccessTokenToLS, getProfileToLs, getRefreshTokenToLS, setAccessTokenToLS, setProfileToLs, setRefreshTokenToLS } from "../auth"
import { beforeEach } from "node:test"

//toBe kiểm tra giá trị
//toEqual kiểm tra giá trị tham chiếu đến ổ nhớ

const access_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDhjNWNlMGU2M2M5MDUxMjVkM2Q0MyIsImVtYWlsIjoibGluaHZocGgzMTEzOUBmcHQuZWR1LnZuIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0wMVQwNTo0Nzo1NC4zMjlaIiwiaWF0IjoxNzE3MjIwODc0LCJleHAiOjE3MTcyMjA4ODR9.Tf6kAzjcBK4SpFJm-Y2orDuwA5qj1JEVihIri4g1Fpg"
const refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDhjNWNlMGU2M2M5MDUxMjVkM2Q0MyIsImVtYWlsIjoibGluaHZocGgzMTEzOUBmcHQuZWR1LnZuIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0wMVQwNTo0Nzo1NC4zMjlaIiwiaWF0IjoxNzE3MjIwODc0LCJleHAiOjE3MTcyMjQ0NzR9.vnx_7leHbMGJHfC_s64w5KYfyVCpzxj8XmiBU339628"
const profile = '{"_id":"6648c5ce0e63c905125d3d43","roles":["User"],"email":"linhvhph31139@fpt.edu.vn","createdAt":"2024-05-18T15:14:22.503Z","updatedAt":"2024-06-01T03:03:46.745Z","__v":0,"date_of_birth":"1989-12-31T17:00:00.000Z","name":"Vũ Hồng Lĩnh","phone":"987654321","address":" Cao đẳng Fpt polytechnic - Phương Canh - Nam Từ Liêm - Hà Nội"}'

beforeEach(() => {
  console.log("Gọi trước mỗi lầm test")
  localStorage.clear()
})

describe('setAccessTokenToLS', () => {
  it('access_token đã được cho vào localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})


describe('setRefreshTokenToLS', () => {
  it('refresh_token đã được cho vào localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toEqual(refresh_token)
  })
})


describe('getAccessTokenToLS', () => {
  it('Lấy access_token', () => {
    setAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('getRefreshTokenToLS', () => {
  it('Lấy refresh_token', () => {
    setAccessTokenToLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
})

describe('clearLS', () => {
  it('Xóa hết', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLs(JSON.parse(profile))
    clearLS()
    expect(getAccessTokenToLS()).toBe('')
    expect(getRefreshTokenToLS()).toBe('')
    expect(getProfileToLs()).toBe(null)
  })
})


describe('getProfileToLs', () => {
  it('profile đã được cho vào localStorage', () => {
    setProfileToLs(JSON.parse(profile))
    expect(localStorage.getItem('profile')).toBe(profile)
  })
})