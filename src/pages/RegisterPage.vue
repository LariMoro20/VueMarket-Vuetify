<template>
  <v-container class="pa-sm-4 pa-md-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" md="6" sm="12">
        <div class="text-center">
          <v-img
            class="mx-auto mb-4"
            max-width="300"
            max-height="300"
            src="/undraw/registerpage.svg"
          ></v-img>
          <h1 class="text-primary mb-1">Vue Market</h1>
          <p class="text-grey-darken-1">Sua plataforma de gerenciamento de estoque</p>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-center" md="6" sm="12">
        <div class="w-100" style="max-width: 400px">
          <v-form class="d-flex flex-column ga-3" v-model="valid" @submit.prevent="handleSubmit">
            <div class="text-center mb-6">
              <h2 class="text-primary mb-1">Registrar</h2>
              <p class="text-grey-darken-1">Cadastre-se para começar a usar</p>
              <small v-if="!valid">Preencha todos os campos corretamente.</small>
            </div>
            <v-text-field
              :rules="[rules.required]"
              label="Nome"
              v-model="formData.name"
              required
              variant="outlined"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.email]"
              label="Email"
              v-model="formData.email"
              required
              variant="outlined"
            ></v-text-field>

            <v-text-field
              :rules="[rules.required, rules.password]"
              label="Senha"
              v-model="formData.password"
              required
              variant="outlined"
              :append-inner-icon="showpassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showpassword ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              @click:append-inner="showpassword = !showpassword"
            ></v-text-field>
            <v-btn block class="mb-3" color="primary" size="large" type="submit" :disabled="!valid"
              >Registrar</v-btn
            >
            <div class="text-center mb-3">Tem uma conta?</div>
            <v-btn block color="primary" size="large" :to="{ name: 'login' }" variant="outlined"
              >Faça login</v-btn
            >
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useFormRules } from '@/composables/useFormRules'
import useUsers from '@/composables/useUsers'
import { useRouter } from 'vue-router'
const { createUser, loading, error } = useUsers()
const valid = ref(false)
const rules = useFormRules()
const router = useRouter()
const formData = ref({
  name: '',
  password: '',
  email: '',
})

const showpassword = ref(false)
async function handleSubmit() {
  try {
    await createUser(formData.value).then((e) => {
      router.push({ name: 'login' })
    })
  } catch (e) {
    console.log('erro', e)
  }
}
</script>
