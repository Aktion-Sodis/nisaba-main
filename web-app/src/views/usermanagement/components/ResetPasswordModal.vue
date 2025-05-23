<template>
  <Dialog
    v-model:visible="localIsShown"
    modal
    class="w-dialog-md"
    :header="$t('usermanagement.reset_password.title')"
    :draggable="false"
    :closable="false"
  >
    <template v-if="!password">
      <div class="flex flex-col gap-8">
        <p class="text-oneliner-light text-surface-700">
          {{
            $t('usermanagement.reset_password.info', {
              username: user.username,
            })
          }}
        </p>

        <div class="flex w-full justify-end">
          <Button
            severity="success"
            :loading="userManagementStore.isResettingPassword"
            @click="handleSubmit"
          >
            {{ $t('usermanagement.reset_password.reset') }}
          </Button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-col gap-8">
        <p class="text-oneliner-light text-surface-700">
          {{ $t('usermanagement.reset_password.password_info') }}
        </p>

        <div class="flex flex-row justify-between items-center gap-2">
          <label for="displayedPassword" class="w-[40%]">
            {{ $t('usermanagement.reset_password.password') }}
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
            {{ $t('usermanagement.reset_password.confirm_save') }}
          </label>
          <Checkbox
            id="confirmSave"
            v-model="passwordConfirmed"
            :binary="true"
          />
        </div>

        <div class="flex w-full justify-end">
          <Button :disabled="!passwordConfirmed" @click="finishReset">
            {{ $t('usermanagement.reset_password.finish') }}
          </Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserManagementStore } from '../userManagementStore';
import type { User } from '../userManagementStore';

const props = defineProps<{
  isShown: boolean;
  user: User;
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
const password = ref<string | null>(null);
const passwordConfirmed = ref(false);

const copyPassword = () => {
  if (password.value) {
    navigator.clipboard.writeText(password.value);
    toast.add({
      severity: 'success',
      summary: t('usermanagement.reset_password.password_copied'),
      life: 3000,
    });
  }
};

const finishReset = () => {
  localIsShown.value = false;
};

const handleSubmit = async () => {
  try {
    const result = await userManagementStore.resetPassword(props.user.id, true);

    if (result.success) {
      if (result.password) {
        password.value = result.password;
      } else {
        localIsShown.value = false;
        toast.add({
          severity: 'success',
          summary: t('usermanagement.reset_password.success_title'),
          detail: t('usermanagement.reset_password.success_message', {
            username: props.user.username,
          }),
          life: 5000,
        });
      }
    } else {
      toast.add({
        severity: 'error',
        summary: t('usermanagement.reset_password.error_title'),
        detail: result.error,
        life: 5000,
      });
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('usermanagement.reset_password.error_title'),
      detail:
        error instanceof Error ? error.message : 'An unknown error occurred',
      life: 5000,
    });
  }
};
</script>
