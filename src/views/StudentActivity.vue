<template>
  <div class="mx-auto overflow-hidden" style="height: 100%">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <OverlayLoader />
    <div :class="{'progress': !$vuetify.breakpoint.xs}">
      <v-row v-if="student.report === undefined" align="center" justify="center">
        <v-col class="text-center">
          <span class="grey--text display-1 no-report text-center">
            <v-icon large color="purple">mdi-lock-open</v-icon>&nbsp; Unlock your dashboard.
            <br />
            <span class="title">
              Click
              <span
                class="yellow--text text--darken-3"
                style="cursor: pointer"
                @click="submitReport"
              >here</span>
              to create a new report
            </span>
          </span>
        </v-col>
      </v-row>
      <v-row v-else no-gutters>
        <v-col cols="12" lg="9">
          <StudentProgress class="mb-6" />
        </v-col>
        <v-col cols="12" lg="3">
          <StudentsNotifications />
        </v-col>
      </v-row>

      <v-btn
        v-show="$route.path.includes('report-status')"
        color="teal"
        fab
        dark
        fixed
        bottom
        right
        class="v-btn--example"
        @click="submitReport"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import StudentProgress from "@/components/StudentProgress.vue";
import StudentsNotifications from "@/components/StudentsNotifications.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "student-dashboard",
  created() {
    this.$store.dispatch("fetchLoggedInStudentDetails");
  },
  computed: {
    student() {
      return this.$store.getters.student;
    },
  },
  methods: {
    submitReport() {
      this.$router.push("submit-report");
    },
  },
  components: {
    Navigation,
    MobileDrawer,
    OverlayLoader,
    StudentProgress,
    StudentsNotifications,
    Footer,
  },
};
</script>

<style>
.progress .v-btn--example {
  margin: 0 1rem 2rem 2rem;
}
#no-report-found {
  text-align: center;
}
.no-report {
  display: inline-block;
  margin: 40vh auto 40vh auto;
}
</style>