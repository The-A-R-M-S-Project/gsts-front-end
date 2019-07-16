<template>
  <div>
    <Navigation />
    <div class="pa-3">
      <v-card flat min-height="95vh" class="transparent">
        <v-layout row wrap>
          <v-flex sm2>
            <Sidenav />
          </v-flex>
          <v-flex sm10>
            <v-card class="transparent" flat>
              <v-layout row wrap>
                <v-flex sm12 md4 pb-3 pr-2>
                  <v-card>
                    <v-card-text pa-1>
                      <h2 class="text-xs-center custom-font-family headline">Viva Status</h2>
                      <div class="text-xs-center mt-4 mb-3">
                        <VivaStatus />
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex sm12 md8 pb-3 pl-2>
                  <v-card>
                    <v-card-text pa-1>
                      <h2 class="text-xs-center custom-font-family headline">Report Status</h2>
                    </v-card-text>
                    <ReportStatus />
                  </v-card>
                </v-flex>
                <v-flex sm12 pb-3>
                  <v-card>
                    <v-card-text pa-1>
                      <h2 class="text-xs-center custom-font-family headline">Performance</h2>
                      <PerfomanceChart />
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex sm12 pb-3>
                  <v-card>
                    <v-card-text pa-1>
                      <h2 class="text-xs-center custom-font-family headline">Events Calendar</h2>
                    </v-card-text>
                    <Calendar />
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
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
