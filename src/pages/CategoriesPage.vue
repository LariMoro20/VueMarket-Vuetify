<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between mb-4">
      <h2>Categorias</h2>
      <v-btn prepend-icon="mdi-plus" color="primary" @click="openDialog"> Nova </v-btn>
    </div>
    <v-data-table :items="categories" :loading="loading" :headers="headers">
      <template v-slot:item.status="{ item }">
        <v-chip :color="item.status === 'active' ? 'success' : 'error'" size="small">
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:item.updated_at="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-pencil" size="small" variant="text" @click="editCategory(item)"></v-btn>
        <v-btn
          icon="mdi-delete"
          size="small"
          variant="text"
          color="error"
          @click="confirmDelete(item)"
        ></v-btn>
      </template>
    </v-data-table>

    <!-- Modal de Criar/Editar -->
    <CategoryFormModal
      v-model="dialog"
      v-model:category="selectedCategory"
      @saved="handleCategorySaved"
    />

    <ConfirmDialog
      v-model="deleteDialog"
      title="Deletar Categoria"
      :message="`Tem certeza que deseja deletar a categoria '${categoryToDelete?.name}'? Esta ação não pode ser desfeita.`"
      confirm-text="Deletar"
      confirm-color="error"
      :loading="deleting"
      @confirm="handleDelete"
    />
  </ContainerDefault>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useCategories from '@/composables/useCategories'
import { useNotifications } from '@/composables/useNotifications'

const { listCategories, deleteCategory } = useCategories()
const notification = useNotifications()

const categories = ref([])
const loading = ref(false)
const dialog = ref(false)
const selectedCategory = ref(null)
const deleteDialog = ref(false)
const categoryToDelete = ref(null)
const deleting = ref(false)

const headers = [
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'Status', key: 'status', sortable: true, align: 'center' },
  { title: 'Criado em', key: 'created_at', sortable: true },
  { title: 'Atualizado em', key: 'updated_at', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' },
]

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

const fetchCategories = async () => {
  loading.value = true
  try {
    const response = await listCategories()
    if (response.success) {
      categories.value = response.data
    } else {
      console.error('Erro ao carregar categorias:', response.error)
    }
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  } finally {
    loading.value = false
  }
}

const openDialog = () => {
  selectedCategory.value = null
  dialog.value = true
}

const editCategory = (category) => {
  selectedCategory.value = category
  dialog.value = true
}

const handleCategorySaved = async () => {
  await fetchCategories()
}

const confirmDelete = (category) => {
  categoryToDelete.value = category
  deleteDialog.value = true
}

const handleDelete = async () => {
  if (!categoryToDelete.value) return
  deleting.value = true
  try {
    const response = await deleteCategory(categoryToDelete.value.id)

    if (response.success) {
      notification.notifySuccess('Categoria deletada com sucesso!')
      deleteDialog.value = false
      categoryToDelete.value = null
      await fetchCategories()
    } else {
      notification.notifyError('Erro ao deletar categoria: ' + response.error)
    }
  } catch (error) {
    notification.notifyError('Erro ao deletar categoria: ' + error)
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>
