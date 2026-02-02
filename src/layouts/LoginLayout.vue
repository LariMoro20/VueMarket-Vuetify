<template>
  <v-layout class="auth-layout">
    <v-app-bar elevation="0" class="auth-navbar">
      <v-toolbar-title color="primary" class="text-h6 font-weight-bold">
        VuEstoque
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleTheme" size="small">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: var(--bg-secondary);
}

.auth-navbar {
  background: var(--bg-primary) !important;
  border-bottom: var(--border-width) solid var(--border-color);
}

:deep(.v-main) {
  min-height: calc(100vh - 64px);
}
</style>
