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
                  <v-flex sm5 pb-3 pr-2> 
                    <v-card min-height="52vh">
                      <v-card-text align-center>
                        <VivaStatus/>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex sm7 pb-3 pl-2 min-height="">   
                    <v-card>
                      <v-card-text>
                         <ReportStatus/>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex sm12 pb-3>
                    <v-card>
                      <v-card-text>
                        perfomance
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex sm12 pb-3>
                    <v-card>
                      <v-card-text>
                        calendar
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue"
import Sidenav from "@/components/Sidenav.vue"
import VivaStatus from "@/components/VivaStatus.vue"
import ReportStatus from "@/components/ReportStatus.vue"
export default {
    name: 'dashboard',
    components: {
        Navigation,
        Sidenav,
        VivaStatus,
        ReportStatus
    },
}
</script>

<style lang="scss">
</style>
