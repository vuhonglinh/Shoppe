import { Link } from 'react-router-dom'
import useSearchProducts from 'src/hooks/useSearchProducts'

export default function Search() {
  const { register, handleSearch } = useSearchProducts()

  return (
    <form className='col-span-9 position-relative' onSubmit={handleSearch}>
      <div className='bg-white rounded-sm p-1 flex'>
        <input
          type='text'
          id=''
          {...register('search')}
          placeholder='Nhập sản phẩm cần tìm kiếm...'
          className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
        />
        <button type='submit' className='rounded-sm py-2 px-6 flex-shrink-0 text-white bg-orange hover:opacity-90'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        </button>
      </div>

      <div className='w-[852px] absolute mt-1 border z-50 box-border'>
        <Link to='' >
          <div className='bg-slate-50  h-[44px] w-full hover:bg-slate-100 flex items-center'>
            <span className='text-start ml-2'>Quần ba sọc</span>
          </div>
        </Link>
      </div>

    </form>
  )
}
