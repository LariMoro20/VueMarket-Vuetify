import { api } from '@/lib/axios'
import { successResponse, errorResponse } from '@/utils/httpResponse'

export default function useCategories() {
  const listCategories = async () => {
    try {
      const { data, status } = await api.get('/category')
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao obter categorias')
    }
  }

  const getCategoryById = async (id) => {
    try {
      const { data, status } = await api.get(`/category/${id}`)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao obter categoria')
    }
  }

  const createCategory = async (payload) => {
    try {
      const { data, status } = await api.post('/category', payload)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao criar categoria')
    }
  }

  const updateCategory = async (id, payload) => {
    try {
      const { data, status } = await api.put(`/category/${id}`, payload)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao atualizar categoria')
    }
  }

  const deleteCategory = async (id) => {
    try {
      const { data, status } = await api.delete(`/category/${id}`)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao deletar categoria')
    }
  }

  return {
    listCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
