import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.types'
import http from 'src/utils/http'

const URL = 'products'
const productApi = {
  //Lấy danh sách sản phẩm
  getProducts: (params: ProductListConfig) => {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },

  //Lấy chi tiết sản phẩm
  getProductDetail: (id: string) => {
    return http.get<SuccessResponse<Product>>(`URL/${id}`)
  }
}

export default productApi
