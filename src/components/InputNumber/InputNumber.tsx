import { RegisterOptions } from 'react-hook-form'
import { InputHTMLAttributes, forwardRef, useState } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      errorMessage,
      onChange,
      classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:show-sm',
      classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
      value = '',
      ...rest
    }: InputNumberProps,
    ref
  ) => {
    const [localValue, setLocalValue] = useState<string>(value as string)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (/^\d+$/.test(value) || value === '') {
        //Thực thi onchange callback từ bên ngoài truyền vào props
        onChange && onChange(event)

        //Cập nhật localState value
        setLocalValue(value)
      }
    }

    return (
      <div className={className}>
        <input ref={ref} {...rest} value={value || localValue} className={classNameInput} onChange={handleChange} />
        <div className={classNameError}>{errorMessage}</div>
      </div>
    )
  }
)

export default InputNumber
