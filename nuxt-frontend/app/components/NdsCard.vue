<template>
  <div class="nds-card" :class="{ 'nds-card-hover': hover }">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean;
}

withDefaults(defineProps<Props>(), {
  hover: true
});
</script>

<style scoped>
.nds-card-hover {
  cursor: pointer;
}
</style>
