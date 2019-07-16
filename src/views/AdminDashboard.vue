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
            <h2>Viva Status</h2>
            <v-card>
              <v-card-text pa-1>
                <div class="text-xs-center mt-2 mb-2">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm12 md8 pb-3 pl-2>
            <h2>Report Status</h2>
            <v-card>
              <v-card-text pa-1 pt-1>
                <ReportStatus />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm12 pb-3>
            <h2>Perfomance Charts</h2>
            <v-card>
              <v-card-text pa-1>
                <PerfomanceChart />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm12 pb-3>
            <h2>Events Calendar</h2>
            <v-card>
              <v-card-text pa-1>
              </v-card-text>
              <Calendar />
            </v-card>
          </v-flex>
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
