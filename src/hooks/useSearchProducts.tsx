import { createSearchParams, useNavigate } from "react-router-dom"
import useQueryConfig from "./useQueryConfig"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { searchSchema } from "src/utils/rule"
import { omit } from "lodash"
import path from "src/contexts/path"

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  //register được sử dụng để đăng ký các input vào hệ thống quản lý form của thư viện
  const { handleSubmit, register } = useForm({
    defaultValues: {
      search: ''
    },
    resolver: yupResolver(searchSchema)
  })

  const handleSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
        {
          ...queryConfig,
          name: data.search
        },
        ['order']
      )
      : {
        ...queryConfig,
        name: data.search
      }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { handleSearch, register }
}
