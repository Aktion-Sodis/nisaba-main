<template>
  <div
    class="h-screen w-screen bg-cover bg-center flex items-center justify-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <Card class="w-full max-w-md mx-auto">
      <template #title>
        {{ t('passwordreset.title') }}
      </template>
      <template #subtitle>
        {{ t('passwordreset.description') }}
      </template>
      <template #content>
        <div class="space-y-8 flex flex-col justify-center">
          <Form
            v-if="step === 1"
            v-slot="$requestForm"
            :resolver="requestFormResolver"
            :validate-on-mount="false"
            :validate-on-value-update="false"
            :validate-on-blur="false"
            :validate-on-submit="true"
            @submit="onRequestCode"
          >
            <div class="flex flex-col gap-0">
              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full mt-2">
                  <InputText id="username" name="username" class="w-full" />
                  <label for="username">
                    {{ t('passwordreset.email_placeholder') }}
                  </label>
                </FloatLabel>
                <Message
                  v-if="$requestForm.username?.invalid"
                  severity="error"
                  :closable="false"
                >
                  {{ $requestForm.username.error.message }}
                </Message>
              </div>

              <Message
                v-if="error"
                severity="error"
                :closable="false"
                class="mt-3"
              >
                {{ error }}
              </Message>

              <Button
                :label="t('passwordreset.request_code')"
                icon="pi pi-send"
                class="w-full mt-4"
                type="submit"
                fluid
                :loading="loading"
              />
            </div>
          </Form>

          <Form
            v-if="step === 2"
            v-slot="$codeForm"
            :resolver="codeFormResolver"
            :validate-on-mount="false"
            :validate-on-value-update="false"
            :validate-on-blur="false"
            :validate-on-submit="true"
            @submit="onSubmitCode"
          >
            <div class="flex flex-col gap-0">
              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full mt-2">
                  <InputText
                    id="username"
                    name="username"
                    class="w-full"
                    disabled
                    :model-value="username"
                  />
                  <label for="username">
                    {{ t('passwordreset.email_placeholder') }}
                  </label>
                </FloatLabel>
              </div>

              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full mt-2">
                  <InputText id="code" name="code" class="w-full" />
                  <label for="code">
                    {{ t('passwordreset.code_placeholder') }}
                  </label>
                </FloatLabel>
                <Message
                  v-if="$codeForm.code?.invalid"
                  severity="error"
                  :closable="false"
                >
                  {{ $codeForm.code.error.message }}
                </Message>
              </div>

              <Message
                v-if="error"
                severity="error"
                :closable="false"
                class="mt-3"
              >
                {{ error }}
              </Message>

              <Button
                :label="t('passwordreset.submit')"
                icon="pi pi-check"
                class="w-full mt-4"
                type="submit"
                fluid
                :loading="loading"
              />
            </div>
          </Form>

          <Form
            v-if="step === 3"
            v-slot="$passwordForm"
            :resolver="passwordFormResolver"
            :validate-on-mount="false"
            :validate-on-value-update="false"
            :validate-on-blur="false"
            :validate-on-submit="true"
            @submit="onResetPassword"
          >
            <div class="flex flex-col gap-0">
              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full mt-2">
                  <InputText
                    id="username"
                    name="username"
                    class="w-full"
                    disabled
                    :model-value="username"
                  />
                  <label for="username">
                    {{ t('passwordreset.email_placeholder') }}
                  </label>
                </FloatLabel>
              </div>

              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full mt-2">
                  <Password
                    id="newPassword"
                    name="newPassword"
                    :feedback="false"
                    class="w-full"
                    toggle-mask
                  />
                  <label for="newPassword">
                    {{ t('passwordreset.new_password_placeholder') }}
                  </label>
                </FloatLabel>
                <Message
                  v-if="$passwordForm.newPassword?.invalid"
                  severity="error"
                  :closable="false"
                >
                  {{ $passwordForm.newPassword.error.message }}
                </Message>
              </div>

              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full mt-2">
                  <Password
                    id="confirmPassword"
                    name="confirmPassword"
                    :feedback="false"
                    class="w-full"
                    toggle-mask
                  />
                  <label for="confirmPassword">
                    {{ t('passwordreset.confirm_password_placeholder') }}
                  </label>
                </FloatLabel>
                <Message
                  v-if="$passwordForm.confirmPassword?.invalid"
                  severity="error"
                  :closable="false"
                >
                  {{ $passwordForm.confirmPassword.error.message }}
                </Message>
              </div>

              <Message
                v-if="error"
                severity="error"
                :closable="false"
                class="mt-3"
              >
                {{ error }}
              </Message>

              <Button
                :label="t('passwordreset.reset_password')"
                icon="pi pi-check"
                class="w-full mt-4"
                type="submit"
                fluid
                :loading="loading"
              />
            </div>
          </Form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { FormSubmitEvent } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import backgroundImage from '@/assets/img/colleagues.jpg';
import { useAuthStore, AuthError } from '@/stores/auth';
import { validateUsername, validatePassword } from '@/utils/validation';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const step = ref(1);
const username = ref('');
const error = ref<string | null>(null);
const loading = ref(false);
const verificationCode = ref('');

const requestFormResolver = ({ values }: { values: any }) => {
  const errors: Record<string, { type: string; message: string }[]> = {};

  const usernameValidation = validateUsername(values.username, t);
  if (!usernameValidation.isValid) {
    errors.username = [
      {
        type: 'invalid',
        message: usernameValidation.message,
      },
    ];
  }

  return { errors };
};

const codeFormResolver = ({ values }: { values: any }) => {
  const errors: Record<string, { type: string; message: string }[]> = {};

  if (!values.code?.trim()) {
    errors.code = [
      {
        type: 'invalid',
        message: t('passwordreset.errors.invalid_code'),
      },
    ];
  }

  return { errors };
};

const passwordFormResolver = ({ values }: { values: any }) => {
  const errors: Record<string, { type: string; message: string }[]> = {};

  const passwordValidation = validatePassword(values.newPassword, t, true);
  if (!passwordValidation.isValid) {
    errors.newPassword = [
      {
        type: 'invalid',
        message: passwordValidation.message,
      },
    ];
  }

  if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = [
      {
        type: 'invalid',
        message: t('passwordreset.errors.password_mismatch'),
      },
    ];
  }

  return { errors };
};

const onRequestCode = async (submit_event: FormSubmitEvent) => {
  if (submit_event.valid) {
    error.value = null;
    username.value = submit_event.states.username.value;
    try {
      loading.value = true;
      await authStore.requestPasswordReset(username.value);
      step.value = 2;
      toast.add({
        severity: 'success',
        summary: t('passwordreset.success.code_sent'),
        life: 3000,
      });
    } catch (err) {
      console.error('Password reset request failed:', err);
      if (err instanceof AuthError) {
        error.value = t(`passwordreset.errors.${err.code.toLowerCase()}`);
      } else {
        error.value = t('passwordreset.errors.request_failed');
      }
    } finally {
      loading.value = false;
    }
  }
};

const onSubmitCode = async (submit_event: FormSubmitEvent) => {
  if (submit_event.valid) {
    error.value = null;
    verificationCode.value = submit_event.states.code.value;
    try {
      loading.value = true;
      step.value = 3;
    } catch (err) {
      console.error('Code verification failed:', err);
      error.value = t('passwordreset.errors.invalid_code');
    } finally {
      loading.value = false;
    }
  }
};

const onResetPassword = async (submit_event: FormSubmitEvent) => {
  if (submit_event.valid) {
    error.value = null;
    const newPassword = submit_event.states.newPassword.value;
    try {
      loading.value = true;
      await authStore.confirmPasswordReset(
        username.value,
        verificationCode.value,
        newPassword
      );
      toast.add({
        severity: 'success',
        summary: t('passwordreset.success.password_reset'),
        life: 3000,
      });
      try {
        await authStore.login(username.value, newPassword);
        router.push('/');
      } catch (loginErr) {
        console.error('Auto-login after password reset failed:', loginErr);
        toast.add({
          severity: 'info',
          summary: t('passwordreset.success.password_reset'),
          detail: t('passwordreset.info.please_login'),
          life: 5000,
        });
        router.push('/login');
      }
    } catch (err) {
      console.error('Password reset failed:', err);
      if (err instanceof AuthError) {
        error.value = t(`passwordreset.errors.${err.code.toLowerCase()}`);
      } else {
        error.value = t('passwordreset.errors.reset_failed');
      }
    } finally {
      loading.value = false;
    }
  }
};
</script>
