<template>
  <div class="mx-auto">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <ReportSubmission />
    <Footer />
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
import ReportSubmission from "@/components/ReportSubmission.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "student-submission",
  components: {
    Navigation,
    ReportSubmission,
    MobileDrawer,
    Footer,
  },
};
</script>