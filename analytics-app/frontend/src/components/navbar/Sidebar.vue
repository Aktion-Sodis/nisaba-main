<template>
  <div class="sidebar" :class="{ collapsed: SideBarCollapsed }">
    <div class="organization-wrapper">
      <div class="icon-wrapper">
        <el-image class="organization-icon" :src="societyLogoSmall" />
      </div>
      <div class="organization-name" :class="{ collapsed: SideBarCollapsed }">
        {{ rememberedOrganizationName.value }}
      </div>
    </div>
    <div class="sidebar-container" :class="{ expanded: !SideBarCollapsed }">
      <NavbarItem :item="home"></NavbarItem>
      <NavbarItem :item="data"></NavbarItem>
      <NavbarDropdown :items="dashboard"></NavbarDropdown>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";
import { rememberedOrganizationName } from '../../local_storage/organization.js';

import NavbarItem from "./NavbarItem.vue";
import NavbarDropdown from "./NavbarDropdown.vue";

const dashboardsCollapsed = ref(true);
const dataCollapsed = ref(true);

//const societyName = import.meta.env.VITE_APP_SOCIETY_VERBOSE_NAME;
const societyLogoSmall = import.meta.env.VITE_APP_LOGO_SMALL_SRC;

export default {
  components: { NavbarItem, NavbarDropdown },
  setup() {
    return { dashboardsCollapsed, dataCollapsed };
  },
  computed: {
    ...mapState({
      SideBarCollapsed: (state) => state.NavbarAtributes.SideBarCollapsed,
    }),
  },
  methods: {
    toggleDashboard() {
      return (dashboardsCollapsed.value = !dashboardsCollapsed.value);
    },
    toggleData() {
      return (dataCollapsed.value = !dataCollapsed.value);
    },
  },
  data() {
    return {
      rememberedOrganizationName,
      societyLogoSmall,
      home: {
        name: "Home",
        icon: "fa-solid fa-house",
        to: "/",
      },
      data: {
        name: "Data",
        icon: "fa-solid fa-database",
        to: "surveyoverview",
      },
      dashboard: {
        name: "Dashboards",
        icon: "fas fa-chart-bar",
        items: [
          {
            id: 1,
            name: "Dashboard1",
            to: "/dashboard",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
/* General Layout */
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--bg-color);
  float: left;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}
.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}
.sidebar-container {
  display: flex;
  flex-direction: column;
}
.sidebar-container {
  height: calc(100vh - var(--navbar-height));
}

/* Organization */
.organization-wrapper {
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.icon-wrapper {
  box-sizing: border-box;
  width: var(--sidebar-width-collapsed);
}
.organization-icon {
  width: 30px;
}

.organization-name {
  box-sizing: border-box;
  width: calc(var(--sidebar-width-expanded) - var(--sidebar-width-collapsed));
  text-align: left;
  padding-left: 5px;
  font-size: 20px;
  text-transform: uppercase;
  color: white;
}
.organization-name.collapsed {
  display: none;
}

.dropdwn-items,
.sidenav-item {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.dropdwn-content,
.dropdwn-btn,
.nav-link,
.link {
  text-decoration: none;
  position: relative;
  float: left;
  color: white;

  cursor: pointer;
  text-align: start;
}
.dropdwn-btn,
.link {
  padding: 15px 15px 15px 25px;
}
.dropdwn-btn:hover,
.link:hover,
.nav-link:hover {
  background-color: var(--item-hover);
}
.dropdwn-content {
  margin: 0px 57px;
  display: flex;
  flex-direction: column;
}
.dropdwn-item {
  margin: 5px 0;
}
.nav-icon {
  width: 16px;
}
.nav-text {
  font-size: 16px;
  margin-left: 15px;
}
.nav-text.collapsed {
  display: none;
}
.drop-icon {
  position: relative;
  float: right;
}
.drop-icon.collapsed {
  visibility: hidden;
  display: none;
}
</style>
