import { User } from 'src/types/user.types'
import { SuccessResponse } from 'src/types/utils.types'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile: () => {
    return http.get<SuccessResponse<User>>('me')
  },

  updateProfile: (body: BodyUpdateProfile) => {
    return http.put<SuccessResponse<User>>('user', body)
  },

  uploadAvatar: (body: FormData) => {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
