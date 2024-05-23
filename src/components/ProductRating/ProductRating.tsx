import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProductRating({ rating }: { rating: number }) {
  const handleWidth = (order: number) => {
    if (order <= rating) {
      return '100%'
    }
    if (order > rating && order - rating < 1) {
      return (rating - Math.floor(rating)) * 200 + '%'
    }
    return '0%'
  }
  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative "flex items-center justify-center' key={index}>
            <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: handleWidth(index + 1) }}>
              <FontAwesomeIcon icon={faStar} x={0} y={0} className='h-[13px] w-[13px]' style={{ color: '#FFD43B' }} />
            </div>
            <FontAwesomeIcon icon={faStar} className='h-[13px] w-[13px]' style={{ color: '#dfe4ec' }} />
          </div>
        ))}
    </div>
  )
}
