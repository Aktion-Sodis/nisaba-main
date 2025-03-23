<template>
    <!-- Left Section: Logo and Login Form -->
    <div class="h-screen w-screen bg-cover bg-center flex items-center justify-center":style="{ backgroundImage: `url(${backgroundImage})` }">
        <Card class="min-w-1/4 max-w-md"> 
          <template #content>
            <div class="space-y-8 flex flex-col justify-center">
            <div class="w-full flex justify-center">
              <img src="@/assets/img/aktionSodisBig.png" alt="Company Logo" class="w-1/2" />
            </div>
            
            <Form v-if="authStore.nextStep === null && authStore.authenticationState !== AuthenticationState.LoggedIn" v-slot="$form" @submit="onLogin" class="space-y-4">
            <FormField v-slot="$field" label="Email or Phone" name="username">
              <InputText
                id="username"
                placeholder="Enter email or phone"
                class="w-full"
                fluid
              />
            </FormField>
  
            <FormField v-slot="$field" label="Password" name="password">
              <Password
                id="password"
                :feedback="false"
                placeholder="Enter password"
                toggleMask
                fluid
                class="w-full"
              />
            </FormField>
  
            <!-- Error Message -->
            <Message v-if="error" severity="error" class="mt-3">{{ error }}</Message>
  
            <!-- Submit Button -->
            <Button label="Login" icon="pi pi-sign-in" class="w-full p-button-primary mt-4" type="submit" />
          </Form>
  
          <Form v-if="authStore.nextStep !== null" v-slot="$initialForm" class="space-y-4">
            <p>Set new password</p>
            <FormField v-slot="$field" label="New Password" name="password_new">
              <Password
                id="password_new"
                :feedback="false"
                placeholder="Enter new password"
                toggleMask
                fluid
                class="w-full"
              />
            </FormField>
            <FormField v-slot="$field" label="New Password (Validation)" name="password_new_validation">
              <Password
                id="password_new_validation"
                :feedback="false"
                placeholder="Enter new password (validation)"
                toggleMask
                fluid
                class="w-full"
              />
            </FormField>
            <p>Configure your profile</p>
            <FormField v-slot="$field" label="First Name" name="first_name">
              <InputText
                id="first_name"
                placeholder="First Name"
                class="w-full"
                fluid
              />
            </FormField>
            <FormField v-slot="$field" label="First Name" name="name">
              <InputText
                id="name"
                placeholder="Surname"
                class="w-full"
                fluid
              />
            </FormField>
  
          </Form>
        </div>
          </template>
          
          
        </Card>
      </div>
  
      
  
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore, AuthenticationState } from '@/stores/auth';
  import backgroundImage from '@/assets/img/colleagues.jpg';
  import { FormSubmitEvent } from '@primevue/forms';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const error = ref<string | null>(null);
  const router = useRouter();
  
  const onLogin = async (submit_event: FormSubmitEvent) => {
    if(submit_event.valid) {
      const entered_username = submit_event.states.username.value;
      const entered_password = submit_event.states.password.value;
      await authStore.login(entered_username, entered_password);
      if (authStore.authenticationState === AuthenticationState.LoggedIn) {
        router.push('/');
      }
    }
  };
  
  const onPasswordInitialReset = async (submit_event: FormSubmitEvent) => {
    if(submit_event.valid) {
      const entered_password = submit_event.states.password_new.value;
      const entered_password_validation = submit_event.states.password_new_validation.value;
      const entered_first_name = submit_event.states.first_name.value;
      const entered_name = submit_event.states.name.value;
      const login_result = await authStore.initialPasswordReset(entered_password);
    }
  };
  </script>