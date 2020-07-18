<template>
  <div>
    <Navigation />
    <OverlayLoader />
    <v-container fluid class="pt-5">
      <v-row class="px-4">
        <v-row>
          <v-col sm="12" md="4" class="pb-3 pr-2">
            <v-card class="viva-status" flat color="teal">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline white--text">Viva Status</h2>
                <div class="text-center mt-4 mb-3">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="12" md="8" class="pb-3 pl-2">
            <v-card flat elevation="24">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Report Status</h2>
              </v-card-text>
              <ReportStatus />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" md="6" class="pb-3 pr-2">
            <v-card elevation="20">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Performance</h2>
                <PerfomanceChart />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="12" md="6" class="pb-3 pl-2" grow>
            <v-card elevation="24">
              <v-card-text pa-1>
                <h2 class="text-center custom-font-family headline">Upcoming deadlines</h2>
              </v-card-text>
              <Calendar />
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import VivaStatus from "@/components/VivaStatus.vue";
import ReportStatus from "@/components/ReportStatus.vue";
import PerfomanceChart from "@/components/Perfomance.vue";
import Calendar from "@/components/Calendar.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";

export default {
  name: "ECE-Desktop",
  components: {
    Navigation,
    VivaStatus,
    ReportStatus,
    PerfomanceChart,
    Calendar,
    OverlayLoader
  }
};
</script>

<style lang="scss">
.viva-status {
  background-color: purple;
}
</style>
