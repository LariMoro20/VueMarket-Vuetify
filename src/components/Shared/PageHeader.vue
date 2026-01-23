<template>
  <div class="page-header">
    <div class="d-flex justify-space-between align-center flex-wrap gap-2">
      <div>
        <h1 class="text-h4 font-weight-bold">
          {{ title }}
        </h1>

        <p v-if="subtitle" class="text-subtitle-2 text-medium-emphasis mt-1">
          {{ subtitle }}
        </p>
      </div>

      <div class="page-header__actions">
        <slot />
      </div>
    </div>

    <v-divider class="mt-4" />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.page-header {
  margin-bottom: 24px;
}

.page-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
