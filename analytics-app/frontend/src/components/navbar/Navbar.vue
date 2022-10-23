<template>
  <div class="wrapper">
    <Sidebar />
    <TopNavbar />
  </div>
</template>

<script>
import { mapState } from "vuex";

import TopNavbar from "./TopNavbar.vue";
import Sidebar from "./Sidebar.vue";

export default {
  components: { TopNavbar, Sidebar },
  mounted: function () {
    this.root = document.documentElement;
  },
  computed: {
    ...mapState({
      SideBarCollapsed: (state) => state.NavbarAtributes.SideBarCollapsed,
    }),
  },
};
</script>

<style>
:root {
  --navbar-height: 60px;
  --link-height: 50px;
  --sub-link-height: 35px;

  --sidebar-width: 260px;
  --sidebar-width-collapsed: 60px;
  --sidebar-width-expanded: 260px;
}
</style>

<style scoped></style>
