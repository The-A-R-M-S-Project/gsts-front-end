<template>
  <div>
    <Navigation />
    <v-card flat min-height="600px">
      <Sidenav />
    </v-card>
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import Sidenav from "@/components/Sidenav.vue";
export default {
  name: "dashboard",
  components: {
    Navigation,
    Sidenav
  }
};
</script>

<style lang="scss">
</style>
