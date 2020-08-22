<template>
  <div class="mx-auto overflow-hidden">
    <Navigation class="d-none d-sm-block" />
    <OverlayLoader />
    <MobileDrawer />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="7">
          <StudentReportTable />
        </v-col>
        <v-col cols="12" lg="5">
          <ReportScore />
          <v-card>
            <v-card-text pa-1>
              <h2 class="text-xs-center custom-font-family headline">Examiner's Record</h2>
            </v-card-text>
            <ExaminerRecord />
          </v-card>
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
import ExaminerRecord from "@/components/ExaminerRecord.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "examinerDetails",
  components: {
    Navigation,
    MobileDrawer,
    ReportScore,
    StudentReportTable,
    OverlayLoader,
    ExaminerRecord,
    Footer,
  },
};
</script>