import { SuccessResponse } from 'src/types/utils.types'
import { Purchase, PurchaseListStatus } from './../types/purchases.types'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(URL, {
      params
    })
  },
  //Mua ngay sản phẩm
  buyProducts: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },

  //Cập nhật giỏ hàng
  updatePurchase: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },

  //Xóa giỏ hàng
  deletePurchase: (purchaseIds: string[]) => {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
