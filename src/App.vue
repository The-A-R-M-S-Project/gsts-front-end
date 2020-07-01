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
.normal-text {
  font-size: 1.3rem !important;
}
.heading {
  font-size: 2rem !important;
}
.sub-heading {
  font-size: 1.5rem !important;
}
.button-text {
  font-size: 1.3rem !important;
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
