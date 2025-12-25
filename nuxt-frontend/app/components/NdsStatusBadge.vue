<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: 'Pending' | 'Approved' | 'Rejected';
}

const props = defineProps<Props>();

const badgeClasses = computed(() => {
  const statusMap = {
    'Pending': 'nds-status--pending nds-status--warning',
    'Approved': 'nds-status--approved nds-status--success',
    'Rejected': 'nds-status--rejected nds-status--danger'
  };
  
  return [
    'nds-badge',
    statusMap[props.status]
  ];
});
</script>
