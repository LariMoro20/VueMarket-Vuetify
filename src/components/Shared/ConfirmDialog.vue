<template>
  <v-dialog v-model="dialogModel" max-width="500px" persistent>
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="handleCancel" :disabled="loading">
          Cancelar
        </v-btn>
        <v-btn :color="confirmColor" variant="elevated" @click="handleConfirm" :loading="loading">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const dialogModel = defineModel({ type: Boolean, default: false })

defineProps({
  title: {
    type: String,
    default: 'Confirmar ação',
  },
  message: {
    type: String,
    default: 'Tem certeza que deseja continuar?',
  },
  confirmText: {
    type: String,
    default: 'Confirmar',
  },
  confirmColor: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  dialogModel.value = false
  emit('cancel')
}
</script>
