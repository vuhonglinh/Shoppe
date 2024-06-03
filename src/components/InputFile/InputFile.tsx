import React, { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = event.target.files?.[0]
    //Validate file upload
    if (fileFormLocal && (fileFormLocal.size >= config.maxSizeUploadAvatar || !fileFormLocal.type.includes('image'))) {
      toast.error('File không đúng định dạng quy định')
    } else {
      onChange && onChange(fileFormLocal)
      const form = new FormData()
      form.append('image', fileFormLocal as File)
      uploadAvatarMutation.mutate(form)
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        type='file'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          ;(event.target as any).value = null
        }}
        className='hidden'
        accept='.jpg,.jpeg,.png'
      />
      <button
        onClick={handleUpload}
        type='button'
        className='flex h-10 items-center justify-center rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn Ảnh
      </button>
    </>
  )
}
