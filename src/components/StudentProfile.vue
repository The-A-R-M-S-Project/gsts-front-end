<template>
  <v-container>
    <div id="e3" style="margin: auto;" class="grey lighten-3">
      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="" elevation="24" class="teal--text">
                  <div class="text-xs-center">
                    <h3 class="pa-2">Personal Details</h3>
                  </div>
                <v-divider light></v-divider>
                <v-card-text class="pa-3">
                    <v-layout row wrap>
                        <v-flex xs3>
                            <div class="pa-1">Name    </div>
                            <div class="pa-1">Gender  </div>
                            <div class="pa-1">Email   </div>
                            <div class="pa-1">Contacts</div>
                        </v-flex>
                        <v-flex xs9>
                            <div class="pa-1">:    Student Name</div>
                            <div class="pa-1">:    Male</div>
                            <div class="pa-1">:    Student@cedat.mak.ac.ug</div>
                            <div class="pa-1">:    +256701000000</div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12>
              <v-card color="" elevation="24" class="purple--text">
                  <div class="text-xs-center">
                    <h3 class="pa-2">Academic Details</h3>
                  </div>
                <v-divider light></v-divider>
                <v-card-text class="pa-3">
                    <v-layout row wrap>
                        <v-flex xs3>
                            <div class="pa-1">Department</div>
                            <div class="pa-1">Programme</div>
                            <div class="pa-1">Registraion Number</div>
                            <div class="pa-1">Year of Study</div>
                            <div class="pa-1">Report Status</div>
                            <div class="pa-1">Viva Status</div>
                        </v-flex>
                        <v-flex xs9>
                            <div class="pa-1">: Electrical and Computer Engineering</div>
                            <div class="pa-1">: Master of Science in telecom engineering</div>
                            <div class="pa-1">: 19/U/168/PS</div>
                            <div class="pa-1">: I</div>
                            <div class="pa-1">: With Examiner</div>
                            <div class="pa-1">: Not ready for vivas</div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {};
</script>

