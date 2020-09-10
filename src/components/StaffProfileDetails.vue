<template>
  <v-container>
    <div class="display-1 text-center font-weight-medium mb-4">Profile</div>
    <div class="grey lighten-3">
      <v-card class="pa-3">
        <v-row>
          <v-col cols="12">
            <v-row justify="center" align="center">
              <v-avatar color="orange" size="162">
                <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  <template v-slot:placeholder>
                    <v-row align="center" justify="center">
                      <v-col>
                        <v-icon large>mdi-account</v-icon>
                      </v-col>
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
                  :height="($vuetify.breakpoint.xs || $vuetify.breakpoint.sm)?undefined:'29vh'"
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
                          : {{user.lastName}} {{user.firstName}}
                        </div>

                        <div class="pa-1 text-capitalize">
                          <span class="font-weight-bold">Role</span>
                          : {{user.role}}
                        </div>
                        <div class="pa-1">
                          <span class="font-weight-bold">Email</span>
                          : {{user.email}}
                        </div>
                        <div class="pa-1">
                          <span class="font-weight-bold">Contacts</span>
                          : {{user.phoneNumber}}
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
                          <span class="font-weight-bold">College</span> : College of Engineering, Design, Art and Technology (CEDAT)
                        </div>
                        <div class="pa-1">
                          <span class="font-weight-bold">School</span> : School of Engineering
                        </div>
                        <div class="pa-1">
                          <span class="font-weight-bold">Department</span>
                          : Electrical and Computer Engineering
                        </div>
                        <div class="pa-1">
                          <span class="font-weight-bold">Office</span> : Room 306
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "elevated-staff-profile-details",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>