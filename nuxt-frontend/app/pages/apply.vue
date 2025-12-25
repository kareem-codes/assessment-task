<template>
  <div>
    <h1 class="nds-mb-lg">{{ $t('apply.title') }}</h1>

    <div v-if="successMessage" class="nds-alert nds-alert-success">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="nds-alert nds-alert-danger">
      {{ errorMessage }}
    </div>

    <NdsCard :hover="false">
      <form @submit.prevent="submitForm">
        <NdsInput
          v-model="form.applicant_name"
          :label="$t('apply.applicantName')"
          :placeholder="$t('apply.applicantName')"
          required
        />

        <NdsInput
          v-model="form.applicant_email"
          type="email"
          :label="$t('apply.applicantEmail')"
          :placeholder="$t('apply.applicantEmail')"
          required
        />

        <NdsInput
          v-model="form.permit_type"
          :label="$t('apply.permitType')"
          :placeholder="$t('apply.permitType')"
          required
        />

        <div class="nds-flex nds-flex-gap-md nds-mt-lg">
          <NdsButton type="submit" variant="primary" :loading="submitting">
            {{ $t('apply.submit') }}
          </NdsButton>
          <NuxtLink to="/">
            <NdsButton type="button" variant="outline">
              {{ $t('permit.cancel') }}
            </NdsButton>
          </NuxtLink>
        </div>
      </form>
    </NdsCard>
  </div>
</template>

<script setup lang="ts">
import type { CreatePermitDto } from '~/types/permit';

const { t } = useI18n();

const form = ref<CreatePermitDto>({
  applicant_name: '',
  applicant_email: '',
  permit_type: ''
});

const submitting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const submitForm = async () => {
  submitting.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await $fetch('/api/permits', {
      method: 'POST',
      body: form.value
    });

    successMessage.value = t('apply.success');
    
    form.value = {
      applicant_name: '',
      applicant_email: '',
      permit_type: ''
    };

    setTimeout(() => {
      navigateTo('/');
    }, 2000);
  } catch (error: any) {
    errorMessage.value = error.data?.message || t('apply.error');
  } finally {
    submitting.value = false;
  }
};
</script>
