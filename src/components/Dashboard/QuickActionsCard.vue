<template>
  <v-col cols="12" lg="4">
    <v-card elevation="2" class="quick-actions">
      <v-card-title class="d-flex align-center gap-2">
        <v-icon color="primary">mdi-lightning-bolt</v-icon>
        <span class="text-h6 font-weight-medium"> Ações Rápidas </span>
      </v-card-title>

      <v-divider />

      <v-card-text class="pt-4">
        <v-btn
          block
          color="primary"
          size="large"
          class="mb-3"
          prepend-icon="mdi-plus"
          @click="addProduct"
        >
          Novo Produto
        </v-btn>

        <v-btn
          block
          color="success"
          variant="tonal"
          size="large"
          class="mb-3"
          prepend-icon="mdi-folder-plus"
          @click="addCategorie"
        >
          Nova Categoria
        </v-btn>

        <v-btn block variant="outlined" size="large" prepend-icon="mdi-magnify">
          Buscar Produto
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>

  <ProductFormModal v-model="dialogProduct" v-model:product="selectedProduct" @saved="emitChange" />

  <CategoryFormModal
    v-model="dialogCategory"
    v-model:category="selectedCategory"
    @saved="emitChange"
  />
</template>
<script setup>
const emit = defineEmits(['hasChange'])

const dialogProduct = ref(false)
const dialogCategory = ref(false)
const selectedProduct = ref(null)
const selectedCategory = ref(null)

const addCategorie = () => {
  selectedCategory.value = null
  dialogCategory.value = true
}

const addProduct = () => {
  selectedProduct.value = null
  dialogProduct.value = true
}

const emitChange = () => {
  emit('hasChange')
}
</script>
