<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> Projeto Vuetify </v-toolbar-title>
      <template v-slot:append>
        <v-btn icon="mdi-logout" @click="confirmLogout"></v-btn>
      </template>
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
    <v-main style="min-height: 100dvh">
      <router-view />
    </v-main>

    <ConfirmDialog
      v-model="logoutDialog"
      title="Confirmar Logout"
      message="Tem certeza que deseja sair da aplicação?"
      confirm-text="Sair"
      confirm-color="error"
      :loading="loggingOut"
      @confirm="handleLogout"
    />
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotifications } from '@/composables/useNotifications'
import useAuth from '@/composables/useAuth'

const router = useRouter()
const { doLogout } = useAuth()
const notification = useNotifications()

const drawer = ref(true)
const logoutDialog = ref(false)
const loggingOut = ref(false)

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

const confirmLogout = () => {
  logoutDialog.value = true
}

const handleLogout = () => {
  loggingOut.value = true
  try {
    const response = doLogout()
    if (response.success) {
      notification.notifySuccess('Logout realizado com sucesso!')
      logoutDialog.value = false
      router.push({ name: 'login' })
    } else {
      notification.notifyError(response.message || 'Erro ao fazer logout')
    }
  } catch (error) {
    notification.notifyError('Erro inesperado ao fazer logout')
  } finally {
    loggingOut.value = false
  }
}
</script>
