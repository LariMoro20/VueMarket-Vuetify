<template>
  <ContainerDefault>
    <PageHeader title="Dashboard" subtitle="Visão geral do seu estoque" />

    <div v-if="loading">
      <v-row class="mb-4">
        <v-col v-for="i in 4" :key="i" cols="12" sm="6" md="3">
          <v-skeleton-loader type="card" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" lg="8">
          <v-skeleton-loader type="card" class="mb-4" />

          <v-skeleton-loader type="table" />
        </v-col>

        <v-col cols="12" lg="4">
          <v-skeleton-loader type="card" />
        </v-col>
      </v-row>
    </div>

    <v-alert v-else-if="error" type="error" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>

    <div v-else>
      <v-row class="mb-4">
        <v-col v-for="(card, index) in metricCards" :key="index" cols="12" sm="6" md="3">
          <MetricCard
            :title="card.title"
            :value="card.value"
            :icon="card.icon"
            :color="card.color"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" lg="8">
          <v-card elevation="2">
            <v-card-title class="d-flex justify-space-between align-center">
              <span class="text-h6">Produtos Recentes</span>
              <v-btn color="primary" variant="text" size="small"> Ver todos </v-btn>
            </v-card-title>
            <v-divider />
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
                    <td class="font-weight-medium">
                      {{ product.name }}
                    </td>
                    <td>
                      <v-chip size="small" variant="flat" color="primary">
                        {{ product.categoryName }}
                      </v-chip>
                    </td>
                    <td class="text-medium-emphasis">
                      {{ product.formattedDate }}
                    </td>
                    <td>
                      <ChipStatus :status="product.status" />
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>

          <v-card elevation="2" class="mt-4">
            <v-card-title class="text-h6"> Distribuição por Categoria </v-card-title>
            <v-divider />
            <v-card-text>
              <div v-for="cat in categoryDistribution" :key="cat.name" class="mb-4">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="font-weight-medium">
                    {{ cat.name }}
                  </span>
                  <span class="text-medium-emphasis"> {{ cat.count }} produtos </span>
                </div>
                <v-progress-linear
                  :model-value="(cat.count / metrics.totalProducts) * 100"
                  :color="cat.color"
                  height="8"
                  rounded
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <QuickActionsCard @has-change="getDashData" />
      </v-row>
    </div>
  </ContainerDefault>
</template>

<script setup>
import useDashboard from '@/composables/useDashboard'
const { getDashboardData } = useDashboard()

const loading = ref(true)
const error = ref(null)

const metrics = ref({
  totalProducts: 0,
  totalCategories: 0,
  activeProducts: 0,
  totalValue: 0,
})

const recentProducts = ref([])
const categoryDistribution = ref([])
const metricCards = computed(() => [
  {
    title: 'Total de Produtos',
    value: metrics.value.totalProducts,
    icon: 'mdi-package-variant',
    color: 'primary',
  },
  {
    title: 'Categorias',
    value: metrics.value.totalCategories,
    icon: 'mdi-format-list-bulleted',
    color: 'success',
  },
  {
    title: 'Produtos Ativos',
    value: metrics.value.activeProducts,
    icon: 'mdi-check-circle',
    color: 'warning',
  },
  {
    title: 'Valor Total',
    value: `R$ ${metrics.value.totalValue.toFixed(2)}`,
    icon: 'mdi-currency-brl',
    color: 'error',
  },
])

const getDashData = async () => {
  loading.value = true
  const response = await getDashboardData()
  if (!response.success) {
    error.value = response.error
    loading.value = false
    return
  }
  metrics.value = response.metrics
  recentProducts.value = response.recentProducts
  categoryDistribution.value = response.categoryDistribution
  loading.value = false
}
onMounted(async () => {
  getDashData()
})
</script>

<style scoped></style>
