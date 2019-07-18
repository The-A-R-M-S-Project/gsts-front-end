<template>
  <v-navigation-drawer stateless value="true" style="height: 89vh;">
    <v-toolbar flat style="display: flex;" class="transparent justify-center pl-0" height="220">
        <v-avatar color="blue grey lighten-2" size="200">
            <v-icon dark size="150px">person</v-icon>
        </v-avatar>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title>Report Status</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title>Academic Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {}
};
</script>

