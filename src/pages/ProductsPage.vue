<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between mb-4">
      <h2>Produtos</h2>
      <v-btn prepend-icon="mdi-plus" color="primary" @click="openDialog"> Novo </v-btn>
    </div>

    <v-data-table :items="products" :loading="loading" :headers="headers">
      <template #item.price="{ item }">
        {{ formatPrice(item.price) }}
      </template>

      <template #item.status="{ item }">
        <ChipStatus :status="item.status" />
      </template>

      <template #item.created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>

      <template #item.actions="{ item }">
        <v-btn icon="mdi-pencil" size="small" variant="text" @click="editProduct(item)" />
        <v-btn
          icon="mdi-delete"
          size="small"
          variant="text"
          color="error"
          @click="confirmDelete(item)"
        />
      </template>
    </v-data-table>

    <ProductFormModal
      v-model="dialog"
      v-model:product="selectedProduct"
      @saved="handleProductSaved"
    />

    <ConfirmDialog
      v-model="deleteDialog"
      title="Deletar Produto"
      :message="`Tem certeza que deseja deletar o produto '${productToDelete?.name}'? Esta ação não pode ser desfeita.`"
      confirm-text="Deletar"
      confirm-color="error"
      :loading="deleting"
      @confirm="handleDelete"
    />
  </ContainerDefault>
</template>

<script setup>
import { useNotifications } from '@/composables/useNotifications'
import useProducts from '@/composables/useProducts'

const { listProducts, deleteProduct } = useProducts()
const notification = useNotifications()

const products = ref([])
const loading = ref(false)
const dialog = ref(false)
const selectedProduct = ref(null)
const deleteDialog = ref(false)
const productToDelete = ref(null)
const deleting = ref(false)

const headers = [
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'Preço', key: 'price', sortable: true },
  { title: 'Status', key: 'status', sortable: true, align: 'center' },
  { title: 'Criado em', key: 'created_at', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' },
]

const formatPrice = (price) => {
  if (price === null || price === undefined) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await listProducts()
    if (response.success) {
      products.value = response.data
    } else {
      notification.notifyError(response.error)
    }
  } catch (error) {
    notification.notifyError(error)
  } finally {
    loading.value = false
  }
}
onMounted(fetchProducts)

const openDialog = () => {
  selectedProduct.value = null
  dialog.value = true
}

const editProduct = (product) => {
  selectedProduct.value = product
  dialog.value = true
}

const handleProductSaved = async () => {
  await fetchProducts()
}

const confirmDelete = (product) => {
  productToDelete.value = product
  deleteDialog.value = true
}

const handleDelete = async () => {
  if (!productToDelete.value) return
  deleting.value = true
  try {
    const response = await deleteProduct(productToDelete.value.id)

    if (response.success) {
      notification.notifySuccess('Produto deletado com sucesso!')
      deleteDialog.value = false
      productToDelete.value = null
      await fetchProducts()
    } else {
      notification.notifyError(response.error)
    }
  } catch (error) {
    notification.notifyError(error)
  } finally {
    deleting.value = false
  }
}
</script>
