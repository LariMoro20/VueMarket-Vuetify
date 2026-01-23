<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between mb-4">
      <h2>Categorias</h2>
      <v-btn prepend-icon="mdi-plus" color="primary" @click="create"> Nova </v-btn>
    </div>

    <CategoriesTable @updated="reload" :key="tableKey" />

    <CategoryFormModal v-model="createDialog" v-model:category="newCategory" @saved="reload" />
  </ContainerDefault>
</template>

<script setup>
import { ref } from 'vue'

const createDialog = ref(false)
const newCategory = ref(null)
const tableKey = ref(0)

const create = () => {
  newCategory.value = null
  createDialog.value = true
}

const reload = () => {
  tableKey.value++
}
</script>
