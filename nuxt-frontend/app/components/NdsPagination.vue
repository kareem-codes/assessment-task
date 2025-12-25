<template>
  <div v-if="totalPages > 1"
       class="nds-flex nds-flex-center nds-flex-gap-xs nds-mt-lg"
       style="gap: 0.5rem;">
    <NdsButton variant="outline"
               :disabled="currentPage === 1"
               @click="changePage(1)"
               class="nds-btn">
      {{ $t('list.first') }}
    </NdsButton>
    <NdsButton variant="outline"
               :disabled="currentPage === 1"
               @click="changePage(currentPage - 1)"
               class="nds-btn">
      {{ $t('list.previous') }}
    </NdsButton>

    <template v-for="page in visiblePages"
              :key="page">
      <span v-if="page === '...'"
            class="nds-px-sm"
            style="display: flex; align-items: center; color: var(--nds-text-secondary);">...</span>
      <NdsButton v-else
                 :variant="page === currentPage ? 'primary' : 'outline'"
                 @click="changePage(page)"
                 class="nds-btn"
                 style="min-width: 40px;">
        {{ page }}
      </NdsButton>
    </template>

    <NdsButton variant="outline"
               :disabled="!hasNextPage"
               @click="changePage(currentPage + 1)"
               class="nds-btn">
      {{ $t('list.next') }}
    </NdsButton>
    <NdsButton variant="outline"
               :disabled="!hasNextPage"
               @click="changePage(totalPages)"
               class="nds-btn">
      {{ $t('list.last') }}
    </NdsButton>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:currentPage': [page: number];
}>();

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};

const visiblePages = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  const delta = 2;
  const pages: (number | string)[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - delta; i <= current + delta; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    }
  }

  return pages;
});
</script>
