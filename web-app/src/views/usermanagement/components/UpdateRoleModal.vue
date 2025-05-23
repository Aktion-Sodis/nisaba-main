<template>
  <Dialog
    v-model:visible="localIsShown"
    modal
    class="w-dialog-md"
    :header="$t('usermanagement.update_role.title')"
    :draggable="false"
    :closable="false"
  >
    <div class="flex flex-col gap-8">
      <p class="text-oneliner-light text-surface-700">
        {{
          $t('usermanagement.update_role.info', {
            username: user.username,
          })
        }}
      </p>

      <div class="flex flex-row justify-between items-center gap-2">
        <label for="roleSelect" class="w-[40%]">
          {{ $t('usermanagement.update_role.select_role') }}
        </label>
        <div class="w-[60%]">
          <Select
            id="roleSelect"
            v-model="selectedRole"
            :options="availableRoles"
            option-label="label"
            option-value="value"
            class="w-full"
            :disabled="userManagementStore.isUpdatingRole"
          />
        </div>
      </div>

      <div class="flex w-full justify-end">
        <Button
          severity="success"
          :loading="userManagementStore.isUpdatingRole"
          :disabled="!isRoleChanged && !userManagementStore.isUpdatingRole"
          @click="handleSubmit"
        >
          {{ $t('usermanagement.update_role.save') }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserManagementStore } from '../userManagementStore';
import type { User } from '../userManagementStore';

import { UserGroup } from '@/types/UserGroup';

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
const selectedRole = ref<string>('');

// Initialize selected role with current user's role
watch(
  () => props.user,
  (newUser) => {
    if (newUser && newUser.groups.length > 0) {
      selectedRole.value = newUser.groups[0];
    }
  },
  { immediate: true }
);

// Available roles (excluding super admin)
const availableRoles = computed(() => {
  return Object.values(UserGroup)
    .filter((group) => group !== UserGroup.SUPERADMIN)
    .map((group) => ({
      label: t(`usermanagement.access_levels.${group}`),
      value: group,
    }));
});

// Check if role has changed
const isRoleChanged = computed(() => {
  return selectedRole.value && props.user.groups[0] !== selectedRole.value;
});

const handleSubmit = async () => {
  try {
    const result = await userManagementStore.updateUserRole(
      props.user.id,
      selectedRole.value
    );

    if (result.success) {
      localIsShown.value = false;
      toast.add({
        severity: 'success',
        summary: t('usermanagement.update_role.success_title'),
        detail: t('usermanagement.update_role.success_message', {
          username: props.user.username,
        }),
        life: 5000,
      });
    } else {
      toast.add({
        severity: 'error',
        summary: t('usermanagement.update_role.error_title'),
        detail: result.error,
        life: 5000,
      });
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('usermanagement.update_role.error_title'),
      detail:
        error instanceof Error ? error.message : 'An unknown error occurred',
      life: 5000,
    });
  }
};
</script>
