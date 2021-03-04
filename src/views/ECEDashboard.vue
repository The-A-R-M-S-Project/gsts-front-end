<template>
  <div class="mx-auto overflow-hidden">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <OverlayLoader />
    <v-container fluid class="pt-5">
      <v-row class="px-4">
        <v-row>
          <v-col sm="12" md="4" class="pb-3">
            <v-card color="teal" class="mx-auto" max-width="90vw">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline white--text">
                  Viva Status
                </h2>
                <div class="text-center mt-4 mb-3">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="12" md="8" class="pb-3">
            <v-card class="mx-auto" max-width="90vw">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">
                  Report Status
                </h2>
              </v-card-text>
              <ReportStatus />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" md="6" class="pb-3 pr-2">
            <v-card class="mx-auto" max-width="90vw">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">
                  Performance
                </h2>
                <PerfomanceChart />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="12" md="6" class="pb-3 pl-2" grow>
            <v-card class="mx-auto" max-width="90vw">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">
                  Upcoming deadlines
                </h2>
                <Calendar />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import VivaStatus from "@/components/VivaStatus.vue";
import ReportStatus from "@/components/ReportStatus.vue";
import PerfomanceChart from "@/components/Performance.vue";
import Calendar from "@/components/Calendar.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "ECE-Dashboard",
  data() {
    return {
      drawer: false,
      loading: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },

  components: {
    Navigation,
    MobileDrawer,
    VivaStatus,
    ReportStatus,
    PerfomanceChart,
    Calendar,
    OverlayLoader,
    Footer,
  },
};
</script>
<style>
.mobile-drawer .v-btn__content .v-icon {
  font-size: 2rem !important;
}
.mobile-card {
  height: 50vh;
}
</style>