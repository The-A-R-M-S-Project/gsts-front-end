<template>
  <div class="admin-dashboard">
    <Navigation />
    <v-container fluid pt-5 class>
      <v-layout mt-5>
        <v-flex md2>
          <Sidenav height="100%" class="side-navigation" />
        </v-flex>
        <v-flex md10>
          <v-layout row wrap>
            <v-layout row wrap>
              <v-flex sm12 md4 pb-3 pr-2>
                <v-card class="viva-status" flat color="teal">
                  <v-card-text pa-1>
                    <h2 class="text-xs-center custom-font-family headline white--text">Viva Status</h2>
                    <div class="text-xs-center mt-4 mb-3">
                      <VivaStatus />
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md8 pb-3 pl-2>
                <v-card flat elevation="24">
                  <v-card-text pa-1>
                    <h2 class="text-xs-center custom-font-family headline">Report Status</h2>
                  </v-card-text>
                  <ReportStatus />
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md6 pb-3 pr-2>
                <v-card elevation="20">
                  <v-card-text pa-1>
                    <h2 class="text-xs-center custom-font-family headline">Performance</h2>
                    <PerfomanceChart />
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex sm12 md6 pb-3 pl-2 grow>
                <v-card flat>
                  <v-card-text pa-1>
                    <h2 class="text-xs-center custom-font-family headline">Upcomping deadlines</h2>
                  </v-card-text>
                  <Calendar />
                </v-card>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
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
  name: "admin-dashboard-layout",
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
.side-navigation {
  position: fixed;
  top: 9vh;
  left: 0;
}
.viva-status {
  // background-image: linear-gradient(to bottom right, #43cea2, #185a9d);
  background-color: purple;
}
</style>
