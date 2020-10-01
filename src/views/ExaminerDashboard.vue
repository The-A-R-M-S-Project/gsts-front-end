<template>
  <div class="mx-auto overflow-hidden">
    <Navigation class="d-none d-sm-block" />
    <OverlayLoader />
    <MobileDrawer />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="4" order="2" order-sm="1">
          <ReportScore :key="examinerStatisticsKey" />
        </v-col>
        <v-col cols="12" lg="8" order="1" order-sm="2">
          <StudentReportTable />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/ExaminersNavbar.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import ReportScore from "@/components/ReportScore.vue";
import StudentReportTable from "@/components/AssignedStudentsTable.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "examinerDetails",
  computed: {
    examinerStatisticsKey() {
      return this.$store.getters.examinerStatisticsKey;
    },
  },
  components: {
    Navigation,
    MobileDrawer,
    ReportScore,
    StudentReportTable,
    OverlayLoader,
    Footer,
  },
};
</script>