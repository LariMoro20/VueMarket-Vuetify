<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between mb-4">
      <h2>Produtos</h2>
      <v-btn prepend-icon="mdi-plus" color="primary" @click="create"> Novo </v-btn>
    </div>
    <ProductTable @updated="reload" :key="tableKey" />
    <ProductFormModal v-model="createDialog" v-model:product="newProduct" @saved="reload" />
  </ContainerDefault>
</template>

<script setup>
const createDialog = ref(false)
const newProduct = ref(null)
const tableKey = ref(0)

const create = () => {
  newProduct.value = null
  createDialog.value = true
}

const reload = () => {
  console.log('reloading')
  tableKey.value++
}
</script>
