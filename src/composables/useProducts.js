import { api } from '@/lib/axios'
import { successResponse, errorResponse } from '@/utils/httpResponse'

export default function useProducts() {
  const listProducts = async () => {
    try {
      const { data, status } = await api.get('/product')
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao obter produtos')
    }
  }

  const getProductById = async (id) => {
    try {
      const { data, status } = await api.get(`/product/${id}`)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao obter produto')
    }
  }

  const createProduct = async (payload) => {
    try {
      const { data, status } = await api.post('/product', payload)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao criar produto')
    }
  }

  const updateProduct = async (id, payload) => {
    try {
      const { data, status } = await api.put(`/product/${id}`, payload)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao atualizar produto')
    }
  }

  const deleteProduct = async (id) => {
    try {
      const { data, status } = await api.delete(`/product/${id}`)
      return successResponse(data, status)
    } catch (err) {
      return errorResponse(err, 'Erro ao deletar produto')
    }
  }

  return {
    listProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
