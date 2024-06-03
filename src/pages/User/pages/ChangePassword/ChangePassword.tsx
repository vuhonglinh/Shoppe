import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, useSchema } from 'src/utils/rule'
import { useMutation } from '@tanstack/react-query'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.types'
import userApi from 'src/apis/user.api'
import { toast } from 'react-toastify'
import { omit } from 'lodash'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'comfirm_password'>
const passwordSchema = useSchema.pick(['password', 'new_password', 'comfirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(passwordSchema),
    defaultValues: {
      password: '',
      new_password: '',
      comfirm_password: ''
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      const res = await changePasswordMutation.mutateAsync(omit(data, ['comfirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntity<ErrorResponseApi<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <form onSubmit={onSubmit} className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
          <div className='mt-6 flex-grow pr-12 md:mt-0'>
            <div className='mt-6 flex flex-wrap'>
              <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu cũ</div>
              <div className='w-[80%] pl-5'>
                <Input
                  type='password'
                  name='password'
                  register={register}
                  errorMessage={errors.password?.message}
                  className='relative'
                  classNameInput=' w-full rounded-sm border border-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>
            <div className='mt-6 flex flex-wrap'>
              <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu mới</div>
              <div className='w-[80%] pl-5'>
                <Input
                  type='password'
                  name='new_password'
                  register={register}
                  errorMessage={errors.new_password?.message}
                  className='relative'
                  classNameInput=' w-full rounded-sm border border-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>
            <div className='mt-6 flex flex-wrap'>
              <div className='w-[20%] truncate pt-3 text-right capitalize'>Nhập lại mật khẩu</div>
              <div className='w-[80%] pl-5'>
                <Input
                  type='password'
                  name='comfirm_password'
                  register={register}
                  errorMessage={errors.comfirm_password?.message}
                  className='relative'
                  classNameInput=' w-full rounded-sm border border-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap'>
              <div className='w-[20%] truncate pt-3 text-right capitalize' />
              <div className='w-[80%] pl-5'>
                <Button
                  type='submit'
                  className='mt-4 flex items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
