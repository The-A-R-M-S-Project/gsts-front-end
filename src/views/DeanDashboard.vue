<template>
  <div class="mx-auto overflow-hidden">
    <DeanNav class="d-none d-sm-block" />
    <OverlayLoader />
    <MobileDrawer />
    <v-container fluid class="pt-5">
      <v-row class="px-4">
        <v-row>
          <v-col sm="12" md="4" class="pb-3">
            <v-card class="mx-auto" flat color="teal" max-width="90vw">
              <v-card-text elevation="24" class="pa-1">
                <h2 class="text-center custom-font-family headline white--text">
                  Viva Status
                </h2>
                <div class="text-center mt-4 mb-3">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="12" xs="12" md="8" class="pb-3">
            <v-card class="mx-auto" max-width="90vw" flat elevation="24">
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
          <v-col sm="12" xs="12" md="6" class="pb-3">
            <v-card class="mx-auto" max-width="90vw" elevation="20">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">
                  Performance
                </h2>
                <PerfomanceChart />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="12" md="6" class="pb-3">
            <v-card class="mx-auto" max-width="90vw" elevation="24">
              <v-card-text pa-1>
                <h2 class="text-center custom-font-family headline">
                  Upcoming deadlines
                </h2>
              </v-card-text>
              <Calendar />
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>
<script>
import DeanNav from "@/components/DeanNav.vue";
import VivaStatus from "@/components/VivaStatus.vue";
import ReportStatus from "@/components/ReportStatus.vue";
import PerfomanceChart from "@/components/Performance.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import Calendar from "@/components/Calendar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "dean-dashboard",
  async created() {
    await this.$store.dispatch("fetchLoggedInStaff");
  },
  components: {
    DeanNav,
    VivaStatus,
    ReportStatus,
    MobileDrawer,
    PerfomanceChart,
    Calendar,
    OverlayLoader,
    Footer,
  },
};
</script>
