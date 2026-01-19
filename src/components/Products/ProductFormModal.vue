<template>
  <v-dialog v-model="dialogModel" max-width="700px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ isEditing ? 'Editar' : 'Novo' }} Produto</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="formValid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.name"
                label="Nome *"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.price"
                label="Preço *"
                type="number"
                prefix="R$"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="form.category_id"
                label="Categoria *"
                :items="categories"
                item-title="name"
                item-value="id"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="form.status"
                label="Status *"
                :items="statusOptions"
                item-title="text"
                item-value="value"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="form.description"
                label="Descrição"
                rows="3"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn variant="text" color="grey" :disabled="saving" @click="handleClose">
          Cancelar
        </v-btn>

        <v-btn
          color="primary"
          variant="elevated"
          :loading="saving"
          :disabled="!formValid"
          @click="handleSave"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNotifications } from '@/composables/useNotifications'
import useProducts from '@/composables/useProducts'
import useCategories from '@/composables/useCategories'

const emit = defineEmits(['saved'])

const dialogModel = defineModel({ type: Boolean, default: false })
const productModel = defineModel('product', { type: Object, default: null })

const { createProduct, updateProduct } = useProducts()
const { listCategories } = useCategories()
const notification = useNotifications()

const formValid = ref(false)
const saving = ref(false)
const categories = ref([])

const form = computed(
  () =>
    productModel.value || {
      id: null,
      name: '',
      description: '',
      price: null,
      status: 'active',
      category_id: null,
    },
)

const isEditing = computed(() => !!productModel.value?.id)

const statusOptions = [
  { text: 'Ativo', value: 'active' },
  { text: 'Inativo', value: 'inactive' },
]

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
}

const handleClose = () => {
  dialogModel.value = false
  productModel.value = null
}

const handleSave = async () => {
  if (!formValid.value) return

  saving.value = true
  try {
    const payload = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      status: form.value.status,
      category_id: form.value.category_id,
    }

    const response = isEditing.value
      ? await updateProduct(form.value.id, payload)
      : await createProduct(payload)

    if (response.success) {
      notification.notifySuccess('Produto salvo com sucesso!')
      emit('saved')
      handleClose()
    } else {
      notification.notifyError(response.error)
    }
  } catch (error) {
    notification.notifyError(error)
  } finally {
    saving.value = false
  }
}

const fetchCategories = async () => {
  const response = await listCategories()
  if (response.success) {
    categories.value = response.data
  }
}

onMounted(fetchCategories)
</script>
