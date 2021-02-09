<template>
  <div class="mx-auto" :key="reportSectionKey">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <CreateReport v-if="student.report === undefined" />
    <ReportSubmission v-else />
    <Footer />
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
import ReportSubmission from "@/components/ReportSubmission.vue";
import CreateReport from "@/components/CreateReport.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";

export default {
  name: "student-submission",
  computed: {
    ...mapGetters(["student", "reportSectionKey"]),
  },
  components: {
    Navigation,
    CreateReport,
    ReportSubmission,
    MobileDrawer,
    Footer,
  },
};
</script>