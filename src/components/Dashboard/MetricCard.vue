<template>
  <v-card elevation="2" hover>
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <div>
          <p class="text-subtitle-2 text-medium-emphasis mb-1">
            {{ title }}
          </p>

          <h2 class="text-h4 font-weight-bold">
            {{ value }}
          </h2>
        </div>

        <v-avatar :color="color" size="56">
          <v-icon size="32" color="white">
            {{ icon }}
          </v-icon>
        </v-avatar>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
})
</script>
