<template>
  <div class="mx-auto">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <StudentProfileDetails />
    <Footer />
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
import StudentProfileDetails from "@/components/StudentProfileDetails.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "student-submission",
  components: {
    Navigation,
    StudentProfileDetails,
    MobileDrawer,
    Footer,
  },
};
</script>