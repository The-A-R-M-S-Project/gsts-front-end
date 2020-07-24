<template>
  <div class="mx-auto overflow-hidden">
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
          <v-list-item class="my-6" to="/under-construction">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account</v-icon>
              <span>&nbsp;Profile</span>
            </v-btn>
          </v-list-item>
          <v-list-item class="my-6" to="/students">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account-group</v-icon>
              <span>&nbsp;Students</span>
            </v-btn>
          </v-list-item>
          <v-list-item class="my-6 px-8 mobile-select">
            <SelectSchool />
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
    <OverlayLoader />
    <v-container fluid class="pt-5">
      <v-row class="px-4">
        <v-row>
          <v-col sm="12" md="4" class="pb-3">
            <v-card color="teal" class="mx-auto" max-width="90vw">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline white--text">Viva Status</h2>
                <div class="text-center mt-4 mb-3">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="12" md="8" class="pb-3">
            <v-card class="mx-auto" max-width="90vw">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Report Status</h2>
              </v-card-text>
              <ReportStatus />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" md="6" class="pb-3 pr-2">
            <v-card class="mx-auto" max-width="90vw">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Performance</h2>
                <PerfomanceChart />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="12" md="6" class="pb-3 pl-2" grow>
            <v-card class="mx-auto" max-width="90vw">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Upcoming deadlines</h2>
                <Calendar />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import VivaStatus from "@/components/VivaStatus.vue";
import ReportStatus from "@/components/ReportStatus.vue";
import PerfomanceChart from "@/components/Performance.vue";
import Calendar from "@/components/Calendar.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import SelectSchool from "@/components/SelectSchool.vue";

export default {
  name: "ECE-Dashboard",
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
  },
  components: {
    Navigation,
    VivaStatus,
    ReportStatus,
    PerfomanceChart,
    Calendar,
    OverlayLoader,
    SelectSchool,
  },
};
</script>
<style>
.mobile-drawer .v-btn__content .v-icon {
  font-size: 2rem !important;
}
.mobile-card {
  height: 50vh;
}
</style>