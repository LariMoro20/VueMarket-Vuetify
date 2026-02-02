<template>
  <v-col cols="12">
    <v-card elevation="2">
      <v-card-title class="d-flex align-center gap-2">
        <v-icon color="primary">mdi-lightning-bolt</v-icon>
        <span class="text-h6 font-weight-medium">Ações Rápidas</span>
      </v-card-title>

      <v-divider />

      <v-card-text class="pt-4">
        <div class="quick-actions-row">
          <v-btn
            class="quick-btn"
            color="primary"
            variant="tonal"
            @click="addProduct"
            elevation="1"
          >
            <v-icon left>mdi-plus</v-icon>
            Produto
          </v-btn>

          <v-btn
            class="quick-btn"
            color="success"
            variant="tonal"
            @click="addCategorie"
            elevation="1"
          >
            <v-icon left>mdi-plus</v-icon>
            Categoria
          </v-btn>

          <v-btn class="quick-btn" color="secondary" variant="tonal" elevation="1">
            <v-icon left>mdi-magnify</v-icon>
            Buscar
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <ProductFormModal
      v-model="dialogProduct"
      v-model:product="selectedProduct"
      @saved="emitChange"
    />
    <CategoryFormModal
      v-model="dialogCategory"
      v-model:category="selectedCategory"
      @saved="emitChange"
    />
  </v-col>
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

<style scoped>
.quick-actions-row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.quick-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 8px;
  min-width: 0;
  text-transform: none;
}
</style>
