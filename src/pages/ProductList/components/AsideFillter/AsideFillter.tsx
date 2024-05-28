import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import path from 'src/contexts/path'
import { useForm, Controller } from 'react-hook-form'
import InputNumber from 'src/components/InputNumber'
import { Schema, schema } from 'src/utils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema } from 'yup'
import { NoUndefinedField } from 'src/utils/utils'
import RatingStars from '../RatingStars'
import { omit } from 'lodash'
import InputV2 from 'src/components/InputV2'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_max', 'price_min'])

export default function AsideFillter({ queryConfig, categories }: Props) {
  //Lấy categorty trên url
  const { category } = queryConfig
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>),
    defaultValues: {
      //Thiết lập giá trị mặc định cho input
      price_min: '',
      price_max: ''
    },
    shouldFocusError: false
  })
  const navigate = useNavigate()
  const valueForm = watch()

  const onSubmit = handleSubmit(
    (data) => {
      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...queryConfig,
          price_min: data.price_min,
          price_max: data.price_max
        }).toString()
      })
    },
    (err: any) => {
      err.price_min?.ref?.focus()
    }
  )

  const handleRemoveAll = () => {
    setValue('price_min', '')
    setValue('price_max', '')
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_max', 'price_min', 'category', 'rating_filter'])).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link to='/' className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 mr-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
        Tất Cả Danh Mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = categoryItem._id === category
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative', {
                  'text-orange font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to='/' className='flex items-center font-bold uppercase mt-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6  mr-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
          />
        </svg>
        BỘ LỌC TÌM KIẾM
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form onSubmit={onSubmit} className='mt-2'>
          <div className='flex items-start'>
            {/* <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='đ TỪ'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:show-sm'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value)
                    trigger('price_max')
                  }}
                  value={field.value}
                  ref={field.ref}
                  classNameError='hidden'
                />
              )}
            /> */}
            <InputV2
              type='number'
              control={control}
              name='price_min'
              placeholder='đ TỪ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:show-sm'
              onChange={() => {
                trigger('price_min')
              }}
              classNameError='hidden'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='đ ĐẾN'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:show-sm'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value)
                    trigger('price_min')
                  }}
                  value={field.value}
                  ref={field.ref}
                  classNameError='hidden'
                />
              )}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-orange'>{errors.price_min?.message}</div>
          <Button
            type='submit'
            className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-opacity-80 justify-center items-center'
          >
            ÁP DỤNG
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        onClick={handleRemoveAll}
        className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-opacity-80 justify-center items-center'
      >
        XÓA TẤT CẢ
      </Button>
    </div>
  )
}
