import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import path from 'src/contexts/path'

/**
 * index 0: Có 5 cái màu vàng tương ứng từ indexStart 0 - 4 đều màu vàng
 * index 1: Có 4 cái màu vàng tương ứng từ indexStart 0 - 4 đều màu vàng
 * index 2: Có 3 cái màu vàng tương ứng từ indexStart 0 - 4 đều màu vàng
 * index 3: Có 2 cái màu vàng tương ứng từ indexStart 0 - 4 đều màu vàng
 * index 4: Có 1 cái màu vàng tương ứng indexStart 0 đều màu vàng
 *
 */
interface Props {
  queryConfig: QueryConfig
}
export default function RatingStars({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handleFillterStar = (ratingFilter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }

  return (
    <ul className='mt-3'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='py-1 pl-2' key={index}>
            <div
              className='flex items-center text-sm gap-1'
              role='button'
              tabIndex={0}
              aria-hidden='true'
              onClick={() => handleFillterStar(5 - index)}
            >
              {Array(5)
                .fill(0)
                .map((_, indexStart) => (
                  <div key={indexStart} className=''>
                    <FontAwesomeIcon
                      icon={faStar}
                      size='lg'
                      style={{ color: index < 5 - indexStart ? '#FFD43B' : '' }}
                    />
                  </div>
                ))}
              Trở lên
            </div>
          </li>
        ))}
    </ul>
  )
}
