<template>
  <div>
    <h1 class="nds-mb-lg">{{ $t('home.title') }}</h1>

    <NdsSpinner v-if="pending"
                :text="$t('common.loading')" />

    <div v-else-if="error"
         class="nds-alert nds-alert-danger">
      {{ $t('common.error') }}
    </div>

    <div v-else-if="!data?.data || data.data.length === 0"
         class="nds-text-center nds-mt-xl">
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
        <NdsCard v-for="permit in data.data"
                 :key="permit.id"
                 :hover="false">
          <div class="card-content">
            <h3 class="nds-mb-sm">{{ permit.applicant_name }}</h3>
            <p class="nds-text-secondary nds-mb-sm">{{ permit.applicant_email }}</p>
            <p class="nds-mb-md">{{ permit.permit_type }}</p>
            <div class="nds-flex nds-flex-between-center nds-mb-md">
              <NdsStatusBadge :status="permit.application_status">
                {{ $t(`status.${permit.application_status}`) }}
              </NdsStatusBadge>
              <small class="nds-text-secondary">
                {{ new Date(permit.submitted_at).toLocaleDateString($i18n.locale) }}
              </small>
            </div>
            <div class="card-actions">
              <NdsButton variant="primary"
                         class="nds-btn-sm"
                         @click="navigateTo(`/permit/${permit.id}`)">
                {{ $t('list.view') }}
              </NdsButton>
              <NdsButton variant="outline"
                         class="nds-btn-sm"
                         @click="navigateTo(`/permit/${permit.id}?edit=true`)">
                {{ $t('list.edit') }}
              </NdsButton>
            </div>
          </div>
        </NdsCard>
      </div>

      <NdsPagination v-if="data"
                     :current-page="currentPage"
                     :total-pages="data.meta.totalPages"
                     :has-next-page="data.meta.hasNextPage"
                     @update:current-page="changePage" />
    </div>
  </div>
</template>

<script setup
        lang="ts">
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
