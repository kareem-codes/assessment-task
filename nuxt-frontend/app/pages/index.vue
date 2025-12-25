<template>
  <div>
    <h1 class="nds-mb-lg">{{ $t('home.title') }}</h1>

    <NdsSpinner v-if="pending" :text="$t('common.loading')" />

    <div v-else-if="error" class="nds-alert nds-alert-danger">
      {{ $t('common.error') }}
    </div>

    <div v-else-if="!data?.data || data.data.length === 0" class="nds-text-center nds-mt-xl">
      <p class="nds-mb-lg">{{ $t('home.noPermits') }}</p>
      <NuxtLink to="/apply">
        <NdsButton variant="primary">{{ $t('nav.apply') }}</NdsButton>
      </NuxtLink>
    </div>

    <div v-else>
      <div class="nds-flex nds-flex-between nds-mb-lg">
        <div>
          <p>{{ $t('common.total') }}: {{ data.meta.total }}</p>
        </div>
        <NuxtLink to="/apply">
          <NdsButton variant="primary">{{ $t('nav.apply') }}</NdsButton>
        </NuxtLink>
      </div>

      <div class="nds-grid nds-grid-cols-3">
        <NdsCard v-for="permit in data.data" :key="permit.id" @click="navigateTo(`/permit/${permit.id}`)">
          <h3 class="nds-mb-sm">{{ permit.applicant_name }}</h3>
          <p class="nds-mb-sm">{{ permit.permit_type }}</p>
          <div class="nds-flex nds-flex-between" style="align-items: center;">
            <NdsStatusBadge :status="permit.application_status">
              {{ $t(`status.${permit.application_status}`) }}
            </NdsStatusBadge>
            <small class="nds-text-secondary">
              {{ new Date(permit.submitted_at).toLocaleDateString($i18n.locale) }}
            </small>
          </div>
        </NdsCard>
      </div>

      <div v-if="data.meta.totalPages > 1" class="nds-flex nds-flex-center nds-mt-lg" style="gap: var(--nds-spacing-sm);">
        <NdsButton 
          variant="outline" 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          {{ $t('list.previous') }}
        </NdsButton>
        <span>{{ $t('list.page') }} {{ currentPage }} {{ $t('list.of') }} {{ data.meta.totalPages }}</span>
        <NdsButton 
          variant="outline" 
          :disabled="!data.meta.hasNextPage"
          @click="changePage(currentPage + 1)"
        >
          {{ $t('list.next') }}
        </NdsButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PermitsResponse } from '~/types/permit';

const currentPage = ref(1);
const limit = ref(9);

const { data, pending, error, refresh } = await useFetch<PermitsResponse>('/api/permits', {
  query: {
    page: currentPage,
    limit
  },
  watch: [currentPage, limit]
});

const changePage = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped>
.nds-text-secondary {
  color: var(--nds-color-text-secondary);
}
</style>
