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
                          : {{user.name}}
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
                          <span class="font-weight-bold">Report Status</span>
                          : {{ progressEvents[`${student.report.status}`].message}}
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
  name: "student-profile",
  data() {
    return {
      progressEvents: {
        notSubmitted: {
          value: 0,
          message: "Not submitted",
          color: "grey",
        },
        submitted: {
          value: 17,
          message: "Submitted",
          color: "deep-orange darken-2",
        },
        withExaminer: {
          value: 39,
          message: "With examiner",
          color: "orange",
        },
        clearedByExaminer: {
          value: 56,
          message: "Cleared by examiner",
          color: "amber",
        },
        vivaDateSet: {
          value: 73,
          message: "Viva date set",
          color: "yellow darken-1",
        },
        vivaComplete: {
          value: 100,
          message: "Viva complete",
          color: "green lighten-2",
        },
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    student() {
      return this.$store.getters.student;
    },
  },
};
</script>