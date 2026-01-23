<template>
  <ContainerDefault>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">Dashboard</h1>
        <p class="text-subtitle-1 text-medium-emphasis">Visão geral do seu estoque</p>
      </v-col>
    </v-row>

    <!-- Cards de Métricas -->
    <v-row class="mb-4">
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="2" hover>
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <p class="text-subtitle-2 text-medium-emphasis mb-1">Total de Produtos</p>
                <h2 class="text-h4 font-weight-bold">135</h2>
              </div>
              <v-avatar color="primary" size="56">
                <v-icon size="32" color="white">mdi-package-variant</v-icon>
              </v-avatar>
            </div>
            <div class="mt-3">
              <v-chip size="small" color="success" variant="flat">
                <v-icon start size="small">mdi-arrow-up</v-icon>
                12% este mês
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="2" hover>
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <p class="text-subtitle-2 text-medium-emphasis mb-1">Categorias</p>
                <h2 class="text-h4 font-weight-bold">5</h2>
              </div>
              <v-avatar color="success" size="56">
                <v-icon size="32" color="white">mdi-format-list-bulleted</v-icon>
              </v-avatar>
            </div>
            <div class="mt-3">
              <v-chip size="small" color="info" variant="flat"> Ativas </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="2" hover>
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <p class="text-subtitle-2 text-medium-emphasis mb-1">Estoque Baixo</p>
                <h2 class="text-h4 font-weight-bold">8</h2>
              </div>
              <v-avatar color="warning" size="56">
                <v-icon size="32" color="white">mdi-alert</v-icon>
              </v-avatar>
            </div>
            <div class="mt-3">
              <v-chip size="small" color="warning" variant="flat"> Requer atenção </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="2" hover>
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <p class="text-subtitle-2 text-medium-emphasis mb-1">Estoque Crítico</p>
                <h2 class="text-h4 font-weight-bold">3</h2>
              </div>
              <v-avatar color="error" size="56">
                <v-icon size="32" color="white">mdi-alert-circle</v-icon>
              </v-avatar>
            </div>
            <div class="mt-3">
              <v-chip size="small" color="error" variant="flat"> Ação imediata </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Produtos Recentes -->
      <v-col cols="12" lg="8">
        <v-card elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6">Produtos Recentes</span>
            <v-btn color="primary" variant="text" size="small">Ver todos</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in recentProducts" :key="product.id">
                  <td class="font-weight-medium">{{ product.name }}</td>
                  <td>
                    <v-chip size="small" variant="flat" color="primary">
                      {{ product.category }}
                    </v-chip>
                  </td>
                  <td class="text-medium-emphasis">{{ product.date }}</td>
                  <td>
                    <v-chip size="small" :color="getStatusColor(product.status)" variant="flat">
                      {{ getStatusText(product.status) }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>

        <!-- Distribuição por Categoria -->
        <v-card elevation="2" class="mt-4">
          <v-card-title class="text-h6">Distribuição por Categoria</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-for="cat in categories" :key="cat.name" class="mb-4">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="font-weight-medium">{{ cat.name }}</span>
                <span class="text-medium-emphasis">{{ cat.count }} produtos</span>
              </div>
              <v-progress-linear
                :model-value="(cat.count / 135) * 100"
                :color="cat.color"
                height="8"
                rounded
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sidebar Direita -->
      <v-col cols="12" lg="4">
        <!-- Ações Rápidas -->
        <v-card elevation="2" class="mb-4">
          <v-card-title class="text-h6">Ações Rápidas</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn block color="primary" size="large" class="mb-3" prepend-icon="mdi-plus">
              Novo Produto
            </v-btn>
            <v-btn block color="success" size="large" class="mb-3" prepend-icon="mdi-folder-plus">
              Nova Categoria
            </v-btn>
            <v-btn block variant="outlined" size="large" prepend-icon="mdi-magnify">
              Buscar Produto
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Atividades Recentes -->
        <v-card elevation="2">
          <v-card-title class="text-h6">Atividades Recentes</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-timeline side="end" density="compact" align="start">
              <v-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :dot-color="activity.color"
                size="small"
              >
                <div class="mb-3">
                  <div class="font-weight-medium">{{ activity.action }}</div>
                  <div class="text-caption text-medium-emphasis">{{ activity.item }}</div>
                  <div class="text-caption text-medium-emphasis">{{ activity.time }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </ContainerDefault>
</template>

<script setup>
// Dados dos produtos recentes
const recentProducts = ref([
  {
    id: 1,
    name: 'Notebook Dell Inspiron',
    category: 'Eletrônicos',
    date: '23/01/2026',
    status: 'normal',
  },
  { id: 2, name: 'Mouse Logitech MX', category: 'Periféricos', date: '22/01/2026', status: 'low' },
  {
    id: 3,
    name: 'Teclado Mecânico RGB',
    category: 'Periféricos',
    date: '22/01/2026',
    status: 'normal',
  },
  {
    id: 4,
    name: 'Monitor LG 27"',
    category: 'Eletrônicos',
    date: '21/01/2026',
    status: 'critical',
  },
  { id: 5, name: 'Webcam Full HD', category: 'Periféricos', date: '20/01/2026', status: 'normal' },
])

// Dados das categorias
const categories = ref([
  { name: 'Eletrônicos', count: 45, color: '#1976D2' },
  { name: 'Periféricos', count: 32, color: '#4CAF50' },
  { name: 'Móveis', count: 18, color: '#FB8C00' },
  { name: 'Papelaria', count: 28, color: '#9C27B0' },
  { name: 'Outros', count: 12, color: '#757575' },
])

// Dados das atividades recentes
const activities = ref([
  {
    action: 'Produto adicionado',
    item: 'Notebook Dell Inspiron',
    time: '2 horas atrás',
    color: 'success',
  },
  { action: 'Produto editado', item: 'Mouse Logitech MX', time: '5 horas atrás', color: 'info' },
  { action: 'Categoria criada', item: 'Acessórios', time: '1 dia atrás', color: 'primary' },
  { action: 'Produto removido', item: 'Cabo HDMI', time: '2 dias atrás', color: 'error' },
  { action: 'Produto adicionado', item: 'Cadeira Gamer', time: '3 dias atrás', color: 'success' },
])

// Métodos auxiliares
const getStatusColor = (status) => {
  const colors = {
    normal: 'success',
    low: 'warning',
    critical: 'error',
  }
  return colors[status] || 'grey'
}

const getStatusText = (status) => {
  const texts = {
    normal: 'Normal',
    low: 'Estoque Baixo',
    critical: 'Crítico',
  }
  return texts[status] || 'N/A'
}
</script>

<style scoped>
/* Estilos personalizados se necessário */
</style>
