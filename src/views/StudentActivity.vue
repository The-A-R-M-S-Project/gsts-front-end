<template>
  <div class="mx-auto overflow-hidden" style="height: 100%">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <OverlayLoader />
    <v-row v-if="!studentReport.title" align="center" justify="center">
      <v-col class="text-center">
        <span class="grey--text display-1 no-report text-center">
          <v-icon large color="purple">mdi-lock-open</v-icon>&nbsp; Unlock your
          dashboard.
          <br />
          <span class="title">
            To start the submission process, click
            <span
              class="yellow--text text--darken-3"
              style="cursor: pointer"
              @click="submitReport"
              >here</span
            >
            to <br />
            create a report title and abstract
          </span>
        </span>
      </v-col>
    </v-row>
    <div v-else :class="{ progress: !$vuetify.breakpoint.xs }">
      <v-row no-gutters>
        <v-col cols="12" lg="9">
          <StudentProgress class="mb-6" />
        </v-col>
        <v-col cols="12" lg="3">
          <StudentsNotifications />
        </v-col>
      </v-row>

      <v-btn
        v-show="$route.path.includes('report-status') && progressEvents[studentReport.status].step === 1 && progressEvents[studentReport.status].step === 6"
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
import { mapGetters } from "vuex";

export default {
  name: "student-dashboard",
  async created() {
    await this.$store.dispatch("fetchLoggedInStudentDetails");
  },
  computed: {
    ...mapGetters(["student", "studentReport", "progressEvents"]),
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