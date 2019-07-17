<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",

  data() {
    return {};
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Comfortaa", cursive;
}
.custom-font-family {
  font-family: "Comfortaa", cursive !important;
}
</style>


