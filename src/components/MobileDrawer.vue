<template>
  <div>
    <v-app-bar color="purple" class="mobile-drawer d-block d-sm-none" dark>
      <v-toolbar-title>
        <v-btn
          v-show="user.role !== 'dean'"
          text
          :to="user.role==='principal'?'/principal-dashboard':undefined"
          class="white--text font-weight-bold text-capitalize title px-0"
        >GSTS</v-btn>
        <v-btn
          v-if="user.role==='dean'"
          text
          class="normal-text px-0 text-capitalize white--text font-weight-bold"
          href="/dean-dashboard"
        >Dashboard</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" class="d-flex d-sm-none" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            class="my-6"
            :to="user.role==='student'?'/student-dashboard/student-profile':`/${user.role}/profile`"
          >
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account</v-icon>
              <span>&nbsp;Profile</span>
            </v-btn>
          </v-list-item>
          <v-list-item
            class="my-6"
            to="/students"
            v-if="user.role!=='student' && user.role!=='examiner'"
          >
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account-group</v-icon>
              <v-badge v-if="checkForUpdates" color="pink" dot>
                <span>&nbsp;Students</span>
              </v-badge>
              <span v-else>&nbsp;Students</span>
            </v-btn>
          </v-list-item>
          <v-list-item class="my-6 px-8 mobile-select" v-if="user.role==='principal'">
            <SelectSchool />
          </v-list-item>
          <v-list-item class="my-6" to="/examiner-dashboard" v-if="user.role==='examiner'">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-desktop-mac-dashboard</v-icon>
              <v-badge v-if="checkForUpdates" color="pink" dot>
                <span>&nbsp;Dashboard</span>
              </v-badge>
              <span v-else>&nbsp;Dashboard</span>
            </v-btn>
          </v-list-item>
          <v-list-item class="my-6" to="/examiners" v-if="user.role==='dean'">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account-group</v-icon>
              <span>&nbsp;Examiners</span>
            </v-btn>
          </v-list-item>
          <v-list-item to="report-status" class="my-6" v-if="user.role==='student'">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-progress-check</v-icon>
              <span>&nbsp;Status</span>
            </v-btn>
          </v-list-item>
          <v-list-item to="submit-report" class="my-6" v-if="user.role==='student'">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-file</v-icon>
              <span>&nbsp;Report</span>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-list-item class="my-4" @click="logOut">
          <v-btn text :loading="isLoading" class="title text-capitalize">
            <v-icon large>mdi-power</v-icon>
            <span>&nbsp;Sign out</span>
          </v-btn>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import SelectSchool from "@/components/SelectSchool.vue";
export default {
  name: "mobile-drawer",
  data() {
    return {
      drawer: false,
      loading: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    user() {
      return this.$store.getters.user;
    },
    reports() {
      return this.$store.getters.reports;
    },
    assignedStudents() {
      return this.$store.getters.assignedStudents;
    },
    checkForUpdates() {
      let reports = [];
      if (this.user.role === "examiner") {
        reports = this.assignedStudents;
      } else {
        reports = this.reports;
      }
      for (let i = 0; i < reports.length; i++) {
        if (
          reports[i].status === "submitted" ||
          reports[i].status === "clearedByExaminer" ||
          reports[i].status === "vivaDateSet"
        ) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.closeOnContentClick = false;
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  components: {
    SelectSchool,
  },
};
</script>