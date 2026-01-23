<template>
  <div class="mb-4">
    <div class="d-flex justify-space-between align-start">
      <div>
        <h1 class="text-h4 font-weight-bold mb-1">
          {{ title }}
        </h1>

        <p v-if="subtitle" class="text-subtitle-1 text-medium-emphasis">
          {{ subtitle }}
        </p>
      </div>

      <slot></slot>
    </div>
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
