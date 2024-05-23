//Chứa cách type phần Authentication

import { User } from './user.types'
import { SuccessResponse } from './utils.types'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  refresh_token: string
  expires_refresh_token: string
  user: User
}>
