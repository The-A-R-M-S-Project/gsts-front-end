<template>
  <div>
    <v-navigation-drawer floating class="hidden-sm-and-down">
      <v-toolbar>
        <v-list>
          <v-list-tile avatar flat>
            <v-list-tile-avatar>
              <img src="~@/assets/img/joyce-mccown-whitebooks.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="title">Admin</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.path">
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
        { title: "Notifications" },
        { title: "logout" }
      ]
    };
  }
};
</script>
<style lang="scss">
</style>
