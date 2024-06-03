import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
  classNameEye?: string
}

export default function Input({
  autoComplete,
  name,
  className,
  errorMessage,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:show-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  classNameEye = 'absolute top-[11px] right-[5px] cursor-pointer',
  ...rest
}: Props) {
  const [openEye, setOpenEye] = useState(false)
  const registerResult = register && name ? register(name, rules) : null
  const toogleEye = () => {
    setOpenEye((prev) => !prev)
  }

  const handleType = () => {
    if (rest.type === 'password') {
      return openEye ? 'text' : 'password'
    }
    return rest.type
  }

  return (
    <div className={className}>
      <input name={name} className={classNameInput} {...registerResult} {...rest} type={handleType()} />
      {rest.type === 'password' && openEye && (
        <FontAwesomeIcon icon={faEye} onClick={toogleEye} className={classNameEye} />
      )}
      {rest.type === 'password' && !openEye && (
        <FontAwesomeIcon onClick={toogleEye} icon={faEyeSlash} className={classNameEye} />
      )}
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
