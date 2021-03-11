<template>
  <v-container>
    <div class="display-1 text-center font-weight-medium mb-4">Profile</div>
    <div class="grey lighten-3">
      <v-card class="pa-3">
        <v-alert
          v-if="displayProfileEditMessage"
          dark
          :color="profileEditMessage.includes('Success') ? 'success' : 'error'"
          class="text-center"
          dismissible
          >{{ profileEditMessage }}</v-alert
        >
        <v-row>
          <v-col cols="12">
            <v-row justify="center" align="center" no-gutters>
              <v-col :cols="$vuetify.breakpoint.xs ? 9 : 7">
                <div class="text-right">
                  <v-avatar color="orange" size="162">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    >
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
              <v-col :cols="$vuetify.breakpoint.xs ? 3 : 5" class="pl-2">
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
                  <h3 class="py-2 px-4 text-center text-sm-left">
                    Personal Details
                  </h3>
                  <v-divider light></v-divider>
                  <v-card-text class="pa-3">
                    <v-row>
                      <v-col>
                        <div class="px-1">
                          <span class="font-weight-bold">Name</span>
                          : {{ student.lastName }} {{ student.firstName }}
                          <v-btn @click="changeProfileItem('name')" icon>
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </div>

                        <div class="px-1 py-2 text-capitalize">
                          <span class="font-weight-bold">Role</span>
                          : {{ student.role }}
                        </div>
                        <div class="px-1">
                          <span class="font-weight-bold">Email</span>
                          : {{ student.email }}
                          <v-btn @click="changeProfileItem('email')" icon>
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </div>
                        <div class="px-1">
                          <span class="font-weight-bold">Contacts</span>
                          : {{ student.phoneNumber }}
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
                    <h3 class="py-2 px-4 text-center text-sm-left">
                      Academic Details
                    </h3>
                  </div>
                  <v-divider light></v-divider>
                  <v-card-text class="pa-3">
                    <v-row>
                      <v-col>
                        <div class="px-1 py-2">
                          <span class="font-weight-bold">Programme</span> :
                          {{ student.program.name }}
                        </div>
                        <div class="px-1 py-2">
                          <span class="font-weight-bold"
                            >Registraion Number</span
                          >
                          : 19/U/168/PS
                        </div>
                        <div class="px-1 py-2">
                          <span class="font-weight-bold">Year of Study</span> :
                          I
                        </div>
                        <div v-if="student.report" class="px-1 py-2">
                          <span class="font-weight-bold">Report Status</span>
                          :
                          {{
                            progressEvents[`${student.report.status}`].message
                          }}
                        </div>
                        <div v-else class="px-1 py-2">
                          <span class="font-weight-bold">Report Status</span>
                          : Not submitted
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
import { mapGetters } from "vuex";

export default {
  name: "student-profile",
  data() {
    return {
      profilePic: null,
    };
  },
  created() {
    this.$store.dispatch("displayProfileEditMessage", false);
  },
  updated() {
    if (this.displayProfileEditMessage) {
      setTimeout(() => {
        this.$store.dispatch("displayProfileEditMessage", false);
      }, 10000);
    }
  },
  computed: {
    ...mapGetters([
      "progressEvents",
      "student",
      "profileEditMessage",
      "displayProfileEditMessage",
    ]),
  },
  methods: {
    changeProfileItem(tag) {
      this.$store.dispatch("setProfileItemTag", tag);
    },
  },
};
</script>