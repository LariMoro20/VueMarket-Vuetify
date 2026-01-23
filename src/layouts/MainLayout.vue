<template>
  <v-layout>
    <v-app-bar color="primary" flat>
      <v-app-bar-nav-icon v-if="!mdAndUp" @click="drawer = !drawer" />

      <v-toolbar-title class="font-weight-bold"> Projeto Vuetify </v-toolbar-title>

      <v-spacer />

      <v-btn icon="mdi-logout" @click="confirmLogout" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="mdAndUp"
      :temporary="!mdAndUp"
      elevation="4"
      width="260"
    >
      <v-list nav density="comfortable">
        <v-list-item
          v-for="menu in itens"
          :key="menu.value"
          :to="{ name: menu.value }"
          :prepend-icon="menu.icon"
          :title="menu.title"
          active-color="primary"
          rounded="lg"
        />
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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useNotifications } from '@/composables/useNotifications'
import useAuth from '@/composables/useAuth'

const router = useRouter()
const { doLogout } = useAuth()
const notification = useNotifications()

const { mdAndUp } = useDisplay()

const drawer = ref(mdAndUp.value)
const logoutDialog = ref(false)
const loggingOut = ref(false)

watch(mdAndUp, (isDesktop) => {
  drawer.value = isDesktop
})

const itens = [
  {
    title: 'Dashboard',
    value: 'dashboard',
    icon: 'mdi-view-dashboard',
  },
  {
    title: 'Categorias',
    value: 'categories',
    icon: 'mdi-format-list-bulleted',
  },
  {
    title: 'Produtos',
    value: 'products',
    icon: 'mdi-package-variant',
  },
]

const confirmLogout = () => {
  logoutDialog.value = true
}

const handleLogout = async () => {
  loggingOut.value = true
  try {
    const response = await doLogout()

    if (response.success) {
      notification.notifySuccess('Logout realizado com sucesso!')
      logoutDialog.value = false
      router.push({ name: 'login' })
    } else {
      notification.notifyError(response.message || 'Erro ao fazer logout')
    }
  } catch {
    notification.notifyError('Erro inesperado ao fazer logout')
  } finally {
    loggingOut.value = false
  }
}
</script>
