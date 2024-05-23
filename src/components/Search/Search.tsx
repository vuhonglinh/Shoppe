import { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState<string>('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value
    setSearch(data)
  }

  return (
    <form className='col-span-9 position-relative'>
      <div className='bg-white rounded-sm p-1 flex'>
        <input
          type='text'
          name='search'
          id=''
          value={search}
          onChange={handleSearch}
          placeholder='Nhập sản phẩm cần tìm kiếm...'
          className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
        />
        <button className='rounded-sm py-2 px-6 flex-shrink-0 text-white bg-orange hover:opacity-90'>
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
      <div className='position-absolute '></div>
    </form>
  )
}
