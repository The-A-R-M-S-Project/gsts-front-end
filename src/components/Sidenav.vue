<template>
    <v-navigation-drawer 
        permanent
        absolute
    >
        <v-toolbar flat>
        <v-list>
            <v-list-tile avatar>
            <v-list-tile-avatar>
                <img src="~@/assets/img/joyce-mccown-whitebooks.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title class="title">Admin</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense>
        <v-list-tile
            v-for="item in items"
            :key="item.title"
            v-on:click=""
            >
            <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile fixed>
            <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    name: 'sidenav',
    data () {
      return {
        items: [
          { title: 'Notifications'},
          { title: 'Calendar'},
        ],
      }
    }
}
</script>
<style lang="scss">

</style>
