<template>
  <v-container>
    <div class="display-1 text-center font-weight-medium mb-4">Profile</div>
    <div class="grey lighten-3">
      <v-card class="pa-3">
        <v-alert
          v-if="displayProfileEditMessage"
          dark
          color="success"
          class="text-center"
          dismissible
        >{{ profileEditMessage }}</v-alert>
        <v-row>
          <v-col cols="12">
            <v-row justify="center" align="center" no-gutters>
              <v-col :cols="$vuetify.breakpoint.xs?9:7">
                <div class="text-right">
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
                </div>
              </v-col>
              <v-col :cols="$vuetify.breakpoint.xs?3:5" class="pl-2">
                <v-file-input
                  label="Profile picture upload"
                  v-model="profilePic"
                  accept="image/*"
                  hide-input
                  prepend-icon="mdi-pencil"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6">
                <v-card elevation="24" class="teal--text">
                  <h3 class="py-2 px-4 text-center text-sm-left">Personal Details</h3>
                  <v-divider light></v-divider>
                  <v-card-text class="pa-3">
                    <v-row>
                      <v-col>
                        <div class="px-1">
                          <span class="font-weight-bold">Name</span>
                          : {{student.name}}
                          <v-btn @click="changeProfileItem('name')" icon>
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </div>

                        <div class="px-1 py-2 text-capitalize">
                          <span class="font-weight-bold">Role</span>
                          : {{student.role}}
                        </div>
                        <div class="px-1">
                          <span class="font-weight-bold">Email</span>
                          : {{student.email}}
                          <v-btn @click="changeProfileItem('email')" icon>
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </div>
                        <div class="px-1">
                          <span class="font-weight-bold">Contacts</span>
                          : {{student.phoneNumber}}
                          <v-btn @click="changeProfileItem('phone')" icon>
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
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
                        <div class="px-1 py-2">
                          <span class="font-weight-bold">Programme</span> : Master of Science in telecom engineering
                        </div>
                        <div class="px-1 py-2">
                          <span class="font-weight-bold">Registraion Number</span> : 19/U/168/PS
                        </div>
                        <div class="px-1 py-2">
                          <span class="font-weight-bold">Year of Study</span> : I
                        </div>
                        <div class="px-1 py-2">
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
      profilePic: null,
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
  created() {
    this.$store.dispatch("displayProfileEditMessage", false);
  },
  computed: {
    student() {
      return this.$store.getters.student;
    },
    profileEditMessage() {
      return this.$store.getters.profileEditMessage;
    },
    displayProfileEditMessage() {
      return this.$store.getters.displayProfileEditMessage;
    },
  },
  methods: {
    changeProfileItem(tag) {
      this.$store.dispatch("setProfileItemTag", tag);
    },
  },
};
</script>