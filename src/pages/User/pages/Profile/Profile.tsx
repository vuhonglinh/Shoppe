import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { useQuery, useMutation } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { UserSchema, useSchema } from 'src/utils/rule'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import DataSelect from '../../components/DataSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLs } from 'src/utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.types'
import InputFile from 'src/components/InputFile'

function Infor() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>()
  return (
    <Fragment>
      <div className='mt-6 flex flex-wrap'>
        <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
        <div className='w-[80%] pl-5'>
          <Input
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            classNameInput='w-full rounded-sm border border-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
          />
        </div>
      </div>
      <div className='mt-2 flex flex-wrap'>
        <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
        <div className='w-[80%] pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onChange={field.onChange}
                errorMessage={errors.phone?.message}
                classNameInput='w-full rounded-sm border border-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}

type FormData = Pick<UserSchema, 'address' | 'avatar' | 'name' | 'date_of_birth' | 'phone'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = useSchema.pick(['address', 'avatar', 'name', 'phone', 'date_of_birth'])

export default function Profile() {

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {  setProfile } = useContext(AppContext)
  const methods = useForm<FormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1),
      phone: ''
    }
  })

  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    setError
  } = methods

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      setProfile(data.data.data)
      setProfileToLs(data.data.data)
      toast.success(data.data.message, {
        autoClose: 1000
      })
    }
  })

  const profile = profileData?.data.data
  useEffect(() => {
    if (profile) {
      setValue('address', profile.address)
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString()
      })
      refetch()
    } catch (error) {
      if (isAxiosUnprocessableEntity<ErrorResponseApi<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChange = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
            <div className='mt-6 flex-grow pr-12 md:mt-0'>
              <div className='flex flex-wrap'>
                <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
                <div className='w-[80%] pl-5'>
                  <div className='pt-3 text-gray-700 '>{profile?.email}</div>
                </div>
              </div>
              <Infor />
              <div className='mt-2 flex flex-wrap'>
                <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
                <div className='w-[80%] pl-5'>
                  <Input
                    name='address'
                    register={register}
                    errorMessage={errors.address?.message}
                    classNameInput='w-full rounded-sm border border-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                </div>
              </div>
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DataSelect
                    onChange={field.onChange}
                    value={field.value}
                    errorMessage={errors.date_of_birth?.message}
                  />
                )}
              />
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
            <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
              <div className='flex flex-col items-center'>
                <div className='my-5 h-24 w-24'>
                  <img
                    className='w-full h-full object-cover rounded-full'
                    src={previewImage || getAvatarUrl(profile?.avatar as string)}
                    alt={profile?.name}
                  />
                </div>
                <InputFile onChange={handleChange} />
                <div className='mt-3 text-gray-400 mx-7'>Dụng lượng file tối đa 1 MB</div>
                <div className='text-gray-400 text-left'>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
