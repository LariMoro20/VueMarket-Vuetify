<template>
  <v-card elevation="1" class="metric-card" rounded="xl">
    <v-card-text class="pa-5">
      <div class="d-flex justify-space-between align-center">
        <div>
          <div class="text-subtitle-2 text-medium-emphasis mb-1">
            {{ title }}
          </div>

          <div class="text-h4 font-weight-bold metric-value">
            {{ value }}
          </div>
        </div>

        <v-avatar :color="color" variant="tonal" size="56">
          <v-icon size="28">
            {{ icon }}
          </v-icon>
        </v-avatar>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  color: {
    type: String,
    default: 'primary',
  },
})
</script>

<style scoped>
.metric-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  transition: all 0.25s ease;
}

.metric-value {
  line-height: 1.2;
  letter-spacing: -0.5px;
}
</style>
