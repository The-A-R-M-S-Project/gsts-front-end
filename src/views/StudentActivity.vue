<template>
  <div class="mx-auto overflow-hidden" style="height: 100%">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <div :class="{'progress': !$vuetify.breakpoint.xs}">
      <v-row no-gutters>
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
import StudentProgress from "@/components/StudentProgress.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import StudentsNotifications from "@/components/StudentsNotifications.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "student-dashboard",
  methods: {
    submitReport() {
      this.$router.push("submit-report");
    },
  },
  components: {
    Navigation,
    StudentProgress,
    MobileDrawer,
    StudentsNotifications,
    Footer,
  },
};
</script>

<style>
.progress .v-btn--example {
  margin: 0 1rem 2rem 2rem;
}
</style>