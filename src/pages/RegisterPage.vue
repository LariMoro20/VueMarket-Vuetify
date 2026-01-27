<template>
  <v-container class="register-container pa-0 h-100" fluid>
    <v-btn icon class="theme-toggle" @click="toggleTheme" size="small">
      <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-row no-gutters class="h-100">
      <v-col class="left-panel d-none d-md-flex align-center justify-center" cols="12" md="6">
        <div class="text-center px-8">
          <v-img
            class="mx-auto mb-8"
            max-width="300"
            max-height="300"
            src="/undraw/registerpage.svg"
          ></v-img>
          <h1 class="text-h3 font-weight-bold mb-3 text-white">Vue Market</h1>
          <p class="text-h6 font-weight-regular text-white">
            Sua plataforma de gerenciamento de estoque
          </p>
        </div>
      </v-col>

      <v-col class="right-panel d-flex align-center justify-center" cols="12" md="6">
        <div class="form-wrapper pa-6 pa-sm-8 w-100">
          <div class="text-center mb-8 d-md-none">
            <h2 class="text-primary text-h4 font-weight-bold mb-2">Vue Market</h2>
            <p class="text-grey-darken-1">Gerenciamento de estoque</p>
          </div>

          <v-form v-model="valid" @submit.prevent="handleSubmit">
            <div class="text-center mb-8">
              <h2 class="text-h4 font-weight-bold mb-2">Criar conta</h2>
              <p class="text-body-1 text-grey-darken-1">Cadastre-se para começar a usar</p>
            </div>

            <v-text-field
              v-model="formData.name"
              :rules="[rules.required]"
              label="Nome completo"
              placeholder="Seu nome"
              variant="outlined"
              prepend-inner-icon="mdi-account-outline"
              color="primary"
              class="mb-4"
              density="comfortable"
              hide-details="auto"
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              :rules="[rules.required, rules.email]"
              label="E-mail"
              placeholder="seu@email.com"
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              color="primary"
              class="mb-4"
              density="comfortable"
              hide-details="auto"
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :rules="[rules.required, rules.password]"
              label="Senha"
              placeholder="Digite sua senha"
              variant="outlined"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showpassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showpassword ? 'text' : 'password'"
              color="primary"
              class="mb-6"
              density="comfortable"
              hide-details="auto"
              @click:append-inner="showpassword = !showpassword"
            ></v-text-field>

            <v-alert
              v-if="!valid && (formData.name || formData.email || formData.password)"
              type="warning"
              variant="tonal"
              density="compact"
              class="mb-4"
            >
              Preencha todos os campos corretamente
            </v-alert>

            <v-btn
              block
              color="primary"
              size="x-large"
              type="submit"
              :disabled="!valid"
              class="mb-4 text-none font-weight-bold"
            >
              Registrar
            </v-btn>

            <v-divider class="my-6"></v-divider>

            <v-btn
              block
              color="primary"
              size="large"
              variant="outlined"
              :to="{ name: 'login' }"
              class="text-none"
            >
              Já tem uma conta? Faça login
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useFormRules } from '@/composables/useFormRules'
import { useNotifications } from '@/composables/useNotifications'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'

const { createUser } = useAuth()
const notification = useNotifications()
const router = useRouter()
const theme = useTheme()

const valid = ref(false)
const rules = useFormRules()
const showpassword = ref(false)

const formData = ref({
  name: '',
  password: '',
  email: '',
})

const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

async function handleSubmit() {
  try {
    const { data, success, status, message } = await createUser(formData.value)
    if (success) {
      notification.notifySuccess('Cadastro realizado com sucesso!')
      router.push({ name: 'login' })
    } else {
      notification.notifyError('Houve algum problema ao cadastrar: ' + message)
    }
  } catch (e) {
    console.log('erro', e)
    notification.notifyError('Erro ao realizar cadastro. Tente novamente.')
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background: var(--bg-secondary);
}

.left-panel {
  background: var(--bg-gradient);
}

.right-panel {
  background: var(--bg-primary);
}

.form-wrapper {
  max-width: 480px;
}

:deep(.v-text-field .v-field:hover) {
  box-shadow: var(--shadow-sm);
}

:deep(.v-text-field .v-field--focused) {
  box-shadow: var(--shadow-primary);
}

:deep(.v-btn:hover:not(.v-btn--disabled)) {
  box-shadow: var(--shadow-md);
}

@media (max-width: 959px) {
  .register-container {
    background: var(--bg-primary);
  }
}

.theme-toggle {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 10;
}
</style>
