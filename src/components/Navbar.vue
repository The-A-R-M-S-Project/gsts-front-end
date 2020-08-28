<template>
  <nav>
    <v-toolbar fixed color="purple" class="white--text">
      <v-toolbar-title>
        <v-btn
          text
          to="/principal-dashboard"
          class="white--text font-weight-bold text-capitalize title"
        >GSTS</v-btn>
      </v-toolbar-title>
      <v-row justify="end" align="center">
        <v-col md="4" sm="5">
          <SelectSchool />
        </v-col>

        <v-col md="auto" sm="3" class="text-center">
          <v-btn text class="title text-capitalize white--text" to="/students">
            <v-badge v-if="studentUpdates" color="teal" dot>
              <span>Students</span>
            </v-badge>
            <span v-else>Students</span>
          </v-btn>
        </v-col>
        <v-col md="auto" sm="1">
          <v-menu
            offset-y
            offset-x
            :close-on-content-click="closeOnContentClick"
            direction="bottom"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs" :class="{'pr-5': $vuetify.breakpoint.sm}">
                <v-avatar size="48">
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
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text class="text-capitalize" to="/under-construction">
                    <v-icon>mdi-account</v-icon>
                    <span>&nbsp;Profile</span>
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text :loading="isLoading" class="text-capitalize" @click="logOut">
                    <v-icon>mdi-power</v-icon>
                    <span>&nbsp;Sign out</span>
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-toolbar>
  </nav>
</template>
<script>
import SelectSchool from "./SelectSchool.vue";
import StudentData from "@/services/student-events.js";
export default {
  name: "menu-bar",
  data() {
    return {
      loading: false,
      closeOnContentClick: true,
      students: StudentData,
      studentUpdates: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    reports() {
      return this.$store.getters.reports;
    },
  },
  mounted() {
    this.checkForUpdates();
  },
  methods: {
    logOut() {
      this.closeOnContentClick = false;
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    checkForUpdates() {
      for (let i = 0; i < this.reports.length; i++) {
        if (
          this.reports[i].status === "submitted" ||
          this.reports[i].status === "clearedByExaminer" ||
          this.reports[i].status === "vivaDateSet"
        ) {
          this.studentUpdates = true;
          break;
        } else {
          this.studentUpdates = false;
        }
      }
    },
  },
  components: {
    SelectSchool,
  },
};
</script>