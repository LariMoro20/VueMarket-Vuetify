<template>
  <v-layout>
    <v-main style="min-height: 100dvh">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script setup>
const itens = [
  {
    title: 'Dashboard',
    value: 'dashboard',
  },
  {
    title: 'Categorias',
    value: 'categorias',
  },
  {
    title: 'Produtos',
    value: 'produtos',
  },
]
</script>
