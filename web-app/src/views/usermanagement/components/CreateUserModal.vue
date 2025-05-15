<template>
  <Dialog
    v-model:visible="localIsShown"
    modal
    class="w-dialog-md"
    :header="$t('usermanagement.create_user.title')"
    :draggable="false"
    :closable="false"
  >
    <template v-if="!password">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row justify-between items-center gap-2">
            <label for="email" class="w-[40%]">
              {{ $t('usermanagement.create_user.email') }}
            </label>
            <div class="w-[60%]">
              <InputText id="email" v-model="email" class="w-full" />
              <Message
                v-if="emailError"
                severity="error"
                :closable="false"
                class="w-full mt-2"
              >
                {{ emailError }}
              </Message>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex flex-row justify-between items-center gap-2">
            <label for="userGroup" class="w-[40%]">
              {{ $t('usermanagement.create_user.user_group') }}
            </label>
            <div class="w-[60%]">
              <Select
                id="userGroup"
                v-model="userGroup"
                :options="availableUserGroups"
                option-label="label"
                option-value="value"
                class="w-full"
              />
              <Message
                v-if="userGroupError"
                severity="error"
                :closable="false"
                class="w-full mt-2"
              >
                {{ userGroupError }}
              </Message>
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-between items-center gap-2">
          <label for="showPassword" class="w-[40%]">
            {{ $t('usermanagement.create_user.show_password') }}
          </label>
          <div class="w-[60%] flex justify-end">
            <Checkbox id="showPassword" v-model="showPassword" :binary="true" />
          </div>
        </div>

        <div class="flex w-full justify-end">
          <Button severity="success" :loading="loading" @click="handleSubmit">
            {{ $t('usermanagement.create_user.create') }}
          </Button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-col gap-8">
        <p class="text-oneliner-light text-surface-700">
          {{ $t('usermanagement.create_user.password_info') }}
        </p>

        <div class="flex flex-row justify-between items-center gap-2">
          <label for="displayedPassword" class="w-[40%]">
            {{ $t('usermanagement.create_user.password') }}
          </label>
          <div class="w-[60%] flex gap-2">
            <InputText
              id="displayedPassword"
              v-model="password"
              readonly
              class="flex-1"
            />
            <Button
              icon="pi pi-copy"
              severity="secondary"
              @click="copyPassword"
            />
          </div>
        </div>

        <div class="flex flex-row justify-between items-center gap-2">
          <label for="confirmSave" class="w-[40%]">
            {{ $t('usermanagement.create_user.confirm_save') }}
          </label>
          <Checkbox
            id="confirmSave"
            v-model="passwordConfirmed"
            :binary="true"
          />
        </div>

        <div class="flex w-full justify-end">
          <Button :disabled="!passwordConfirmed" @click="finishCreation">
            {{ $t('usermanagement.create_user.finish') }}
          </Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { UserGroup, useUserManagementStore } from '../userManagementStore';

const props = defineProps<{
  isShown: boolean;
}>();

const emit = defineEmits<{
  'update:isShown': [boolean];
}>();

const { t } = useI18n();
const toast = useToast();
const userManagementStore = useUserManagementStore();

// Handle v-model bindability
const localIsShown = ref(props.isShown);

// Watch for changes in props
watch(
  () => props.isShown,
  (newValue: boolean) => {
    localIsShown.value = newValue;
  }
);

// Watch for changes in local value
watch(
  () => localIsShown.value,
  (newValue: boolean) => {
    emit('update:isShown', newValue);
  }
);

// Form data
const email = ref('');
const userGroup = ref<UserGroup>(UserGroup.MOBILE);
const showPassword = ref(false);
const loading = ref(false);
const password = ref<string | null>(null);
const passwordConfirmed = ref(false);

// Validation
const emailError = ref('');
const userGroupError = ref('');

const validateEmail = () => {
  if (!email.value) {
    emailError.value = t('usermanagement.create_user.validation.required');
    return false;
  }

  // Check if input is an email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Check if input is a phone number (basic international format)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  if (!emailRegex.test(email.value) && !phoneRegex.test(email.value)) {
    emailError.value = t(
      'usermanagement.create_user.validation.invalid_email_or_phone'
    );
    return false;
  }

  emailError.value = '';
  return true;
};

const validateUserGroup = () => {
  if (!userGroup.value) {
    userGroupError.value = t('usermanagement.create_user.validation.required');
    return false;
  }
  userGroupError.value = '';
  return true;
};

// Available user groups (excluding superadmin)
const availableUserGroups = computed(() => [
  { label: t('usermanagement.access_levels.admin'), value: UserGroup.ADMIN },
  { label: t('usermanagement.access_levels.mobile'), value: UserGroup.MOBILE },
  {
    label: t('usermanagement.access_levels.analytics'),
    value: UserGroup.ANALYTICS,
  },
]);

const copyPassword = () => {
  if (password.value) {
    navigator.clipboard.writeText(password.value);
    toast.add({
      severity: 'success',
      summary: t('usermanagement.create_user.password_copied'),
      life: 3000,
    });
  }
};

const finishCreation = () => {
  localIsShown.value = false;
};

const handleSubmit = async () => {
  // Clear previous errors
  emailError.value = '';
  userGroupError.value = '';

  const isEmailValid = validateEmail();
  const isUserGroupValid = validateUserGroup();

  if (!isEmailValid || !isUserGroupValid) return;

  loading.value = true;
  try {
    const result = await userManagementStore.createUser(
      email.value,
      userGroup.value!,
      showPassword.value
    );

    if (result.success) {
      if (result.password) {
        password.value = result.password;
      } else {
        loading.value = false;
        localIsShown.value = false;
        toast.add({
          severity: 'success',
          summary: t('usermanagement.create_user.success_title'),
          detail: t('usermanagement.create_user.success_message', {
            username: email.value,
          }),
          life: 5000,
        });
      }
    } else {
      toast.add({
        severity: 'error',
        summary: t('usermanagement.create_user.error_title'),
        detail: result.error,
        life: 5000,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>
