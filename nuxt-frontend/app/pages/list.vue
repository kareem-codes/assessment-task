<template>
    <div>
        <h1 class="nds-mb-lg">{{ $t('list.title') }}</h1>

        <NdsSpinner v-if="pending"
                    :text="$t('common.loading')" />

        <div v-else-if="error"
             class="nds-alert nds-alert-danger">
            {{ $t('common.error') }}
        </div>

        <div v-else>
            <div class="nds-mb-lg">
                <div class="nds-flex nds-flex-gap-md nds-mb-md">
                    <NdsInput v-model="searchQuery"
                              :placeholder="$t('list.search')"
                              class="nds-input-search table-search"
                              style="flex: 1;" />

                    <div class="nds-form-group"
                         style="min-width: 150px;">
                        <select v-model="statusFilter"
                                class="nds-input">
                            <option value="">{{ $t('list.allStatuses') }}</option>
                            <option value="Pending">{{ $t('status.Pending') }}</option>
                            <option value="Approved">{{ $t('status.Approved') }}</option>
                            <option value="Rejected">{{ $t('status.Rejected') }}</option>
                        </select>
                    </div>
                </div>

                <div class="nds-flex nds-flex-gap-md nds-mb-md">
                    <div class="nds-flex nds-flex-gap-sm"
                         style="flex: 1;">
                        <NdsInput v-model="dateFrom"
                                  type="date"
                                  :placeholder="$t('list.dateFrom')"
                                  style="flex: 1;" />
                        <NdsInput v-model="dateTo"
                                  type="date"
                                  :placeholder="$t('list.dateTo')"
                                  style="flex: 1;" />
                    </div>

                    <div class="nds-flex nds-flex-gap-md">
                        <NdsButton variant="outline"
                                   @click="clearFilters">
                            {{ $t('list.clearFilters') }}
                        </NdsButton>
                        <NdsButton v-if="selectedIds.length > 0"
                                   variant="danger"
                                   @click="deleteSelected">
                            {{ $t('list.deleteSelected') }} ({{ selectedIds.length }})
                        </NdsButton>
                    </div>
                </div>
            </div>

            <div class="nds-table-wrapper nds-overflow-auto">
                <table class="nds-table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox"
                                       :checked="allSelected"
                                       @change="toggleSelectAll" />
                            </th>
                            <th>{{ $t('list.applicantName') }}</th>
                            <th>{{ $t('list.applicantEmail') }}</th>
                            <th>{{ $t('list.permitType') }}</th>
                            <th>{{ $t('list.status') }}</th>
                            <th>{{ $t('list.submittedAt') }}</th>
                            <th>{{ $t('list.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="permit in data.data"
                            :key="permit.id">
                            <td>
                                <input type="checkbox"
                                       :checked="selectedIds.includes(permit.id)"
                                       @change="toggleSelect(permit.id)" />
                            </td>
                            <td>
                                {{ permit.applicant_name }}
                            </td>
                            <td>{{ permit.applicant_email }}</td>
                            <td>{{ permit.permit_type }}</td>
                            <td>
                                <NdsStatusBadge :status="permit.application_status">
                                    {{ $t(`status.${permit.application_status}`) }}
                                </NdsStatusBadge>
                            </td>
                            <td>{{ new Date(permit.submitted_at).toLocaleDateString($i18n.locale) }}</td>
                            <td>
                                <div class="nds-flex nds-flex-gap-sm nds-flex-nowrap">
                                    <NdsButton variant="outline"
                                               class="nds-btn-sm"
                                               @click="$router.push(`/permit/${permit.id}`)">
                                        {{ $t('list.view') }}
                                    </NdsButton>
                                    <NdsButton variant="secondary"
                                               class="nds-btn-sm"
                                               @click="$router.push(`/permit/${permit.id}?edit=true`)">
                                        {{ $t('list.edit') }}
                                    </NdsButton>

                                    <NdsButton variant="danger"
                                               class="nds-btn-sm"
                                               @click="deletePermit(permit.id)">
                                        {{ $t('list.delete') }}
                                    </NdsButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
        import type { PermitsResponse, PermitApplication } from '~/types/permit';

        const { t } = useI18n();

        const currentPage = ref(1);
        const limit = ref(10);
        const searchQuery = ref('');
        const debouncedSearchQuery = ref('');
        const statusFilter = ref('');
        const dateFrom = ref('');
        const dateTo = ref('');
        const selectedIds = ref<number[]>([]);

        let searchTimeout: NodeJS.Timeout | null = null;
        watch(searchQuery, (newValue) => {
            if (searchTimeout) clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                debouncedSearchQuery.value = newValue;
                currentPage.value = 1;
            }, 500);
        });

        const queryParams = computed(() => ({
            page: currentPage.value,
            limit: limit.value,
            ...(debouncedSearchQuery.value && { search: debouncedSearchQuery.value }),
            ...(statusFilter.value && { status: statusFilter.value }),
            ...(dateFrom.value && { dateFrom: dateFrom.value }),
            ...(dateTo.value && { dateTo: dateTo.value })
        }));

        const { data, pending, error, refresh } = await useFetch<PermitsResponse>('/api/permits', {
            query: queryParams,
            watch: [currentPage, limit, debouncedSearchQuery, statusFilter, dateFrom, dateTo]
        });

        const allSelected = computed(() => {
            return data.value?.data.length > 0 &&
                data.value.data.every((p: PermitApplication) => selectedIds.value.includes(p.id));
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
                selectedIds.value = data.value?.data.map((p: PermitApplication) => p.id) || [];
            }
        };

        const clearFilters = () => {
            searchQuery.value = '';
            debouncedSearchQuery.value = '';
            statusFilter.value = '';
            dateFrom.value = '';
            dateTo.value = '';
            currentPage.value = 1;
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
