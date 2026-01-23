<template>
  <v-col cols="12" lg="4">
    <v-card elevation="2">
      <v-card-title class="text-h6"> Ações Rápidas </v-card-title>
      <v-divider />
      <v-card-text>
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
  <ProductFormModal v-model="dialogProduct" @saved="emitChange" v-model:product="selectedProduct" />
  <CategoryFormModal
    v-model="dialogCategory"
    @saved="emitChange"
    v-model:category="selectedCategory"
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
