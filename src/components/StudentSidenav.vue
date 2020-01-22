<template>
  <v-navigation-drawer 
    dark
    height= "89vh"
    width="260px"
    elevation="23"
  >
    <v-toolbar flat style="display: flex;" class="justify-center pl-0" height="220">
        <v-avatar color="blue grey lighten-2" size="200">
            <v-icon color="grey" size="150px">person</v-icon>
        </v-avatar>
    </v-toolbar>
    <h1 class="font-weight-bold white--text text-xs-center">Student Name</h1>
    <v-divider></v-divider>
    <v-list class="pt-0" dense>
      

      <v-list-tile>
        <v-list-tile-action>
          <v-icon> assessment </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><router-link to="report-status" class="bttn">Report Status</router-link></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon> person </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title ><router-link to="student-profile" class="bttn">Profile</router-link></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  
};
</script>

<style>
.bttn {
  text-decoration: none;
  color: white;
}
</style>

