import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product as ProductTtpe, ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/apis/purchases.api'
import { toast } from 'react-toastify'
import { purchasesStatus } from 'src/constants/purchase'
import path from 'src/contexts/path'
import { useTranslation } from 'react-i18next'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { convert } from 'html-to-text'

export default function ProductDetail() {
  const { t } = useTranslation(['product'])
  //Số lượng
  const queryClient = useQueryClient()
  const [buyCount, setByCount] = useState<number>(1)
  const navigate = useNavigate()
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)

  //Danh sách sản phẩm tương tự
  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig], //là một mảng dùng để định danh truy vấn
    queryFn: () => productApi.getProducts(queryConfig), // là hàm được gọi để thực hiện truy vấn.
    staleTime: 3 * 60 * 1000, //xác định khoảng thời gian mà dữ liệu của truy vấn được coi là mới và không cần phải truy vấn lại.
    enabled: Boolean(product) //là một điều kiện boolean để quyết định liệu truy vấn có nên được kích hoạt hay không.
  })

  const currentImages = useMemo(() => {
    return product ? product.images.slice(...currentIndexImages) : []
  }, [product, currentIndexImages])

  //Phần Thêm giỏ hangf
  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addCart(body),
    onSuccess: (value) => {
      queryClient.invalidateQueries({
        // là một phương pháp mạnh mẽ để làm mới dữ liệu trong bộ nhớ cache
        queryKey: ['purchase', { status: purchasesStatus.inCart }]
      })
      toast.success(value.data.message, { autoClose: 1000 })
    }
  })
  const addToCart = () => {
    addToCartMutation.mutate({ product_id: product?._id as string, buy_count: buyCount })
  }
  ///

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActive = (image: string) => {
    setActiveImage(image)
  }

  const next = () => {
    if (currentIndexImages[1] < (product as ProductTtpe)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1  Lấy offsetX and offsetY đơn giản khi chúng ta đã xử lý được bubble event
    const { offsetX, offsetY } = event.nativeEvent

    //Cách 2 lấy offsetX and offsetY khi cúng ta không xử lý được bubble event
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalHeight / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleByCount = (value: number) => {
    setByCount(value)
  }

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({
      buy_count: buyCount,
      product_id: product?._id as string
    })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{product.name} | Shopee</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name='description' content={convert(product.description, {
            limits: {
              ellipsis: '...',
              maxInputLength: 100
            }
          })} />
        </Helmet>
      </HelmetProvider>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full overflow-hidden pt-[100%] shadow cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseOut={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product?.name}
                  className='absolute pointer-events-none top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  onClick={prev}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((image, index) => {
                  const isActive = image == activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={index} onMouseEnter={() => chooseActive(image)}>
                      <img
                        src={image}
                        alt={image}
                        className='cursor-pointer absolute top-0 left-0 h-full w-full bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  onClick={next}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product?.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product?.rating}</span>
                  <ProductRating rating={product?.rating} activeClassName='red' />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300' />
                <div className=''>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>đ{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  value={buyCount}
                  onDecrease={handleByCount}
                  onIncrease={handleByCount}
                  onType={handleByCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} {t('product:availabe')}</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>{' '}
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description)
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8'>
          <div className='uppercase text-gray-400'>Có thể bạn cũng thích</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
