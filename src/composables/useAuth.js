import { api } from '@/lib/axios'
import { successResponse, errorResponse } from '@/utils/httpResponse'
import { jwtDecode } from 'jwt-decode'
export default function useAuth() {
  const getUserID = () => {
    const token = localStorage.getItem('auth-token')
    if (!token) return null
    const decode = jwtDecode(token)
    return decode?.user_id || null
  }

  const getUser = async () => {
    try {
      const { data, status } = await api.get('/user')
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao obter categorias')
    }
  }



  const isTokenExpired = () => {
    const token = localStorage.getItem('auth-token')
    if (!token) return true

    try {
      const decoded = jwtDecode(token)
      if (!decoded.exp) return true
      const expirationTime = decoded.exp * 1000
      const currentTime = Date.now()
      return currentTime >= expirationTime
    } catch (error) {
      console.error('Erro', error)
      return true
    }
  }

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

  const doLogout = () => {
    try {
      localStorage.removeItem('auth-token')
      return successResponse({ success: true }, 200)
    } catch (err) {
      return errorResponse(err, 'Erro ao fazer logout')
    }
  }

  return {
    createUser,
    doLogin,
    doLogout,
    isTokenExpired,
    getUserID,
    getUser
  }
}
