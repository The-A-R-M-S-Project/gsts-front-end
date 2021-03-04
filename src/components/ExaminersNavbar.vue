<template>
  <nav>
    <v-toolbar color="purple" class="white--text">
      <v-toolbar-title
        class="white--text font-weight-bold text-capitalize title d-sm-none d-md-flex"
        >GSTS</v-toolbar-title
      >
      <v-toolbar-title class="d-none d-sm-flex d-md-none">
        <v-btn
          text
          class="title font-weight-bold text-capitalize white--text"
          to="/examiner-dashboard"
        >
          <v-badge v-if="checkForUpdates" color="teal" dot>
            <span>Dashboard</span>
          </v-badge>
          <span v-else>Dashboard</span>
        </v-btn>
      </v-toolbar-title>
      <v-row justify="end" align="center">
        <v-col md="auto" class="d-sm-none d-md-flex">
          <v-btn
            text
            class="title text-capitalize white--text"
            to="/examiner-dashboard"
          >
            <v-badge v-if="checkForUpdates" color="teal" dot>
              <span>Dashboard</span>
            </v-badge>
            <span v-else>Dashboard</span>
          </v-btn>
        </v-col>
        <v-col md="auto" sm="2">
          <v-menu
            offset-y
            offset-x
            :close-on-content-click="closeOnContentClick"
            direction="bottom"
            transition="slide-y-transition"
            class="mx-auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-avatar size="48">
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
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn
                    text
                    class="text-capitalize"
                    :to="`/${user.role}/profile`"
                  >
                    <v-icon>mdi-account</v-icon>
                    <span>&nbsp;Profile</span>
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn
                    text
                    :loading="isLoading"
                    class="text-capitalize"
                    @click="logOut"
                  >
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
export default {
  name: "examiner-navbar",
  data() {
    return {
      loading: false,
      closeOnContentClick: true,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    user() {
      return this.$store.getters.user;
    },
    schoolName() {
      return this.$store.getters.schoolName;
    },
    assignedStudents() {
      return this.$store.getters.assignedStudents;
    },
    checkForUpdates() {
      for (let i = 0; i < this.assignedStudents.length; i++) {
        if (
          this.assignedStudents[i].status === "submitted" ||
          this.assignedStudents[i].status === "withExaminer"
        ) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    async logOut() {
      this.closeOnContentClick = false;
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
