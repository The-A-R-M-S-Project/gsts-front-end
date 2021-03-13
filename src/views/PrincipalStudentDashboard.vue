<template>
  <div class="mx-auto overflow-hidden">
    <template v-if="user.role === 'principal'">
      <Navigation class="d-none d-sm-block" />
    </template>
    <template v-else-if="user.role === 'dean'">
      <DeanNav class="d-none d-sm-block" />
    </template>
    <template v-else-if="user.role === 'examiner'">
      <ExaminerNav class="d-none d-sm-block" />
    </template>
    <MobileDrawer />
    <div>
      <v-row no-gutters>
        <v-col cols="12" lg="9">
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12">
              <StudentProgress class="mb-6" />
            </v-col>
            <v-col
              v-if="
                (user.role === 'principal' || user.role === 'dean') &&
                progressEvents[`${studentReport.status}`].step > 3
              "
              cols="12"
            >
              <ExaminerAssessment />
            </v-col>
            <v-col
              v-if="user.role === 'principal' || user.role === 'dean'"
              cols="12"
            >
              <Resubmission />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="3">
          <StudentsNotifications />
        </v-col>
      </v-row>
    </div>
    <Footer />
  </div>
</template>
<style></style>
<script>
import Navigation from "@/components/Navbar.vue";
import DeanNav from "@/components/DeanNav.vue";
import ExaminerNav from "@/components/ExaminersNavbar.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import StudentProgress from "@/components/StudentProgress.vue";
import ExaminerAssessment from "@/components/ExaminerAssessment.vue";
import Resubmission from "@/components/Resubmission.vue";
import StudentsNotifications from "@/components/StudentsNotifications.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["isLoading", "user", "studentReport", "progressEvents"]),
  },
  components: {
    Navigation,
    DeanNav,
    ExaminerNav,
    MobileDrawer,
    ExaminerAssessment,
    StudentProgress,
    Resubmission,
    StudentsNotifications,
    Footer,
  },
};
</script>
