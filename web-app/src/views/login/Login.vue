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
              authStore.nextStep === null &&
              authStore.authenticationState !== AuthenticationState.LoggedIn
            "
            v-slot="$loginForm"
            :resolver="loginFormResolver"
            @submit="onLogin"
          >
            <div class="flex flex-col gap-0">
              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full" variant="on">
                  <InputText id="username" name="username" :fluid="true" />
                  <label for="username">Email or Phone</label>
                </FloatLabel>
                <Message
                  v-if="$loginForm.username?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ $loginForm.username.error.message }}
                </Message>
              </div>

              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel class="w-full" variant="on">
                  <Password
                    id="password"
                    name="password"
                    :feedback="false"
                    :fluid="true"
                    toggle-mask
                  />
                  <label for="password">Password</label>
                </FloatLabel>
                <Message
                  v-if="$loginForm.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ $loginForm.password.error.message }}
                </Message>
              </div>

              <!-- Error Message -->
              <Message v-if="error" severity="error" class="mt-3">
                {{ error }}
              </Message>

              <!-- Submit Button -->
              <Button
                label="Login"
                icon="pi pi-sign-in"
                class="w-full p-button-primary mt-4"
                type="submit"
                fluid
              />
            </div>
          </Form>

          <Form v-if="authStore.nextStep !== null" class="space-y-4">
            <p>Set new password</p>
            <FormField label="New Password" name="password_new">
              <Password
                id="password_new"
                :feedback="false"
                placeholder="Enter new password"
                toggle-mask
                fluid
                class="w-full"
              />
            </FormField>
            <FormField
              label="New Password (Validation)"
              name="password_new_validation"
            >
              <Password
                id="password_new_validation"
                :feedback="false"
                placeholder="Enter new password (validation)"
                toggle-mask
                fluid
                class="w-full"
              />
            </FormField>
            <p>Configure your profile</p>
            <FormField label="First Name" name="first_name">
              <InputText
                id="first_name"
                placeholder="First Name"
                class="w-full"
                fluid
              />
            </FormField>
            <FormField label="Surname" name="name">
              <InputText id="name" placeholder="Surname" class="w-full" fluid />
            </FormField>
          </Form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { FormSubmitEvent } from '@primevue/forms';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import backgroundImage from '@/assets/img/colleagues.jpg';
import { useAuthStore, AuthenticationState } from '@/stores/auth';
import { validateUsername, validatePassword } from '@/utils/validation';

const authStore = useAuthStore();
const error = ref<string | null>(null);
const router = useRouter();

const loginFormResolver = ({ values }: { values: any }) => {
  const errors: Record<string, { type: string; message: string }[]> = {};

  // Validate username (email/phone)
  const usernameValidation = validateUsername(values.username);
  if (!usernameValidation.isValid) {
    errors.username = [
      {
        type: 'invalid',
        message: usernameValidation.message,
      },
    ];
  }

  // Validate password
  const passwordValidation = validatePassword(values.password);
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

const onLogin = async (submit_event: FormSubmitEvent) => {
  if (submit_event.valid) {
    const entered_username = submit_event.states.username.value;
    const entered_password = submit_event.states.password.value;
    await authStore.login(entered_username, entered_password);
    if (authStore.authenticationState === AuthenticationState.LoggedIn) {
      router.push('/');
    }
  }
};

const _onPasswordInitialReset = async (submit_event: FormSubmitEvent) => {
  if (submit_event.valid) {
    const entered_password = submit_event.states.password_new.value;
    const entered_password_validation =
      submit_event.states.password_new_validation.value;
    const _entered_first_name = submit_event.states.first_name.value;
    const _entered_name = submit_event.states.name.value;
    if (entered_password !== entered_password_validation) {
      error.value = 'Passwords do not match';
      return;
    }
    const _login_result =
      await authStore.initialPasswordReset(entered_password);
  }
};
</script>
