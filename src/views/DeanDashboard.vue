<template>
  <div class="mx-auto overflow-hidden">
    <DeanNav class="d-none d-sm-block" />
    <OverlayLoader />
    <v-app-bar color="purple" class="mobile-drawer d-block d-sm-none" dark>
      <v-toolbar-title>
        <v-btn
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
          <v-list-item class="my-6" to="/examiners">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account-group</v-icon>
              <span>&nbsp;Examiners</span>
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
    <v-container fluid class="pt-5">
      <v-row class="px-4">
        <v-row>
          <v-col sm="12" md="4" class="pb-3 pr-2">
            <v-card class="viva-status" flat color="teal">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline white--text">Viva Status</h2>
                <div class="text-center mt-4 mb-3">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="12" md="8" class="pb-3 pl-2">
            <v-card flat elevation="24">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Report Status</h2>
              </v-card-text>
              <ReportStatus />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" md="6" class="pb-3 pr-2">
            <v-card elevation="20">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Performance</h2>
                <PerfomanceChart />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="12" md="6" class="pb-3 pl-2" grow>
            <v-card elevation="24">
              <v-card-text pa-1>
                <h2 class="text-center custom-font-family headline">Upcoming deadlines</h2>
              </v-card-text>
              <Calendar />
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import DeanNav from "@/components/DeanNav.vue";
import VivaStatus from "@/components/VivaStatus.vue";
import ReportStatus from "@/components/ReportStatus.vue";
import PerfomanceChart from "@/components/Performance.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import Calendar from "@/components/Calendar.vue";
export default {
  name: "dean-dashboard",
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
  created() {
    this.$store.dispatch("fetchDeanDashboardStats");
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
    DeanNav,
    VivaStatus,
    ReportStatus,
    PerfomanceChart,
    Calendar,
    OverlayLoader,
  },
};
</script>
