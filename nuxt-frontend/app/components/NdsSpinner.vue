<template>
  <div class="nds-spinner-container">
    <div class="nds-spinner-large"></div>
    <p v-if="text" class="nds-mt-md">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
}

defineProps<Props>();
</script>

<style scoped>
.nds-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--nds-spacing-2xl);
}

.nds-spinner-large {
  width: 48px;
  height: 48px;
  border: 4px solid var(--nds-color-border);
  border-radius: 50%;
  border-top-color: var(--nds-color-primary);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
