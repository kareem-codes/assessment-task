<template>
  <div class="nds-form-group">
    <label v-if="label" :for="selectId" class="nds-label">
      {{ label }}
      <span v-if="required" style="color: var(--nds-color-danger)">*</span>
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      class="nds-input"
      @change="handleChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue?: string | number;
  label?: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  required: false,
  disabled: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`);

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>
