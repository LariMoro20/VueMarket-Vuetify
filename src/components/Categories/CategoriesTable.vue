<template>
  <v-data-table
    :items="categories"
    :loading="loading"
    :headers="headers"
    v-model:items-per-page="itemsPerPage"
  >
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

  <CategoryFormModal v-model="editDialog" v-model:category="selectedCategory" @saved="refresh" />

  <ConfirmDialog
    v-model="deleteDialog"
    title="Deletar Categoria"
    :message="`Deseja deletar '${categoryToDelete?.name}'?`"
    confirm-text="Deletar"
    confirm-color="error"
    :loading="deleting"
    @confirm="handleDelete"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useCategories from '@/composables/useCategories'
import { useNotifications } from '@/composables/useNotifications'

const emit = defineEmits(['updated'])

const { listCategories, deleteCategory } = useCategories()
const notification = useNotifications()

const categories = ref([])
const loading = ref(false)
const itemsPerPage = ref(10)

const editDialog = ref(false)
const selectedCategory = ref(null)

const deleteDialog = ref(false)
const categoryToDelete = ref(null)
const deleting = ref(false)

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Status', key: 'status' },
  { title: 'Criado em', key: 'created_at' },
  { title: 'Atualizado em', key: 'updated_at' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' },
]

const fetchCategories = async () => {
  loading.value = true
  const response = await listCategories()

  if (response.success) {
    categories.value = response.data
  } else {
    notification.notifyError(response.error)
  }

  loading.value = false
}

const edit = (category) => {
  selectedCategory.value = category
  editDialog.value = true
}

const refresh = async () => {
  editDialog.value = false
  await fetchCategories()
  emit('updated')
}

const confirmDelete = (category) => {
  categoryToDelete.value = category
  deleteDialog.value = true
}

const handleDelete = async () => {
  deleting.value = true
  const response = await deleteCategory(categoryToDelete.value.id)

  if (response.success) {
    notification.notifySuccess('Categoria deletada com sucesso!')
    deleteDialog.value = false
    await fetchCategories()
    emit('updated')
  } else {
    notification.notifyError(response.error)
  }

  deleting.value = false
}

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

onMounted(fetchCategories)
</script>
