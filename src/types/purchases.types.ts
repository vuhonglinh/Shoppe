import { Product } from './product.type'

export type purchasesStatus = -1 | 1 | 2 | 3 | 4 | 5
export type PurchaseListStatus = purchasesStatus | 0

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: purchasesStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
