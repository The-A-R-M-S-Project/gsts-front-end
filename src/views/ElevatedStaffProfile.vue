<template>
  <div>
    <Navigation v-if="user.role === 'principal'" class="d-none d-sm-block" />
    <DeanNav v-if="user.role === 'dean'" class="d-none d-sm-block" />
    <MobileDrawer />
    <ElevatedStaffProfileDetails />
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import DeanNav from "@/components/DeanNav.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import ElevatedStaffProfileDetails from "@/components/ElevatedStaffProfileDetails.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "elevated-staff-profile",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: {
    Navigation,
    DeanNav,
    MobileDrawer,
    ElevatedStaffProfileDetails,
    Footer,
  },
};
</script>