<template>
  <span :class="badgeClasses" class="nds-status-badge">
    <i :class="statusIcon" class="status-icon"></i>
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: 'Pending' | 'Approved' | 'Rejected';
}

const props = defineProps<Props>();

const statusIcon = computed(() => {
  const iconMap = {
    'Pending': 'fa fa-clock',
    'Approved': 'fa fa-check-circle',
    'Rejected': 'fa fa-times-circle'
  };
  return iconMap[props.status];
});

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

<style scoped>
.nds-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.status-icon {
  font-size: 0.875em;
}
</style>
