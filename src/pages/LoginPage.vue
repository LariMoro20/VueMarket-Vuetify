<template>
  <v-container class="login-container pa-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <!-- Painel esquerdo (branding) -->
      <v-col cols="12" md="6" class="left-panel d-none d-md-flex align-center justify-center">
        <div class="text-center px-8">
          <v-img src="/undraw/loginimage.svg" max-width="380" class="mx-auto mb-8" />

          <h1 class="text-h3 font-weight-bold mb-3 text-white">VuEstoque</h1>

          <p class="text-h6 text-white opacity-80">Sua plataforma de gerenciamento de estoque</p>
        </div>
      </v-col>

      <!-- Painel direito (formulário) -->
      <v-col cols="12" md="6" class="right-panel d-flex align-center justify-center">
        <div class="form-wrapper pa-6 pa-sm-8 w-100">
          <!-- Branding mobile -->
          <div class="text-center mb-8 d-md-none">
            <h2 class="text-h4 font-weight-bold text-primary mb-1">VuEstoque</h2>
            <p class="text-body-2 text-grey-darken-1">Gerenciamento de estoque</p>
          </div>

          <v-form v-model="valid" @submit.prevent="handleSubmit">
            <!-- Título -->
            <div class="text-center mb-8">
              <h2 class="text-h4 font-weight-bold mb-2">Bem-vindo de volta</h2>
              <p class="text-body-1 text-grey-darken-1">
                Entre com suas credenciais para continuar
              </p>
            </div>

            <!-- Email -->
            <v-text-field
              v-model="formData.email"
              label="E-mail"
              placeholder="seu@email.com"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              color="primary"
              density="comfortable"
              :rules="[rules.required, rules.email]"
              hide-details="auto"
              class="mb-4"
            />

            <!-- Senha -->
            <v-text-field
              v-model="formData.password"
              label="Senha"
              placeholder="Digite sua senha"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              color="primary"
              density="comfortable"
              :rules="[rules.required, rules.password]"
              hide-details="auto"
              class="mb-2"
              @click:append-inner="showPassword = !showPassword"
            />

            <!-- Esqueceu a senha -->
            <div class="text-right mb-6">
              <v-btn variant="text" color="secondary" size="small" class="text-caption">
                Esqueceu a senha?
              </v-btn>
            </div>

            <!-- Alerta -->
            <v-alert
              v-if="!valid && formData.email && formData.password"
              type="warning"
              variant="tonal"
              density="compact"
              class="mb-4"
            >
              Preencha todos os campos corretamente
            </v-alert>

            <!-- Entrar (ação principal) -->
            <v-btn
              block
              color="primary"
              size="x-large"
              type="submit"
              :disabled="!valid"
              class="mb-4 text-none font-weight-bold"
            >
              Entrar
            </v-btn>

            <v-divider class="my-6" />

            <!-- Criar conta (ação secundária) -->
            <v-btn
              block
              color="secondary"
              variant="outlined"
              size="large"
              :to="{ name: 'register' }"
              class="text-none"
            >
              Criar nova conta
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFormRules } from '@/composables/useFormRules'
import { useNotifications } from '@/composables/useNotifications'
import useAuth from '@/composables/useAuth'

const router = useRouter()
const { doLogin } = useAuth()
const notification = useNotifications()

const valid = ref(false)
const showPassword = ref(false)

const rules = useFormRules()

const formData = ref({
  email: '',
  password: '',
})

async function handleSubmit() {
  try {
    const { success, message } = await doLogin(formData.value)

    if (success) {
      notification.notifySuccess('Login realizado com sucesso!')
      router.push({ name: 'dashboard' })
    } else {
      notification.notifyError(message || 'Erro ao realizar login')
    }
  } catch {
    notification.notifyError('Erro inesperado ao realizar login')
  }
}
</script>

<style scoped>
/* =========================
   LAYOUT
   ========================= */
.login-container {
  background: var(--bg-secondary);
}

.left-panel {
  background: var(--color-primary);
}

.right-panel {
  background: var(--bg-primary);
}

.form-wrapper {
  max-width: 480px;
}

/* =========================
   INTERAÇÕES
   ========================= */
:deep(.v-field:hover) {
  box-shadow: var(--shadow-sm);
}

:deep(.v-field--focused) {
  box-shadow: var(--shadow-primary);
}

:deep(.v-btn:hover:not(.v-btn--disabled)) {
  box-shadow: var(--shadow-md);
}

/* =========================
   RESPONSIVO
   ========================= */
@media (max-width: 959px) {
  .login-container {
    background: var(--bg-primary);
  }
}
</style>
