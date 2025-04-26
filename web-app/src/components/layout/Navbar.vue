<template>
  <nav id="navbarBlur" class="shadow-none" v-bind="$attrs" data-scroll="true">
    <div class="py-4 gap-4 flex justify-between items-center h-full w-full">
      <div class="flex w-auto items-center gap-2">
        <!-- Displaying only on the Small & Medium screen -->
        <div
          class="flex md:hidden rounded-md cursor-pointer bg-surface-0 text-surface-600 h-14 p-1 items-center"
        >
          <div
            class="flex items-center justify-center h-full aspect-square hover:bg-surface-50"
            @click="() => router.push('/')"
          >
            <i class="material-symbols-outlined text-3xl">apps</i>
          </div>
        </div>

        <!-- Displaying only on the Medium screen and upper -->
        <Breadcrumb
          :home="homeApp"
          :model="breadcrumbItems"
          class="hidden md:flex breadcrumb-app !p-0 group items-center text-nowrap scrollbar-none !overflow-hidden h-14 min-w-max"
          :pt="{
            separator: {
              class:
                'flex items-center text-surface-600 dark:text-surface-0/70',
            },
          }"
        >
          <template #item="{ item, props }">
            <router-link
              v-if="item.route && item.key === 'home'"
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
              class="group"
            >
              <a :href="href" v-bind="props.action" @click="navigate">
                <span
                  class="text-surface-600 dark:text-surface-300 material-symbols-outlined"
                >
                  {{ item.icon }}
                </span>
                <span
                  class="text-surface-700 dark:text-surface-200 font-semibold truncate overflow-hidden max-w-[calc(100vw_-_18rem)]"
                >
                  {{ item.label }}
                </span>
              </a>
            </router-link>
            <a
              v-else
              class="group cursor-pointer"
              aria-haspopup="true"
              aria-controls="overlay_breadcrumb_level"
              @click="toggleBreadcrumbMenu($event)"
            >
              <span
                class="text-surface-600 dark:text-surface-300 material-symbols-outlined"
              >
                {{ item.icon }}
              </span>
              <span
                class="text-surface-700 dark:text-surface-200 font-semibold truncate overflow-hidden max-w-[calc(100vw_-_18rem)]"
              >
                {{ item.label }}
              </span>
            </a>
          </template>
        </Breadcrumb>

        <!-- Displaying only on the Small & Medium screen -->
        <Breadcrumb
          :model="breadcrumbLevelItems"
          class="breadcrumb-app h-14 !p-0 group flex lg:hidden items-center text-nowrap scrollbar-none !overflow-hidden"
          :pt="{
            separator: {
              class:
                'flex items-center text-surface-600 dark:text-surface-0/70',
            },
          }"
        >
          <template #item="{ item }">
            <a
              class="group cursor-pointer gap-2"
              aria-haspopup="true"
              aria-controls="overlay_breadcrumb_sublevel"
              @click="toggleBreadcrumbMenuLevel($event)"
            >
              <span
                v-if="item.iconType === 'material'"
                class="text-surface-600 dark:text-surface-300 material-symbols-outlined"
              >
                {{ item.icon }}
              </span>
              <span
                v-else
                class="text-surface-600 dark:text-surface-300"
                :class="item.icon"
              />
              <span
                class="text-surface-700 dark:text-surface-200 font-semibold truncate overflow-hidden max-w-[calc(100vw_-_18rem)] py-0.5"
              >
                {{ item.label }}
              </span>
            </a>
          </template>
        </Breadcrumb>

        <!-- Displaying only on the Small & Medium screen -->
        <Menu
          id="overlay_breadcrumb_sublevel"
          ref="breadcrumbMenuLevel"
          :model="breadcrumbMenuLevelItems"
          :popup="true"
          class="w-56 md:w-60 rounded-xl mt-6"
        >
          <template #item="{ item, props }">
            <div v-if="item.command === undefined" class="px-3 mb-2">
              <span class="text-surface-500 font-semibold hover:bg-none">
                {{ item.label }}
              </span>
            </div>
            <a
              v-else
              :class="[
                'flex items-center -ml-2',
                item.color,
                item.disabled ? 'cursor-not-allowed opacity-50' : '',
              ]"
              v-bind="props.action"
              @click="item.disabled !== true ? item.command : null"
            >
              <div class="flex w-9 items-center justify-center gap-4">
                <svg
                  v-if="item.iconType === 'svg'"
                  class="w-4 h-4"
                  :class="[item.color || 'text-surface-400']"
                  v-html="item.icon"
                ></svg>
                <i
                  v-else-if="item.iconType === 'material'"
                  class="material-symbols-outlined"
                  :class="[item.color || 'text-surface-400']"
                >
                  {{ item.icon }}
                </i>
                <i
                  v-else
                  :class="[item.icon, item.color || 'text-surface-400']"
                />
              </div>
              <div class="flex items-center justify-center">
                <span :class="item.color">
                  {{ item.label }}
                </span>
              </div>
            </a>
          </template>
        </Menu>

        <!-- Displaying only on the Large screen and upper -->
        <Menu
          id="overlay_breadcrumb_level"
          ref="breadcrumbMenu"
          :model="breadcrumbMenuItems"
          :popup="true"
          class="w-56 md:w-60 rounded-xl mt-2"
        >
          <template #item="{ item, props }">
            <div
              v-if="item.command === undefined"
              class="px-3 mb-2 mt-2"
              :class="{
                '!-mt-3': item.id === 'applications',
              }"
            >
              <span class="text-surface-500 font-semibold hover:bg-none">
                {{ item.label }}
              </span>
            </div>
            <a
              v-else
              :class="['flex items-center -ml-2', item.color]"
              v-bind="props.action"
              @click="(e) => item.command?.({ originalEvent: e, item })"
            >
              <div class="flex w-9 items-center justify-center gap-4">
                <svg
                  v-if="item.iconType === 'svg'"
                  class="w-6 h-5"
                  :class="[item.color || 'text-surface-400']"
                  v-html="item.icon"
                ></svg>
                <i
                  v-else-if="item.iconType === 'material'"
                  class="material-symbols-outlined"
                  :class="[item.color || 'text-surface-400']"
                >
                  {{ item.icon }}
                </i>
                <i
                  v-else
                  :class="[item.icon, item.color || 'text-surface-400']"
                />
              </div>
              <div class="flex items-center justify-center">
                <span :class="item.color">
                  {{ item.label }}
                </span>
              </div>
            </a>
          </template>
        </Menu>

        <!-- Displaying only on the Large screen and upper -->
        <Menubar
          v-if="breadcrumbMenuLevelItems.length > 0"
          class="hidden lg:flex rounded-md !shadow-none h-14 min-w-max"
          :model="breadcrumbMenuLevelItems"
        >
          <template #item="{ item, props, hasSubmenu }">
            <div
              :class="[
                'rounded-sm', // Small rounded corners and padding
                item.active ? 'bg-surface-100 mx-1' : '', // Apply surface-100 background based on condition
              ]"
            >
              <router-link
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
                :class="['text-surface-700']"
              >
                <a
                  v-ripple
                  :href="href"
                  v-bind="props.action"
                  @click="navigate"
                >
                  <div class="'flex w-9 items-center justify-center gap-4'">
                    <svg
                      v-if="item.iconType === 'svg'"
                      class="w-6 h-5"
                      :class="['text-surface-700']"
                      v-html="item.icon"
                    ></svg>
                    <i
                      v-else-if="item.iconType === 'material'"
                      class="material-symbols-outlined"
                      :class="['text-surface-700']"
                    >
                      {{ item.icon }}
                    </i>
                    <i
                      v-else
                      :class="['text-surface-700', 'text-surface-700']"
                    />
                  </div>
                  <span class="font-semibold truncate py-0.5">
                    {{ item.label }}
                  </span>
                </a>
              </router-link>
              <a
                v-else
                v-ripple
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
                :class="['text-surface-700']"
              >
                <div class="flex w-9 items-center justify-center gap-4">
                  <svg
                    v-if="item.iconType === 'svg'"
                    class="w-6 h-5"
                    :class="['text-surface-700']"
                    v-html="item.icon"
                  ></svg>
                  <i
                    v-else-if="item.iconType === 'material'"
                    class="material-symbols-outlined"
                    :class="['text-surface-700']"
                  >
                    {{ item.icon }}
                  </i>
                  <i v-else :class="['text-surface-700', 'text-surface-700']" />
                </div>
                <span class="font-semibold truncate py-0.5">
                  {{ item.label }}
                </span>
                <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
              </a>
            </div>
          </template>
        </Menubar>
      </div>

      <div class="flex w-auto gap-2">
        <div
          v-if="authStore.authenticationState === AuthenticationState.LoggedIn"
          class="flex gap-2 h-full"
        >
          <button
            class="w-auto h-full md:h-none border-0 bg-surface-0 items-center rounded-lg shadow-sm flex p-3 pl-4 hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors duration-200"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            @click="toggleActionMenu"
          >
            <Avatar
              :image="userStore.userImageUrl ?? undefined"
              :icon="userInitials ? undefined : 'pi pi-user'"
              :label="userStore.userImageUrl ? undefined : userInitials"
              size="normal"
              class="mr-2 text-gray-600 text-sm"
              shape="circle"
            />
            <span
              class="hidden xl:inline-flex flex-col items-start text-gray-700"
            >
              <span class="font-semibold">
                {{ displayName }}
              </span>
            </span>
            <i class="material-symbols-outlined">keyboard_arrow_down</i>
          </button>
          <Menu
            id="overlay_menu"
            ref="actionMenu"
            :model="actionMenuItems"
            :popup="true"
            class="w-56 md:w-60 mt-2 rounded-xl"
          >
            <template #start>
              <div
                class="mt-1 pb-3 border-b relative overflow-hidden w-full border-0 bg-transparent flex items-center p-2 rounded-none transition-colors duration-200"
              >
                <Avatar
                  :image="userStore.userImageUrl ?? undefined"
                  :label="userStore.userImageUrl ? undefined : userInitials"
                  size="large"
                  class="mr-2"
                  shape="circle"
                />
                <span class="inline-flex flex-col items-start">
                  <span class="font-bold text-sm md:text-base">
                    {{ displayName }}
                  </span>
                </span>
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
        <div
          class="hidden md:flex items-center justify-center h-14 p-[0.9rem] bg-surface-0 shadow-sm rounded-lg"
        >
          <img
            class="h-4 w-auto object-contain"
            :src="logoURL"
            :alt="$t('core.app_name')"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import Menubar from 'primevue/menubar';
import type { MenuItem } from 'primevue/menuitem';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import logoURL from '@/assets/img/aktionSodisBig.png';
import { useAuthStore, AuthenticationState } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

const getColor = (target: string) => {
  if (route.path !== undefined && route.path.includes(target)) {
    return 'text-primary font-semibold';
  }
  return undefined;
};

const isActive = (target: string) => {
  return route.path !== undefined && route.path.includes(target);
};

const emit = defineEmits({
  'show-configurator': () => true,
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const actionMenu = ref();
const breadcrumbMenu = ref();
const breadcrumbMenuLevel = ref();

const userStore = useUserStore();
const authStore = useAuthStore();
const actionMenuItems = ref<MenuItem[]>([
  {
    items: [
      {
        id: 'user-profile',
        label: t('actions.profile'),
        icon: 'pi pi-user',
        color: '',
        command: () => {
          router.push('/user');
        },
      },
      {
        label: t('actions.settings'),
        icon: 'pi pi-cog',
        color: '',
        command: () => {
          emit('show-configurator');
        },
      },

      {
        label: t('actions.sign_out'),
        icon: 'pi pi-sign-out',
        color: '!text-danger',
        command: () => {
          logoutRedirect();
        },
      },
    ],
  },
  {
    separator: true,
  },
]);

const homeApp = ref({
  key: 'home',
  icon: 'apps',
  route: '/',
});

const breadcrumbItems = computed(() => {
  if (!route.meta.i18n_title) {
    return [];
  }

  if (route.name !== 'Home' && route.name !== 'ApplicationsOverview') {
    return [
      {
        label: t(route.meta.i18n_title),
        route: route,
      },
    ];
  }

  return [];
});

const breadcrumbLevelItems = computed(() => {
  if (route.path.split('/').length > 2) {
    const sub = breadcrumbMenuItems.value[0].items.find(
      (item) => item.id === route.path.split('/')[1]
    );
    let subActive = undefined;
    sub?.items?.forEach((subItem: MenuItem) => {
      if (route.path.includes(subItem.id)) {
        subActive = [
          {
            label: subItem.label,
            icon: subItem.icon,
            iconType: subItem.iconType,
            route: route,
          },
        ];
      }
    });

    if (subActive) {
      return subActive;
    } else {
      return [];
    }
  }
  return [];
});

const breadcrumbMenuItems = computed(() => {
  const items: MenuItem[] = [
    {
      id: 'applications',
      label: t('navigation.applications'),
    },
    {
      id: 'test',
      label: t('test'),
      icon: 'build',
      iconType: 'material',
      color: getColor('test'),
      command: () => {
        router.push({ name: 'test' });
      },
      items: [
        {
          id: 'test',
          label: t('test'),
          icon: 'build',
          iconType: 'material',
          color: getColor('test'),
          active: isActive('test'),
          command: () => router.push({ name: 'test' }),
        },
      ],
    },
  ];

  return [{ items }];
});

const breadcrumbMenuLevelItems = computed(() => {
  if (route.path.split('/').length > 2) {
    const sub = breadcrumbMenuItems.value[0].items.find(
      (item) => item.id === route.path.split('/')[1]
    );

    if (sub?.items) {
      return sub.items;
    } else {
      return [];
    }
  }

  return [];
});

const userInitials = computed(() => {
  if (userStore.user) {
    return (
      userStore.user.firstName.charAt(0) + userStore.user.lastName.charAt(0)
    );
  }
  return '';
});

const displayName = computed(() => {
  if (userStore.user) {
    return userStore.user.firstName + ' ' + userStore.user.lastName;
  }
  return '';
});

const toggleBreadcrumbMenu = (event: Event) => {
  if (route.name !== '/') breadcrumbMenu.value.toggle(event);
};

const toggleBreadcrumbMenuLevel = (event: Event) => {
  breadcrumbMenuLevel.value?.toggle(event);
};

const toggleActionMenu = (event: Event) => {
  actionMenu.value.toggle(event);
};

const logoutRedirect = () => {
  authStore.logout();
};
</script>

<style scoped>
[data-pc-name='breadcrumb'] [data-pc-section='homeitem'] a {
  height: 100%;
  padding: 0.7rem;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}

[data-pc-name='breadcrumb'] [data-pc-section='homeitem'] a span {
  font-size: 2rem !important;
}

[data-pc-name='breadcrumb'] [data-pc-section='homeitem'] a:hover {
  background-color: var(--surface-50);
}

[data-pc-name='breadcrumb'] [data-pc-section='item'] a {
  display: flex;
  align-items: center;
  padding: 0.95rem 0.7rem;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}

[data-pc-name='breadcrumb'] [data-pc-section='item'] a:hover {
  background-color: var(--surface-50);
  cursor: pointer !important;
}

[data-pc-name='breadcrumb'] [data-pc-section='item'] a:hover span:last-child {
  cursor: pointer !important;
  text-decoration: underline;
}

[data-pc-section='submenulabel'] {
  padding: 0 !important;
}
</style>
