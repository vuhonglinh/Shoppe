import { HttpStatusCode } from './../../constants/httpStatusCode.enum';
import { describe, it, expect } from "vitest";
import { isAxiosError, isAxiosUnauthorizedError, isAxiosUnprocessableEntity } from "../utils";
import { AxiosError } from "axios";

//describe dùng để mô tả tập hợp các ngữ cảnh 
//hoặc đơn vị cần test: Ví dụ function, component
describe('isAxiosError', () => {
  //it dùng để ghi chú trường hợp cần test
  it('isAxiosError trả về boolean', () => {
    //expect dùng để mong đợi trả về giá trị về
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError)).toBe(true)
  })
})

describe('isAxiosError', () => {
  it('isAxiosUnauthorizedError trả về boolean', () => {
    expect(isAxiosUnauthorizedError(new Error())).toBe(false)
    expect(isAxiosUnauthorizedError(
      new AxiosError(undefined, undefined, undefined, undefined, {
        status: HttpStatusCode.InternalServerError,
        data: null
      } as any))
    ).toBe(false)
    expect(isAxiosUnprocessableEntity(
      new AxiosError(undefined, undefined, undefined, undefined, {
        status: HttpStatusCode.UnprocessableEntity,
        data: null
      } as any)
    )).toBe(true)
  })
})