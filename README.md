# 🛒 VueMarket

Plataforma de gerenciamento de estoque desenvolvida durante o **[VueExpert](https://cursovuejs.com.br/) - Módulo Vuetify**, utilizando as melhores práticas com Vue 3, Vuetify 3 e arquitetura escalável.

## 🚀 Tecnologias

- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progressivo
- **[Vuetify 3](https://vuetifyjs.com/)** - Framework de componentes Material Design
- **[Vue Router 4](https://router.vuejs.org/)** - Gerenciamento de rotas oficial
- **[Axios](https://axios-http.com/)** - Cliente HTTP baseado em Promises
- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápido
- **[ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)** - Qualidade e formatação de código

## ✨ Características

- ⚡ Hot Module Replacement (HMR) com Vite
- 🎨 Componentes Material Design prontos com Vuetify 3
- 📦 Auto-import de composables Vue (`ref`, `computed`, etc)
- 🔧 Auto-import de componentes locais
- 🎭 Ícones Material Design (@mdi/font)
- 🔐 Sistema de autenticação com interceptors
- 📝 Validações de formulário reutilizáveis
- 🏗️ Arquitetura em camadas (UI → Composables → HTTP Client)
- 🎯 Respostas HTTP padronizadas
- 🖼️ Ilustrações personalizadas com [unDraw](https://undraw.co/)

## 🛠️ Configuração do Ambiente

### IDE Recomendada

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - ⚠️ **Importante:** Desabilite a extensão Vetur se estiver instalada

### Ferramentas do Navegador

- **Chrome/Edge/Brave:** [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox:** [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 📦 Instalação

```bash
# 1. Criar projeto Vue
npm create vue@latest
cd vuemarket
npm install

# 2. Instalar Vuetify e dependências
npm i vuetify

# 3. Configurar fontes
npm i --save-dev unplugin-fonts
npm i @fontsource/roboto

# 4. Ícones Material Design
npm install @mdi/font -D

# 5. Plugins de auto-import
npm i -D unplugin-auto-import
npm i -D unplugin-vue-components

# 6. Cliente HTTP
npm i axios@latest
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🏃 Como Executar

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Executar linter
npm run format   # Formatar código
```

## ⚙️ Configuração

### Vite Config

O `vite.config.js` configura todos os plugins necessários. Veja o arquivo completo para detalhes sobre:

- Auto-import de composables Vue
- Auto-import de componentes locais
- Configuração de fontes Roboto
- Alias `@` para `src/`

### ESLint Config

O `eslint.config.js` está configurado para reconhecer imports automáticos e seguir as melhores práticas Vue.

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Pastas

```
src/
├── components/       # Componentes reutilizáveis
├── composables/      # Lógica de negócio (useUsers, useFormRules)
├── layouts/          # Layouts da aplicação
├── lib/              # Configurações externas (axios)
├── pages/            # Páginas/Views
├── router/           # Rotas
└── utils/            # Utilitários (httpResponse)
```

### 🔌 Camadas da Aplicação

**1. Client HTTP (`src/lib/axios.js`)**

- Configuração centralizada do Axios
- Interceptors para autenticação
- Timeout e baseURL configuráveis

**2. Composables (`src/composables/`)**

- Encapsulam chamadas HTTP
- Tratamento de erros
- Retorno padronizado via `httpResponse.js`

**3. Components/Pages**

- Consomem composables
- Livres de lógica HTTP direta
- Validações via `useFormRules`

### 📊 Padronização de Respostas

Todas as respostas HTTP seguem o padrão definido em `src/utils/httpResponse.js`:

```javascript
{
  success: boolean,  // Indica sucesso da operação
  data: any,        // Payload da API
  status: number,   // Código HTTP
  message: string   // Mensagem de erro (se houver)
}
```

### 📝 Validações de Formulário

O composable `useFormRules.js` centraliza validações reutilizáveis:

- Campo obrigatório
- Tamanho mínimo
- Formato de email
- Senha forte (8+ caracteres, maiúscula, minúscula, número, caractere especial)

**Exemplo de uso:**

```vue
<script setup>
import { useFormRules } from '@/composables/useFormRules'

const rules = useFormRules()
const email = ref('')
</script>

<template>
  <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Email" />
</template>
```

Veja `src/pages/RegisterPage.vue` para um exemplo completo.

## 💡 Decisões de Design

### Por que composables ao invés de copiar código?

Centralizar validações e lógica HTTP em composables reutilizáveis evita duplicação, facilita manutenção e testes.

### Por que separar httpResponse.js?

Padronizar respostas elimina `try/catch` repetitivos nos componentes e garante consistência.

### Por que usar unDraw?

Ilustrações SVG gratuitas, customizáveis e de alta qualidade que melhoram a experiência visual.

## 📖 Documentação

- [Documentação do Vue 3](https://vuejs.org/)
- [Componentes Vuetify](https://vuetifyjs.com/en/components/all/)
- [Guia de instalação Vuetify](https://vuetifyjs.com/en/getting-started/installation/)
- [Ícones Material Design](https://pictogrammers.com/library/mdi/)
- [Ilustrações unDraw](https://undraw.co/)

---

Desenvolvido com ❤️ durante o curso **[VueExpert](https://cursovuejs.com.br/)**