<template>
  <v-container>
    <div class="display-1 text-center font-weight-medium mb-4">Profile</div>
    <div id="e3" style="margin: auto;" class="grey lighten-3">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-row justify="center" align="center">
                <v-avatar color="orange" size="162">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-avatar>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card
                    :height="!$vuetify.breakpoint.xs?'35vh':undefined"
                    elevation="24"
                    class="teal--text"
                  >
                    <h3 class="py-2 px-4 text-center text-sm-left">Personal Details</h3>
                    <v-divider light></v-divider>
                    <v-card-text class="pa-3">
                      <v-row>
                        <v-col>
                          <div class="pa-1">
                            <span class="font-weight-bold">Name</span>
                            : Student Name
                          </div>

                          <div class="pa-1">
                            <span class="font-weight-bold">Gender</span> : Male
                          </div>
                          <div class="pa-1">
                            <span class="font-weight-bold">Email</span> : Student@cedat.mak.ac.ug
                          </div>
                          <div class="pa-1">
                            <span class="font-weight-bold">Contacts</span> : +256701000000
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card elevation="24" class="purple--text">
                    <div class="text-xs-center">
                      <h3 class="py-2 px-4 text-center text-sm-left">Academic Details</h3>
                    </div>
                    <v-divider light></v-divider>
                    <v-card-text class="pa-3">
                      <v-row>
                        <v-col>
                          <div class="pa-1">
                            <span class="font-weight-bold">Department</span>
                            : Electrical and Computer Engineering
                          </div>

                          <div class="pa-1">
                            <span class="font-weight-bold">Programme</span> : Master of Science in telecom engineering
                          </div>
                          <div class="pa-1">
                            <span class="font-weight-bold">Registraion Number</span> : 19/U/168/PS
                          </div>
                          <div class="pa-1">
                            <span class="font-weight-bold">Year of Study</span> : I
                          </div>
                          <div class="pa-1">
                            <span class="font-weight-bold">Report Status</span> : With Examiner
                          </div>
                          <div class="pa-1">
                            <span class="font-weight-bold">Viva Status</span> : Not ready
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "student-profile",
};
</script>