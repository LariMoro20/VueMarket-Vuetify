import useCategories from '@/composables/useCategories'
import useProducts from '@/composables/useProducts'

export default function useDashboard() {
  const { listCategories } = useCategories()
  const { listProducts } = useProducts()

  const getDashboardData = async () => {
    try {
      const [responseProducts, responseCategories] = await Promise.all([
        listProducts(),
        listCategories()
      ])

      const products = responseProducts?.data || []
      const categories = responseCategories?.data || []

      return {
        success: true,
        metrics: {
          totalProducts: products.length,
          totalCategories: categories.length,
          activeProducts: products.filter(p => p.status === 'active').length,
          totalValue: products.reduce((sum, p) => sum + Number(p.price), 0)
        },
        recentProducts: getRecentProducts(products, categories, 5),
        categoryDistribution: getCategoryDistribution(products, categories),
      }
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Erro ao carregar dashboard'
      }
    }
  }

  const getRecentProducts = (products, categories, limit) => {
    return products
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit)
      .map(product => {
        const category = categories.find(c => c.id === product.category_id)
        return {
          ...product,
          categoryName: category?.name || 'Sem categoria',
          formattedDate: formatDate(product.created_at)
        }
      })
  }

  const getCategoryDistribution = (products, categories) => {
    const colors = ['#1976D2', '#4CAF50', '#FB8C00', '#9C27B0', '#757575', '#E91E63']
    return categories
      .map((category, index) => {
        const count = products.filter(p => p.category_id === category.id).length
        return {
          name: category.name,
          count: count,
          color: colors[index % colors.length]
        }
      })
      .filter(cat => cat.count > 0)
      .sort((a, b) => b.count - a.count)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  return {
    getDashboardData,
  }
}
