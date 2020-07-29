<template>
  <div class="mx-auto overflow-hidden" style="height: 100%">
    <Navigation class="d-none d-sm-block" />
    <v-app-bar color="purple" class="mobile-drawer d-block d-sm-none" dark>
      <v-toolbar-title>
        <v-btn
          text
          to="/principal-dashboard"
          class="white--text font-weight-bold text-capitalize title px-0"
        >GSTS</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" class="d-flex d-sm-none" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item class="my-6" to="student-profile">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account</v-icon>
              <span>&nbsp;Profile</span>
            </v-btn>
          </v-list-item>
          <v-list-item to="report-status" class="my-6">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-progress-check</v-icon>
              <span>&nbsp;Status</span>
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
    <div class="pt-5" :class="{'px-9 notifications': !$vuetify.breakpoint.xs}">
      <v-row>
        <v-col cols="12" md="6" v-show="$route.path.includes('report-status')">
          <StudentTimeline />
        </v-col>
        <v-col cols="12" :md="!$route.path.includes('report-status')?'12':'6'">
          <router-view></router-view>
        </v-col>
      </v-row>
      <v-btn
        v-show="$route.path.includes('report-status')"
        color="teal"
        fab
        dark
        fixed
        bottom
        right
        class="v-btn--example"
        @click="submitReport"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
import StudentTimeline from "@/components/StudentTimeline.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "student-dashboard",
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
  },
  methods: {
    logOut() {
      this.closeOnContentClick = false;
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    submitReport() {
      this.$router.push("submit-report");
    },
  },
  components: {
    Navigation,
    StudentTimeline,
    Footer,
  },
};
</script>

<style>
.notifications .v-btn--example {
  margin: 0 1rem 2rem 2rem;
}
</style>