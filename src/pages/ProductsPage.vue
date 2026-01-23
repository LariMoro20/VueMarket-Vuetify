<template>
  <ContainerDefault>
    <PageHeader title="Produtos" subtitle="Gerencie todos os produtos do estoque">
      <v-btn prepend-icon="mdi-plus" color="primary" @click="create"> Novo </v-btn>
    </PageHeader>
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
