<template>
  <div>
    <Navigation v-if="user.role === 'principal'" class="d-none d-sm-block" />
    <DeanNav v-if="user.role === 'dean'" class="d-none d-sm-block" />
    <ExaminersNavbar v-if="user.role === 'examiner'" class="d-none d-sm-block" />
    <MobileDrawer />
    <StaffProfileDetails />
    <EditProfileItem />
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import DeanNav from "@/components/DeanNav.vue";
import ExaminersNavbar from "@/components/ExaminersNavbar.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import StaffProfileDetails from "@/components/StaffProfileDetails.vue";
import EditProfileItem from "@/components/EditProfileItem.vue";
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
    ExaminersNavbar,
    MobileDrawer,
    StaffProfileDetails,
    EditProfileItem,
    Footer,
  },
};
</script>