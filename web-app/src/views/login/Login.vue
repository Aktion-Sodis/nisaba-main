<template>
  <!-- Left Section: Logo and Login Form -->
  <div
    class="h-screen w-screen bg-cover bg-center flex items-center justify-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <Card class="min-w-1/4 max-w-md">
      <template #content>
        <div class="space-y-8 flex flex-col justify-center">
          <div class="w-full flex justify-center">
            <img
              src="@/assets/img/aktionSodisBig.png"
              alt="Company Logo"
              class="w-1/2"
            />
          </div>

          <Form
            v-if="
              authStore.authenticationState === AuthenticationState.LoggedOut
            "
            v-slot="$loginForm"
            :resolver="loginFormResolver"
            :validate-on-mount="false"
            :validate-on-value-update="false"
            :validate-on-blur="false"
            :validate-on-submit="true"
            @submit="onLogin"
          >
            <div class="flex flex-col gap-0">
              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full mt-2">
                  <InputText id="username" name="username" class="w-full" />
                  <label for="username">
                    {{ t('login.login_form.username') }}
                  </label>
                </FloatLabel>
                <Message
                  v-if="$loginForm.username?.invalid"
                  severity="error"
                  :closable="false"
                >
                  {{ $loginForm.username.error.message }}
                </Message>
              </div>

              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full mt-2">
                  <Password
                    id="password"
                    name="password"
                    :feedback="false"
                    class="w-full"
                    toggle-mask
                  />
                  <label for="password">
                    {{ t('login.login_form.password') }}
                  </label>
                </FloatLabel>
                <Message
                  v-if="$loginForm.password?.invalid"
                  severity="error"
                  :closable="false"
                >
                  {{ $loginForm.password.error.message }}
                </Message>
              </div>

              <!-- Error Message -->
              <Message
                v-if="error"
                severity="error"
                :closable="false"
                class="mt-3"
              >
                {{ error }}
              </Message>

              <!-- Submit Button -->
              <div class="flex flex-col gap-2 mt-4">
                <Button
                  :label="t('login.login_form.login_button')"
                  icon="pi pi-sign-in"
                  class="w-full mt-4"
                  type="submit"
                  fluid
                  :loading="authStore.loading"
                />
                <Button
                  :label="t('login.login_form.forgot_password')"
                  text
                  severity="secondary"
                  size="small"
                  class="w-full"
                  fluid
                  @click="router.push('/password-reset')"
                />
              </div>
            </div>
          </Form>

          <Form
            v-if="
              authStore.authenticationState ===
              AuthenticationState.PasswordResetRequired
            "
            v-slot="$resetForm"
            class="space-y-4"
            :resolver="passwordResetFormResolver"
            :validate-on-mount="false"
            :validate-on-value-update="false"
            :validate-on-blur="false"
            :validate-on-submit="true"
            @submit="onPasswordInitialReset"
          >
            <p class="text-section-inner-title">
              {{ t('login.password_reset.title') }}
            </p>
            <p class="text-oneliner-light-small">
              {{ t('login.password_reset.description') }}
            </p>
            <div class="flex flex-col gap-2 mt-4">
              <FloatLabel class="w-full mt-2">
                <Password
                  id="password_new"
                  name="password_new"
                  :feedback="false"
                  toggle-mask
                  class="w-full"
                />
                <label for="password_new">
                  {{ t('login.password_reset.new_password') }}
                </label>
              </FloatLabel>
              <Message
                v-if="$resetForm.password_new?.invalid"
                severity="error"
                :closable="false"
              >
                {{ $resetForm.password_new.error.message }}
              </Message>
            </div>
            <div class="flex flex-col gap-2 mt-4">
              <FloatLabel class="w-full mt-2">
                <Password
                  id="password_new_validation"
                  name="password_new_validation"
                  :feedback="false"
                  toggle-mask
                  class="w-full"
                />
                <label for="password_new_validation">
                  {{ t('login.password_reset.new_password_validation') }}
                </label>
              </FloatLabel>
              <Message
                v-if="$resetForm.password_new_validation?.invalid"
                severity="error"
                :closable="false"
              >
                {{ $resetForm.password_new_validation.error.message }}
              </Message>
            </div>
            <p class="text-section-inner-title">
              {{ t('login.profile_setup.title') }}
            </p>
            <div class="flex flex-col gap-2 mt-4">
              <FloatLabel class="w-full mt-2">
                <InputText id="first_name" name="first_name" class="w-full" />
                <label for="first_name">
                  {{ t('login.profile_setup.first_name') }}
                </label>
              </FloatLabel>
              <Message
                v-if="$resetForm.first_name?.invalid"
                severity="error"
                :closable="false"
              >
                {{ $resetForm.first_name.error.message }}
              </Message>
            </div>
            <div class="flex flex-col gap-2 mt-4">
              <FloatLabel class="w-full mt-2">
                <InputText id="name" name="name" class="w-full" />
                <label for="name">{{ t('login.profile_setup.surname') }}</label>
              </FloatLabel>
              <Message
                v-if="$resetForm.name?.invalid"
                severity="error"
                :closable="false"
              >
                {{ $resetForm.name.error.message }}
              </Message>
            </div>

            <!-- Error Message -->
            <Message
              v-if="error"
              severity="error"
              :closable="false"
              class="mt-3"
            >
              {{ error }}
            </Message>

            <!-- Submit Button -->
            <Button
              :label="t('login.buttons.set_password')"
              icon="pi pi-check"
              class="w-full mt-4"
              type="submit"
              fluid
              :loading="authStore.loading"
            />
          </Form>

          <Form
            v-if="
              authStore.authenticationState ===
              AuthenticationState.ProfileSetupRequired
            "
            v-slot="$profileForm"
            class="space-y-4"
            :resolver="profileSetupFormResolver"
            :validate-on-mount="false"
            :validate-on-value-update="false"
            :validate-on-blur="false"
            :validate-on-submit="true"
            @submit="onProfileSetup"
          >
            <p class="text-section-inner-title">
              {{ t('login.profile_setup.title') }}
            </p>
            <div class="flex flex-col gap-2 mt-4">
              <FloatLabel class="w-full mt-2">
                <InputText id="first_name" name="first_name" class="w-full" />
                <label for="first_name">
                  {{ t('login.profile_setup.first_name') }}
                </label>
              </FloatLabel>
              <Message
                v-if="$profileForm.first_name?.invalid"
                severity="error"
                :closable="false"
              >
                {{ $profileForm.first_name.error.message }}
              </Message>
            </div>
            <div class="flex flex-col gap-2 mt-4">
              <FloatLabel class="w-full mt-2">
                <InputText id="name" name="name" class="w-full" />
                <label for="name">{{ t('login.profile_setup.surname') }}</label>
              </FloatLabel>
              <Message
                v-if="$profileForm.name?.invalid"
                severity="error"
                :closable="false"
              >
                {{ $profileForm.name.error.message }}
              </Message>
            </div>

            <!-- Error Message -->
            <Message
              v-if="error"
              severity="error"
              :closable="false"
              class="mt-3"
            >
              {{ error }}
            </Message>

            <!-- Submit Button -->
            <Button
              :label="t('login.buttons.save_profile')"
              icon="pi pi-check"
              class="w-full mt-4"
              type="submit"
              fluid
              :loading="authStore.loading"
            />
          </Form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { FormSubmitEvent } from '@primevue/forms';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import backgroundImage from '@/assets/img/colleagues.jpg';
import { useAuthStore, AuthenticationState } from '@/stores/auth';
import { validateUsername, validatePassword } from '@/utils/validation';

const { t } = useI18n();
const authStore = useAuthStore();
const error = ref<string | null>(null);
const router = useRouter();

// Clear error when switching between forms
watch(
  () => authStore.authenticationState,
  () => {
    error.value = null;
    authStore.error = null;
  }
);

// Watch for auth store errors
watch(
  () => authStore.error,
  (newError) => {
    if (newError) {
      error.value = newError;
    }
  }
);

const loginFormResolver = ({ values }: { values: any }) => {
  const errors: Record<string, { type: string; message: string }[]> = {};

  // Validate username (email/phone)
  const usernameValidation = validateUsername(values.username, t);
  if (!usernameValidation.isValid) {
    errors.username = [
      {
        type: 'invalid',
        message: usernameValidation.message,
      },
    ];
  }

  // Validate password
  const passwordValidation = validatePassword(values.password, t);
  if (!passwordValidation.isValid) {
    errors.password = [
      {
        type: 'invalid',
        message: passwordValidation.message,
      },
    ];
  }

  return { errors };
};

const passwordResetFormResolver = ({ values }: { values: any }) => {
  const errors: Record<string, { type: string; message: string }[]> = {};

  // Validate new password
  const passwordValidation = validatePassword(values.password_new, t, true);
  if (!passwordValidation.isValid) {
    errors.password_new = [
      {
        type: 'invalid',
        message: passwordValidation.message,
      },
    ];
  }

  // Validate password confirmation
  if (values.password_new !== values.password_new_validation) {
    errors.password_new_validation = [
      {
        type: 'invalid',
        message: t('login.password_reset.validation.passwords_mismatch'),
      },
    ];
  }

  // Validate first name
  if (!values.first_name?.trim()) {
    errors.first_name = [
      {
        type: 'invalid',
        message: t('login.profile_setup.validation.first_name_required'),
      },
    ];
  }

  // Validate last name
  if (!values.name?.trim()) {
    errors.name = [
      {
        type: 'invalid',
        message: t('login.profile_setup.validation.surname_required'),
      },
    ];
  }

  return { errors };
};

const profileSetupFormResolver = ({ values }: { values: any }) => {
  const errors: Record<string, { type: string; message: string }[]> = {};

  // Validate first name
  if (!values.first_name?.trim()) {
    errors.first_name = [
      {
        type: 'invalid',
        message: t('login.profile_setup.validation.first_name_required'),
      },
    ];
  }

  // Validate last name
  if (!values.name?.trim()) {
    errors.name = [
      {
        type: 'invalid',
        message: t('login.profile_setup.validation.surname_required'),
      },
    ];
  }

  return { errors };
};

const onLogin = async (submit_event: FormSubmitEvent) => {
  if (submit_event.valid) {
    error.value = null;
    const entered_username = submit_event.states.username.value;
    const entered_password = submit_event.states.password.value;
    await authStore.login(entered_username, entered_password);
    if (authStore.authenticationState === AuthenticationState.LoggedIn) {
      router.push('/');
    }
  }
};

const onPasswordInitialReset = async (submit_event: FormSubmitEvent) => {
  if (submit_event.valid) {
    error.value = null;
    const entered_password = submit_event.states.password_new.value;
    const _entered_password_validation =
      submit_event.states.password_new_validation.value;
    const entered_first_name = submit_event.states.first_name.value;
    const entered_name = submit_event.states.name.value;

    const success = await authStore.initialPasswordReset(
      entered_password,
      entered_first_name,
      entered_name
    );
    if (success) {
      router.push('/');
    }
  }
};

const onProfileSetup = async (submit_event: FormSubmitEvent) => {
  if (submit_event.valid) {
    error.value = null;
    const entered_first_name = submit_event.states.first_name.value;
    const entered_name = submit_event.states.name.value;
    const success = await authStore.setupProfile(
      entered_first_name,
      entered_name
    );
    if (success) {
      router.push('/');
    }
  }
};
</script>
