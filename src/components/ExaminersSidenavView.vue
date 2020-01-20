<template>
  <div>
    <v-navigation-drawer
      dark
      class="hidden-sm-and-down"
      height="136vh"
      elevation="23"
    >
      <v-toolbar style="display:flex;" height="220" class="justify-center">
        <v-list>
          <v-list-tile avatar flat>
            <v-layout row>
            <v-list-tile-avatar size="200">
              <img size="200" src="~@/assets/img/login-1.jpg" />
            </v-list-tile-avatar>
            </v-layout>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <h1 class="font-weight-bold white--text text-xs-center">Examiner</h1>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile class="side-nav-link" :to="examiner-dashboard" my-3>
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
        <v-list-tile class="side-nav-link" my-3>
          <v-list-tile-action>
            <v-icon large>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading">Students Assigned</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="side-nav-link" v-on:click="logOut">
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
  },
  methods: {
    logOut() {
      if (localStorage.getItem("jwt") != null) {
        const role = ["principal", "dean", "examiner"].includes(
          localStorage.getItem("user").role
        )
          ? "lecturer"
          : "student";
        this.$http
          .get(
            `https://arms-graduate-student-tracker.herokuapp.com/api/${role}/logout`
          )
          .then(response => {
            console.log("Logged Out!!");
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            this.$router.push({ name: "login" });
          })
          .catch(error => {
            console.log(error.response.data.message);
          });
      }
    }
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
