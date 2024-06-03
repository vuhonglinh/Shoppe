import config from 'src/constants/config'
import { HttpStatusCode } from './../constants/httpStatusCode.enum'
import axios, { AxiosError } from 'axios'
import image from 'src/assets/image/user.png'
import { ErrorResponseApi } from 'src/types/utils.types'


export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

//Kiểm tra token hết hạn
export function isAxiosExpriredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosUnauthorizedError<ErrorResponseApi<{ name: string, password: string }>>(error) && error.response?.data?.data?.name === "EXPIRED_TOKEN"
}



export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

// Cú pháp '-?' loại bỏ undefind key optional {handle?.} => đây là key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export function rateSale(original: number, sale: number) {
  return Math.ceil(((original - sale) / original) * 100) + '%'
}

export const removeSpecialCharacter = (str: string) => {
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}

export const getIdFromNameId = (name: string) => {
  //Lấy phần tử cuối của url chính là id sản phẩm
  const arr = name.split('-i.')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName: string) => {
  return avatarName ? `${config.baseURL}/images/${avatarName}` : image
}
