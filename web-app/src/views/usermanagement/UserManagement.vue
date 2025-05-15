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
        </DataTable>
      </template>
    </Card>
    <create-user-modal v-model:is-shown="showCreateUserModal" />
  </div>
</template>

<script lang="ts" setup>
import Tag from 'primevue/tag';
import { onMounted, ref } from 'vue';

import CreateUserModal from './components/CreateUserModal.vue';
import { useUserManagementStore } from './userManagementStore';

const userManagementStore = useUserManagementStore();
const showCreateUserModal = ref(false);

onMounted(() => {
  if (!userManagementStore.isInitialized) {
    userManagementStore.init();
  }
});

const createUser = () => {
  showCreateUserModal.value = true;
};
</script>
