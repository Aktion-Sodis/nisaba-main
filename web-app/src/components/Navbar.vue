<template>
    <nav id="navbarBlur" class="shadow-none" v-bind="$attrs" data-scroll="true">
      <div
        class="py-4 ml-4 gap-4 md:ml-0 flex justify-between items-center h-full"
      >
        <Breadcrumb
          :home="home"
          :model="items"
          class="w-[calc(100vw_-_13.4rem)] md:w-auto text-nowrap scrollbar-none !overflow-hidden"
        >
          <template #item="{ item, props }">
            <router-link
              v-if="item.route"
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
            >
              <a :href="href" v-bind="props.action" @click="navigate">
                <span
                  class="text-surface-600 dark:text-surface-300 material-symbols-outlined"
                >
                  {{ item.icon }}
                </span>
                <span
                  class="text-surface-700 dark:text-surface-200 font-semibold truncate overflow-hidden max-w-[calc(100vw_-_18rem)] py-0.5"
                >
                  {{ item.label }}
                </span>
              </a>
            </router-link>
            <a
              v-else
              :href="item.url"
              :target="item.target"
              v-bind="props.action"
            >
              <span
                class="text-surface-600 dark:text-surface-300 material-symbols-outlined"
              >
                {{ item.icon }}
              </span>
              <span
                class="text-surface-700 dark:text-surface-200 font-semibold truncate overflow-hidden max-w-[calc(100vw_-_18rem)] py-0.5"
              >
                {{ item.label }}
              </span>
            </a>
          </template>
        </Breadcrumb>
  
        <div v-if="isAuthenticated || isOfflineMode" class="h-full">
          <button
            class="w-full h-full md:h-none border-0 bg-white items-center rounded-lg shadow-sm flex p-3 pl-4 hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors duration-200"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            @click="toggle"
          >
            <Avatar
              :image="profileImgUrl ?? undefined"
              :icon="userInitials ? undefined : 'pi pi-user'"
              :label="profileImgUrl ? undefined : userInitials"
              size="normal"
              class="mr-2 text-gray-600 text-sm"
              shape="circle"
            />
            <span
              class="hidden md:inline-flex flex-col items-start text-gray-700"
            >
              <span class="font-semibold">
                {{ displayName }}
              </span>
            </span>
            <i class="material-symbols-outlined">keyboard_arrow_down</i>
          </button>
          <div class="card flex justify-center">
            <Menu
              id="overlay_menu"
              ref="menu"
              :model="menuItems"
              :popup="true"
              class="w-56 md:w-60 mt-2 rounded-xl"
            >
              <template #start>
                <div
                  v-if="!isOfflineMode"
                  class="mt-1 pb-3 border-b relative overflow-hidden w-full border-0 bg-transparent flex items-center p-2 rounded-none transition-colors duration-200"
                >
                  <Avatar
                    :image="profileImgUrl ?? undefined"
                    :label="profileImgUrl ? undefined : userInitials"
                    size="large"
                    class="mr-2"
                    shape="circle"
                  />
                  <span class="inline-flex flex-col items-start">
                    <span class="font-bold text-sm md:text-base">
                      {{ userInfo?.displayName ?? prekitUser?.name }}
                    </span>
                    <span class="text-xs md:text-sm">
                      {{ userInfo?.mail ?? '-' }}
                    </span>
                  </span>
                </div>
                <div
                  v-else
                  class="mt-1 pb-3 border-b relative overflow-hidden w-full border-0 bg-transparent flex justify-center items-center p-2 rounded-none transition-colors duration-200"
                >
                  <Tag
                    v-tooltip="t('general.offline_mode_description')"
                    severity="secondary"
                    class="w-full"
                    :value="$t('general.offline_mode')"
                  >
                    <template #icon>
                      <i class="material-symbols-outlined text-sm mr-2">
                        wifi_off
                      </i>
                    </template>
                  </Tag>
                </div>
              </template>
              <template #item="{ item, props }">
                <a
                  :class="['flex items-center', item.color]"
                  v-bind="props.action"
                >
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                  <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                  <span
                    v-if="item.shortcut"
                    class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
                  >
                    {{ item.shortcut }}
                  </span>
                </a>
              </template>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script lang="ts" setup>
  import type { MenuItem } from 'primevue/menuitem';
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  
  import { useAuth } from '@/compositions/useAuth';
  import { useIsAuthenticated } from '@/compositions/useIsAuthenticated';
  import { useIsOfflineMode } from '@/compositions/useIsOfflineMode';
  import { useUserProfile } from '@/compositions/useUserProfile';
  import { getHomeRoute } from '@/router';
  import { generateInitial } from '@/utils/global';
  
  /**
   * Define Emits
   * Defines custom events to be emitted by the component, allowing communication with the parent.
   */
  const emit = defineEmits({
    'show-configurator': () => true,
  });
  
  /**
   * Initialize Utilities
   * Sets up utility functions and services for use throughout the component.
   */
  const route = useRoute();
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const isOfflineMode = useIsOfflineMode();
  const { t } = useI18n();
  const { instance } = useAuth();
  const { profileImgUrl, prekitUser, userInfo } = useUserProfile();
  
  /**
   * Reactive States
   * Defines reactive data that automatically triggers UI updates when changed.
   */
  const menu = ref();
  
  /**
   * Computed Properties
   * Defines properties that derive values from reactive state, updated automatically when dependencies change.
   */
  const userInitials = computed(() => {
    if (userInfo.value?.displayName) {
      return generateInitial(userInfo.value.displayName);
    } else if (prekitUser.value?.name) {
      return generateInitial(prekitUser.value.name);
    }
    return '';
  });
  
  const home = computed(() => ({
    icon: 'home',
    route: getHomeRoute(isAuthenticated.value),
  }));
  
  const items = computed(() => {
    if (!route.meta.i18n_title) {
      return [];
    }
    return [
      {
        label: t(route.meta.i18n_title as string),
        route: route,
      },
    ];
  });
  
  const displayName = computed(() => {
    return (
      userInfo.value?.displayName ??
      (prekitUser.value?.name && prekitUser.value.name !== ''
        ? prekitUser.value.name
        : t('general.anonymous_user_name'))
    );
  });
  
  const menuItems = ref<MenuItem[]>([
    {
      items: [
        {
          id: 'user-profile',
          label: t('tooltip.navbar.profile'),
          icon: 'pi pi-user',
          color: '',
          command: () => {
            router.push('/user');
          },
        },
        {
          label: t('tooltip.navbar.settings'),
          icon: 'pi pi-cog',
          color: '',
          command: () => {
            emit('show-configurator');
          },
        },
        ...(isOfflineMode.value
          ? []
          : [
              {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                color: '!text-danger',
                command: () => {
                  logoutRedirect();
                },
              },
            ]),
      ],
    },
    {
      separator: true,
    },
  ]);
  
  /**
   * Define Methods
   * Defines functions that perform specific actions or handle events within the component.
   */
  const logoutRedirect = () => {
    instance.logoutRedirect();
  };
  
  const toggle = (event: Event) => {
    menu.value.toggle(event);
  };
  </script>