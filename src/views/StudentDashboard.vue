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
          <v-list-item class="my-6">
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
    <div class="pt-5" :class="{'px-9': !$vuetify.breakpoint.xs}">
      <v-row>
        <v-col cols="12">
          <div class="display-1 text-center font-weight-medium">Report status</div>
        </v-col>
        <!-- <v-col cols="12" md="6" lg="6">
          <StudentTimeline />
        </v-col>-->
        <v-col cols="12">
          <!-- <div class="text-center headline font-weight-medium">Events log</div> -->
          <StudentsNotifications class="mx-auto" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
// import StudentTimeline from "@/components/StudentTimeline.vue";
import StudentsNotifications from "@/components/StudentsNotifications.vue";

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
  },
  components: {
    Navigation,
    // StudentTimeline,
    StudentsNotifications,
  },
};
</script>
