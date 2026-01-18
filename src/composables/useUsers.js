import { api } from '@/lib/axios'
import { successResponse, errorResponse } from '@/utils/httpResponse'

export default function useUsers() {
  const createUser = async (payload) => {
    try {
      const { data, status } = await api.post('/user', payload)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao criar usuário')
    }
  }

  const doLogin = async (payload) => {
    try {
      const { data, status } = await api.post('/login', payload)
      localStorage.setItem('auth-token', data.token)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao logar')
    }
  }

  return {
    createUser, doLogin
  }
}
