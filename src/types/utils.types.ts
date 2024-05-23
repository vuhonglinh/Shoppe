//Chứa cách type phần Tiện ích
export interface SuccessResponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}
