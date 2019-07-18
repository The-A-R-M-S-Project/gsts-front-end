<template>
  <div>
    <v-navigation-drawer floating class="hidden-sm-and-down" height="100vh" width="200px">
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
        <v-list-tile v-for="item in items" :key="item.title" :to="item.path" class="side-nav-link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
        { title: "Notifications", icon: "dashboard" },
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
