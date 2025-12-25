<template>
  <div class="nds-form-group">
    <label v-if="label" :for="inputId" class="nds-label">
      {{ label }}
      <span v-if="required" style="color: var(--nds-color-danger)">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="nds-input"
      @input="handleInput"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.error-message {
  display: block;
  color: var(--nds-color-danger);
  font-size: var(--nds-font-size-sm);
  margin-block-start: var(--nds-spacing-xs);
}
</style>
