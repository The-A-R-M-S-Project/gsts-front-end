<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
#app {
  font-family: "Comfortaa", "Arial";
}
.custom-font-family {
  font-family: "Comfortaa", "Arial" !important;
}
.custom-link {
  text-decoration: none;
}
.navbar {
  position: fixed;
  z-index: 1;
  width: 100%;
}
</style>
