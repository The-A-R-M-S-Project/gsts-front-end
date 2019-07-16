<template>
  <div>
    <Navigation />
    <v-layout row wrap pt-3 px-3>
      <v-flex xs2 sm2 pr-1>
        <Sidenav />
      </v-flex>
      <v-flex xs10 sm10 pl-1>
        <v-layout row wrap>
          <v-flex sm12 md4 pb-3 pr-2>
            <v-card>
              <v-card-text pa-1>
                <h3 class="text-xs-center">VIVA STATUS</h3>
                <div class="text-xs-center mt-4 mb-3">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm12 md8 pb-3 pl-2>
            <v-card>
              <v-card-text pa-1>
                <h3 class="text-xs-center">REPORT STATUS</h3>
              </v-card-text>
              <ReportStatus />
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-layout row wrap>
            <v-flex xs12 sm12 pb-3>
              <v-card>
                <v-card-text pa-1>
                  <h3 class="text-xs-center">PERFOMANCE</h3>
                  <PerfomanceChart />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm12 pb-3>
              <v-card>
                <v-card-text pa-1>
                  <h3 class="text-xs-center">EVENTS CALENDAR</h3>
                </v-card-text>
                <Calendar />
              </v-card>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import Sidenav from "@/components/Sidenav.vue";
import VivaStatus from "@/components/VivaStatus.vue";
import ReportStatus from "@/components/ReportStatus.vue";
import PerfomanceChart from "@/components/Perfomance.vue";
import Calendar from "@/components/Calendar.vue";
export default {
  name: "dashboard",
  components: {
    Navigation,
    Sidenav,
    VivaStatus,
    ReportStatus,
    PerfomanceChart,
    Calendar
  }
};
</script>

<style lang="scss">
</style>
