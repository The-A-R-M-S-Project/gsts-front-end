<template>
  <div>
    <v-navigation-drawer
      dark
      class="hidden-sm-and-down"
      height="100vh"
      width="230px"
      elevation="23"
    >
      <v-toolbar>
        <v-list>
          <v-list-tile avatar flat>
            <v-list-tile-avatar>
              <img src="~@/assets/img/joyce-mccown-whitebooks.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content elevation="10">
              <v-list-tile-title class="font-weight-bold">Admin</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile class="side-nav-link" :to="admin-dashboard" my-3>
          <v-list-tile-action>
            <v-icon large>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="side-nav-link">
          <v-list-tile-action>
            <v-badge color="yellow">
              <template v-slot:badge>
                <span class="font-weight-bold black--text">5</span>
              </template>
              <v-icon large>notifications</v-icon>
            </v-badge>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading">Notifications</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="side-nav-link">
          <v-list-tile-action>
            <v-icon large>subdirectory_arrow_left</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "sidenav",
  data() {
    return {
      items: [
        { title: "Dashboard", path: "/admin-dashboard", icon: "dashboard" },
        { title: "Notifications", icon: "notifications" },
        { title: "logout", icon: "dashboard" }
      ]
    };
  }
};
</script>
<style lang="scss">
.side-nav-link:hover {
  background-color: lightgrey;
  font-weight: 900;
}
// .side-nav-link:active {
//   background-color: red;
//   color: red;
// }
// .side-nav-link:visited {
//   background-color: blue;
//   color: blue;
// }
</style>
