<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-dashboard"/>
        <sidebar-link to="/districts" name="Districts" icon="ti-location-pin"/>
        <sidebar-link to="/factors" name="Cluster" icon="ti-map-alt"/>
        <sidebar-link to="/sources" name="Sources" icon="ti-view-list-alt"/>
        <!-- <sidebar-link to="/projects" name="Projects" icon="ti-pencil-alt2"/> -->
        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell"/>
       
      </template>
      <mobile-menu>
         <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-user"></i>
              <p>
              Chitipat Thabsuwan
              </p>
            </a>
          </li>
       
          <drop-down class="nav-item"
                     title="Setting"
                     title-classes="nav-link"
                     icon="ti-settings">
            <a class="dropdown-item" href="#">User profile</a>
            <a class="dropdown-item" href="#">Log out</a>
             </drop-down>
        </ul>
      </div>
        
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

     
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
