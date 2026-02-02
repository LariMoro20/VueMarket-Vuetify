<template>
  <v-layout>
    <v-app-bar color="primary" flat>
      <v-app-bar-nav-icon v-if="!mdAndUp" @click="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold"> Projeto Vuetify </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleTheme" size="small">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
      <v-btn icon="mdi-logout" @click="confirmLogout" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="mdAndUp"
      :temporary="!mdAndUp"
      elevation="4"
      width="260"
    >
      <v-sheet class="pa-4 d-flex align-center" color="primary" dark>
        <v-avatar size="48" class="me-3">
          <div v-if="!user.name" class="skeleton-avatar"></div>
          <v-img v-else :src="user.avatar || defaultAvatar" />
        </v-avatar>

        <div class="flex flex-column">
          <div class="font-weight-bold mb-1">
            <div v-if="!user.name" class="skeleton-text" style="width: 120px; height: 16px"></div>
            <span v-else>{{ user.name }}</span>
          </div>

          <div class="text-subtitle-2">
            <div v-if="!user.email" class="skeleton-text" style="width: 160px; height: 14px"></div>
            <span v-else>{{ user.email }}</span>
          </div>
        </div>
      </v-sheet>

      <v-list nav density="comfortable">
        <v-list-item
          v-for="menu in itens"
          :key="menu.value"
          :to="{ name: menu.value }"
          :prepend-icon="menu.icon"
          :title="menu.title"
          color="primary"
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
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useNotifications } from '@/composables/useNotifications'
import { useTheme } from 'vuetify'
import useAuth from '@/composables/useAuth'

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}
const router = useRouter()
const { doLogout, getUser } = useAuth()
const notification = useNotifications()
const { mdAndUp } = useDisplay()

const drawer = ref(mdAndUp.value)
const logoutDialog = ref(false)
const loggingOut = ref(false)

watch(mdAndUp, (isDesktop) => {
  drawer.value = isDesktop
})

const defaultAvatar = '/undraw/avatar.svg'
const user = ref({ name: '', email: '' })

const getUserData = async () => {
  try {
    const response = await getUser()
    if (response.success) {
      user.value = response.data
    }
  } catch {
    notification.notifyError('Erro ao carregar dados do usuário')
  }
}

const itens = [
  { title: 'Dashboard', value: 'dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Categorias', value: 'categories', icon: 'mdi-format-list-bulleted' },
  { title: 'Produtos', value: 'products', icon: 'mdi-package-variant' },
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

onMounted(getUserData)
</script>
<style scoped>
.skeleton-avatar,
.skeleton-text {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

/* Animação de loading */
.skeleton-avatar::after,
.skeleton-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  to {
    left: 100%;
  }
}
</style>
