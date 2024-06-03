import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { purchasesStatus } from 'src/constants/purchase'
import path from 'src/contexts/path'
import useQueryParams from 'src/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchases.api'
import { PurchaseListStatus } from 'src/types/purchases.types'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data } = useQuery({
    queryKey: ['purchase', { status: status }],
    queryFn: () => {
      return purchaseApi.getPurchases({ status: status as PurchaseListStatus })
    },
  })

  const purchasesInCartData = data?.data.data || []

  const purchaseTabsLink = purchaseTabs.map((tab, index) => (
    <Link
      to={{
        pathname: path.HistoryPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status != tab.status
      })}
      key={index}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchasesInCartData?.map((purchase, index) => (
              <div key={index} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link className='flex' to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}>
                  <div className='flex-shrink-0'>
                    <img src={purchase.product.image} alt={purchase.product.name} className='h-20 w-20 object-cover' />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='ml-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      đ{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>
                      đ{formatCurrency(purchase.product.price)}
                    </span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div className=''>
                    <span className=''>Tổng gái tiền</span>
                    <span className='ml-3 text-xl text-orange'>
                      đ{formatCurrency(purchase.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
