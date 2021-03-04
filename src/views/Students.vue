<template>
  <div class="mx-auto overflow-hidden">
    <template v-if="user.role === 'principal'">
      <Navigation class="d-none d-sm-block" />
    </template>
    <template v-else-if="user.role === 'dean'">
      <DeanNav class="d-none d-sm-block" />
    </template>
    <MobileDrawer />
    <v-container fluid class="pt-1">
      <v-row class="mx-1">
        <StudentsTable />
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>
<style></style>
<script>
import StudentsTable from "@/components/StudentsTable.vue";
import Navigation from "@/components/Navbar.vue";
import DeanNav from "@/components/DeanNav.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import { mapGetters } from "vuex";
import Footer from "@/components/Footer.vue";

export default {
  computed: {
    ...mapGetters(["user"]),
  },
  components: {
    StudentsTable,
    Navigation,
    DeanNav,
    MobileDrawer,
    Footer,
  },
};
</script>
