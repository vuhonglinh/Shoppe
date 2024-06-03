import { yupResolver } from '@hookform/resolvers/yup/src/yup.js'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, registerSchema } from 'src/utils/rule'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.types'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { toast } from 'react-toastify'
import Button from 'src/components/Button'
import path from 'src/contexts/path'
import { setProfileToLs } from 'src/utils/auth'
import { Helmet, HelmetProvider } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password' | 'comfirm_password'>

export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'comfirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['comfirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        setProfileToLs(data.data.data.user)
        setIsAuthenticated(true)
        toast.success('Đăng ký thành công')
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponseApi<Omit<FormData, 'comfirm_password'>>>(error)) {
          const formError = error.response?.data.data
          //Cách 1
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('email', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }

          //Cách 2
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'comfirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'comfirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Đăng ký | Shopee</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        </HelmetProvider>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                autoComplete='on'
                register={register}
                type='password'
                className='mt-2 relative'
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu'
              />
              <Input
                type='password'
                name='comfirm_password'
                register={register}
                autoComplete='on'
                className='mt-2 relative'
                errorMessage={errors.comfirm_password?.message}
                placeholder='Mật khẩu'
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  isLoading={registerMutation.isPending}
                  disabled={registerMutation.isPending}
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>Bạn đã có tài khoản chưa?</span>
                <Link to={path.login} className='text-red-400 ml-1'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
