<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled || loading"
    :type="type"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="nds-spinner"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false,
  type: 'button'
});

defineEmits<{
  click: [event: MouseEvent]
}>();

const buttonClasses = computed(() => {
  return [
    'nds-btn',
    `nds-btn-${props.variant}`
  ];
});
</script>
