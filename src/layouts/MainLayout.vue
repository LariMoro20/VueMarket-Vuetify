<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> Projeto Vuetify </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="menu in itens"
          :key="menu.value"
          :value="menu.value"
          :title="menu.title"
          :to="menu.value"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="height: 100dvh">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script setup>
const drawer = ref(true)
const itens = [
  {
    title: 'Dashboard',
    value: 'dashboard',
  },
  {
    title: 'Categorias',
    value: 'categories',
  },
  {
    title: 'Produtos',
    value: 'products',
  },
]
</script>
