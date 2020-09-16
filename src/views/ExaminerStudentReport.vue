<template>
  <div class="mx-auto">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <StudentReport />
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/ExaminersNavbar.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import StudentReport from "@/components/StudentReport.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "examinerview-student-report",
  components: {
    Navigation,
    MobileDrawer,
    StudentReport,
    Footer,
  },
};
</script>