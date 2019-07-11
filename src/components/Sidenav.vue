<template>
  <div>
    <v-navigation-drawer permanent>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <v-icon>account_circle</v-icon>
              Admin
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile
          v-for="item in items"
          :key="item.title">
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
    name: 'sidenav',
    data () {
      return {
        items: [
          { title: 'Dashboard'},
          { title: 'Notifications'},
          { title: 'Calendar'},
          { title: 'Logout'},
        ],
        // right: null
      }
    }
}
</script>
<style lang="scss">

</style>
