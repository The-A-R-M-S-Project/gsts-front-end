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
* {
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
  font-size: 1rem !important;
}
.styled-input label[for] {
  height: 2.2rem !important;
  font-size: 1.2rem !important;
}
.styled-input .v-input__icon--prepend-inner .v-icon.v-icon,
.styled-input .v-input__icon--prepend .v-icon {
  font-size: 2rem !important;
  padding-right: 0.6rem;
}
.styled-input .v-select__selection {
  font-size: 1.09rem !important;
}
.styled-input .v-input__icon--append .v-icon.v-icon,
.styled-input .v-input__icon--append .v-icon {
  font-size: 2rem !important;
}
.styled-input .v-input__icon--clear .v-icon.v-icon {
  font-size: 2rem !important;
}
.mobile-error {
  height: 4.5rem !important;
  border-radius: 10rem !important;
}
.mobile-container {
  margin-top: 30vh;
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
