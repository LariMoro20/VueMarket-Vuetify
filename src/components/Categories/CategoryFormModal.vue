<template>
  <v-dialog v-model="dialogModel" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ isEditing ? 'Editar' : 'Nova' }} Categoria</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="formValid">
          <v-text-field
            v-model="form.name"
            label="Nome *"
            :rules="[rules.required]"
            variant="outlined"
            class="mb-3"
          ></v-text-field>
          <v-select
            v-model="form.status"
            label="Status *"
            :items="statusOptions"
            item-title="text"
            item-value="value"
            :rules="[rules.required]"
            variant="outlined"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="handleClose" :disabled="saving">
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="handleSave"
          :loading="saving"
          :disabled="!formValid"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import useCategories from '@/composables/useCategories'
import { useNotifications } from '@/composables/useNotifications'

const { createCategory, updateCategory } = useCategories()
const notification = useNotifications()

const emit = defineEmits(['saved'])

const dialogModel = defineModel({ type: Boolean, default: false })
const categoryModel = defineModel('category', { type: Object, default: null })

const formRef = ref(null)
const formValid = ref(false)
const saving = ref(false)

const form = computed({
  get: () => categoryModel.value || { id: null, name: '', status: 'active' },
  set: (value) => {
    categoryModel.value = value
  },
})

const statusOptions = [
  { text: 'Ativo', value: 'active' },
  { text: 'Inativo', value: 'inactive' },
]

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
}

const isEditing = computed(() => !!categoryModel.value?.id)

const handleClose = () => {
  dialogModel.value = false
  categoryModel.value = null
}

const handleSave = async () => {
  if (!formValid.value) return

  saving.value = true
  try {
    let response

    if (isEditing.value) {
      response = await updateCategory(form.value.id, {
        name: form.value.name,
        status: form.value.status,
      })
    } else {
      response = await createCategory({
        name: form.value.name,
        status: form.value.status,
      })
    }

    if (response.success) {
      notification.notifySuccess('Categoria salva com sucesso!')
      emit('saved')
      handleClose()
    } else {
      notification.notifyError('Erro ao salvar categoria: ' + response.error)
    }
  } catch (error) {
    notification.notifyError('Erro ao salvar categoria: ' + error)
  } finally {
    saving.value = false
  }
}
</script>
