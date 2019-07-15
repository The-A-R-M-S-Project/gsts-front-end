<template>
    <div>
      <Navigation/>
      <div class="pa-3">
        <v-card flat min-height="95vh" class="transparent">
          <v-layout row wrap>
            <v-flex sm2>
              <Sidenav/>
            </v-flex>
            <v-flex sm10>
              <v-card class="transparent" flat>
                <v-layout row wrap>
                  <v-flex sm12 md5 pb-3 pr-2> 
                    <v-card min-height="52vh">
                      <v-card-text align-center>
                      <v-card-text pa-1><h3 class="text-xs-center">VIVA STATUS</h3></v-card-text>
                        <VivaStatus/>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex sm12 md7 pb-3 pl-2 min-height="">   
                    <v-card>
                      <v-card-text pa-1><h3 class="text-xs-center">REPORT STATUS</h3></v-card-text>
                       <ReportStatus/>
                    </v-card>
                  </v-flex>
                  <v-flex sm12 pb-3>
                    <v-card>
                      <v-card-text pa-1><h3 class="text-xs-center">PERFOMANCE</h3></v-card-text>
                        <PerfomanceChart/>
                    </v-card>
                  </v-flex>
                  <v-flex sm12 pb-3>
                    <v-card>
                        <Calendar/>
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
import Navigation from "@/components/Navbar.vue"
import Sidenav from "@/components/Sidenav.vue"
import VivaStatus from "@/components/VivaStatus.vue"
import ReportStatus from "@/components/ReportStatus.vue"
import PerfomanceChart from "@/components/Perfomance.vue"
import Calendar from "@/components/Calendar.vue"
export default {
    name: 'dashboard',
    components: {
        Navigation,
        Sidenav,
        VivaStatus,
        ReportStatus,
        PerfomanceChart,
        Calendar
    },
}
</script>

<style lang="scss">


</style>
