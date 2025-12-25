<template>
  <div>
    <h1 class="nds-mb-lg">{{ $t('list.title') }}</h1>

    <NdsSpinner v-if="pending" :text="$t('common.loading')" />

    <div v-else-if="error" class="nds-alert nds-alert-danger">
      {{ $t('common.error') }}
    </div>

    <div v-else>
      <div class="nds-flex nds-flex-between nds-mb-lg">
        <NdsInput
          v-model="searchQuery"
          :placeholder="$t('list.search')"
          style="max-width: 300px;"
        />
        <div class="nds-flex" style="gap: var(--nds-spacing-md);">
          <NdsButton 
            v-if="selectedIds.length > 0" 
            variant="danger"
            @click="deleteSelected"
          >
            {{ $t('list.deleteSelected') }} ({{ selectedIds.length }})
          </NdsButton>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="nds-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  :checked="allSelected"
                  @change="toggleSelectAll"
                />
              </th>
              <th>{{ $t('list.id') }}</th>
              <th>{{ $t('list.applicantName') }}</th>
              <th>{{ $t('list.applicantEmail') }}</th>
              <th>{{ $t('list.permitType') }}</th>
              <th>{{ $t('list.status') }}</th>
              <th>{{ $t('list.submittedAt') }}</th>
              <th>{{ $t('list.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="permit in filteredPermits" :key="permit.id">
              <td>
                <input 
                  type="checkbox" 
                  :checked="selectedIds.includes(permit.id)"
                  @change="toggleSelect(permit.id)"
                />
              </td>
              <td>{{ permit.id }}</td>
              <td>{{ permit.applicant_name }}</td>
              <td>{{ permit.applicant_email }}</td>
              <td>{{ permit.permit_type }}</td>
              <td>
                <NdsStatusBadge :status="permit.application_status">
                  {{ $t(`status.${permit.application_status}`) }}
                </NdsStatusBadge>
              </td>
              <td>{{ new Date(permit.submitted_at).toLocaleDateString($i18n.locale) }}</td>
              <td>
                <div class="nds-flex" style="gap: var(--nds-spacing-sm);">
                  <NuxtLink :to="`/permit/${permit.id}`">
                    <NdsButton variant="primary" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">
                      {{ $t('list.view') }}
                    </NdsButton>
                  </NuxtLink>
                  <NdsButton 
                    variant="danger" 
                    style="padding: 0.25rem 0.75rem; font-size: 0.875rem;"
                    @click="deletePermit(permit.id)"
                  >
                    {{ $t('list.delete') }}
                  </NdsButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="data?.meta.totalPages && data.meta.totalPages > 1" class="nds-flex nds-flex-center nds-mt-lg" style="gap: var(--nds-spacing-sm);">
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
import type { PermitsResponse, PermitApplication } from '~/types/permit';

const { t } = useI18n();

const currentPage = ref(1);
const limit = ref(10);
const searchQuery = ref('');
const selectedIds = ref<number[]>([]);

const { data, pending, error, refresh } = await useFetch<PermitsResponse>('/api/permits', {
  query: {
    page: currentPage,
    limit
  },
  watch: [currentPage, limit]
});

const filteredPermits = computed(() => {
  if (!data.value?.data) return [];
  
  if (!searchQuery.value) return data.value.data;
  
  const query = searchQuery.value.toLowerCase();
  return data.value.data.filter((permit: PermitApplication) => 
    permit.applicant_name.toLowerCase().includes(query) ||
    permit.applicant_email.toLowerCase().includes(query) ||
    permit.permit_type.toLowerCase().includes(query) ||
    permit.application_status.toLowerCase().includes(query)
  );
});

const allSelected = computed(() => {
  return filteredPermits.value.length > 0 && 
    filteredPermits.value.every((p: PermitApplication) => selectedIds.value.includes(p.id));
});

const toggleSelect = (id: number) => {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(id);
  }
};

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedIds.value = [];
  } else {
    selectedIds.value = filteredPermits.value.map((p: PermitApplication) => p.id);
  }
};

const deletePermit = async (id: number) => {
  if (!confirm(t('common.confirm'))) return;
  
  try {
    await $fetch(`/api/permits/${id}`, { method: 'DELETE' });
    await refresh();
  } catch (error) {
    alert(t('common.error'));
  }
};

const deleteSelected = async () => {
  if (!confirm(t('common.confirm'))) return;
  
  try {
    await Promise.all(
      selectedIds.value.map(id => $fetch(`/api/permits/${id}`, { method: 'DELETE' }))
    );
    selectedIds.value = [];
    await refresh();
  } catch (error) {
    alert(t('common.error'));
  }
};

const changePage = (page: number) => {
  currentPage.value = page;
};
</script>
