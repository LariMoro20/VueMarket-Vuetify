<template>
  <ContainerDefault>
    <PageHeader title="Categorias">
      <v-btn prepend-icon="mdi-plus" color="primary" @click="create"> Nova </v-btn>
    </PageHeader>
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
