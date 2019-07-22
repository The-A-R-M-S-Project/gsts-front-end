<template>
  <v-navigation-drawer 
    dark
    stateless 
    value="true" 
    style="height: 89vh;"
    width="230px"
    elevation="23"
  >
    <v-toolbar flat style="display: flex;" class="transparent justify-center pl-0" height="220" color="black">
        <v-avatar color="blue grey lighten-2" size="200">
            <v-icon dark size="150px">person</v-icon>
        </v-avatar>
    </v-toolbar>
    <div class="text-xs-center white--text">
      <strong><h3>student name</h3></strong>
    </div>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile @click="clickedReportStatus()">
        <v-list-tile-action>
          <v-icon> assessment </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Report Status</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="clickedProfile()">
        <v-list-tile-action>
          <v-icon> person </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {
    clickedReportStatus: function() {
      let route = 'timeline'
      this.$emit('routeChange', route)
    },
    clickedProfile: function() {
      let route = 'profile'
      this.$emit('clickedProfile', route)
    }
  }
};
</script>

