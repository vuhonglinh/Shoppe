import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { sortBy, order as orderConstan } from 'src/contexts/product'
import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/contexts/path'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortByValue
      }).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ Biến
          </button>
          <button
            className={classNames('h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới Nhất
          </button>
          <button
            onClick={() => handleSort(sortBy.sold)}
            className={classNames('h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
          >
            Bán Chạy
          </button>
          <select
            className={classNames('h-8 px-4 outline-none capitalize bg-white', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
            value={order || ''}
          >
            <option className='bg-white text-black'>Giá</option>
            <option className='bg-white text-black' value={orderConstan.asc}>
              Giá thấp đến cao
            </option>
            <option className='bg-white text-black' value={orderConstan.desc}>
              Giá cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div className=''>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2'>
            {page == 1 ? (
              <button className='shadow px-3 h-8 rounded-tl-sm bg-opacity cursor-not-allowed'>
                <FontAwesomeIcon icon={faChevronRight} flip='horizontal' size='xs' />
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='shadow px-3 py-2 rounded-tl-sm bg-white hover:bg-slate-100'
              >
                <FontAwesomeIcon icon={faChevronRight} flip='horizontal' size='xs' />
              </Link>
            )}

            {page == pageSize ? (
              <button className='shadow px-3 h-8 rounded-tl-sm bg-opacity cursor-not-allowed'>
                <FontAwesomeIcon icon={faChevronRight} size='xs' />
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='shadow px-3 py-2 rounded-tl-sm bg-white hover:bg-slate-100'
              >
                <FontAwesomeIcon icon={faChevronRight} size='xs' />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
