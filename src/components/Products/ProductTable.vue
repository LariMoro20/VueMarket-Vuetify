<template>
  <v-data-table :items="products" :loading="loading" :headers="headers">
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10" />
    </template>
    <template v-slot:headers="{ columns, toggleSort }">
      <tr class="bg-primary text-white">
        <template v-for="column in columns" :key="column.key">
          <th>
            <div
              class="d-flex align-center"
              :class="{ 'justify-center': column.key === 'actions' }"
            >
              <span class="me-2 cursor-pointer" @click="toggleSort(column)" v-text="column.title" />
            </div>
          </th>
        </template>
      </tr>
    </template>

    <template #item.price="{ item }">
      {{ formatPrice(item.price) }}
    </template>

    <template #item.status="{ item }">
      <ChipStatus :status="item.status" />
    </template>

    <template #item.created_at="{ item }">
      {{ formatDate(item.created_at) }}
    </template>
    <template #item.updated_at="{ item }">
      {{ formatDate(item.updated_at) }}
    </template>
    <template #item.actions="{ item }">
      <v-btn icon="mdi-pencil" size="small" variant="text" @click="edit(item)" />
      <v-btn
        icon="mdi-delete"
        size="small"
        variant="text"
        color="error"
        @click="confirmDelete(item)"
      />
    </template>
  </v-data-table>

  <ProductFormModal v-model="editDialog" v-model:product="selectedProduct" @saved="refresh" />

  <ConfirmDialog
    v-model="deleteDialog"
    title="Deletar Produto"
    :message="`Deseja deletar '${productToDelete?.name}'?`"
    confirm-text="Deletar"
    confirm-color="error"
    :loading="deleting"
    @confirm="handleDelete"
  />
</template>

<script setup>
import useProducts from '@/composables/useProducts'
import { useNotifications } from '@/composables/useNotifications'

const emit = defineEmits(['updated'])

const { listProducts, deleteProduct } = useProducts()
const notification = useNotifications()

const products = ref([])
const loading = ref(false)

const editDialog = ref(false)
const selectedProduct = ref(null)

const deleteDialog = ref(false)
const productToDelete = ref(null)
const deleting = ref(false)

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Preço', key: 'price' },
  { title: 'Status', key: 'status', align: 'center' },
  { title: 'Criado em', key: 'created_at' },
  { title: 'Atualizado em', key: 'updated_at' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' },
]

const fetchProducts = async () => {
  loading.value = true
  const response = await listProducts()
  if (response.success) {
    products.value = response.data
  } else {
    notification.notifyError(response.error)
  }
  loading.value = false
}

const edit = (product) => {
  selectedProduct.value = product
  editDialog.value = true
}

const refresh = async () => {
  editDialog.value = false
  await fetchProducts()
  emit('updated')
}

const confirmDelete = (product) => {
  productToDelete.value = product
  deleteDialog.value = true
}

const handleDelete = async () => {
  deleting.value = true
  const response = await deleteProduct(productToDelete.value.id)

  if (response.success) {
    notification.notifySuccess('Produto deletado com sucesso!')
    deleteDialog.value = false
    await fetchProducts()
    emit('updated')
  } else {
    notification.notifyError(response.error)
  }

  deleting.value = false
}

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price ?? 0)

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-'

onMounted(fetchProducts)
</script>
