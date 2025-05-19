<template>
  <div class="h-full pb-4">
    <Card class="h-full">
      <template #title>
        <div class="flex justify-between items-center w-full">
          <span class="text-screen-title">
            {{ $t('usermanagement.title') }}
          </span>
          <Button
            icon="pi pi-plus"
            :label="$t('usermanagement.newUser')"
            class="ml-auto"
            size="small"
            @click="createUser()"
          />
        </div>
      </template>

      <template #subtitle>
        <span class="text-oneliner-light">
          {{ $t('usermanagement.subtitle') }}
        </span>
      </template>

      <template #content>
        <DataTable
          :value="userManagementStore.users"
          :loading="userManagementStore.loadingUsers"
          paginator
          :rows="10"
          :rows-per-page-options="[5, 10, 20, 50]"
          table-style="min-width: 50rem;"
          scroll-height="h-[calc(100vh_-_21rem)]"
        >
          <template #empty>
            <span class="text-body">
              {{ $t('usermanagement.noUsersFound') }}
            </span>
          </template>
          <template #loading>
            <span class="text-body">
              {{ $t('usermanagement.loadingUsers') }}
            </span>
          </template>

          <Column
            field="username"
            :header="$t('usermanagement.columns.username')"
          />

          <Column field="confirmed">
            <template #header>
              <div class="flex justify-center items-center w-full">
                {{ $t('usermanagement.columns.verified') }}
              </div>
            </template>
            <template #body="{ data }">
              <div class="flex justify-center items-center">
                <span
                  class="material-symbols-outlined text-xl"
                  :class="data.confirmed ? 'text-green-500' : 'text-red-500'"
                >
                  {{ data.confirmed ? 'check_circle' : 'cancel' }}
                </span>
              </div>
            </template>
          </Column>

          <Column field="groups" :header="$t('usermanagement.columns.groups')">
            <template #body="{ data }">
              <div class="flex flex-wrap gap-2">
                <Tag
                  v-for="group in data.groups"
                  :key="group"
                  :value="$t(`usermanagement.access_levels.${group}`)"
                  severity="info"
                />
              </div>
            </template>
          </Column>

          <Column
            header-style="width: 5rem; text-align: center"
            body-style="text-align: center; overflow: visible"
          >
            <template #body="{ data }">
              <Button
                severity="light"
                :fluid="false"
                size="small"
                class="w-[2em] h-[2em]"
                aria-haspopup="true"
                :aria-controls="'overlay_menu'"
                @click.stop="toggleMenu($event, data)"
              >
                <template #icon>
                  <i class="pi pi-ellipsis-v"></i>
                </template>
              </Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
    <create-user-modal v-model:is-shown="showCreateUserModal" />
    <reset-password-modal
      v-model:is-shown="showResetPasswordModal"
      :user="selectedUserForMenu"
    />
    <Menu ref="menu" :model="menuItems" :popup="true" />
  </div>
</template>

<script lang="ts" setup>
import Tag from 'primevue/tag';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import CreateUserModal from './components/CreateUserModal.vue';
import ResetPasswordModal from './components/ResetPasswordModal.vue';
import { useUserManagementStore } from './userManagementStore';

const { t } = useI18n();
const userManagementStore = useUserManagementStore();
const showCreateUserModal = ref(false);
const showResetPasswordModal = ref(false);
const confirm = useConfirm();
const toast = useToast();
const menu = ref();
const selectedUserForMenu = ref<any>(null);

const menuItems = computed(() => {
  if (!selectedUserForMenu.value) {
    return [];
  }

  return [
    {
      label: t('usermanagement.menu.reset_password'),
      icon: 'pi pi-fw pi-key',
      command: () => {
        if (selectedUserForMenu.value) {
          showResetPasswordModal.value = true;
        }
      },
    },
    {
      label: t('usermanagement.menu.delete'),
      icon: 'pi pi-fw pi-trash',
      command: () => {
        if (selectedUserForMenu.value) {
          confirmDeleteUser(selectedUserForMenu.value);
        }
      },
    },
  ];
});

const toggleMenu = (event: Event, user: any) => {
  selectedUserForMenu.value = user;
  menu.value.toggle(event);
};

const confirmDeleteUser = (user: any) => {
  confirm.require({
    message: t('usermanagement.confirm.delete.message'),
    header: t('usermanagement.confirm.delete.title'),
    icon: 'pi pi-exclamation-triangle',
    acceptProps: {
      label: t('usermanagement.confirm.delete.accept'),
      icon: 'pi pi-trash',
      severity: 'danger',
    },
    rejectProps: {
      label: t('usermanagement.confirm.delete.reject'),
      severity: 'secondary',
      outlined: true,
    },
    accept: async () => {
      try {
        const result = await userManagementStore.deleteUser(user.id);
        if (result) {
          toast.add({
            severity: 'success',
            summary: t('usermanagement.toasts.delete_success.title'),
            detail: t('usermanagement.toasts.delete_success.message'),
            life: 3000,
          });
        } else {
          throw new Error('User could not be deleted');
        }
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: t('usermanagement.toasts.delete_error.title'),
          detail: t('usermanagement.toasts.delete_error.message'),
          life: 5000,
        });
      }
    },
  });
};

onMounted(() => {
  if (!userManagementStore.isInitialized) {
    userManagementStore.init();
  }
});

const createUser = () => {
  showCreateUserModal.value = true;
};
</script>
