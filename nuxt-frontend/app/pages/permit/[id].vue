<template>
  <div>
    <NdsSpinner v-if="pending" :text="$t('common.loading')" />

    <div v-else-if="error" class="nds-alert nds-alert-danger">
      {{ $t('common.error') }}
    </div>

    <div v-else-if="permit">
      <div class="nds-flex nds-flex-between nds-mb-lg">
        <h1>{{ isEditing ? $t('permit.edit') : $t('permit.title') }}</h1>
        <div class="nds-flex" style="gap: var(--nds-spacing-sm);">
          <NuxtLink @click="cancelEdit">
            <NdsButton variant="outline">{{ $t('permit.back') }}</NdsButton>
          </NuxtLink>
          <NdsButton 
            v-if="!isEditing"
            variant="primary"
            @click="isEditing = true"
          >
            {{ $t('list.edit') }}
          </NdsButton>
        </div>
      </div>

      <div v-if="successMessage" class="nds-alert nds-alert-success">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="nds-alert nds-alert-danger">
        {{ errorMessage }}
      </div>

      <NdsCard :hover="false">
        <form v-if="isEditing" @submit.prevent="saveChanges">
          <NdsInput
            v-model="form.applicant_name"
            :label="$t('permit.applicantName')"
            required
          />

          <NdsInput
            v-model="form.applicant_email"
            type="email"
            :label="$t('permit.applicantEmail')"
            required
          />

          <NdsInput
            v-model="form.permit_type"
            :label="$t('permit.permitType')"
            required
          />

          <NdsSelect
            v-model="form.application_status"
            :label="$t('permit.status')"
            :options="statusOptions"
            required
          />

          <div class="nds-flex" style="gap: var(--nds-spacing-md); margin-block-start: var(--nds-spacing-lg);">
            <NdsButton type="submit" variant="success" :loading="submitting">
              {{ $t('permit.save') }}
            </NdsButton>
            <NdsButton type="button" variant="outline" @click="cancelEdit">
              {{ $t('permit.cancel') }}
            </NdsButton>
          </div>
        </form>

        <div v-else class="permit-details">
          <div class="detail-row">
            <strong>{{ $t('list.id') }}:</strong>
            <span>{{ permit.id }}</span>
          </div>
          <div class="detail-row">
            <strong>{{ $t('permit.applicantName') }}:</strong>
            <span>{{ permit.applicant_name }}</span>
          </div>
          <div class="detail-row">
            <strong>{{ $t('permit.applicantEmail') }}:</strong>
            <span>{{ permit.applicant_email }}</span>
          </div>
          <div class="detail-row">
            <strong>{{ $t('permit.permitType') }}:</strong>
            <span>{{ permit.permit_type }}</span>
          </div>
          <div class="detail-row">
            <strong>{{ $t('permit.status') }}:</strong>
            <NdsStatusBadge :status="permit.application_status">
              {{ $t(`status.${permit.application_status}`) }}
            </NdsStatusBadge>
          </div>
          <div class="detail-row">
            <strong>{{ $t('permit.submittedAt') }}:</strong>
            <span>{{ new Date(permit.submitted_at).toLocaleString($i18n.locale) }}</span>
          </div>
          <div class="detail-row">
            <strong>{{ $t('permit.updatedAt') }}:</strong>
            <span>{{ new Date(permit.updated_at).toLocaleString($i18n.locale) }}</span>
          </div>
        </div>
      </NdsCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PermitApplication, UpdatePermitDto } from '~/types/permit';

const route = useRoute();
const { t } = useI18n();

const permitId = route.params.id;

const { data: permit, pending, error, refresh } = await useFetch<PermitApplication>(`/api/permits/${permitId}`);

const isEditing = ref(route.query.edit === 'true');
const submitting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const form = ref<UpdatePermitDto>({
  applicant_name: '',
  applicant_email: '',
  permit_type: '',
  application_status: undefined
});

const statusOptions = [
  { value: 'Pending', label: t('status.Pending') },
  { value: 'Approved', label: t('status.Approved') },
  { value: 'Rejected', label: t('status.Rejected') }
];

watch(permit, (newPermit) => {
  if (newPermit) {
    form.value = {
      applicant_name: newPermit.applicant_name,
      applicant_email: newPermit.applicant_email,
      permit_type: newPermit.permit_type,
      application_status: newPermit.application_status as 'Pending' | 'Approved' | 'Rejected'
    };
  }
}, { immediate: true });

const saveChanges = async () => {
  submitting.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await $fetch(`/api/permits/${permitId}`, {
      method: 'PATCH',
      body: form.value
    });

    successMessage.value = t('permit.success');
    isEditing.value = false;
    await refresh();
  } catch (error: any) {
    errorMessage.value = error.data?.message || t('permit.error');
  } finally {
    submitting.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  if (permit.value) {
    form.value = {
      applicant_name: permit.value.applicant_name,
      applicant_email: permit.value.applicant_email,
      permit_type: permit.value.permit_type,
      application_status: permit.value.application_status
    };
  }
};
</script>
