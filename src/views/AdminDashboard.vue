<template>
    <div>
      <Navigation/>
      <div class="pa-3">
        <v-card flat min-height="95vh" class="transparent">
          <v-layout row wrap>
            <v-flex>
              <Sidenav/>
            </v-flex>
            <v-flex sm10>
              <v-card class="transparent" flat>
                <v-layout row wrap>
                  <v-flex sm6 pb-3 pr-2> 
                    <v-card>
                      <v-card-text>
                        viva status
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex sm6 pb-3 pl-2 min-height="">   
                    <v-card>
                      <v-card-text>
                        report status
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
</template>

<script>
import Navigation from "@/components/Navbar.vue"
import Sidenav from "@/components/Sidenav.vue"
export default {
    name: 'dashboard',
    components: {
        Navigation,
        Sidenav,
    },
}
</script>

<style lang="scss">


</style>
